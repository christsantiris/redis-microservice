import { task as Task } from '../common/schemas/task.schema'

export class TaskService {

  public async getAllTasks(): Promise<any> {
    const tasks = await Task.find();
    if (tasks && tasks.length) {
      return { success: true, data: tasks };
    } else {
      return { success: false, message: 'There was an error getting the task list' };
    }
  }

  public async getTask(ID: any): Promise<any> {
    const task = await Task.findById({ _id: ID })
    if (!task || task === null) {
      return { success: false, message: `There was an error getting Task with ID of ${ID}` }
    } else {
      return { success: true, data: task };
    }
  }

  public async createTask(document: any): Promise<any> {
    const task = await Task.create(document)
    if (task) {
      return { success: true, data: task };
    } else {
      return { success: false, message: 'Unable to create task' }
    }    
  }

  public async updateTask({ID, document}: {ID: any, document: any}): Promise<any> {
    const task = await Task.updateOne({_id: ID}, document);
    if (task.nModified > 0) {
      return { success: true, data: `Task with ID of ${ID} successfully updated` };
    } else {
      return { success: false, message: `There was an error updating Task with ID of ${ID}` }
    }
  }

  public async deleteTask(ID: any): Promise<any> {
    const deletedTask = await Task.deleteOne({ _id: ID })
    if (deletedTask.deletedCount > 0) {
      return { success: true, data: `Task with ID of ${ID} successfully deleted` };
    } else {
      return { success: false, message: `There was an error deleting the Task with ID of ${ID}` }
    }
  }
}