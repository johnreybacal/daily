import type Activity from "@/types/activity";

export default interface ActivityService {
  list(): Array<Activity>;
  get(id: string): Activity;
  add(activity: Activity): void;
  update(activity: Activity): void;
  delete(id: string): void;
}