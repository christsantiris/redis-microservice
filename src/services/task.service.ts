import { redisConfigs } from '../config/config';
import { task as Task } from '../common/schemas/task.schema'
import RedisWrapper from '../lib/redis';

export class TaskService {

  redis = new RedisWrapper()

  public async getAllTasks(): Promise<any> {
    const redisKey = 'tasks'
    const redisResponse = await (<any>this.redis.client).get(redisKey);

    if (redisResponse) {
      console.log(`Data found in Redis for key ${redisKey}`);
      return { success: true, data: JSON.parse(redisResponse) };
    } else {
      console.log(`No data found in Redis for key ${redisKey}`);

      const tasks = await Task.find();

      if (tasks && tasks.length) {
        (<any>this.redis.client).set(redisKey, JSON.stringify(tasks), 'EX', redisConfigs.expiry);
        return { success: true, data: tasks };
      } else {
        return { success: false, message: 'There was an error getting the task list' };
      }
    }
  }

  public async getTasksForUser({ userID }: {userID:string}): Promise<any> {
    const redisKey = `tasks${userID}`;
    const redisResponse = await (<any>this.redis.client).get(redisKey);

    if (redisResponse) {
      console.log(`Data found in Redis for key ${redisKey}`);
      return { success: true, data: JSON.parse(redisResponse) };
    } else {
      console.log(`No data found in Redis for key ${redisKey}`);

      const tasks = await Task.find({ userId: userID });

      if (tasks && tasks.length) {
        (<any>this.redis.client).set(redisKey, JSON.stringify(tasks), 'EX', redisConfigs.expiry);
        return { success: true, data: tasks };
      } else {
        return { success: false, message: 'There was an error getting the task list for user' };
      }
    }
  }

  public async getTask(ID: any): Promise<any> {
    const redisKey = `task:${ID}`;
    const redisResponse = await (<any>this.redis.client).get(redisKey);

    if (redisResponse) {
      console.log(`Data found in Redis for key: ${redisKey}`);
      return { success: true, data: JSON.parse(redisResponse) };
    } else {
      console.log(`No data found in Redis for key: ${redisKey}`);

      const task = await Task.findById({ _id: ID })

      if (!task || task === null) {
        return { success: false, message: `There was an error getting Task with ID of ${ID}` }
      } else {
        (<any>this.redis.client).set(redisKey, JSON.stringify(task), 'EX', redisConfigs.expiry);
        return { success: true, data: task };
      }
    }
  }

  public async createTask({ userID, document }: { userID: string, document: any }): Promise<any> {
    document.userId = userID;
    const task = await Task.create(document)
    if (task) {
      (<any>this.redis.client).del('tasks');
      return { success: true, data: task };
    } else {
      return { success: false, message: 'Unable to create task' }
    }
  }

  public async updateTask({ ID, document }: { ID: any, document: any }): Promise<any> {
    const task = await Task.updateOne({ _id: ID }, document);
    if (task.nModified > 0) {
      (<any>this.redis.client).del('tasks');
      return { success: true, data: `Task with ID of ${ID} successfully updated` };
    } else {
      return { success: false, message: `There was an error updating Task with ID of ${ID}` }
    }
  }

  public async deleteTask(ID: any): Promise<any> {
    const redisKey = `task:${ID}`;
    const deletedTask = await Task.deleteOne({ _id: ID })
    if (deletedTask.deletedCount > 0) {
      (<any>this.redis.client).del(redisKey);
      (<any>this.redis.client).del('tasks');
      console.log(`Data removed from redis for keys ${redisKey} and tasks`)
      return { success: true, data: `Task with ID of ${ID} successfully deleted` };
    } else {
      return { success: false, message: `There was an error deleting the Task with ID of ${ID}` }
    }
  }
}