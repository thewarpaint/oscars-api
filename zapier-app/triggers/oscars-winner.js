const subscribeHook = (z, bundle) => {
  // bundle.targetUrl has the Hook URL this app should call when a recipe is created
  const data = {
    url: bundle.targetUrl
  };

  const options = {
    url: 'https://oscars-webhook-api.ngrok.io/api/v1/hooks',
    method: 'POST',
    body: data
  };

  return z.request(options).then(response => JSON.parse(response.content));
};

const unsubscribeHook = (z, bundle) => {
  const hookId = bundle.subscribeData.id;

  const options = {
    url: `https://oscars-webhook-api.ngrok.io/api/v1/hooks/${hookId}`,
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

const getOscarsWinnerSamples = (z, bundle) => {
  const options = {
    url: 'https://oscars-webhook-api.ngrok.io/api/v1/nominees'
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
    performList: getOscarsWinnerSamples,
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
