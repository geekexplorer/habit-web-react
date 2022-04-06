class DayModel {
  public date: string;
  public completed: boolean;

  public constructor(date: string, completed: boolean) {
    this.date = date;
    this.completed = completed;
  }
}

export default DayModel;
