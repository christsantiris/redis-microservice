import express, { Application, Router } from 'express';

class App {
  public express: Application;

  constructor() {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes(): void {
    const router: Router = express.Router()
    router.get('/', (req, res) => {
      res.json({
        message: 'Hello Chris!'
      })
    })
    this.express.use('/', router)
  }
}

export default new App().express