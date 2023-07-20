import Quality from "./quality";

export default class Activity {
    id?: string;
    name: string = '';
    description?: string = '';
    isDone: boolean = false;
    qualities: Quality = new Quality();
}