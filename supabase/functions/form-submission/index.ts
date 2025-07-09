
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FormSubmission {
  name: string;
  email: string;
  phone?: string;
  investmentAmount?: string;
  investmentModel?: string;
  message?: string;
  formType: string;
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

    // Send notification email using Resend (if API key is available)
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
            from: 'notifications@gaveagro.com',
            to: ['hola@gaveagro.com'],
            subject: `Nueva solicitud de inversión - ${formData.name}`,
            html: `
              <h2>Nueva solicitud de inversión recibida</h2>
              <p><strong>Nombre:</strong> ${formData.name}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              <p><strong>Teléfono:</strong> ${formData.phone || 'No proporcionado'}</p>
              <p><strong>Monto de inversión:</strong> ${formData.investmentAmount || 'No especificado'}</p>
              <p><strong>Modelo de inversión:</strong> ${formData.investmentModel || 'No especificado'}</p>
              <p><strong>Mensaje:</strong> ${formData.message || 'Sin mensaje adicional'}</p>
              <p><strong>Tipo de formulario:</strong> ${formData.formType}</p>
              <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-MX')}</p>
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
