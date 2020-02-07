const platformVersion = require('zapier-platform-core').version;

const oscarsWinnerTrigger = require('./triggers/oscars-winner');
const version = require('./package.json').version;

const App = {
  version,
  platformVersion,
  beforeRequest: [],
  afterResponse: [],
  resources: {},
  triggers: {
    [oscarsWinnerTrigger.key]: oscarsWinnerTrigger
  },
  searches: {},
  creates: {}
};

module.exports = App;
