// Import the functions you need from the SDKs you need
import type Activity from "@/types/activity";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, setDoc } from "firebase/firestore"; 


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  //
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default {
  async list() {
    const activitiesCol = collection(db, 'activities');
    const activitySnapshot = await getDocs(activitiesCol);
    const activityList = activitySnapshot.docs.map(doc => doc.data());
    console.log(activityList)
    return activityList;
  },
  async add(activity: Activity) {
    await setDoc(doc(db, "activities"), {
      ...activity
    });
  }
}