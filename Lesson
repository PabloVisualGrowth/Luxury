{
  "name": "Lesson",
  "type": "object",
  "properties": {
    "module_id": {
      "type": "string",
      "description": "Reference to parent module"
    },
    "title": {
      "type": "string",
      "description": "Lesson title"
    },
    "content": {
      "type": "string",
      "description": "Lesson content in markdown/HTML"
    },
    "video_url": {
      "type": "string",
      "description": "Optional video URL"
    },
    "order": {
      "type": "number",
      "description": "Order within module"
    },
    "duration": {
      "type": "string",
      "description": "Estimated reading/watch time"
    },
    "type": {
      "type": "string",
      "enum": [
        "text",
        "video",
        "quiz",
        "interactive"
      ],
      "default": "text"
    }
  },
  "required": [
    "module_id",
    "title",
    "order"
  ]
}
