const BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

interface FetchOptions extends RequestInit {
  body?: any;
}

export default async function apiInstance(
  endpoint: string,
  options: FetchOptions = {}
) {
  const { body, ...restOptions } = options;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}
