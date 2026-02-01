{
  "name": "Course",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "Course title"
    },
    "slug": {
      "type": "string",
      "description": "URL-friendly identifier"
    },
    "description": {
      "type": "string",
      "description": "Short description"
    },
    "long_description": {
      "type": "string",
      "description": "Detailed description"
    },
    "image_url": {
      "type": "string",
      "description": "Course cover image"
    },
    "duration": {
      "type": "string",
      "description": "Estimated duration"
    },
    "level": {
      "type": "string",
      "enum": [
        "beginner",
        "intermediate",
        "advanced"
      ],
      "description": "Difficulty level"
    },
    "category": {
      "type": "string",
      "enum": [
        "essence",
        "challenges",
        "experience"
      ],
      "description": "Pathway category"
    },
    "is_published": {
      "type": "boolean",
      "default": true
    },
    "is_demo": {
      "type": "boolean",
      "default": false,
      "description": "Demo course available without full enrollment"
    },
    "order": {
      "type": "number",
      "description": "Display order"
    }
  },
  "required": [
    "title",
    "slug"
  ]
}
