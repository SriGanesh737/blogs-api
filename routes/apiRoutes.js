const _ = require('lodash');
const fetchBlogDataMiddleware = require('../middleware/fetchBlog');

const router = require('express').Router();


// Create a function to perform blog search
const performBlogSearch = (blogs, query) => {
  // Perform a case-insensitive search on the blog titles
  console.log('Performing a blog search for query: ', query);
  const results = _.filter(blogs, (blog) => {
    return blog.title.toLowerCase().includes(query.toLowerCase());
  });

  return results;
};

blogSearchCacheResolver = (blogs, query) => `blogSearch:${query}`;

// Memoize the performBlogSearch function with a cache
const memoizedPerformBlogSearch = _.memoize(performBlogSearch,blogSearchCacheResolver);  

// Create a function to fetch and analyze blog statistics
const fetchAndAnalyzeBlogStats = (blogs) => {
  console.log('Fetching and analyzing blog statistics')
  // Calculate the total number of blogs fetched
  const totalNumberOfBlogs = _.size(blogs);

  // Title of the longest blog
  const longestTitleBlog = _.maxBy(blogs, (blog) => blog.title.length);
  const longestTitle = longestTitleBlog.title;

  // Number of blogs with "privacy" in the title.
  const blogsWithPrivacyInTitle = _.filter(blogs, (blog) => {
    return blog.title.toLowerCase().includes('privacy');
  });
  const numberOfBlogsWithPrivacyInTitle = blogsWithPrivacyInTitle.length;

  // An array of unique blog titles.
  const uniqueBlogTitles = _.uniqBy(blogs, 'title').map((blog) => blog.title);

  return {
    totalNumberOfBlogs,
    longestTitle,
    numberOfBlogsWithPrivacyInTitle,
    numberOfUniqueTitles: uniqueBlogTitles.length,
    uniqueBlogTitles,
  };
};

// Memoize the fetchAndAnalyzeBlogStats function with a cache
const memoizedFetchAndAnalyzeBlogStats = _.memoize(fetchAndAnalyzeBlogStats, () => 'blogStats');

router.get('/blog-stats', fetchBlogDataMiddleware, (req, res) => {
  const blogs = req.blogData.blogs;

  // Use the memoized function to fetch and return blog statistics
  const blogStats = memoizedFetchAndAnalyzeBlogStats(blogs);

  res.json(blogStats);
});

router.get('/blog-search', fetchBlogDataMiddleware, (req, res) => {
  const blogs = req.blogData.blogs;
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ error: 'Please provide a query parameter' });
  }

  // Use the memoized function to perform a blog search
  const results = memoizedPerformBlogSearch(blogs, query);

  res.json(results);
});

module.exports = router;
