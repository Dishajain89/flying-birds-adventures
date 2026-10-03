export default {
  name: "trip",
  title: "Trip",
  type: "document",

  fields: [
    // ===================================
    // BASIC TRIP OVERVIEW (Common info)
    // ===================================
    {
      name: "title",
      title: "Trip Name",
      type: "string",
      description: "e.g., Udaipur Exploration Circuit",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "destination",
      title: "Destination Hub",
      type: "string",
      description: "e.g., Udaipur, Rajasthan",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "coverImage",
      title: "Main Trip Banner Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "startingPrice",
      title: "Starting Base Price (₹)",
      type: "number",
      description: "Lowest starting price across all itineraries (e.g., 3499)",
    },
    {
      name: "duration",
      title: "Trip Duration",
      type: "string",
      description: "Example: 2 Days / 1 Night or Same Day",
    },

    // 1. Domestic vs International (Switch toggle ke liye)
    {
      name: "tripType",
      title: "Trip Scope (Domestic / International)",
      type: "string",
      options: {
        list: [
          { title: "Domestic Trip", value: "domestic" },
          { title: "International Trip", value: "international" },
          { title: "One Day Trip", value: "oneDay" },
        ],
        layout: "radio",
      },
      initialValue: "domestic",
      validation: (Rule) => Rule.required(),
    },

    // 2. Tabs Filter ke liye (Weekend / Trek) 👈 NEW FIELD
    {
      name: "category",
      title: "Trip Category (Tabs Filter)",
      type: "string",
      description: "Website par tabs filter (Weekend Trips / Trek) ke liye select karein",
      options: {
        list: [
          { title: "Weekend Trip", value: "weekend" },
          { title: "Adventure Trek", value: "trek" },
          { title: "General Group Tour", value: "general" },
        ],
        layout: "radio",
      },
      initialValue: "weekend",
    },

    {
      name: "featuredOnHome",
      title: "Featured on Home",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "badge",
      title: "Badge / Tag",
      type: "string",
      description: "e.g., 'Best Seller', 'Weekend Special'",
    },
    {
      name: "tourOverview",
      title: "Destination / Common Tour Overview",
      type: "text",
      rows: 5,
    },

    // ===================================
    // MULTIPLE ITINERARIES (Routes/Options)
    // ===================================
    {
      name: "itineraries",
      title: "Itinerary Options / Routes",
      description:
        "Add 1, 2, 3 ya usse zyada custom itineraries yahan add kar sakte ho.",
      type: "array",
      validation: (Rule) =>
        Rule.min(1).error("Kam se kam ek itinerary hona zaroori hai"),
      of: [
        {
          type: "object",
          name: "itineraryOption",
          title: "Itinerary Option",
          fields: [
            {
              name: "title",
              title: "Route / Package Name",
              type: "string",
              description:
                "e.g., 'Udaipur → Sawariya Seth' ya 'Udaipur → Mount Abu'",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "tagline",
              title: "Short Tagline / Subtitle",
              type: "string",
              description:
                "e.g., 'Spiritual & Heritage Darshan' ya 'Scenic Hill Station Getaway'",
            },
            {
              name: "duration",
              title: "Duration for this route",
              type: "string",
              description: "e.g., '2 Days / 1 Night' ya 'Same Day'",
            },
            {
              name: "price",
              title: "Price for this route (₹)",
              type: "number",
              description:
                "e.g., 4999 (Agar empty chhoda toh common starting price use hoga)",
            },
            {
              name: "coverImage",
              title: "Itinerary Specific Cover Image",
              type: "image",
              options: { hotspot: true },
              description:
                "Is route ke liye specific photo (e.g., Sawariya Seth temple photo)",
            },
            {
              name: "description",
              title: "Route Summary",
              type: "text",
              rows: 3,
            },

            // Day-wise Schedule for this route
            {
              name: "days",
              title: "Day-by-Day Schedule",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "day",
                      title: "Day Number",
                      type: "number",
                    },
                    {
                      name: "title",
                      title: "Day Title / Highlights",
                      type: "string",
                      description: "e.g., 'Day 1: Arrival & Temple Darshan'",
                    },
                    {
                      name: "description",
                      title: "Day Description",
                      type: "text",
                      rows: 4,
                    },
                    {
                      name: "meals",
                      title: "Meals",
                      type: "string",
                      description: "e.g., Breakfast, Lunch & Dinner",
                    },
                    {
                      name: "stay",
                      title: "Stay",
                      type: "string",
                      description:
                        "e.g., Hotel in Manali / Camp in Kasol / Not Applicable",
                    },
                    {
                      name: "dayImage",
                      title: "Photo for this day (Optional)",
                      type: "image",
                      options: { hotspot: true },
                    },
                  ],
                  preview: {
                    select: {
                      day: "day",
                      title: "title",
                      media: "dayImage",
                    },
                    prepare({ day, title, media }) {
                      return {
                        title: `Day ${day || ""}: ${title || "Untitled"}`,
                        media,
                      };
                    },
                  },
                },
              ],
            },

            // Specific Gallery for this route
            {
              name: "gallery",
              title: "Route Gallery (Optional)",
              type: "array",
              description: "Is specific route ki 3-6 photos",
              of: [
                {
                  type: "image",
                  options: { hotspot: true },
                },
              ],
            },

            // Download Itinerary PDF
            {
              name: "pdf",
              title: "Itinerary PDF",
              type: "file",
              options: {
                accept: ".pdf",
              },
              description: "Upload PDF for this specific itinerary",
            },
          ],

          preview: {
            select: {
              title: "title",
              duration: "duration",
              price: "price",
              media: "coverImage",
            },
            prepare({ title, duration, price, media }) {
              return {
                title: title || "Untitled Route",
                subtitle: `${duration ? duration + " • " : ""}${price ? "₹" + price : ""}`,
                media,
              };
            },
          },
        },
      ],
    },

    // ===================================
    // COMMON INCLUSIONS / EXCLUSIONS / BATCHES
    // ===================================
    {
      name: "included",
      title: "What's Included",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "notIncluded",
      title: "What's Not Included",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "batchDates",
      title: "Batch Dates",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "date",
              title: "Batch Date",
              type: "date",
            },
            {
              name: "status",
              title: "Status",
              type: "string",
              options: {
                list: [
                  { title: "Available", value: "available" },
                  { title: "Limited Seats", value: "limited" },
                  { title: "Sold Out", value: "soldOut" },
                ],
              },
              initialValue: "available",
            },
          ],
          preview: {
            select: {
              date: "date",
              status: "status",
            },
            prepare({ date, status }) {
              return {
                title: date || "No date",
                subtitle: status ? status.toUpperCase() : "AVAILABLE",
              };
            },
          },
        },
      ],
    },
  ],
};