import request from './index';

export function fetch({url = '', params = {}, headers = {}}) {
  return new Promise((resolve, reject) => {
    request.http({
      method: 'GET',
      url,
      params: params,
      headers: {
        ...headers,
      },
    }).then((response) => {
      if (response.status === 200 && response.data) {
        return resolve(response.data);
      }
      reject(response.data);
    }).catch((error) => {
      reject(error);
    });
  });
}

export function post({url = '', params = {}, headers = {}}) {
  return new Promise((resolve, reject) => {
    request.http({
      method: 'POST',
      url,
      data: params,
      headers: {
        ...headers,
      },
    }).then((response) => {
      if (response.status === 200 && response.data) {
        return resolve(response.data);
      }
      reject(response.data);
    }).catch((error) => {
      reject(error);
    });
  });
}
