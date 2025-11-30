// backend/controllers/referralsController.js
import { supabase } from '../config/supabaseClient.js';

export const createReferral = async (req, res) => {
  const { lead_id, message } = req.body;

  const { data, error } = await supabase
    .from('referrals')
    .insert([{ lead_id, message }])
    .select()
    .single();

  if (error) return res.status(500).json({ message: error.message });
  res.status(201).json(data);
};

export const getReferrals = async (req, res) => {
  const { lead_id } = req.params;

  const { data, error } = await supabase
    .from('referrals')
    .select('*')
    .eq('lead_id', lead_id)
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ message: error.message });
  res.status(200).json(data);
};
