const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

export function createOrder(order) {
    return new Promise(async (resolve) => {
        const response = await fetch(`${baseUrl}/orders`, {
            method: 'POST',
            body: JSON.stringify(order),
            headers: { 'content-type': 'application/json' },
        });
        const data = await response.json();
        // TODO: on server it will only return some info of user (not password)
        resolve({ data });
    });
}

export function updateOrder(order) {
    return new Promise(async (resolve) => {
      const response = await fetch(`${baseUrl}/orders?id=${order.id}`, {
        method: 'PATCH',
        body: JSON.stringify(order),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      resolve({ data });
    });
  }