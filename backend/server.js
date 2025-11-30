// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import leadsRoutes from './routes/leads.js';
import referralsRoutes from './routes/referrals.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/referrals', referralsRoutes);

app.get('/', (req, res) => res.send('LeadMate Pro Backend funcionando!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
