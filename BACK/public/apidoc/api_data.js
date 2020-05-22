define({ "api": [
  {
    "type": "post",
    "url": "/login",
    "title": "Permet de se connecter",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>de l'utilisateur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[{\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlzQWRtaW4iOjIsImlhdCI6MTU4ODkyMDkwOCwiZXhwIjoxNTg5MDA3MzA4fQ.OSFYn4AyK95ZEkGU_2dzQXRP6xFzzEokwJ3SdIKBmYk\",\n}]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Get Error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/routes/router.js",
    "groupTitle": "Users",
    "name": "PostLogin"
  }
] });
