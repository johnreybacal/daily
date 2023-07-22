// localStorage.getItem()
// localStorage.setItem()
// localStorage.removeItem
// localStorage.setItem("names", JSON.stringify(names));
// var storedNames = JSON.parse(localStorage.getItem("names"));

import type ActivityService from "@/service/activityService";
import Activity from "@/types/activity";

class LocalStorage implements ActivityService {
  public list(): Promise<Activity[]> {
    const idList = this.getIdList();
    const activities: Activity[] = new Array<Activity>();

    idList.forEach((id: string) => {
      this.get(id).then((json) => {
        activities.push(json);
      });
    });

    return Promise.resolve(activities);
  }
  public get(id: string): Promise<Activity> {
    const json = JSON.parse(localStorage.getItem(id) ?? '{}')
    
    return Promise.resolve(Object.keys.length ? json : undefined);
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

const localStorageDB: ActivityService = new LocalStorage();

export default localStorageDB;