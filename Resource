{
  "name": "Resource",
  "type": "object",
  "properties": {
    "course_id": {
      "type": "string",
      "description": "Reference to course (optional)"
    },
    "module_id": {
      "type": "string",
      "description": "Reference to module (optional)"
    },
    "title": {
      "type": "string",
      "description": "Resource title"
    },
    "description": {
      "type": "string",
      "description": "Brief description"
    },
    "file_url": {
      "type": "string",
      "description": "URL to the file"
    },
    "file_type": {
      "type": "string",
      "enum": [
        "pdf",
        "doc",
        "ppt",
        "video",
        "other"
      ],
      "default": "pdf"
    },
    "category": {
      "type": "string",
      "description": "Resource category for filtering"
    },
    "is_public": {
      "type": "boolean",
      "default": false,
      "description": "Available without login"
    }
  },
  "required": [
    "title",
    "file_url"
  ]
}
