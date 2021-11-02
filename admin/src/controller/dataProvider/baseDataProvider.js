import { fetchUtils } from "react-admin";
import { stringify } from "query-string";
// const apiUrl = "http://localhost:9889/api";
const apiUrl = "https://server-da-book.herokuapp.com/api";

const httpClient = function (url, options = {}) {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = JSON.parse(localStorage.getItem("auth")).token;

  if (token) {
    options.headers.set("x-access-token", token);
  }

  return fetchUtils.fetchJson(url, options);
};

export { apiUrl, httpClient };

const getQueryFromParams = (params) => {
  const { page, perPage } = params.pagination;
  const { field, order } = params.sort;
  const query = {
    sort: JSON.stringify([field, order]),
    range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
    filter: JSON.stringify(params.filter),
  };
  return query;
};
const getTotalRecords = (headers) =>
  parseInt(headers.get("content-range").split("/").pop(), 10);

const baseDataProvider = {
  getList: (resource, params) => {
    const query = getQueryFromParams(params);
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url)
      .then(({ headers, json }) => {
        return {
          data: json.data,
          total: getTotalRecords(headers),
        };
      })
      .catch((e) => {
        console.log(e);
        return Promise.reject(e);
      });
  },
  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`)
      .then(({ json }) => ({
        data: json.data,
      }))
      .catch((e) => {
        console.log(e);
        return Promise.reject(e);
      }),
  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url)
      .then(({ json }) => ({ data: json.data }))
      .catch((e) => {
        console.log(e);
        return Promise.reject(e);
      });
  },
  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url)
      .then(({ headers, json }) => ({
        data: json.data,
        total: parseInt(headers.get("content-range").split("/").pop(), 10),
      }))
      .catch((e) => {
        console.log(e);
        return Promise.reject(e);
      });
  },

  update: (resource, params) => {
    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    })
      .then(({ json }) => ({ data: json.data }))
      .catch((e) => {
        console.log(e);
        return Promise.reject(e);
      });
  },

  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json.data }));
  },

  create: (resource, params) => {
    return httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    })
      .then(({ json }) => ({
        data: json.data,
      }))
      .catch((e) => {
        console.log(e);
        return Promise.reject(e);
      });
  },

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => ({ data: json })),

  deleteMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "DELETE",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },
};
export default baseDataProvider;
