// localStorage.getItem()
// localStorage.setItem()
// localStorage.removeItem
// localStorage.setItem("names", JSON.stringify(names));
// var storedNames = JSON.parse(localStorage.getItem("names"));

import type ActivityService from "@/service/activityService";
import Activity from "@/types/activity";

class LocalStorage implements ActivityService {
  public list(): Array<Activity> {
    const idList = this.getIdList();
    const activities: Array<Activity> = new Array<Activity>();

    idList.forEach((id: string) => {
      const json = this.get(id);
      activities.push(json);
    });

    return activities;
  }
  public get(id: string): Activity {
    const json = JSON.parse(localStorage.getItem(id) ?? '{}')
    
    return Object.keys.length ? json : undefined;
  }
  public add(activity: Activity) {
    activity.id = new Date().toISOString();

    const idList = this.getIdList();
    idList.push(activity.id);
    this.saveIdList(idList)

    localStorage.setItem(activity.id, JSON.stringify(activity));
  }
  public update(activity: Activity) {
    localStorage.setItem(activity.id!, JSON.stringify(activity));
  }
  public delete(id: string) {
    const idList = this.getIdList();
    idList.splice(idList.indexOf(id), 1)
    this.saveIdList(idList)

    localStorage.removeItem(id);
  }

  private getIdList(): Array<string> {
    return JSON.parse(localStorage.getItem("activityList") ?? '[]') ?? [];
  }
  private saveIdList(idList: Array<string>) {
    return localStorage.setItem('activityList', JSON.stringify(idList))
  }
}

const db: ActivityService = new LocalStorage();

export default db;