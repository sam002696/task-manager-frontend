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

  try {
    const response = await fetch(url, { headers, ...options });
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Network Error");
  }
};

export default fetcher;
