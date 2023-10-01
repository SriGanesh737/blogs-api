# Blog API

This is a Node.js Express API that provides endpoints for fetching blog statistics and performing blog searches. It uses memoization to optimize certain operations.

## Installation

1. Clone this repository to your local machine.
2. Run `npm install` to install the required dependencies.

## Usage

### Fetch Blog Statistics

To fetch blog statistics, make a GET request to `/api/blog-stats`.

**Example Request:**

```http
GET /api/blog-stats
```



**Example Response:**

```json
{
  "totalNumberOfBlogs": 10,
  "longestTitle": "The Longest Blog Title Ever",
  "numberOfBlogsWithPrivacyInTitle": 3,
  "numberOfUniqueTitles": 8,
  "uniqueBlogTitles": ["Blog Title 1", "Blog Title 2", ...]
}
```

### Perform Blog Search

To perform a blog search, make a GET request to `/api/blog-search` with a `query` parameter.

**Example Request:**

```http
GET /api/blog-search?query=privacy
```

**Example Response:**

```json
{
  "results": [
    {
      "id": 1,
      "image_url": "https://picsum.photos/200/300",
      "title": "Blog Title 1",
    },
    {
      "id": 2,
      "image_url": "https://picsum.photos/200/300",
      "title": "Blog Title 2",
    },
    ...
  ]
}
```

If the query parameter is missing, a 400 Bad Request response will be returned.

## Memoization

This API uses memoization to optimize the following operations:

- Blog statistics calculation using the `memoizedFetchAndAnalyzeBlogStats` function
- Blog search using the `memoizedPerformBlogSearch` function

Memoization caches the results of these operations to improve performance.

## Running the Server

To run the server,run the following command:

```bash
node app.js
```

The server will be running on port 8000.
