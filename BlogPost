{
  "name": "BlogPost",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "Post title"
    },
    "slug": {
      "type": "string",
      "description": "URL-friendly identifier"
    },
    "excerpt": {
      "type": "string",
      "description": "Short summary for previews"
    },
    "content": {
      "type": "string",
      "description": "Full post content in markdown"
    },
    "featured_image": {
      "type": "string",
      "description": "Cover image URL"
    },
    "author": {
      "type": "string",
      "description": "Author name"
    },
    "category": {
      "type": "string",
      "enum": [
        "sustainability",
        "luxury",
        "training",
        "industry",
        "insights"
      ],
      "description": "Post category"
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "SEO tags"
    },
    "meta_title": {
      "type": "string",
      "description": "SEO meta title"
    },
    "meta_description": {
      "type": "string",
      "description": "SEO meta description"
    },
    "is_published": {
      "type": "boolean",
      "default": false
    },
    "published_at": {
      "type": "string",
      "format": "date"
    },
    "read_time": {
      "type": "number",
      "description": "Estimated read time in minutes"
    }
  },
  "required": [
    "title",
    "slug",
    "content"
  ]
}
