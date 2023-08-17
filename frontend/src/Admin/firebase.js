import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "../../config";

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const analytics = getAnalytics(app);

export { storage, app,analytics };