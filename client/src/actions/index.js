import 'whatwg-fetch';
import {
  FETCH_URLS
} from './types';

export function fetchUrls() {
  const request = fetch('http://localhost:8888/urls-list');

  return {
    type: FETCH_URLS,
    payload: request
  };
}