// localStorage.getItem()
// localStorage.setItem()
// localStorage.removeItem
// localStorage.setItem("names", JSON.stringify(names));
// var storedNames = JSON.parse(localStorage.getItem("names"));

import type ActivityService from "@/service/activityService";
import Activity from "@/types/activity";
import { Model, type Schema } from "localstorage-orm";

interface ActivitySchema extends Schema, Omit<Activity, "id"> {}

const model = new Model<ActivitySchema>("activity");

class LocalStorage implements ActivityService {
  public list(): Promise<Activity[]> {
    return new Promise(function (resolve, reject) {
      try {
        resolve(model.list());
      } catch (e) {
        reject(e);
      }
    });
  }
  public get(id: string): Promise<Activity> {
    return new Promise(function (resolve, reject) {
      try {
        resolve(model.get(id));
      } catch (e) {
        reject(e);
      }
    });
  }
  public add(activity: Activity) {
    return new Promise(function (resolve, reject) {
      try {
        resolve(model.create(activity));
      } catch (e) {
        reject(e);
      }
    });
  }
  public update(activity: Activity) {
    return new Promise(function (resolve, reject) {
      try {
        resolve(model.update(activity.id!, activity));
      } catch (e) {
        reject(e);
      }
    });
  }
  public delete(id: string) {
    return new Promise(function (resolve, reject) {
      try {
        resolve(model.delete(id));
      } catch (e) {
        reject(e);
      }
    });
  }
}

const localStorageDB: ActivityService = new LocalStorage();

export default localStorageDB;
