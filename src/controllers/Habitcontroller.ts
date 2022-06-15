import { REST } from './RESTHelpers';
import HabitModel from '../models/HabitModel';

const API_URL = 'http://int1:5091/api/habit';

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
      return new HabitServiceResponse(false, 'Unable to retrieve habits.');
    }
  },

  async createHabit(habitData: HabitModel): Promise<HabitServiceResponse<HabitModel> | HabitServiceResponse<string>> {
    try {
      const newHabitData = new HabitModel(habitData.name, habitData.startDate.toUTCString(), habitData.duration);
      const newHabit = await REST.Post<HabitModel>(API_URL, newHabitData);
      return new HabitServiceResponse<HabitModel>(true, newHabit);
    } catch (err) {
      console.error(err);
      return new HabitServiceResponse(false, 'Unable to create new habit.');
    }
  },

  async deleteHabit(id: string): Promise<HabitServiceResponse<string>> {
    try {
      await REST.Delete(`${API_URL}/${id}`);
      return new HabitServiceResponse<string>(true);
    } catch (err) {
      console.error(err);
      return new HabitServiceResponse(false, `Unable to delete habit. (id=${id})`);
    }
  },

  async updateHabit(
    id: string,
    habitData: HabitModel
  ): Promise<HabitServiceResponse<HabitModel> | HabitServiceResponse<string>> {
    try {
      await REST.Put(`${API_URL}/${id}`, habitData);
      return new HabitServiceResponse<HabitModel>(true);
    } catch (err) {
      console.error(err);
      return new HabitServiceResponse(false, `Unable to update habit. (id=${id})`);
    }
  },
};

export class HabitServiceResponse<T> {
  public success: boolean;
  public data?: T;

  constructor(success: boolean, data?: T) {
    this.success = success;
    this.data = data;
  }
}
