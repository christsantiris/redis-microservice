import { RoutesInput } from '../types/route';
import * as express from 'express';
import { Req } from '../common/interfaces/interfaces';
import { TaskService } from '../services/task.service';

export default ({ app }: RoutesInput) => {
  const router = express.Router()
  const taskService = new TaskService();

  router.get('/', async (req: Req, res: express.Response) => {
    try {
      const tasks =await taskService.getAllTasks();

      if (tasks.success === true) {
        return res.json(tasks);       
      } else {
        res.status(500).json({ message: tasks.message })
      }
    } catch (err) {
      res.status(err.status).send({ message: 'There was an error getting task list' });
    }
  });

  router.get('/:id', async (req: Req, res: express.Response) => {
    try {
      const task = await taskService.getTask(req.params.id);

      if (task.success === true) {
        return res.json(task);       
      } else {
        return res.status(404).json({ message: `Unable to find the task with ID ${req.params.id}` });
      }
    } catch (err) {
      return res.status(err.status).json({ message: `There was an error returning task with ID ${req.params.id}` });
    }
  });

  router.post('/', async (req: Req, res: express.Response) => {
    try {
      const task = await taskService.createTask(req.body);
      if (task.success === true) {
        return res.json(task)
      } else {
        return res.status(500).json({ message: 'Unable to create new task' });
      }
    } catch (err) {
      res.status(err.status).json({message: 'Unable to create new task' });
    }
  });

  router.put('/:id', async (req: Req, res: express.Response) => {
    try {
      const task = await taskService.updateTask({ID: req.params.id, document: req.body});

      if (task.success === true) {
        return res.json(task);
      } else {
        return res.status(500).json({ message: `Unable to update the task with ID ${req.params.id}` });
      }
    } catch (err) {
      return res.status(err.status).json({ message: `There was an error updating the task with ID ${req.params.id}` });
    }
  });

  router.delete('/:id', async (req: Req, res: express.Response) => {
    try {   
        const task = await taskService.deleteTask(req.params.id);
        if (task.success === true) {
          return res.json(task);
        } else {
          return res.status(500).json({ message: `Unable to delete the task with ID ${req.params.id}` });
        }
    } catch (err) {
      return res.status(err.status).json({ message: `There was an error trying to delete the task with ID ${req.params.id}` });
    }
  });

  app.use(router);
}