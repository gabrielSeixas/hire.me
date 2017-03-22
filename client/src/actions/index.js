import 'whatwg-fetch';
import {
  FETCH_URLS,
  SHORTEN_URL
} from './types';
import encodeQuery from '../utils/buildQuery';

const BASE_URL = 'http://localhost:8888';

export function fetchUrls() {
  const request = fetch(`${BASE_URL}/urls-list`);
  return {
    type: FETCH_URLS,
    payload: request
  };
}

export function shortenUrl(url) {
  const queryString = encodeQuery({ url });
  const request = fetch(`${BASE_URL}/create?${queryString}`, { method: 'PUT' });
  return {
    type: SHORTEN_URL,
    payload: request
  };
}