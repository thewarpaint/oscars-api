const fs = require('fs');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const uuid = require('uuid/v4');

const dummyNominees = require('./dummy-nominees');

const app = new Koa();
const router = new Router();

const dbFile = 'db.json';
const dbFileOptions = {
  encoding: 'utf8'
};

app.use(bodyParser());

router.get('/', async (ctx) => {
  ctx.body = '<h1>Oscars Webhook API!</h1>';
});

router.get('/api/v1/nominees', async (ctx) => {
  console.log('Get (dummy) nominees', ctx.request.body);

  ctx.body = dummyNominees;
});

// https://open.spotify.com/track/13XHuE00ElL5thSxkaEXxK
router.post('/api/v1/hooks', async (ctx) => {
  const { url } = ctx.request.body;

  const newHook = {
    url
  };

  const newHookId = uuid();

  console.log(`Creating hook for url=${url} with hookId=${newHookId}`);

  const db = getDatabase();

  db[newHookId] = newHook;
  writeDatabase(db);

  console.log(`hookId=${newHookId} was created successfully`);

  ctx.body = {
    id: newHookId,
    status: 'success'
  };
});

router.delete('/api/v1/hooks/:hookId', async (ctx) => {
  const { hookId } = ctx.params;

  console.log(`Deleting hookId=${hookId}`);

  const db = getDatabase();

  if (db[hookId]) {
    delete db[hookId];
    writeDatabase(db);

    console.log(`hookId=${hookId} was deleted successfully`);
  } else {
    console.log(`hookId=${hookId} wasn't found in the database, returning 404`);

    ctx.status = 404;
  }

  ctx.body = {};
});

app.use(router.routes());
app.listen(3000);

function getDatabase() {
  const dbText = fs.readFileSync(dbFile, dbFileOptions);

  return JSON.parse(dbText);
}

function writeDatabase(data) {
  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2), dbFileOptions);
}
