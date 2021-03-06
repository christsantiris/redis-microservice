import * as express from 'express';
import { RoutesInput } from '../types/route';
import { Req } from '../common/interfaces/interfaces';
import { AuthService } from '../services/auth.service';
import checkAuth from '../middleware/check-auth';

export default ({ app }: RoutesInput) => {
  const router = express.Router();
  const authService = new AuthService();

  router.post('/user/signup', async (req: Req, res: express.Response) => {
    try {
      const result = await authService.signUp(
        { displayName: req.body.name, email: req.body.email, password: req.body.password },
        res
      );
    } catch (err) {
      return res.status(err.status).json({
        message: `There was an error registering user with email: ${req.body.email}`,
      });
    }
  });

  router.post('/user/login', async (req: Req, res: express.Response) => {
    try {
      const result = await authService.logIn(
        { email: req.body.email, password: req.body.password },
        res
      );
    } catch (err) {
      return res.status(err.status).json({
        message: `There was an error logging in with email: ${req.body.email}`,
      });
    }
  });

  router.delete('/user/delete/:userId', checkAuth, async (req: Req, res: express.Response) => {
    try {
      const result = await authService.deleteUser(
        { userId: req.params.userId },
        res
      );
    } catch (err) {
      return res.status(err.status).json({
        message: `There was an error trying to delete the user with ID ${req.params.userId}`,
      });
    }
  });

  app.use(router);
};
