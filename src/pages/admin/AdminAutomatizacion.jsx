import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Bot, Save, Copy, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminAutomatizacion() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);

  const webhookUrl = "https://cspucnhgbsxzgpuuokur.supabase.co/functions/v1/make-automation";

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('intamb_settings')
      .select('value')
      .eq('id', 'make_automation')
      .single();
    
    if (data && data.value) {
      setSettings(data.value);
    } else {
      console.error(error);
      // Failsafe
      setSettings({ enabled: false, token: 'ntmb-mk-773a4b6c-secret' });
    }
    setLoading(false);
  };

  const handleToggle = () => {
    setSettings(prev => ({ ...prev, enabled: !prev.enabled }));
  };

  const generateNewToken = () => {
    if (!window.confirm("¿Seguro que deseas generar un nuevo Token? Las automatizaciones actuales dejarán de funcionar hasta que actualices el Token en Make.com")) return;
    const newToken = 'intamb-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setSettings(prev => ({ ...prev, token: newToken }));
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('intamb_settings')
      .update({ value: settings })
      .eq('id', 'make_automation');
    
    setSaving(false);
    if (error) {
      alert("Error al guardar: " + error.message);
    } else {
      alert("Configuraciones guardadas exitosamente.");
    }
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'url') {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } else {
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2000);
    }
  };

  if (loading) return <p>Cargando configuraciones...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
        <div>
          <h1 style={{ color: 'var(--color-secondary)', fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Bot size={36} color="var(--color-primary)" />
            Automatización Make.com
          </h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Configura la integración para recibir noticias automáticamente desde Make.com o Zapier.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Save size={20} /> {saving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>

      <div style={{ background: '#fff', padding: 'var(--space-lg)', borderRadius: 'var(--radius-md)', border: '1px solid #e5e7eb', marginBottom: 'var(--space-xl)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '24px', marginBottom: '24px' }}>
          <div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', color: '#1e293b' }}>Estado del Webhook</h3>
            <p style={{ margin: 0, color: '#64748b' }}>Permitir o denegar las peticiones entrantes de Make.com hacia el panel de noticias.</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontWeight: 600, color: settings.enabled ? '#16a34a' : '#ef4444' }}>
              {settings.enabled ? 'Habilitado' : 'Bloqueado'}
            </span>
            <label style={switchStyle}>
              <input type="checkbox" checked={settings.enabled} onChange={handleToggle} style={{ opacity: 0, width: 0, height: 0 }} />
              <span style={{
                ...sliderStyle,
                background: settings.enabled ? 'var(--color-primary)' : '#ccc',
              }}>
                <span style={{
                  ...sliderDotStyle,
                  transform: settings.enabled ? 'translateX(26px)' : 'translateX(0)',
                }} />
              </span>
            </label>
          </div>
        </div>

        <div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.2rem', color: '#1e293b' }}>Credenciales de Integración</h3>
          
          {!settings.enabled && (
             <div style={{ background: '#fee2e2', color: '#991b1b', padding: '16px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <AlertCircle size={20} />
               <span style={{ fontWeight: 500 }}>Las peticiones están siendo rechazadas actualmente. Habilita la automatización para permitir el tráfico.</span>
             </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', color: '#334155' }}>
              Método y URL del Webhook (Make.com HTTP Request)
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <select disabled style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', fontWeight: 600, color: '#0f172a' }}>
                <option>POST</option>
              </select>
              <input type="text" readOnly value={webhookUrl} style={{ ...inputStyle, background: '#f8fafc', flex: 1 }} />
              <button onClick={() => copyToClipboard(webhookUrl, 'url')} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: copiedUrl ? '#16a34a' : '#f1f5f9', color: copiedUrl ? '#fff' : '#334155', border: '1px solid #cbd5e1' }}>
                {copiedUrl ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                {copiedUrl ? 'Copiado' : 'Copiar'}
              </button>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '8px' }}>Asegúrate de que Make.com envíe un Payload JSON con las variables: <code>title</code>, <code>content</code> (soporta HTML), e <code>image_url</code> (opcional).</p>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', color: '#334155' }}>
              Token de Autorización (Enviar como Header "Authorization")
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input type="text" readOnly value={`Bearer ${settings.token}`} style={{ ...inputStyle, background: '#f8fafc', flex: 1, color: '#ef4444', fontWeight: 600 }} />
              <button type="button" onClick={generateNewToken} className="btn" style={{ background: 'transparent', border: '1px solid #ef4444', color: '#ef4444' }}>Rotar Token</button>
              <button onClick={() => copyToClipboard(`Bearer ${settings.token}`, 'token')} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: copiedToken ? '#16a34a' : '#f1f5f9', color: copiedToken ? '#fff' : '#334155', border: '1px solid #cbd5e1' }}>
                {copiedToken ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                {copiedToken ? 'Copiado' : 'Copiar'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none' };

const switchStyle = {
  position: 'relative',
  display: 'inline-block',
  width: '60px',
  height: '34px',
};

const sliderStyle = {
  position: 'absolute',
  cursor: 'pointer',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  transition: '.4s',
  borderRadius: '34px',
};

const sliderDotStyle = {
  position: 'absolute',
  content: '""',
  height: '26px',
  width: '26px',
  left: '4px',
  bottom: '4px',
  backgroundColor: 'white',
  transition: '.4s',
  borderRadius: '50%',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
};
