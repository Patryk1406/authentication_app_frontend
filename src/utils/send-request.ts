export async function sendRequest(
  url: string,
  method: string,
  headers: { [key: string]: unknown },
  body?: Object,
) {
  if (headers) {
    if (method === 'GET') {
      return fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });
    }
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    });
  }
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
