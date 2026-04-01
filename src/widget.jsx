import React from 'react';
import { createRoot } from 'react-dom/client';
import { SelloCertificado } from './components/ui/SelloCertificado';

const initSelloWidget = () => {
  const container = document.getElementById('sello-interambiente');
  if (container) {
    // Generar layout seguro para el sello
    container.style.display = 'inline-flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.background = 'transparent';
    
    const clientId = container.dataset.clientId;

    if (!clientId) {
      console.warn("Interambiente Sello: Se requiere un data-client-id válido en el contenedor.");
      return;
    }

    const supabaseUrl = 'https://cspucnhgbsxzgpuuokur.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzcHVjbmhnYnN4emdwdXVva3VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MTUzNTMsImV4cCI6MjA4NzQ5MTM1M30.14Ax1GOouOnB4zlHad_Gb8klQZ9zc0cl3IbDdo6KAwE';

    fetch(`${supabaseUrl}/rest/v1/sello_clientes?id=eq.${clientId}&select=name,is_active`, {
      method: 'GET',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    })
    .then(res => res.json())
    .then(data => {
      // 1. Verificación en tiempo real de la base de datos de Interambiente
      if (data && data.length > 0 && data[0].is_active) {
        const root = createRoot(container);
        root.render(<SelloCertificado isWidget={true} clientName={data[0].name} />);
      } else {
        // 2. Cliente Inexistente o Suspendido: se vuelve completamente invisible en su web sin causar errores.
        container.style.display = 'none';
      }
    })
    .catch(err => {
      console.warn("Interambiente Sello: Verificación interrumpida.");
      container.style.display = 'none';
    });
  }
};

// Inyectar sin bloquear el sitio cliente.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSelloWidget);
} else {
  initSelloWidget();
}
