import Day from './DayModel';

import dayjs from 'dayjs';

class HabitModel {
  public name: string;
  public startDate: string;
  public duration: number;
  public days: Day[];

  public constructor(
    name: string,
    startDate: string,
    duration: number,
    days: Day[] | undefined = undefined
  ) {
    this.name = name;
    this.startDate = startDate;
    this.duration = duration;
    this.days = days ? days : this.generateDays();
  }

  private generateDays() {
    const newDays = new Array<Day>();
    const beginningDate = dayjs(this.startDate);
    for (let x = 0; x < this.duration; x++) {
      newDays.push(
        new Day(beginningDate.add(x, 'day').toDate().toUTCString(), false)
      );
    }

    return newDays;
  }
}

export default HabitModel;
