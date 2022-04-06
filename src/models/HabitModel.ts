import Day from './DayModel';

import dayjs from 'dayjs';

class HabitModel {
  public id?: string;
  public title: string;
  public dateStarted: Date;
  public duration: number;
  public days: Day[];
  public done: boolean;

  public constructor(
    name: string,
    startDate: string,
    duration: number,
    done: boolean,
    days: Day[] | undefined = undefined
  ) {
    this.title = name;
    this.dateStarted = new Date(startDate);
    this.duration = duration;
    this.done = done;
    this.days = days ? days : this.generateDays();
  }

  private generateDays() {
    const newDays = new Array<Day>();
    const beginningDate = dayjs(this.dateStarted);
    for (let x = 0; x < this.duration; x++) {
      newDays.push(new Day(beginningDate.add(x, 'day').toDate().toUTCString(), false));
    }

    return newDays;
  }
}

export default HabitModel;
