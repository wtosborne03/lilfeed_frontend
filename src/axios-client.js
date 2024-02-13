import axios from 'axios';
import { CookieJar } from 'tough-cookie';
import { wrapper } from 'axios-cookiejar-support';
import { createBrowserHistory } from 'history';

const jar = new CookieJar();
const client = wrapper(axios.create({ jar }));
client.defaults.baseURL = 'https://api.lil-feed.com';
client.defaults.withCredentials = true;

export const hist = createBrowserHistory();
export default client;