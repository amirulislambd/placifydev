const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (url) => {
  const res = await fetch(`${baseUrl}/api/${url}`);
  return res.json();
};

export const serverMutation = async (url, data, method = "POST") => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  // handle 401, 403, 500, etc
  return res.json();
};