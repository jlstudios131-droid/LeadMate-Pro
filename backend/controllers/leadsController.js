// backend/controllers/leadsController.js
import { supabase } from '../config/supabaseClient.js';

export const createLead = async (req, res) => {
  const { name, email, phone, property } = req.body;
  const owner_id = req.user.id;

  let score = 0;
  if (email) score += 1;
  if (phone) score += 1;
  if (property) score += 1;

  const { data, error } = await supabase
    .from('leads')
    .insert([{ name, email, phone, property, score, owner_id }])
    .select()
    .single();

  if (error) return res.status(500).json({ message: error.message });
  res.status(201).json(data);
};

export const getLeads = async (req, res) => {
  const owner_id = req.user.id;

  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('owner_id', owner_id)
    .order('score', { ascending: false });

  if (error) return res.status(500).json({ message: error.message });
  res.status(200).json(data);
};

export const updateLead = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const { data, error } = await supabase
    .from('leads')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) return res.status(500).json({ message: error.message });
  res.status(200).json(data);
};

export const deleteLead = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('leads')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ message: error.message });
  res.status(200).json({ message: 'Lead deletado com sucesso' });
};
