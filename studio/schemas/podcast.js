import { MdOutlinePodcasts } from 'react-icons/md'

export default {
    title: 'Podcast',
    name: 'podcast',
    type: 'document',
    icon: MdOutlinePodcasts,
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            title: "Slug",
            name: "slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 200,
                slugify: input => input
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .slice(0, 200)
            }
        },
        {
            type: "cloudinary.asset",
            name: "podcast",
            description: "This asset is served from Cloudinary",
          },
        {
            description: "Publish date",
            title: 'Date',
            name: 'date',
            type: 'datetime',
            validation: Rule => Rule.required()
        },
        {
            description: "The length of the podcast in minutes e.g. 34.30",
            title: 'Length',
            name: 'length',
            type: 'number',
        },
        {
            description: "A short, one to two lines, introduction for the podcast list.",
            name: 'description',
            rows: 3,
            title: 'Short description for podcast list',
            type: 'text',
            validation: Rule => Rule.required()
        },
        {
            description: "A list of guests, from the Person category",
            name: "guests",
            title: "Guest(s)",
            type: "array",
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'person' }],
                    options: {
                        filter: ({ parent }) => {
                            const existingPerson = parent.map(item => {
                                return item._ref;
                            })
                            return {
                                filter: "_id in $ref == false",
                                params: {
                                    ref: existingPerson
                                }
                            }
                        }
                    }
                },
            ],
        },
        {
            description: "An image for the podcast preview",
            type: 'blogPostImage',
            name: "image"
        },
        {
            description: "A paragraph that summarises the content and invites to reading more.",
            title: 'Leading paragraph',
            name: 'introduction',
            rows: 5,
            type: 'text',
        },
        {
            description: "The main text of the podcast post. Keep paragraphs short, and put the most important content first.",
            title: 'Main text',
            name: 'content',
            type: 'array',
            of: [
                {
                    type: 'block',
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
            ]
        }
    ],
    orderings: [
        {
            title: 'Date, newest',
            name: 'releaseDateDesc',
            by: [
                { field: 'date', direction: 'desc' }
            ]
        },
        {
            title: 'Date, oldest',
            name: 'releaseDateAsc',
            by: [
                { field: 'date', direction: 'asc' }
            ]
        },
        {
            title: 'Title, ascending',
            name: 'titleAsc',
            by: [
                { field: 'title', direction: 'asc' }
            ]
        },
        {
            title: 'Title, descending',
            name: 'titleDesc',
            by: [
                { field: 'title', direction: 'desc' }
            ]
        },
        {
            title: 'Length, descending',
            name: 'lengthDesc',
            by: [
                { field: 'length', direction: 'desc' }
            ]
        },
        {
            title: 'Length, ascending',
            name: 'lengthAsc',
            by: [
                { field: 'length', direction: 'asc' }
            ]
        },
    ],
    preview: {
        select: {
            title: 'title',
            description: 'description',
            date: 'date',
            image: 'image'
        },
        prepare(selection) {
            const { title, description, date, image } = selection
            return {
                title: title,
                subtitle: `${date.split('-')[2].slice(0, 2)}.${date.split('-')[1]}.${date.split('-')[0]} - ${description}`,
                media: image
            }
        }
    }
}

