import { Status } from "./Status";

export default class Hero {
    id: number | undefined;
    name: string = "";
    desc: string = "";
    powers: string[] = [];
    status: Status = Status.STAND_BY;
}
