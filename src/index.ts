import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { env } from './config/env.js';
import { authRouter } from './routes/auth.routes.js';
import { bundlesRouter } from './routes/bundles.routes.js';
import { catalogRouter, genresRouter } from './routes/catalog.routes.js';
import { mediaRouter } from './routes/media.routes.js';
import { producersRouter } from './routes/producers.routes.js';
import { resourcesRouter } from './routes/resources.routes.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const publicDir = join(__dirname, '..', 'public');

const app = express();

app.use(
  cors({
    origin: env.APP_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, env: env.APP_ENV });
});

app.use('/api/auth', authRouter);
app.use('/api/genres', genresRouter);
app.use('/api/catalog', catalogRouter);
app.use('/api/bundles', bundlesRouter);
app.use('/api/resources', resourcesRouter);
app.use('/api/producers', producersRouter);
app.use('/media', mediaRouter);

app.use(express.static(publicDir));

app.get('*', (_req, res) => {
  res.sendFile(join(publicDir, 'index.html'));
});

app.listen(env.PORT, () => {
  console.log(`Kanjava Music marketplace listening on ${env.APP_URL} (port ${env.PORT})`);
});
