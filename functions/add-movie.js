const { query } = require('./util/hasura');

exports.handler = async (event, context) => {
  try {
    const { user } = context.clientContext;
    const isLoggedIn = user && user.app_metadata;
    // ntl role is an billable feature
    // const roles = user.app_metadata.roles || [];
    const { id, title, tagline } = JSON.parse(event.body);

    if (!isLoggedIn) {
      throw new Error('You must login');
    }
    // if (!roles.includes('admin')) {
    //   throw new Error('You do not have admin credentials');
    // }

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
      body: JSON.stringify({ message: error.message }),
    };
  }
};
