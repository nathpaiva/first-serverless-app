exports.handler = async (event) => {
  const { name } = event.queryStringParameters;

  return {
    statusCode: 200,
    body: `You add ${name}`,
  };
};
