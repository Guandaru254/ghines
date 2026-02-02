export default {
  name: 'newsStory',
  title: 'News & Stories',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'The Ghines Foundation',
    },
    {
      name: 'publishedDate',
      title: 'Published Date',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
    },
    {
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true, 
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Photo Credit / Caption',
        }
      ]
    },
    {
      name: 'description',
      title: 'Short Summary/Excerpt',
      type: 'text',
      rows: 3,
      description: 'Used for the blog list cards.'
    },
    {
      name: 'content',
      title: 'Full Story Content',
      type: 'array', 
      of: [
        {type: 'block'}, 
        {type: 'image', options: {hotspot: true}}
      ] 
    },
  ],
}