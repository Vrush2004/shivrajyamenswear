import { baseUrl } from "../../../../config";

export function createProduct(product) {
    return new Promise(async (resolve) => {
      const response = await fetch(`${baseUrl}/products/`, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      resolve({ data });
    });
  }
  
  export function updateProduct(update) {
    return new Promise(async (resolve) => {
      const response = await fetch(
        `${baseUrl}/products/` + update.id,
        {
          method: 'PATCH',
          body: JSON.stringify(update),
          headers: { 'content-type': 'application/json' },
        }
      );
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  }