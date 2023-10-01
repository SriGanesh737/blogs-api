const axios = require('axios');
// Define a middleware to fetch blog data
const fetchBlogDataMiddleware = async (req, res, next) => {
  try {
    const apiUrl = 'https://intent-kit-16.hasura.app/api/rest/blogs';
    const adminSecret = '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6';

    // Make the cURL request using Axios
    const response = await axios.get(apiUrl, {
      headers: {
        'x-hasura-admin-secret': adminSecret,
      },
    });

    // Store the blog data in a property of the request object
    req.blogData = response.data;

    next(); // Continue to the next middleware or route
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching blog data.' });
  }
};

module.exports = fetchBlogDataMiddleware;