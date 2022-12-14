import { MdEventSeat } from "react-icons/md";

export default {
  title: "Event",
  name: "event",
  type: "document",
  icon: MdEventSeat,
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    },
    {
      description: "Where the event was held",
      title: "Place",
      name: "place",
      type: "string",
    },
    {
      description: "Date when the event was held",
      title: "Date for event",
      name: "date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      description:
        "Choose a client from the Client category or create a new one",
      name: "client",
      title: "Client(s)",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "client" }],
          options: {
            filter: ({ parent }) => {
              const existingClient = parent.map((item) => {
                return item._ref;
              });
              return {
                filter: "_id in $ref == false",
                params: {
                  ref: existingClient,
                },
              };
            },
          },
        },
      ],
    },
    {
      description:
        "A short, one to two lines, introduction for the event list.",
      name: "description",
      rows: 3,
      title: "Short description for event list",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      description: "A preview image",
      title: "Preview image",
      type: "blogPostImage",
      name: "image",
    },
    {
      description:
        "A paragraph that summarises the content and invites to reading more.",
      title: "Leading paragraph",
      name: "introduction",
      rows: 5,
      type: "text",
    },
    {
      description:
        "The main text of the post. Keep paragraphs short, and put the most important content first.",
      title: "Main text",
      name: "content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "H5", value: "h5" },
            { title: "H6", value: "h6" },
            { title: "Quote", value: "blockquote" },
          ],
        },
      ],
    },
    {
      type: "array",
      title: "List of images from Cloudinary to be used as gallery",
      name: "cloudinaryList",
      description: "This asset is served from Cloudinary",
      of: [{ type: "cloudinary.asset" }],
    },
  ],
  orderings: [
    {
      title: "Date, newest",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Date, oldest",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
    {
      title: "Title, ascending",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
    {
      title: "Title, descending",
      name: "titleDesc",
      by: [{ field: "title", direction: "desc" }],
    },
    {
      title: "Place, ascending",
      name: "placeAsc",
      by: [{ field: "place", direction: "asc" }],
    },
    {
      title: "Place, descending",
      name: "placeDesc",
      by: [{ field: "place", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      place: "place",
      date: "date",
      image: "image",
    },
    prepare(selection) {
      const { title, description, date, image } = selection;
      return {
        title: title,
        subtitle: `${date.split("-")[2].slice(0, 2)}.${date.split("-")[1]}.${
          date.split("-")[0]
        } - ${description}`,
        media: image,
      };
    },
  },
};
