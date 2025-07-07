
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useContent } from '@/hooks/useContent';
import { toast } from 'sonner';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('hero');
  const { content: heroContent } = useContent('hero');
  const { content: siteSettings } = useContent('site-settings');

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
    if (heroContent && typeof heroContent === 'object') {
      // Verificar que heroContent tiene la estructura correcta
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
    if (siteSettings && typeof siteSettings === 'object') {
      // Verificar que siteSettings tiene la estructura correcta
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
    // Sistema de autenticación simple
    if (password === 'admin123') {
      setIsAuthenticated(true);
      toast.success('¡Acceso concedido al panel de administración!');
    } else {
      toast.error('Contraseña incorrecta');
    }
  };

  const handleSaveHero = () => {
    // Simular guardado de contenido
    console.log('Guardando contenido del Hero:', heroData);
    toast.success('¡Contenido del Hero guardado exitosamente!');
  };

  const handleSaveSite = () => {
    // Simular guardado de configuración del sitio
    console.log('Guardando configuración del sitio:', siteData);
    toast.success('¡Configuración del sitio guardada exitosamente!');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
            <p className="text-gray-600 mt-2">Ingresa la contraseña para acceder</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Ingresa la contraseña de administrador"
              />
            </div>
            
            <Button onClick={handleLogin} className="w-full">
              Acceder al Panel
            </Button>
            
            <p className="text-sm text-gray-500 text-center">
              Contraseña temporal: admin123
            </p>
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
            <h1 className="text-2xl font-bold text-gray-900">Panel de Administración - Gavé Agro</h1>
            <Button
              variant="outline"
              onClick={() => setIsAuthenticated(false)}
            >
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="hero">Página Principal</TabsTrigger>
            <TabsTrigger value="site">Configuración</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="images">Imágenes</TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Editar Contenido de la Página Principal</h2>
              
              <Tabs defaultValue="es" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="es">Español</TabsTrigger>
                  <TabsTrigger value="en">Inglés</TabsTrigger>
                </TabsList>

                <TabsContent value="es" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="mainTitle-es">Título Principal</Label>
                      <Input
                        id="mainTitle-es"
                        value={heroData.es.mainTitle}
                        onChange={(e) => setHeroData({
                          ...heroData,
                          es: { ...heroData.es, mainTitle: e.target.value }
                        })}
                        placeholder="Regenera la tierra."
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="subtitle-es">Subtítulo</Label>
                      <Input
                        id="subtitle-es"
                        value={heroData.es.subtitle}
                        onChange={(e) => setHeroData({
                          ...heroData,
                          es: { ...heroData.es, subtitle: e.target.value }
                        })}
                        placeholder="Genera retornos."
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description-es">Descripción</Label>
                    <Textarea
                      id="description-es"
                      value={heroData.es.description}
                      onChange={(e) => setHeroData({
                        ...heroData,
                        es: { ...heroData.es, description: e.target.value }
                      })}
                      placeholder="Invierte en cultivo regenerativo de agave..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="mission-es">Misión</Label>
                    <Input
                      id="mission-es"
                      value={heroData.es.mission}
                      onChange={(e) => setHeroData({
                        ...heroData,
                        es: { ...heroData.es, mission: e.target.value }
                      })}
                      placeholder="Cultivamos Agaves, restauramos suelos..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="formTitle-es">Título del Formulario</Label>
                      <Input
                        id="formTitle-es"
                        value={heroData.es.formTitle}
                        onChange={(e) => setHeroData({
                          ...heroData,
                          es: { ...heroData.es, formTitle: e.target.value }
                        })}
                        placeholder="Comienza tu Inversión Regenerativa"
                      />
                    </div>

                    <div>
                      <Label htmlFor="getStarted-es">Texto del Botón</Label>
                      <Input
                        id="getStarted-es"
                        value={heroData.es.getStarted}
                        onChange={(e) => setHeroData({
                          ...heroData,
                          es: { ...heroData.es, getStarted: e.target.value }
                        })}
                        placeholder="Comenzar"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="en" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="mainTitle-en">Main Title</Label>
                      <Input
                        id="mainTitle-en"
                        value={heroData.en.mainTitle}
                        onChange={(e) => setHeroData({
                          ...heroData,
                          en: { ...heroData.en, mainTitle: e.target.value }
                        })}
                        placeholder="Regenerate land."
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="subtitle-en">Subtitle</Label>
                      <Input
                        id="subtitle-en"
                        value={heroData.en.subtitle}
                        onChange={(e) => setHeroData({
                          ...heroData,
                          en: { ...heroData.en, subtitle: e.target.value }
                        })}
                        placeholder="Generate returns."
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description-en">Description</Label>
                    <Textarea
                      id="description-en"
                      value={heroData.en.description}
                      onChange={(e) => setHeroData({
                        ...heroData,
                        en: { ...heroData.en, description: e.target.value }
                      })}
                      placeholder="Invest in regenerative agave cultivation..."
                      rows={3}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 pt-4 border-t">
                <Button onClick={handleSaveHero} size="lg" className="bg-gave-yellow hover:bg-gave-yellow/90 text-gray-900">
                  Guardar Cambios del Hero
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="site" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Configuración General del Sitio</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title-es">Título del Sitio (Español)</Label>
                    <Input
                      id="title-es"
                      value={siteData.title_es}
                      onChange={(e) => setSiteData({
                        ...siteData,
                        title_es: e.target.value
                      })}
                      placeholder="Gavé - Inversión Regenerativa en Agave"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="title-en">Site Title (English)</Label>
                    <Input
                      id="title-en"
                      value={siteData.title_en}
                      onChange={(e) => setSiteData({
                        ...siteData,
                        title_en: e.target.value
                      })}
                      placeholder="Gavé - Regenerative Agave Investment"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description-es">Descripción del Sitio (Español)</Label>
                  <Textarea
                    id="description-es"
                    value={siteData.description_es}
                    onChange={(e) => setSiteData({
                      ...siteData,
                      description_es: e.target.value
                    })}
                    placeholder="Invierte en cultivo regenerativo de agave..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="description-en">Site Description (English)</Label>
                  <Textarea
                    id="description-en"
                    value={siteData.description_en}
                    onChange={(e) => setSiteData({
                      ...siteData,
                      description_en: e.target.value
                    })}
                    placeholder="Invest in regenerative agave cultivation..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-email">Email de Contacto</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={siteData.contact_email}
                      onChange={(e) => setSiteData({
                        ...siteData,
                        contact_email: e.target.value
                      })}
                      placeholder="hola@gaveagro.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      value={siteData.phone}
                      onChange={(e) => setSiteData({
                        ...siteData,
                        phone: e.target.value
                      })}
                      placeholder="+52 444 123 4567"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t">
                <Button onClick={handleSaveSite} size="lg" className="bg-gave-yellow hover:bg-gave-yellow/90 text-gray-900">
                  Guardar Configuración del Sitio
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="blog">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Gestión del Blog</h2>
              <p className="text-gray-600">
                Aquí podrás crear y editar posts del blog. Esta funcionalidad se implementará en la siguiente fase.
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="images">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Gestión de Imágenes</h2>
              <p className="text-gray-600">
                Aquí podrás subir y gestionar las imágenes del sitio. Esta funcionalidad se implementará en la siguiente fase.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
