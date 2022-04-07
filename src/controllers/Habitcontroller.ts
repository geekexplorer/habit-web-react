import { REST } from './RESTHelpers';
import { CreateHabitData } from '../components/Habit/HabitForm/HabitForm';
import HabitModel from '../models/HabitModel';

const API_URL = 'http://budgie-i7:5091/api/habit';

export enum RequestStatus {
  Ok,
  Error,
}

export const HabitController = {
  async getHabits(): Promise<HabitServiceResponse<HabitModel[]> | HabitServiceResponse<string>> {
    try {
      const habits = await REST.Get<HabitModel[]>(API_URL);
      return new HabitServiceResponse<HabitModel[]>(true, habits);
    } catch (err) {
      console.error(err);
      return new HabitServiceResponse(false, 'Unable to retrive habits.');
    }
  },

  async createHabit(
    habitData: CreateHabitData
  ): Promise<HabitServiceResponse<HabitModel> | HabitServiceResponse<string>> {
    try {
      const newHabitData = new HabitModel(habitData.name, habitData.startDate.toUTCString(), habitData.duration, false);
      const newHabit = await REST.Post<HabitModel>(API_URL, newHabitData);
      return new HabitServiceResponse<HabitModel>(true, newHabit);
    } catch (err) {
      console.error(err);
      return new HabitServiceResponse(false, 'Unable to create new habit.');
    }
  },
};

export class HabitServiceResponse<T> {
  public success: boolean;
  public data: T;

  constructor(success: boolean, data: T) {
    this.success = success;
    this.data = data;
  }
}
