import DayModel, { DayData } from './DayModel';

import dayjs from 'dayjs';

export default class HabitModel {
  public id?: string;
  public title: string;
  public dateStarted: Date;
  public duration: number;
  public days: DayModel[];
  public done: boolean;

  public constructor(
    name: string,
    startDate: string,
    duration: number,
    done: boolean,
    days: DayModel[] | undefined = undefined
  ) {
    this.title = name;
    this.dateStarted = new Date(startDate);
    this.duration = duration;
    this.done = done;
    this.days = days ? days : this.generateDays();
  }

  private generateDays() {
    const newDays = new Array<DayModel>();
    const beginningDate = dayjs(this.dateStarted);
    for (let x = 0; x < this.duration; x++) {
      newDays.push(new DayModel(beginningDate.add(x, 'day').toDate().toUTCString(), false));
    }
    return newDays;
  }
}

export type HabitData = {
  id?: string;
  title: string;
  startDate: Date;
  duration: number;
  Days?: DayData[];
  done?: boolean;
};
