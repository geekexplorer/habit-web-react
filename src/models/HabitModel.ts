import DayModel from './DayModel';

import dayjs from 'dayjs';

export default class HabitModel {
  public id?: string;
  public name: string;
  public startDate: Date;
  public duration: number;
  public days?: DayModel[];

  public constructor(name: string, startDate: string, duration: number, days: DayModel[] | undefined = undefined) {
    this.name = name;
    this.startDate = new Date(startDate);
    this.duration = duration;
    this.days = days ? days : this.generateDays();
  }

  private generateDays() {
    const newDays = new Array<DayModel>();
    const beginningDate = dayjs(this.startDate);
    for (let x = 0; x < this.duration; x++) {
      newDays.push(new DayModel(beginningDate.add(x, 'day').toDate().toUTCString(), false));
    }
    return newDays;
  }
}
