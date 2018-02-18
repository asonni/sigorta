let ROOT_URL;
const API_URL = 'api/v1';
const PREFIX_TOKEN = 'JWT';
if (process.env.REACT_APP_ENV === 'development') {
  ROOT_URL = 'http://localhost:3001';
  console.log('Dev mode is running');
} else {
  ROOT_URL = 'https://sigorta.herokuapp.com';
  console.log('Prod mode is running');
}

export { ROOT_URL, API_URL, PREFIX_TOKEN };
