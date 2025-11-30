// backend/routes/referrals.js
import express from 'express';
import { createReferral, getReferrals } from '../controllers/referralsController.js';
import { authenticate } from './middleware.js';

const router = express.Router();
router.use(authenticate);

router.post('/', createReferral);
router.get('/:lead_id', getReferrals);

export default router;
