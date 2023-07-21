// Import the functions you need from the SDKs you need
import type Activity from "@/types/activity";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, addDoc, setDoc, deleteDoc } from "firebase/firestore"; 


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default {
  async list() {
    const activitiesCol = collection(db, 'activities');
    const activitySnapshot = await getDocs(activitiesCol);

    const activityList = activitySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id
      }
    });

    return activityList;
  },
  async add(activity: Activity) {
    delete activity.id;

    const docRef = await addDoc(collection(db, 'activities'), {
      ...activity,
      qualities: {
        ...activity.qualities
      }
    });

    activity.id = docRef.id;
  },
  async update(activity: Activity) {
    const id = activity.id!;
    delete activity.id;

    await setDoc(doc(db, 'activities', id), {
      ...activity,
      qualities: {
        ...activity.qualities
      }
    });

    activity.id = id;
  },
  async delete(id: string) {
    await deleteDoc(doc(db, 'activities', id));
  }
}