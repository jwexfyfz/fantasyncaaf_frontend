// Replace ./data.json with your JSON feed
fetch('https://openapi.etsy.com/v3/application/shops/6931850/listings/active', {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'sbz7vzg447solgzni8bfom7s'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    // Work with JSON data here
    console.log(data)
  })
  .catch((err) => {
    // Do something for an error here
  })