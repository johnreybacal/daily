import type ActivityService from "@/service/activityService";
import Activity from "@/types/activity";
import db from "@/firebase/db";

class Firebase implements ActivityService {
  async list(): Promise<Activity[]> {
    return Promise.resolve(db.list());
  }
  get(id: string): Promise<Activity> {
    throw new Error("Method not implemented.");
  }
  add(activity: Activity): void {
    db.add(activity);
  }
  update(activity: Activity): void {
    db.update(activity);
  }
  delete(id: string): void {
    db.delete(id);
  }
}

const firebaseDB: ActivityService = new Firebase();

export default firebaseDB;