
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useContentManager } from '@/hooks/useContentManager';

interface VisualEditorProps {
  initialData: any;
  onSave: (data: any) => void;
}

const VisualEditor = ({ initialData, onSave }: VisualEditorProps) => {
  const [heroData, setHeroData] = useState(initialData);
  const { saveContent, isSaving } = useContentManager();

  const handleSave = async () => {
    const success = await saveContent('hero', heroData);
    if (success) {
      onSave(heroData);
    }
  };

  const updateField = (lang: string, field: string, value: string) => {
    setHeroData((prev: any) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [field]: value
      }
    }));
  };

  const updateGlobalField = (field: string, value: string) => {
    setHeroData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Editor Visual - Página Principal</h2>
          <p className="text-gray-600 mt-1">Edita el contenido principal de tu sitio web</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700">
          Panel Personalizado
        </Badge>
      </div>
      
      <Tabs defaultValue="es" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList className="grid w-48 grid-cols-2">
            <TabsTrigger value="es" className="flex items-center gap-2">
              🇪🇸 Español
            </TabsTrigger>
            <TabsTrigger value="en" className="flex items-center gap-2">
              🇺🇸 English
            </TabsTrigger>
          </TabsList>
          
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            size="lg"
            className="bg-gave-yellow hover:bg-gave-yellow/90 text-gray-900"
          >
            {isSaving ? '💾 Guardando...' : '💾 Guardar Cambios'}
          </Button>
        </div>

        <TabsContent value="es" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="mainTitle-es" className="text-base font-medium">
                  🎯 Título Principal
                </Label>
                <Input
                  id="mainTitle-es"
                  value={heroData.es?.mainTitle || ''}
                  onChange={(e) => updateField('es', 'mainTitle', e.target.value)}
                  placeholder="Regenera la tierra."
                  className="mt-2 text-lg"
                />
                <p className="text-sm text-gray-500 mt-1">El título más grande en la portada</p>
              </div>
              
              <div>
                <Label htmlFor="subtitle-es" className="text-base font-medium">
                  ✨ Subtítulo
                </Label>
                <Input
                  id="subtitle-es"
                  value={heroData.es?.subtitle || ''}
                  onChange={(e) => updateField('es', 'subtitle', e.target.value)}
                  placeholder="Genera retornos."
                  className="mt-2 text-lg"
                />
                <p className="text-sm text-gray-500 mt-1">El texto amarillo debajo del título</p>
              </div>

              <div>
                <Label htmlFor="description-es" className="text-base font-medium">
                  📝 Descripción Principal
                </Label>
                <Textarea
                  id="description-es"
                  value={heroData.es?.description || ''}
                  onChange={(e) => updateField('es', 'description', e.target.value)}
                  placeholder="Invierte en cultivo regenerativo de agave..."
                  rows={4}
                  className="mt-2"
                />
                <p className="text-sm text-gray-500 mt-1">Descripción detallada del proyecto</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="mission-es" className="text-base font-medium">
                  🌱 Mensaje de Misión
                </Label>
                <Input
                  id="mission-es"
                  value={heroData.es?.mission || ''}
                  onChange={(e) => updateField('es', 'mission', e.target.value)}
                  placeholder="Cultivamos Agaves, restauramos suelos..."
                  className="mt-2"
                />
                <p className="text-sm text-gray-500 mt-1">Frase que describe la misión</p>
              </div>

              <div>
                <Label htmlFor="formTitle-es" className="text-base font-medium">
                  📋 Título del Formulario
                </Label>
                <Input
                  id="formTitle-es"
                  value={heroData.es?.formTitle || ''}
                  onChange={(e) => updateField('es', 'formTitle', e.target.value)}
                  placeholder="Comienza tu Inversión Regenerativa"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="getStarted-es" className="text-base font-medium">
                  🚀 Texto del Botón Principal
                </Label>
                <Input
                  id="getStarted-es"
                  value={heroData.es?.getStarted || ''}
                  onChange={(e) => updateField('es', 'getStarted', e.target.value)}
                  placeholder="Comenzar"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="emailPlaceholder-es" className="text-base font-medium">
                  ✉️ Placeholder del Email
                </Label>
                <Input
                  id="emailPlaceholder-es"
                  value={heroData.es?.emailPlaceholder || ''}
                  onChange={(e) => updateField('es', 'emailPlaceholder', e.target.value)}
                  placeholder="Ingresa tu dirección de correo"
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="en" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="mainTitle-en" className="text-base font-medium">
                  🎯 Main Title
                </Label>
                <Input
                  id="mainTitle-en"
                  value={heroData.en?.mainTitle || ''}
                  onChange={(e) => updateField('en', 'mainTitle', e.target.value)}
                  placeholder="Regenerate land."
                  className="mt-2 text-lg"
                />
                <p className="text-sm text-gray-500 mt-1">The biggest title on the homepage</p>
              </div>
              
              <div>
                <Label htmlFor="subtitle-en" className="text-base font-medium">
                  ✨ Subtitle
                </Label>
                <Input
                  id="subtitle-en"
                  value={heroData.en?.subtitle || ''}
                  onChange={(e) => updateField('en', 'subtitle', e.target.value)}
                  placeholder="Generate returns."
                  className="mt-2 text-lg"
                />
                <p className="text-sm text-gray-500 mt-1">The yellow text below the title</p>
              </div>

              <div>
                <Label htmlFor="description-en" className="text-base font-medium">
                  📝 Main Description
                </Label>
                <Textarea
                  id="description-en"
                  value={heroData.en?.description || ''}
                  onChange={(e) => updateField('en', 'description', e.target.value)}
                  placeholder="Invest in regenerative agave cultivation..."
                  rows={4}
                  className="mt-2"
                />
                <p className="text-sm text-gray-500 mt-1">Detailed project description</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="mission-en" className="text-base font-medium">
                  🌱 Mission Message
                </Label>
                <Input
                  id="mission-en"
                  value={heroData.en?.mission || ''}
                  onChange={(e) => updateField('en', 'mission', e.target.value)}
                  placeholder="Growing healthy soil and restoring degraded ecosystems."
                  className="mt-2"
                />
                <p className="text-sm text-gray-500 mt-1">Phrase describing the mission</p>
              </div>

              <div>
                <Label htmlFor="formTitle-en" className="text-base font-medium">
                  📋 Form Title
                </Label>
                <Input
                  id="formTitle-en"
                  value={heroData.en?.formTitle || ''}
                  onChange={(e) => updateField('en', 'formTitle', e.target.value)}
                  placeholder="Start Your Regenerative Investment"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="getStarted-en" className="text-base font-medium">
                  🚀 Main Button Text
                </Label>
                <Input
                  id="getStarted-en"
                  value={heroData.en?.getStarted || ''}
                  onChange={(e) => updateField('en', 'getStarted', e.target.value)}
                  placeholder="Get Started"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="emailPlaceholder-en" className="text-base font-medium">
                  ✉️ Email Placeholder
                </Label>
                <Input
                  id="emailPlaceholder-en"
                  value={heroData.en?.emailPlaceholder || ''}
                  onChange={(e) => updateField('en', 'emailPlaceholder', e.target.value)}
                  placeholder="Enter your email address"
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Separator className="my-6" />
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          🖼️ Configuración Visual
        </h3>
        
        <div>
          <Label htmlFor="backgroundImage" className="text-base font-medium">
            Imagen de Fondo
          </Label>
          <Input
            id="backgroundImage"
            value={heroData.backgroundImage || ''}
            onChange={(e) => updateGlobalField('backgroundImage', e.target.value)}
            placeholder="/lovable-uploads/imagen.png"
            className="mt-2"
          />
          <p className="text-sm text-gray-500 mt-1">URL de la imagen de fondo de la portada</p>
        </div>
      </div>
    </Card>
  );
};

export default VisualEditor;
