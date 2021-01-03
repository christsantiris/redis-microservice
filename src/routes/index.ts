import { RoutesInput } from '../types/route';
import * as express from 'express';
import { Req } from '../common/interfaces/interfaces';
import { TaskService } from '../services/task.service';

export default ({ app }: RoutesInput) => {
  const router = express.Router()
  const taskService = new TaskService();

  router.get('/', async (req: express.Request, res: express.Response) => {
    return res.json(await taskService.getAllTasks());
  });

  router.get('/:id', async (req: express.Request, res: express.Response) => {
    return res.json(await taskService.getTask(req.params.id));
  });

  router.post('/', async (req: Req, res: express.Response) => {
    return res.json(await taskService.createTask(req.body));
  });

  router.put('/:id', async (req: express.Request, res: express.Response) => {
    return res.json(await taskService.updateTask(req.params.id));
  });

  router.delete('/:id', async (req: express.Request, res: express.Response) => {
    return res.json(await taskService.deleteTask(req.params.id));
  });

  app.use(router);
}