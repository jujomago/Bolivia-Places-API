export const getOpenApiDocumentation = () => {
    return {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "Bolivia Places API",
            description: "API for discovering beautiful places in Bolivia",
        },
        servers: [{ url: "/" }],
        paths: {
            // PLACES
            "/api/v1/places": {
                get: {
                    tags: ["Places"],
                    summary: "Get all places",
                    responses: {
                        200: {
                            description: "A list of places",
                            content: {
                                "application/json": {
                                    schema: { type: "array", items: { $ref: "#/components/schemas/Place" } },
                                },
                            },
                        },
                    },
                },
                post: {
                    tags: ["Places"],
                    summary: "Create a place",
                    security: [{ bearerAuth: [] }],
                    responses: { 201: { description: "Created" } },
                },
            },
            "/api/v1/places/ids": {
                get: {
                    tags: ["Places"],
                    summary: "Get last IDs",
                    responses: { 200: { description: "List of recent IDs" } },
                },
            },
            "/api/v1/places/{id}": {
                get: {
                    tags: ["Places"],
                    summary: "Get a specific place",
                    parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
                    responses: {
                        200: {
                            description: "Place details",
                            content: { "application/json": { schema: { $ref: "#/components/schemas/Place" } } },
                        },
                        404: { description: "Place not found" },
                    },
                },
                put: {
                    tags: ["Places"],
                    summary: "Update a place",
                    security: [{ bearerAuth: [] }],
                    parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
                    responses: { 200: { description: "Updated" } },
                },
                delete: {
                    tags: ["Places"],
                    summary: "Delete a place",
                    security: [{ bearerAuth: [] }],
                    parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
                    responses: { 204: { description: "Deleted" } },
                },
            },
            "/api/v1/places/tag/{id}": {
                get: {
                    tags: ["Places"],
                    summary: "Filter places by tag",
                    parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
                    responses: { 200: { description: "Filtered list" } },
                },
            },
            "/api/v1/places/category/{id}": {
                get: {
                    tags: ["Places"],
                    summary: "Filter places by category",
                    parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
                    responses: { 200: { description: "Filtered list" } },
                },
            },
            "/api/v1/places/city/{id}": {
                get: {
                    tags: ["Places"],
                    summary: "Filter places by city",
                    parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
                    responses: { 200: { description: "Filtered list" } },
                },
            },
            "/api/v1/places/search/{search}": {
                get: {
                    tags: ["Places"],
                    summary: "Search places",
                    parameters: [{ name: "search", in: "path", required: true, schema: { type: "string" } }],
                    responses: { 200: { description: "Search results" } },
                },
            },
            "/api/v1/places/nearest/{lat}&{lon}&{radio}": {
                get: {
                    tags: ["Places"],
                    summary: "Get nearest places",
                    parameters: [
                        { name: "lat", in: "path", required: true, schema: { type: "number" } },
                        { name: "lon", in: "path", required: true, schema: { type: "number" } },
                        { name: "radio", in: "path", required: true, schema: { type: "number" } },
                    ],
                    responses: { 200: { description: "Nearest results" } },
                },
            },
            "/api/v1/places/{id}/images": {
                get: {
                    tags: ["Places"],
                    summary: "Get images for a place",
                    parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
                    responses: { 200: { description: "List of media" } },
                },
            },
            "/api/v1/places/{id}/add-images": {
                post: {
                    tags: ["Places"],
                    summary: "Add images to a place",
                    security: [{ bearerAuth: [] }],
                    parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
                    responses: { 200: { description: "Images added" } },
                },
            },

            // CATEGORIES
            "/api/v1/categories": {
                get: {
                    tags: ["Categories"],
                    summary: "Get all categories",
                    responses: { 200: { description: "List of categories" } },
                },
                post: {
                    tags: ["Categories"],
                    summary: "Create a category",
                    security: [{ bearerAuth: [] }],
                    responses: { 201: { description: "Created" } },
                },
            },
            "/api/v1/categories/{id}": {
                get: {
                    tags: ["Categories"],
                    summary: "Get a category",
                    parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
                    responses: { 200: { description: "Category details" } },
                },
                put: {
                    tags: ["Categories"],
                    summary: "Update a category",
                    security: [{ bearerAuth: [] }],
                    parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
                    responses: { 200: { description: "Updated" } },
                },
                delete: {
                    tags: ["Categories"],
                    summary: "Delete a category",
                    security: [{ bearerAuth: [] }],
                    parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
                    responses: { 204: { description: "Deleted" } },
                },
            },

            // CITIES
            "/api/v1/cities": {
                get: {
                    tags: ["Cities"],
                    summary: "Get all cities",
                    responses: { 200: { description: "List of cities" } },
                },
            },
            "/api/v1/cities/{id}": {
                get: {
                    tags: ["Cities"],
                    summary: "Get a city",
                    parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
                    responses: { 200: { description: "City details" } },
                },
            },

            // TAGS
            "/api/v1/tags": {
                get: {
                    tags: ["Tags"],
                    summary: "Get all tags",
                    responses: { 200: { description: "List of tags" } },
                },
            },
            "/api/v1/tags/{id}": {
                get: {
                    tags: ["Tags"],
                    summary: "Get a tag",
                    parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
                    responses: { 200: { description: "Tag details" } },
                },
            },

            // USERS
            "/api/v1/users/login": {
                post: {
                    tags: ["Users"],
                    summary: "User Login",
                    requestBody: {
                        content: { "application/json": { schema: { $ref: "#/components/schemas/LoginRequest" } } },
                    },
                    responses: { 200: { description: "Login successful" } },
                },
            },
            "/api/v1/users/register": {
                post: {
                    tags: ["Users"],
                    summary: "User Register",
                    responses: { 201: { description: "Registered" } },
                },
            },
            "/api/v1/users/logout": {
                post: {
                    tags: ["Users"],
                    summary: "User Logout",
                    security: [{ bearerAuth: [] }],
                    responses: { 200: { description: "Logged out" } },
                },
            },
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                Place: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        name: { type: "string" },
                        description: { type: "string" },
                        location: { type: "string" },
                        default_photo: { type: "string", format: "url" },
                        latitude: { type: "number" },
                        longitude: { type: "number" },
                    },
                },
                LoginRequest: {
                    type: "object",
                    required: ["username", "password"],
                    properties: {
                        username: { type: "string" },
                        password: { type: "string" },
                    },
                },
            },
        },
    };
};
