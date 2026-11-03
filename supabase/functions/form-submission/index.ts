
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
  language: z.string().max(5).optional().nullable(),
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

    // 'contact_submit' was sent by older builds of the /contacto form; accept both.
    const success = isValid && score >= 0.5 && (action === 'form_submit' || action === 'contact_submit');

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

    // reCAPTCHA no bloquea: un lead real con bloqueador de anuncios o score bajo
    // se guarda igual y se marca para revisión. Solo a los verificados se les
    // envía respuesta automática.
    const recaptchaResult = formData.recaptchaToken
      ? await verifyRecaptcha(formData.recaptchaToken)
      : { success: false, error: 'no token' };
    const verified = recaptchaResult.success;
    if (!verified) {
      console.warn('reCAPTCHA not verified, storing flagged lead:', recaptchaResult.error);
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const flagNote = verified
      ? ''
      : `\n\n[Revisar: reCAPTCHA no verificado (${recaptchaResult.error ?? 'sin detalle'})]`;

    const { error } = await supabase
      .from('form_submissions')
      .insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        investment_amount: formData.investmentAmount,
        investment_model: formData.investmentModel,
        message: (formData.message ?? '') + flagNote || null,
        form_type: formData.formType,
        created_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Error storing form submission:', error);
      throw error;
    }

    console.log('Form submission stored successfully');

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (resendApiKey) {
      await sendNotification(resendApiKey, formData, verified);
      if (verified) {
        await sendAutoReply(resendApiKey, formData);
      }
    } else {
      console.log('Resend API key not configured, skipping emails');
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Form submitted successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );

  } catch (error) {
    console.error('Error in form-submission function:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: 'An error occurred processing your request. Please try again later.'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
};

type LeadData = z.infer<typeof FormSubmissionSchema>;

const NOTIFY_TO = ['hola@gaveagro.com', 'hectoreduardo@gaveagro.com'];
const FROM = 'Gavé <notificaciones@send.gaveagro.com>';
const REPLY_TO_GAVE = 'hola@gaveagro.com';

const FORM_LABELS: Record<string, string> = {
  'investment-lead-capture': 'Inversión en plantas',
  'contact-general': 'Contacto general',
  'hijuelos-espadin-lead': 'Hijuelos',
};

const formLabel = (formType: string) => FORM_LABELS[formType] ?? formType;

const escapeHtml = (str: string) =>
  str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const row = (label: string, value?: string | null) =>
  value
    ? `<tr><td style="padding:6px 12px 6px 0;color:#6b7280;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:6px 0;color:#111827">${escapeHtml(value).replace(/\n/g, '<br>')}</td></tr>`
    : '';

async function sendEmail(apiKey: string, payload: Record<string, unknown>) {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) console.error('Resend error:', res.status, await res.text());
  } catch (e) {
    console.error('Error sending email:', e);
  }
}

async function sendNotification(apiKey: string, f: LeadData, verified: boolean) {
  const label = formLabel(f.formType);
  const subject = `${verified ? '' : '[Revisar] '}Nuevo lead · ${label} · ${f.name}`;
  const fecha = new Date().toLocaleString('es-MX', {
    timeZone: 'America/Mexico_City', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
  const phoneDigits = (f.phone ?? '').replace(/\D/g, '');
  const waLink = phoneDigits.length >= 10
    ? `https://wa.me/${phoneDigits.length === 10 ? '52' + phoneDigits : phoneDigits}`
    : null;

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;color:#111827">
      <p style="margin:0 0 4px;color:#6b7280;font-size:13px">Formulario: <strong>${escapeHtml(label)}</strong> · ${fecha}</p>
      <h2 style="margin:0 0 16px;font-size:20px">${escapeHtml(f.name)}</h2>
      ${verified ? '' : '<p style="background:#fef3c7;padding:10px 12px;border-radius:6px;margin:0 0 16px">reCAPTCHA no verificó este envío. Puede ser spam o alguien con bloqueador de anuncios: revísalo antes de responder. No se le envió respuesta automática.</p>'}
      <table style="border-collapse:collapse;font-size:15px">
        ${row('Correo', f.email)}
        ${row('Teléfono', f.phone)}
        ${row('Perfil / modelo', f.investmentModel)}
        ${row('Monto', f.investmentAmount)}
        ${row('Mensaje', f.message)}
      </table>
      <p style="margin:20px 0 0;font-size:14px">
        Responde a este correo para escribirle directo${waLink ? ` · <a href="${waLink}">Abrir WhatsApp</a>` : ''}
      </p>
    </div>`;

  await sendEmail(apiKey, {
    from: FROM,
    to: NOTIFY_TO,
    reply_to: f.email,
    subject,
    html,
  });
}

const AUTO_REPLY: Record<string, { es: string; en: string }> = {
  'investment-lead-capture': {
    es: 'Recibimos tu interés en invertir en plantas de agave con Gavé. Te escribiremos en los próximos días para entender lo que buscas y compartirte el detalle del modelo, los riesgos y los tiempos.',
    en: 'We received your interest in investing in agave plants with Gavé. We will write to you in the coming days to understand what you are looking for and share the details of the model, its risks and timelines.',
  },
  'hijuelos-espadin-lead': {
    es: 'Recibimos tu solicitud de cotización de hijuelos. Te enviaremos disponibilidad, precio y tiempos de entrega para tu región en los próximos días.',
    en: 'We received your request for an agave pup quote. We will send you availability, pricing and delivery times for your region in the coming days.',
  },
  'contact-general': {
    es: 'Recibimos tu mensaje. Te responderemos en los próximos días.',
    en: 'We received your message. We will get back to you in the coming days.',
  },
};

async function sendAutoReply(apiKey: string, f: LeadData) {
  const en = (f.language ?? '').toUpperCase() === 'EN';
  const texts = AUTO_REPLY[f.formType] ?? AUTO_REPLY['contact-general'];
  const firstName = escapeHtml(f.name.split(' ')[0] ?? '');
  const body = en ? texts.en : texts.es;
  const html = `
    <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#111827;font-size:15px;line-height:1.6">
      <p>${en ? 'Hi' : 'Hola'} ${firstName},</p>
      <p>${body}</p>
      <p>${en ? 'If you want to add anything, just reply to this email.' : 'Si quieres agregar algo, responde a este correo.'}</p>
      <p>${en ? 'Best,' : 'Saludos,'}<br>Gavé · <a href="https://gaveagro.com">gaveagro.com</a></p>
    </div>`;

  await sendEmail(apiKey, {
    from: FROM,
    to: [f.email],
    reply_to: REPLY_TO_GAVE,
    subject: en ? 'We received your message · Gavé' : 'Recibimos tu mensaje · Gavé',
    html,
  });
}

serve(handler);
