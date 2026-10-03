export default {
  name: "gallery",
  title: "Gallery",
  type: "document",

  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "location",
      title: "Location",
      type: "string",
    },

    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },

    {
      name: "featured",
      title: "Show in Home Gallery",
      type: "boolean",
      initialValue: true,
    },
  ],
};