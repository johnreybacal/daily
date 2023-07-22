import type Activity from "@/types/activity";

export default interface ActivityService {
  list(): Promise<Array<Activity>>;
  get(id: string): Promise<Activity>;
  add(activity: Activity): void;
  update(activity: Activity): void;
  delete(id: string): void;
}