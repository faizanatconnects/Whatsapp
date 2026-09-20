import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function validId(value) {
  return typeof value === 'string' && /^[a-zA-Z0-9_-]{8,80}$/.test(value);
}

export default async function handler(req, res) {
  const id = req.query.id;
  if (req.method === 'GET') {
    if (!validId(id)) return res.status(400).json({ error: 'Invalid project id' });
    const { data, error } = await supabase.from('replay_projects').select('payload').eq('id', id).maybeSingle();
    if (error) return res.status(500).json({ error: error.message });
    if (!data) return res.status(404).json({ error: 'Project not found' });
    return res.status(200).json(data.payload);
  }

  if (req.method === 'PUT') {
    if (!validId(id)) return res.status(400).json({ error: 'Invalid project id' });
    const payload = req.body;
    if (!payload || typeof payload !== 'object') return res.status(400).json({ error: 'Invalid project payload' });
    const { error } = await supabase.from('replay_projects').upsert({ id, payload, updated_at: new Date().toISOString() });
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ id });
  }

  res.setHeader('Allow', 'GET, PUT');
  return res.status(405).json({ error: 'Method not allowed' });
}
