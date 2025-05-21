import { Express, json, NextFunction, Request, Response, urlencoded } from 'express';
import http from 'http';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import logger from './logger';
import { envConfig } from '@/config/env.config';
import { setUpRoutes } from '@/routes';
import { Server as SocketIOServer } from 'socket.io';
import { authenticateSocket } from '@/middleware/socketAuth';
import { initSocketEvents } from '@/sockets';
export default class ChatAppServer {
  private app: Express;
  private httpServer: http.Server;
  private io: SocketIOServer;

  constructor(app: Express) {
    this.app = app;
    this.httpServer = new http.Server(app);
    this.io = new SocketIOServer(this.httpServer, {
      cors: {
        origin: "*", // Allow any origin,
        credentials: true,
      },
    });
  }

  async start(): Promise<void> {
    this.standardMiddleware(this.app);
    setUpRoutes(this.app)
    this.setupSocket();
    this.startServer();
  }

  private standardMiddleware(app:Express): void {
    app.set('trust proxy', 1);
    app.use((_req:Request, res: Response, next: NextFunction) => {
      res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
      next();
    });

    const corsOptions = {
      origin: [envConfig.CLIENT_URL],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    };

    const apiLimiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 10,
      message: {
        msg: 'Too many requests from this IP, please try again after 15 minutes',
      },
    });

    app.use(apiLimiter);
    app.use(cors(corsOptions));
    app.use(json({limit: '200mb'}));
    app.use(urlencoded({extended: true, limit: '200mb'}));
    app.use(helmet());
  }

  private setupSocket(): void {
    this.io.use(authenticateSocket);
    initSocketEvents(this.io);
  }

  private async startServer(): Promise<void> {
    try {
      const PORT = (envConfig.PORT as unknown) as string;;
      const SERVER_PORT: number = parseInt(PORT!, 10) || 5000;
      this.httpServer.listen(SERVER_PORT, () => {
        logger.info(`Server running on port ${SERVER_PORT}`)
      })
    } catch (error) {
      logger.error('Error in startServer method:', error)
    }
  }
}