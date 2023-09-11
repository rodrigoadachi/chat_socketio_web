export default async function fetchWrapper<T = unknown>(
  input: RequestInfo | URL,
  method?: string | undefined,
  body?: any
) {
  try {
    const BASIC_URL = process.env.NEXT_PUBLIC_API_URL;
    const init: RequestInit = {
      method: method || "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    init.body = JSON.stringify(body);
    const data = await fetch(`${BASIC_URL}/${input}`, init);
    const result = await data.json();
    return result as T;
  } catch (error) {
    console.log({ error });
    return { error };
  }
}
