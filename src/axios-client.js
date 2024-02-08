import axios from 'axios';
import { CookieJar } from 'tough-cookie';
import { wrapper } from 'axios-cookiejar-support';

const jar = new CookieJar();

const client = wrapper(axios.create({ jar }));
client.defaults.baseURL = 'http://localhost:3000';
client.defaults.withCredentials = true;

export default client;