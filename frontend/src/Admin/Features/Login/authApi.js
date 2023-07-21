import { baseUrl } from "../../../../config";

export function checkAdmin(loginInfo) {
    return new Promise(async (resolve, reject) => {
      const email = loginInfo.email;
      const password = loginInfo.password;
      const response = await fetch(`${baseUrl}/users?email=` + email);
      const data = await response.json();
      if (data.length) {
        if (password === data[0].password) {
          resolve({ data: data[0] });
        } else {
          reject({ message: 'wrong credentials' });
        }
      } else {
        reject({ message: 'user not found' });
      }
      // TODO: on server it will only return some info of user (not password)
    });
  }