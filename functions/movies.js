const { URL } = require('url');
const fetch = require('node-fetch');

const { query } = require('./util/hasura');

exports.handler = async () => {
  try {
    const { movies } = await query({
      query: `
        query Movies {
          movies {
            id
            tagline
            title
          }
        }
      `,
    });
    const api = new URL(process.env.OMDB_API_URL);

    api.searchParams.set('apikey', process.env.OMDB_API_KEY);

    const promisesArray = movies.reduce((acc, movie) => {
      // to remove the wrong data
      if (!movie.id || movie.id === 'id') return acc;

      api.searchParams.set('i', movie.id);

      acc.push(
        fetch(api)
          .then((responseMovieScores) => responseMovieScores.json())
          .then(({ Poster, Ratings }) => {
            return {
              ...movie,
              poster: Poster,
              scores: Ratings,
            };
          })
      );
      return acc;
    }, []);

    return {
      statusCode: 200,
      body: JSON.stringify(await Promise.all(promisesArray)),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
};
