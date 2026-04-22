
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation schema
const FormSubmissionSchema = z.object({
  name: z.string().min(1, "Name is required").max(200).trim(),
  email: z.string().email("Invalid email").max(255).trim().toLowerCase(),
  phone: z.string().max(50).optional().nullable(),
  investmentAmount: z.string().max(100).optional().nullable(),
  investmentModel: z.string().max(100).optional().nullable(),
  message: z.string().max(2000).optional().nullable(),
  formType: z.string().max(100).default('investment-lead-capture'),
  recaptchaToken: z.string().max(2000).optional().nullable(),
});

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

    const success = isValid && score >= 0.5 && action === 'form_submit';

    return {
      success,
      score,
      action,
      error: !success ? `Invalid token or low score: ${score}` : undefined
    };
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return { success: false, error: 'reCAPTCHA verification failed' };
  }
}

const handler = async (req: Request): Promise<Response> => {
  console.log('Form submission function called');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawData = await req.json();

    // Validate input
    const parseResult = FormSubmissionSchema.safeParse(rawData);
    if (!parseResult.success) {
      console.error('Validation failed:', parseResult.error.flatten());
      return new Response(
        JSON.stringify({ error: 'Invalid input data. Please check your form fields and try again.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    const formData = parseResult.data;
    console.log('Validated form submission for:', formData.email);

    // Verificar reCAPTCHA Enterprise token (REQUERIDO)
    if (!formData.recaptchaToken) {
      console.warn('Submission rejected: no reCAPTCHA token provided');
      return new Response(
        JSON.stringify({ error: 'Verification required. Please try again.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    const recaptchaResult = await verifyRecaptcha(formData.recaptchaToken);
    if (!recaptchaResult.success) {
      console.error('reCAPTCHA verification failed:', recaptchaResult.error);
      return new Response(
        JSON.stringify({ error: 'Verification failed. Please try again.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    console.log('reCAPTCHA verification successful. Score:', recaptchaResult.score);

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
        form_type: formData.formType,
        created_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Error storing form submission:', error);
      throw error;
    }

    console.log('Form submission stored successfully');

    // Send notification email using Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (resendApiKey) {
      try {
        // Escape HTML in user-provided fields to prevent XSS in email
        const escapeHtml = (str: string) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

        const safeName = escapeHtml(formData.name);
        const safeEmail = escapeHtml(formData.email);
        const safePhone = escapeHtml(formData.phone || 'No proporcionado');
        const safeAmount = escapeHtml(formData.investmentAmount || 'No especificado');
        const safeModel = escapeHtml(formData.investmentModel || 'No especificado');
        const safeMessage = escapeHtml(formData.message || 'Sin mensaje adicional');

        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'notificaciones@send.gaveagro.com',
            to: ['hola@gaveagro.com'],
            subject: `🌱 Nueva solicitud de inversión - ${safeName}`,
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
                      <span style="color: #1f2937;">${safeName}</span>
                    </div>
                    
                    <div style="margin: 12px 0;">
                      <strong style="color: #374151;">📧 Email:</strong> 
                      <span style="color: #1f2937;">${safeEmail}</span>
                    </div>
                    
                    <div style="margin: 12px 0;">
                      <strong style="color: #374151;">📱 Teléfono:</strong> 
                      <span style="color: #1f2937;">${safePhone}</span>
                    </div>
                    
                    <div style="margin: 12px 0;">
                      <strong style="color: #374151;">💰 Monto de inversión:</strong> 
                      <span style="color: #1f2937;">${safeAmount}</span>
                    </div>
                    
                    <div style="margin: 12px 0;">
                      <strong style="color: #374151;">🌱 Modelo de inversión:</strong> 
                      <span style="color: #1f2937;">${safeModel}</span>
                    </div>
                    
                    <div style="margin: 12px 0;">
                      <strong style="color: #374151;">💬 Mensaje:</strong> 
                      <div style="color: #1f2937; margin-top: 8px; padding: 10px; background: #f9fafb; border-radius: 4px;">
                        ${safeMessage}
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
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error) {
    console.error('Error in form-submission function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: 'An error occurred processing your request. Please try again later.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
