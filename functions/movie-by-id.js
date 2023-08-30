const movies = require('../data/movies.json');

exports.handler = async ({ queryStringParameters }) => {
  const { id } = queryStringParameters;
  const movie = movies.find((movie) => movie.id === id);

  if (!movie) {
    return {
      statusCode: 400,
      body: 'Not Found',
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(movie),
  };
};
