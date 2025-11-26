import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';

const app = express();

registerStaticFiles(app);
app.use(cors({origin: 'http://127.0.0.1:5500'}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/tasks', taskRoutes);

export default app;