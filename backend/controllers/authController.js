// backend/controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabaseClient.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (existingUser) return res.status(400).json({ message: 'Usuário já existe' });

  const passwordHash = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('users')
    .insert([{ name, email, password_hash: passwordHash }])
    .select()
    .single();

  if (error) return res.status(500).json({ message: error.message });

  const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.status(201).json({ token, user: { id: data.id, name: data.name, email: data.email } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (!user) return res.status(400).json({ message: 'Usuário não encontrado' });

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) return res.status(400).json({ message: 'Senha incorreta' });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });
};
