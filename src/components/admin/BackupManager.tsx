
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useContentManager } from '@/hooks/useContentManager';
import { toast } from 'sonner';

const BackupManager = () => {
  const [backups, setBackups] = useState([]);
  const { getBackups, restoreBackup } = useContentManager();

  useEffect(() => {
    setBackups(getBackups());
  }, []);

  const handleRestore = (backupId: string) => {
    if (confirm('¿Estás seguro de que quieres restaurar este backup? Los cambios actuales se perderán.')) {
      const success = restoreBackup(backupId);
      if (success) {
        setBackups(getBackups());
        // Recargar la página para mostrar los cambios
        setTimeout(() => window.location.reload(), 1000);
      }
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportBackup = (backup: any) => {
    const dataStr = JSON.stringify(backup, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `backup-${backup.type}-${backup.timestamp.split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success('📦 Backup exportado exitosamente');
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">🔄 Gestión de Respaldos</h2>
          <p className="text-gray-600 mt-1">Restaura versiones anteriores de tu contenido</p>
        </div>
        <Badge variant="outline">
          {backups.length} respaldos disponibles
        </Badge>
      </div>

      {backups.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>📋 No hay respaldos disponibles aún.</p>
          <p className="text-sm mt-2">Los respaldos se crean automáticamente al guardar cambios.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {backups.reverse().map((backup: any) => (
            <div key={backup.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <Badge variant={backup.type === 'hero' ? 'default' : 'secondary'}>
                    {backup.type === 'hero' ? '🏠 Página Principal' : '⚙️ Configuración'}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    {formatDate(backup.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  ID: {backup.id}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportBackup(backup)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  📦 Exportar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRestore(backup.id)}
                  className="text-green-600 hover:text-green-700"
                >
                  🔄 Restaurar
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default BackupManager;
