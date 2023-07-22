import type ActivityService from "@/service/activityService";
import Activity from "@/types/activity";

class None implements ActivityService {
  async list(): Promise<Activity[]> {
    return Promise.resolve([]);
  }
  get(id: string): Promise<Activity> {
    throw new Error("Method not implemented.");
  }
  add(activity: Activity): void {
    activity.id = new Date().toISOString();
  }
  update(activity: Activity): void {
    // 
  }
  delete(id: string): void {
    // 
  }
}

const none: ActivityService = new None();

export default none;