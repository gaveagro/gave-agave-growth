import { Resend } from 'resend';

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

export const enviarNotificacionRegistro = async (userData) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'notificaciones@send.gaveagro.com',
      to: [import.meta.env.VITE_NOTIFICATION_EMAIL || 'tu-correo@ejemplo.com'],
      subject: '🌱 Nuevo registro en GaveAgro.com',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fdf9;">
          <div style="background: linear-gradient(135deg, #22c55e, #16a34a); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🌱 GaveAgro</h1>
            <p style="color: #dcfce7; margin: 10px 0 0 0; font-size: 16px;">Nuevo usuario registrado</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #22c55e;">
              <h2 style="color: #166534; margin: 0 0 15px 0; font-size: 20px;">Información del usuario:</h2>
              
              <div style="margin: 12px 0;">
                <strong style="color: #374151;">👤 Name / Nombre:</strong> 
                <span style="color: #1f2937;">${userData.name || userData.nombre || 'No provided'}</span>
              </div>
              
              <div style="margin: 12px 0;">
                <strong style="color: #374151;">📧 Email:</strong> 
                <span style="color: #1f2937;">${userData.email || 'No provided'}</span>
              </div>
              
              <div style="margin: 12px 0;">
                <strong style="color: #374151;">📱 Phone / Teléfono:</strong> 
                <span style="color: #1f2937;">${userData.phone || userData.telefono || 'No provided'}</span>
              </div>
              
              <div style="margin: 12px 0;">
                <strong style="color: #374151;">💰 Investment Amount / Monto:</strong> 
                <span style="color: #1f2937;">${userData.investmentAmount || 'No specified'}</span>
              </div>
              
              <div style="margin: 12px 0;">
                <strong style="color: #374151;">🌱 Investment Model / Modelo:</strong> 
                <span style="color: #1f2937;">${userData.investmentModel || 'No selected'}</span>
              </div>
              
              <div style="margin: 12px 0;">
                <strong style="color: #374151;">💬 Message / Mensaje:</strong> 
                <div style="color: #1f2937; margin-top: 8px; padding: 10px; background: #f9fafb; border-radius: 4px;">
                  ${userData.message || userData.mensaje || 'No message provided'}
                </div>
              </div>
              
              <div style="margin: 12px 0;">
                <strong style="color: #374151;">⏰ Fecha:</strong> 
                <span style="color: #1f2937;">${new Date().toLocaleString('es-MX', {
                  timeZone: 'America/Mexico_City',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #eff6ff; border-radius: 8px; text-align: center;">
              <p style="margin: 0; color: #1e40af; font-size: 14px;">
                📊 Revisa todos los registros en tu panel de administración de Supabase
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 20px;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
              Este mensaje fue enviado automáticamente desde GaveAgro.com<br>
              Powered by Resend ⚡
            </p>
          </div>
        </div>
      `
    });

    if (error) {
      console.error('❌ Error enviando notificación:', error);
      return { success: false, error };
    }

    console.log('✅ Notificación enviada exitosamente:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error en enviarNotificacionRegistro:', error);
    return { success: false, error: error.message };
  }
};
