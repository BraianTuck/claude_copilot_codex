-- Tabla de suscripciones para notificaciones de Telegram
-- Ejecutar en Supabase SQL Editor

CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  email TEXT NOT NULL,
  telegram_chat_id TEXT NOT NULL,
  notify_youtube BOOLEAN DEFAULT true,
  notify_linkedin BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para búsquedas por telegram_chat_id
CREATE INDEX IF NOT EXISTS idx_subscriptions_telegram ON subscriptions(telegram_chat_id);

-- Índice para filtrar por tipo de notificación
CREATE INDEX IF NOT EXISTS idx_subscriptions_notify ON subscriptions(notify_youtube, notify_linkedin);

-- Row Level Security (RLS)
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Los usuarios solo pueden ver/editar sus propias suscripciones
CREATE POLICY "Users can view own subscription" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscription" ON subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription" ON subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own subscription" ON subscriptions
  FOR DELETE USING (auth.uid() = user_id);

-- Política para que el service role pueda leer todas las suscripciones (para el workflow)
CREATE POLICY "Service role can read all subscriptions" ON subscriptions
  FOR SELECT USING (auth.role() = 'service_role');
