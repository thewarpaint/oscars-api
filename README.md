# Oscars API

The Oscars 2020 API webhook, get a call every time a new winner is announced!

## API

Whenever a new winner is announced we will send the following POST request to the endpoint you specified:

```
POST https://api.example.com/your-webhook-endpoint/

Authorization: <YOUR_SERVICE_KEY>
```

```json
{
  "category": "BEST_PICTURE",
  "winner": "Parasite",
  "director": "Bong Joon Ho",
  "release_date": "2019-11-08",
  "imdb_url": "https://www.imdb.com/title/tt6751668/"
}
```

Make sure to check that the service key in the `Authorization` header matches the one we sent you!
