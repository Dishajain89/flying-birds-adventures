export default {
  name: "testimonial",
  title: "Testimonial",
  type: "document",

  fields: [
    {
      name: "name",
      title: "Traveler Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "trip",
      title: "Trip Name",
      type: "string",
      description: "Example: Udaipur Trip",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "quote",
      title: "Traveler Review",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: "rating",
      title: "Rating",
      type: "number",
      description: "Rating from 1 to 5",
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
    },
    {
      name: "video",
      title: "Traveler Video",
      type: "file",
      options: { accept: "video/*" },
      description: "Upload the downloaded traveler video here.",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "location",
      title: "Location",
      type: "string",
      description: "Example: Udaipur, Rajasthan",
    },
    {
      name: "featured",
      title: "Show on Home",
      type: "boolean",
      initialValue: true,
    },
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "trip",
    },
  },
};
