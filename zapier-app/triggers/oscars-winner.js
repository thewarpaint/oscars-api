const subscribeHook = (z, bundle) => {
  // bundle.targetUrl has the Hook URL this app should call when a recipe is created
  const data = {
    url: bundle.targetUrl
  };

  // TODO: Generate ngrok tunnel, change URL
  const options = {
    url: 'https://57b20fb546b57d1100a3c405.mockapi.io/api/hooks',
    method: 'POST',
    body: data
  };

  return z.request(options).then(response => JSON.parse(response.content));
};

const unsubscribeHook = (z, bundle) => {
  const hookId = bundle.subscribeData.id;

  // TODO: Generate ngrok tunnel, change URL
  const options = {
    url: `https://57b20fb546b57d1100a3c405.mockapi.io/api/hooks/${hookId}`,
    method: 'DELETE'
  };

  return z.request(options).then(response => JSON.parse(response.content));
};

const getOscarsWinner = (z, bundle) => {
  // TODO: Map more properties
  const winner = {
    category: bundle.cleanedRequest.category,
    type: bundle.cleanedRequest.type,
    name: bundle.cleanedRequest.name
  };

  return [winner];
};

const getOscarsWinnerTest = (z, bundle) => {
  // TODO: Generate ngrok tunnel, change URL
  const options = {
    url: 'https://57b20fb546b57d1100a3c405.mockapi.io/api/recipes/'
  };

  return z.request(options).then(response => JSON.parse(response.content));
};

module.exports = {
  key: 'oscars_winner',
  noun: 'Oscars winner',
  display: {
    label: 'New Oscars winner',
    description: 'Triggers when a new Oscars winner is announced.'
  },

  operation: {
    inputFields: [],
    type: 'hook',
    performSubscribe: subscribeHook,
    performUnsubscribe: unsubscribeHook,
    perform: getOscarsWinner,
    performList: getOscarsWinnerTest,
    sample: {
      category: 'best_picture',
      type: 'movie',
      name: 'Parasite'
    },
    outputFields: [
      {
        key: 'category',
        label: 'Category'
      },
      {
        key: 'type',
        label: 'Type'
      },
      {
        key: 'name',
        label: 'Name'
      }
    ]
  }
};
