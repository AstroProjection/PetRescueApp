const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'x-auth-token': token } : {};
};

const handleResponse = async (res) => {
  if (!res.ok) {
    const data = await res.json().catch(() => ({ msg: res.statusText }));
    const error = new Error(res.statusText);
    error.response = { status: res.status, data };
    throw error;
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
};

const api = {
  get: (url, { signal } = {}) =>
    fetch(url, {
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      signal,
    }).then(handleResponse),

  post: (url, body) => {
    const isFormData = body instanceof FormData;
    return fetch(url, {
      method: 'POST',
      headers: isFormData
        ? getAuthHeader()
        : { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: isFormData ? body : JSON.stringify(body),
    }).then(handleResponse);
  },

  put: (url, body) => {
    const isFormData = body instanceof FormData;
    return fetch(url, {
      method: 'PUT',
      headers: isFormData
        ? getAuthHeader()
        : { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: isFormData ? body : JSON.stringify(body),
    }).then(handleResponse);
  },

  delete: (url) =>
    fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    }).then(handleResponse),
};

export default api;
