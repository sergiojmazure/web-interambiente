import React from 'react';
import { Shield, Lock, FileText, CheckCircle } from 'lucide-react';
import SEO from '../../components/SEO';

export default function Privacidad() {
  return (
    <>
      <SEO 
        title="Política de Privacidad | Interambiente" 
        description="Conoce nuestra política de privacidad y protección de datos conforme a la LOPDP de Ecuador." 
      />

      {/* Hero */}
      <section className="bg-gradient section" style={{ paddingBottom: 'var(--space-xl)' }}>
        <div className="container text-center">
          <Shield size={48} color="var(--color-primary)" style={{ margin: '0 auto 20px auto' }} />
          <h1 style={{ color: 'var(--color-secondary)', marginBottom: 'var(--space-md)' }}>Política de <span style={{ color: 'var(--color-primary)' }}>Privacidad</span></h1>
          <p className="subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>Protegemos tu información con el más alto rigor legal y técnico, en estricto cumplimiento de la normativa ecuatoriana.</p>
        </div>
      </section>

      {/* Content */}
      <section className="section bg-light" style={{ paddingTop: 'var(--space-xl)' }}>
        <div className="container">
          <div className="card" style={{ padding: 'var(--space-xl)', maxWidth: '800px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-text)' }}>
            
            <p style={{ marginBottom: 'var(--space-lg)' }}>
              En <strong>Interambiente</strong> (en adelante "la Empresa"), estamos comprometidos con la protección de tus datos personales. 
              Esta Política de Privacidad describe cómo recopilamos, usamos, procesamos y protegemos la información personal que nos proporcionas a través de nuestro sitio web y servicios, en pleno cumplimiento de la <strong>Ley Orgánica de Protección de Datos Personales (LOPDP)</strong> de la República del Ecuador.
            </p>

            <h3 style={{ color: 'var(--color-secondary)', marginTop: 'var(--space-xl)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={20} color="var(--color-primary)" /> 1. Responsable del Tratamiento
            </h3>
            <p>
              Interambiente es responsable del tratamiento de los datos personales recabados a través del sitio web. Para efectos de derechos y consultas, puedes contactarnos al correo: <strong>soastec@gmail.com</strong> o <strong>info@interambiente.com</strong>.
            </p>

            <h3 style={{ color: 'var(--color-secondary)', marginTop: 'var(--space-xl)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={20} color="var(--color-primary)" /> 2. Finalidad del Tratamiento de los Datos
            </h3>
            <p>
              Recopilamos tus datos personales (como nombre, correo electrónico, teléfono y empresa) exclusivamente para:
            </p>
            <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
              <li>Gestionar y responder consultas técnicas o de servicio enviadas a través de nuestros formularios de contacto.</li>
              <li>Acompañamiento en procesos de regularización ambiental descritos en el portal.</li>
              <li>Proveer información, presupuestos y cotizaciones solicitadas por el usuario.</li>
            </ul>

            <h3 style={{ color: 'var(--color-secondary)', marginTop: 'var(--space-xl)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={20} color="var(--color-primary)" /> 3. Base Legal y Legitimación
            </h3>
            <p>
              El tratamiento de datos se fundamenta en el <strong>consentimiento libre, específico, informado e inequívoco</strong> del titular, otorgado al aceptar el envío de sus datos mediante los formularios del sitio web (Art. 7 LOPDP).
            </p>

            <h3 style={{ color: 'var(--color-secondary)', marginTop: 'var(--space-xl)', marginBottom: '16px' }}>
              4. Conservación y Seguridad
            </h3>
            <p>
              Garantizamos la confidencialidad de los datos. No venderemos, alquilaremos ni compartiremos tu información con terceros, salvo por obligaciones legales o regulatorias vigentes en el Ecuador.<br/><br/>
              Los datos se conservarán únicamente durante el tiempo necesario para cumplir las finalidades mencionadas o hasta que el titular solicite su eliminación, implementando medidas técnicas (como transmisión cifrada TLS/SSL) recomendadas por la normativa actual para impedir filtraciones o alteraciones.
            </p>

            <h3 style={{ color: 'var(--color-secondary)', marginTop: 'var(--space-xl)', marginBottom: '16px' }}>
              5. Derechos del Titular (Derechos de Ley)
            </h3>
            <p>
              En base a la LOPDP Ecuatoriana, te garantizamos en todo momento el ejercicio de tus derechos de:
            </p>
            <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
              <li><strong>Acceso:</strong> Solicitar conocer qué datos poseemos tuyos.</li>
              <li><strong>Rectificación y Actualización:</strong> Corregir información inexacta o incompleta.</li>
              <li><strong>Eliminación:</strong> Solicitar la supresión de tus datos cuando ya no sean necesarios para la finalidad originaria.</li>
              <li><strong>Oposición:</strong> Negarte al tratamiento de tus datos para fines específicos.</li>
            </ul>
            <p>Para ejercer estos derechos, el titular deberá enviar un correo electrónico especificando su requerimiento a las direcciones de contacto de la Empresa.</p>

            <hr style={{ margin: 'var(--space-xl) 0', border: 'none', borderTop: '1px solid var(--color-bg-alt)' }} />
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
              Última actualización: <strong>{new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>. <br/>Interambiente se reserva el derecho de modificar esta política para adaptarla a novedades legislativas nacionales.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
