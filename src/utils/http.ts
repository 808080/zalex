export enum HTTPmethods {
  POST = 'POST',
  GET = 'GET',
};

const BASE_URL = 'https://zalexinc.azure-api.net';

const httpRequest = async <R, T = unknown>(method: HTTPmethods, path: string, body?: T): Promise<R | { responce: string }> => {
  const controller = new AbortController();
  const id = setTimeout(controller.abort, 5000);

  const response = await fetch(`${BASE_URL}${path}?subscription-key=${import.meta.env.VITE_SUB_KEY}`, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    signal: controller.signal,
    body: body ? JSON.stringify(body) : null
  }).catch((err) => {
    console.log(err);
  });
  clearTimeout(id);
  if (!response) return { responce: 'Server error' };
  const result = await response.json();
  return result;
};

export default httpRequest;