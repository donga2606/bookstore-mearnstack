import baseDataProvider from "./baseDataProvider";
import { apiUrl, httpClient } from "./baseDataProvider";

function logFormData(formData) {
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }
}

const Utility = {
  convertModelToFormData(val, formData = new FormData(), namespace = "") {
    if (typeof val !== "undefined" && val !== null) {
      if (val instanceof Date) {
        formData.append(namespace, val.toISOString());
      } else if (val instanceof Array) {
        for (let i = 0; i < val.length; i++) {
          this.convertModelToFormData(
            val[i],
            formData,
            namespace + "[" + i + "]"
          );
        }
      } else if (typeof val === "object" && !(val instanceof File)) {
        for (let propertyName in val) {
          if (val.hasOwnProperty(propertyName)) {
            this.convertModelToFormData(
              val[propertyName],
              formData,
              namespace ? `${namespace}[${propertyName}]` : propertyName
            );
          }
        }
      } else if (val instanceof File) {
        formData.append(namespace, val);
      } else {
        formData.append(namespace, val.toString());
      }
    }
    return formData;
  },
};

const dataProvider = {
  ...baseDataProvider,
  update: (resource, params) => {
    if (!["book", "list"].includes(resource)) {
      return baseDataProvider.update(resource, params);
    }
    if (!params.data.image) {
      return baseDataProvider.update(resource, params);
    } else if (typeof params.data.image === "string") {
      delete params.data.image;
      return baseDataProvider.update(resource, params);
    }

    const data = { ...params.data, image: params.data.image.rawFile };
    const formData = Utility.convertModelToFormData(data);

    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: formData,
    })
      .then(({ json }) => ({ data: json.data }))
      .catch((e) => {
        console.log(e);
        return Promise.reject(e);
      });
  },

  create: (resource, params) => {
    if (!["book", "list"].includes(resource)) {
      return baseDataProvider.create(resource, params);
    }

    if (!params.data.image) {
      return baseDataProvider.create(resource, params);
    }
    const data = { ...params.data, image: params.data.image.rawFile };
    const formData = Utility.convertModelToFormData(data);


    return httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: formData,
    })
      .then(({ json }) => ({ data: json.data }))
      .catch((e) => {
        console.log(e);
        return Promise.reject(e);
      });
  },
};

export default dataProvider;
