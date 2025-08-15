
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function verifyRecaptcha(token: string): Promise<{ success: boolean; score?: number; action?: string; error?: string }> {
  const googleApiKey = Deno.env.get('GOOGLE_API_KEY');
  
  if (!googleApiKey) {
    console.error('Google API key not configured');
    return { success: false, error: 'Google API key not configured' };
  }

  try {
    const response = await fetch(`https://recaptchaenterprise.googleapis.com/v1/projects/gaveagro-agrotecnologia/assessments?key=${googleApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: {
          token: token,
          siteKey: '6LdJt5srAAAAAD7ZoZQ54TcJAeH_ZlgjK7Tg82ft',
          expectedAction: 'form_submit'
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('reCAPTCHA Enterprise API error:', response.status, errorText);
      return { success: false, error: `API error: ${response.status}` };
    }

    const data = await response.json();
    console.log('reCAPTCHA verification result:', data);

    const score = data.riskAnalysis?.score || 0;
    const action = data.tokenProperties?.action;
    const isValid = data.tokenProperties?.valid;

    // Verificar que el token es válido y tiene un score aceptable (0.5 o mayor)
    const success = isValid && score >= 0.5 && action === 'form_submit';

    return {
      success,
      score,
      action,
      error: !success ? `Invalid token or low score: ${score}` : undefined
    };
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return { success: false, error: error.message };
  }
}

interface FormSubmission {
  name: string;
  email: string;
  phone?: string;
  investmentAmount?: string;
  investmentModel?: string;
  message?: string;
  formType: string;
  recaptchaToken?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log('Form submission function called');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.json();
    console.log('Received form data:', formData);

    // Verificar reCAPTCHA Enterprise token
    if (formData.recaptchaToken) {
      const recaptchaResult = await verifyRecaptcha(formData.recaptchaToken);
      
      if (!recaptchaResult.success) {
        console.error('reCAPTCHA verification failed:', recaptchaResult.error);
        return new Response(
          JSON.stringify({ 
            error: 'Verification failed. Please try again.',
            details: recaptchaResult.error
          }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          }
        );
      }
      
      console.log('reCAPTCHA verification successful. Score:', recaptchaResult.score);
    } else {
      console.warn('No reCAPTCHA token provided');
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Store the form submission in Supabase
    const { data, error } = await supabase
      .from('form_submissions')
      .insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        investment_amount: formData.investmentAmount,
        investment_model: formData.investmentModel,
        message: formData.message,
        form_type: formData.formType || 'investment-lead-capture',
        created_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Error storing form submission:', error);
      throw error;
    }

    console.log('Form submission stored successfully:', data);

    // Send notification email using Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (resendApiKey) {
      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'notificaciones@send.gaveagro.com',
            to: ['hola@gaveagro.com'],
            subject: `🌱 Nueva solicitud de inversión - ${formData.name}`,
            html: `
              <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fdf9;">
                <div style="background: linear-gradient(135deg, #22c55e, #16a34a); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
                  <h1 style="color: white; margin: 0; font-size: 28px;">🌱 GaveAgro</h1>
                  <p style="color: #dcfce7; margin: 10px 0 0 0; font-size: 16px;">Nueva solicitud de inversión</p>
                </div>
                
                <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #22c55e;">
                    <h2 style="color: #166534; margin: 0 0 15px 0; font-size: 20px;">Información del prospecto:</h2>
                    
                    <div style="margin: 12px 0;">
                      <strong style="color: #374151;">👤 Nombre:</strong> 
                      <span style="color: #1f2937;">${formData.name}</span>
                    </div>
                    
                    <div style="margin: 12px 0;">
                      <strong style="color: #374151;">📧 Email:</strong> 
                      <span style="color: #1f2937;">${formData.email}</span>
                    </div>
                    
                    <div style="margin: 12px 0;">
                      <strong style="color: #374151;">📱 Teléfono:</strong> 
                      <span style="color: #1f2937;">${formData.phone || 'No proporcionado'}</span>
                    </div>
                    
                    <div style="margin: 12px 0;">
                      <strong style="color: #374151;">💰 Monto de inversión:</strong> 
                      <span style="color: #1f2937;">${formData.investmentAmount || 'No especificado'}</span>
                    </div>
                    
                    <div style="margin: 12px 0;">
                      <strong style="color: #374151;">🌱 Modelo de inversión:</strong> 
                      <span style="color: #1f2937;">${formData.investmentModel || 'No especificado'}</span>
                    </div>
                    
                    <div style="margin: 12px 0;">
                      <strong style="color: #374151;">💬 Mensaje:</strong> 
                      <div style="color: #1f2937; margin-top: 8px; padding: 10px; background: #f9fafb; border-radius: 4px;">
                        ${formData.message || 'Sin mensaje adicional'}
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
            `,
          }),
        });

        if (!emailResponse.ok) {
          console.error('Failed to send email:', await emailResponse.text());
        } else {
          console.log('Email notification sent successfully');
        }
      } catch (emailError) {
        console.error('Error sending email notification:', emailError);
      }
    } else {
      console.log('Resend API key not configured, skipping email notification');
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Form submitted successfully' 
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );

  } catch (error) {
    console.error('Error in form-submission function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
};

serve(handler);
