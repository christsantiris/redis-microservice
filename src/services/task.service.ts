import { model as Task } from '../common/schemas/task.schema'

export class TaskService {

  public async getAllTasks(): Promise<any> {
    return await Task.find();
  }

  public async getTask(ID: any): Promise<any> {
    return `Hello GET One ${ID}`;
  }

  public async createTask(document: any): Promise<any> {
    return await Task.create(document)
  }

  public async updateTask(ID: any): Promise<any> {
    console.log('Task Updated');
    return `Hello PUT ${ID}`;
  }

  public async deleteTask(ID: any): Promise<any> {
    console.log('Task Deleted');
    return `Hello DELETE ${ID}`;
  }
}