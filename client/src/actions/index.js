import 'whatwg-fetch';
import encodeQuery from '../utils/buildQuery';
import {
  FETCH_URLS,
  SHORTEN_URL,
  CLOSE_MODAL
} from './types';

const BASE_URL = 'http://localhost:8888';

export function fetchUrls() {
  const request = fetch(`${BASE_URL}/urls-list`);
  return {
    type: FETCH_URLS,
    payload: request
  };
}

export function shortenUrl(url, customAlias='') {
  const queryString = customAlias ? 
    encodeQuery({ url, CUSTOM_ALIAS: customAlias }) :
    encodeQuery({ url });

  const request = fetch(`${BASE_URL}/create?${queryString}`, { method: 'PUT' });
  return {
    type: SHORTEN_URL,
    payload: request
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  }
}