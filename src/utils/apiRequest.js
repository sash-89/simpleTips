import axios from 'axios';

export const request = (method, url, data={}, params={}) => {
 return axios({
    method,
    url,
    data,
   ...params,
  });
}