export const getApiBaseUrl = () => {
  return 'https://miniature-capybara-4jqr667jj75wcqxpq-8000.app.github.dev';
};

export const getApiEndpoint = (componentName) => `${getApiBaseUrl()}/api/${componentName}/`;

export const normalizeApiResults = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  return [];
};