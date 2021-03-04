import dotenv from 'dotenv';
import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';

import connectDB from './db';
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.routes';
import projectRouter from './routes/project.routes';
import taskRouter from './routes/task.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/projects', projectRouter);
app.use('/api/tasks', taskRouter);

const errorHandler: ErrorRequestHandler = (err, _, res, next) => {
  if (res.headersSent) return next(err);

  res.status(500).json({
    ok: false,
    errors: [{
        msg: 'Error interno del servidor'
    }]
  });
};

app.use(errorHandler);

app.use((_, res) => {
  res.status(404).json({
    ok: false,
    errors: [{
      msg: 'No se encontró el recurso solicitado'
    }]
  });
});

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
});