export async function sendRequest(url: string, method: string, body: Object) {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify(body),
  });
}
