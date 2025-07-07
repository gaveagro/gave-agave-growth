
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useContent } from '@/hooks/useContent';
import { useContentManager } from '@/hooks/useContentManager';
import { toast } from 'sonner';
import VisualEditor from '@/components/admin/VisualEditor';
import BackupManager from '@/components/admin/BackupManager';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('hero');
  const { content: heroContent } = useContent('hero');
  const { content: siteSettings } = useContent('site-settings');
  const { saveContent, loadContent, isSaving } = useContentManager();

  // Datos del contenido para editar
  const [heroData, setHeroData] = useState({
    es: {
      mainTitle: '',
      subtitle: '',
      description: '',
      mission: '',
      formTitle: '',
      emailPlaceholder: '',
      getStarted: '',
      joinText: '',
      thankYou: '',
      thankYouText: ''
    },
    en: {
      mainTitle: '',
      subtitle: '',
      description: '',
      mission: '',
      formTitle: '',
      emailPlaceholder: '',
      getStarted: '',
      joinText: '',
      thankYou: '',
      thankYouText: ''
    },
    backgroundImage: ''
  });

  const [siteData, setSiteData] = useState({
    title_es: '',
    title_en: '',
    description_es: '',
    description_en: '',
    contact_email: '',
    phone: ''
  });

  // Cargar datos del contenido existente
  useEffect(() => {
    // Primero intentar cargar desde localStorage (contenido editado)
    const savedHeroData = loadContent('hero');
    if (savedHeroData) {
      setHeroData(savedHeroData);
    } else if (heroContent && typeof heroContent === 'object') {
      // Si no hay contenido guardado, usar el contenido original
      if ('es' in heroContent && 'en' in heroContent) {
        setHeroData({
          es: heroContent.es || heroData.es,
          en: heroContent.en || heroData.en,
          backgroundImage: heroContent.backgroundImage || ''
        });
      }
    }
  }, [heroContent]);

  useEffect(() => {
    const savedSiteData = loadContent('site');
    if (savedSiteData) {
      setSiteData(savedSiteData);
    } else if (siteSettings && typeof siteSettings === 'object') {
      if ('title_es' in siteSettings) {
        setSiteData({
          title_es: siteSettings.title_es || '',
          title_en: siteSettings.title_en || '',
          description_es: siteSettings.description_es || '',
          description_en: siteSettings.description_en || '',
          contact_email: siteSettings.contact_email || '',
          phone: siteSettings.phone || ''
        });
      }
    }
  }, [siteSettings]);

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
      toast.success('🎉 ¡Bienvenido al Panel de Administración Visual!');
    } else {
      toast.error('❌ Contraseña incorrecta');
    }
  };

  const handleSaveHero = async (data: any) => {
    const success = await saveContent('hero', data);
    if (success) {
      setHeroData(data);
    }
  };

  const handleSaveSite = async () => {
    const success = await saveContent('site', siteData);
    if (success) {
      // Datos guardados exitosamente
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gave-yellow/10 to-green-50 flex items-center justify-center">
        <Card className="w-full max-w-md p-8 shadow-xl">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gave-yellow rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔐</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
            <p className="text-gray-600 mt-2">Constructor Visual para Gavé Agro</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="password">Contraseña de Administrador</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Ingresa la contraseña"
                className="mt-2"
              />
            </div>
            
            <Button onClick={handleLogin} className="w-full bg-gave-yellow hover:bg-gave-yellow/90 text-gray-900">
              🚀 Acceder al Constructor Visual
            </Button>
            
            <div className="text-center p-3 bg-amber-50 rounded-lg">
              <p className="text-sm text-amber-700 font-medium">
                🔑 Contraseña temporal: <code className="bg-amber-100 px-2 py-1 rounded">admin123</code>
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gave-yellow rounded-lg flex items-center justify-center">
                <span className="text-xl">🎨</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Constructor Visual - Gavé Agro</h1>
                <p className="text-sm text-gray-600">Panel de administración personalizado</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsAuthenticated(false)}
              className="text-red-600 hover:text-red-700"
            >
              🚪 Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
            <TabsTrigger value="hero" className="flex items-center gap-2">
              🏠 Página Principal
            </TabsTrigger>
            <TabsTrigger value="site" className="flex items-center gap-2">
              ⚙️ Configuración
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2">
              📝 Blog
            </TabsTrigger>
            <TabsTrigger value="backups" className="flex items-center gap-2">
              🔄 Respaldos
            </TabsTrigger>
            <TabsTrigger value="help" className="flex items-center gap-2">
              ❓ Ayuda
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-6">
            <VisualEditor
              initialData={heroData}
              onSave={handleSaveHero}
            />
          </TabsContent>

          <TabsContent value="site" className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    ⚙️ Configuración General del Sitio
                  </h2>
                  <p className="text-gray-600 mt-1">Edita la información general de tu sitio web</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="title-es" className="text-base font-medium">
                      🇪🇸 Título del Sitio (Español)
                    </Label>
                    <Input
                      id="title-es"
                      value={siteData.title_es}
                      onChange={(e) => setSiteData({
                        ...siteData,
                        title_es: e.target.value
                      })}
                      placeholder="Gavé - Inversión Regenerativa en Agave"
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="title-en" className="text-base font-medium">
                      🇺🇸 Site Title (English)
                    </Label>
                    <Input
                      id="title-en"
                      value={siteData.title_en}
                      onChange={(e) => setSiteData({
                        ...siteData,
                        title_en: e.target.value
                      })}
                      placeholder="Gavé - Regenerative Agave Investment"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="contact-email" className="text-base font-medium">
                      ✉️ Email de Contacto
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={siteData.contact_email}
                      onChange={(e) => setSiteData({
                        ...siteData,
                        contact_email: e.target.value
                      })}
                      placeholder="hola@gaveagro.com"
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-base font-medium">
                      📞 Teléfono
                    </Label>
                    <Input
                      id="phone"
                      value={siteData.phone}
                      onChange={(e) => setSiteData({
                        ...siteData,
                        phone: e.target.value
                      })}
                      placeholder="+52 444 123 4567"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t">
                <Button 
                  onClick={handleSaveSite} 
                  disabled={isSaving}
                  size="lg" 
                  className="bg-gave-yellow hover:bg-gave-yellow/90 text-gray-900"
                >
                  {isSaving ? '💾 Guardando...' : '💾 Guardar Configuración'}
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="blog">
            <Card className="p-6">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <h2 className="text-xl font-semibold mb-2">Editor de Blog</h2>
                <p className="text-gray-600 mb-6">
                  Próximamente tendrás un editor visual completo para crear y editar posts del blog.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg max-w-md mx-auto">
                  <p className="text-sm text-blue-700">
                    🚀 Esta funcionalidad se está desarrollando y estará disponible pronto.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="backups">
            <BackupManager />
          </TabsContent>

          <TabsContent value="help">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                ❓ Ayuda y Guía de Uso
              </h2>
              
              <div className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">🎯 ¿Cómo usar este panel?</h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• <strong>Página Principal:</strong> Edita títulos, descripciones y textos de botones</li>
                    <li>• <strong>Configuración:</strong> Modifica información general del sitio</li>
                    <li>• <strong>Respaldos:</strong> Restaura versiones anteriores de tu contenido</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">🔧 Próximas Funcionalidades</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• ✍️ Editor de blog con texto enriquecido</li>
                    <li>• 🖼️ Galería de imágenes con upload</li>
                    <li>• 🎨 Editor de colores y fuentes</li>
                    <li>• 🔗 Editor de URLs y enlaces</li>
                    <li>• 📊 Analytics y estadísticas</li>
                  </ul>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-amber-800 mb-2">🌐 Hosting y Dominio</h3>
                  <p className="text-sm text-amber-700">
                    Para conectar tu dominio personalizado (www.gaveagro.com), recomendamos usar GitHub + Netlify. 
                    Esto te permitirá mantener el sitio actualizado automáticamente sin costos adicionales.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
