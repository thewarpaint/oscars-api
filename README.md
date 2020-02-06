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
  "category": "best_picture",
  "type": "movie",
  "name": "Parasite",
  "movie": {
    "title": "Parasite",
    "director": "Bong Joon Ho",
    "release_date": "2019-11-08",
    "imdb_url": "https://www.imdb.com/title/tt6751668/",
  }
}
```

Make sure to check that the service key in the `Authorization` header matches the one we sent you!

### Payload types

#### Movie

```json
{
  "category": "best_picture",
  "type": "movie",
  "name": "Parasite",
  "movie": {
    "title": "Parasite",
    "director": "Bong Joon Ho",
    "release_date": "2019-11-08",
    "imdb_url": "https://www.imdb.com/title/tt6751668/",
  }
}
```

#### People

```json
{
  "category": "actor_in_leading_role",
  "type": "people",
  "name": "Joaquin Phoenix",
  "people": [
    {
      "name": "Joaquin Phoenix",
      "imdb_url": "https://www.imdb.com/name/nm0001618/"
    }
  ],
  "movie": {
    "title": "Joker",
    "director": "Todd Phillips",
    "release_date": "2019-10-04",
    "imdb_url": "https://www.imdb.com/title/tt7286456/"
  }
}
```

#### Song

```json
{
  "category": "original_song",
  "type": "song",
  "name": "(I'm Gonna) Love Me Again",
  "song": {
    "title": "(I'm Gonna) Love Me Again",
    "imdb_url": "https://www.imdb.com/title/tt10947904/",
  },
  "movie": {
    "name": "Rocketman",
    "director": "Dexter Fletcher",
    "release_date": "2019-05-31",
    "imdb_url": "https://www.imdb.com/title/tt2066051/"
  }
}
```
