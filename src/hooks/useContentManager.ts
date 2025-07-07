
import { useState } from 'react';
import { toast } from 'sonner';

interface ContentData {
  [key: string]: any;
}

export const useContentManager = () => {
  const [isSaving, setIsSaving] = useState(false);

  const saveContent = async (type: string, data: ContentData) => {
    setIsSaving(true);
    try {
      // Simular guardado (en una implementación real, esto sería una API call)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Crear backup
      const backup = {
        type,
        data,
        timestamp: new Date().toISOString(),
        id: Math.random().toString(36).substr(2, 9)
      };
      
      // Guardar en localStorage como backup
      const existingBackups = JSON.parse(localStorage.getItem('content-backups') || '[]');
      existingBackups.push(backup);
      
      // Mantener solo los últimos 10 backups
      if (existingBackups.length > 10) {
        existingBackups.splice(0, existingBackups.length - 10);
      }
      
      localStorage.setItem('content-backups', JSON.stringify(existingBackups));
      localStorage.setItem(`content-${type}`, JSON.stringify(data));
      
      toast.success(`✅ ${type === 'hero' ? 'Contenido principal' : 'Configuración'} guardado exitosamente`);
      return true;
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('❌ Error al guardar. Inténtalo de nuevo.');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const loadContent = (type: string): ContentData | null => {
    try {
      const stored = localStorage.getItem(`content-${type}`);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error loading content:', error);
      return null;
    }
  };

  const getBackups = () => {
    try {
      return JSON.parse(localStorage.getItem('content-backups') || '[]');
    } catch (error) {
      return [];
    }
  };

  const restoreBackup = (backupId: string) => {
    try {
      const backups = getBackups();
      const backup = backups.find((b: any) => b.id === backupId);
      if (backup) {
        localStorage.setItem(`content-${backup.type}`, JSON.stringify(backup.data));
        toast.success('🔄 Backup restaurado exitosamente');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error restoring backup:', error);
      toast.error('❌ Error al restaurar backup');
      return false;
    }
  };

  return {
    saveContent,
    loadContent,
    getBackups,
    restoreBackup,
    isSaving
  };
};
