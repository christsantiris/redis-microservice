import { RoutesInput } from '../types/route';
import * as express from 'express';

export default ({ app }: RoutesInput) => {
  const router = express.Router()

  router.get('/', (req: express.Request, res: express.Response) => {
    res.json({
      message: 'Hello Get'
    });
  });

  router.get('/:id', async (req: express.Request, res: express.Response) => {
    res.json({
      message: `Hello Get with ID: ${req.params.id}`
    });
  });

  router.post('/', async (req: express.Request, res: express.Response) => {
    res.json({
      message: 'Hello Post'
    });
  });

  router.put('/:id', async (req: express.Request, res: express.Response) => {
    res.json({
      message: `Hello Put with ID: ${req.params.id}`
    });
  });

  router.delete('/:id', async (req: express.Request, res: express.Response) => {
    res.json({
      message: `Hello Delete with ID: ${req.params.id}`
    });
  });

  app.use(router);
}