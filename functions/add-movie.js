const { query } = require('./util/hasura');

exports.handler = async (event) => {
  try {
    const { id, title, tagline } = JSON.parse(event.body);

    if (!id || !title || !tagline) {
      throw new Error('Please you must provider all data');
    }

    const result = await query({
      query: `
        mutation InsertMoviesOne($id: String!, $tagline: String!, $title: String!) {
          insert_movies_one(object: {id: $id, tagline: $tagline, title: $title}) {
            id
            tagline
            title
          }
        }
      `,
      variables: { id, title, tagline },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: error.message,
    };
  }
};
