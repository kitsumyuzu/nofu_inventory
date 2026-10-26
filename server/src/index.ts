import express, { type Request, type Response, type NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

import inventoryRouter from './routes/inventory.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/status', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Hello from the TypeScript Express backend!',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/inventory', inventoryRouter);

const clientDistPath = path.resolve(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

app.get('/{*path}', (req: Request, res: Response, next: NextFunction) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({
      status: 'error',
      message: `API endpoint ${req.path} not found`,
    });
  }

  res.sendFile(path.join(clientDistPath, 'index.html'), (err) => {
    if (err) {
      res.status(500).send(
        'Frontend build not found. Please run the build script for the client folder.'
      );
    }
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('[server error]:', err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`[server]: Running smoothly at http://localhost:${PORT}`);
});
