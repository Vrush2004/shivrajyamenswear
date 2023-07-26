import { baseUrl } from "../../../../config";

export function checkAdmin(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${baseUrl}/auth`, {
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok) {
        resolve({ data });
      } else {
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}