// This file is no longer needed - email notifications are handled by Supabase edge function
export const enviarNotificacionRegistro = async (userData) => {
  console.log('Form data will be handled by edge function:', userData);
  return { success: true, message: 'Will be handled by edge function' };
};
