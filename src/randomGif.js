(async function grab_data() {
  const apikey = 'ZICNI8HK90QW';
  const lmt = 1;
  const search_term = 'nyan-cat';
  const search_url = 'https://api.tenor.com/v1/random?q=' + search_term + '&key=' +
    apikey + '&limit=' + lmt;
  const data = await fetch(search_url);
  const parsed = await data.json();
  console.log(parsed);
})();
