/* globals describe, it */

require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('triggers', () => {
  describe('new Oscars winner trigger', () => {
    it('should load Oscars winner from fake hook', done => {
      const bundle = {
        inputData: {},
        cleanedRequest: {
          category: 'best_picture',
          type: 'movie',
          name: 'Parasite'
        }
      };

      appTester(App.triggers.oscars_winner.operation.perform, bundle)
        .then(results => {
          results.length.should.eql(1);

          const firstOscarsWinner = results[0];
          firstOscarsWinner.category.should.eql('best_picture');
          firstOscarsWinner.type.should.eql('movie');

          done();
        })
        .catch(done);
    });

    it('should load recipe from list', done => {
      const bundle = {
        inputData: {
          style: 'mediterranean'
        },
        meta: {
          frontend: true
        }
      };

      appTester(App.triggers.oscars_winner.operation.performList, bundle)
        .then(results => {
          results.length.should.be.greaterThan(1);

          const firstRecipe = results[0];
          firstRecipe.name.should.eql('name 1');
          firstRecipe.directions.should.eql('directions 1');

          done();
        })
        .catch(done);
    });
  });
});
