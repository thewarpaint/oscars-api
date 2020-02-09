const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');

const dummyNominees = require('./dummy-nominees');

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.get('/', async (ctx) => {
  ctx.body = '<h1>Oscars Webhook API!</h1>';
});

router.get('/api/v1/nominees', async (ctx) => {
  console.log('Get (dummy) nominees', ctx.request.body);

  ctx.body = dummyNominees;
});

router.post('/api/v1/hooks', async (ctx) => {
  console.log('Create hook', ctx.request.body);

  ctx.body = {
    id: 'zapier',
    status: 'success'
  };
});

router.delete('/api/v1/hooks/zapier', async (ctx) => {
  console.log('Delete hook', ctx.request.body);

  ctx.body = {};
});

app.use(router.routes());
app.listen(3000);
