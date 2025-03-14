import Cookies from "js-cookie";

const fetcher = async (url, options = {}) => {
  const method = options.method || "GET";

  if (method === "get" || method === "GET") {
    Object.keys(options).forEach((key) =>
      url.searchParams.append(key, options[key])
    );
  }

  let headers = {
    Authorization: "Bearer " + Cookies.get("access_token"),
    "Content-Type": "application/json",
  };

  if (options.hasFile) {
    headers = { Authorization: "Bearer " + Cookies.get("access_token") };
  }

  const response = await fetch(url, { headers, ...options });

  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || "API Request Failed");
    error.response = data;
    throw error;
  }

  return data;
};

export default fetcher;
