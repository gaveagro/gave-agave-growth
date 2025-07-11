import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PrivacyPolicy = () => {
  const [language, setLanguage] = useState(() => {
    return (window as any).currentLanguage || 'EN';
  });

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    
    const currentLang = (window as any).currentLanguage;
    if (currentLang && currentLang !== language) {
      setLanguage(currentLang);
    }

    return () => window.removeEventListener('languageChange', handleLanguageChange as EventListener);
  }, [language]);

  const content = {
    EN: {
      title: 'Privacy Policy',
      backToHome: 'Back to Home'
    },
    ES: {
      title: 'Aviso de Privacidad',
      backToHome: 'Volver al Inicio'
    }
  };

  const currentContent = content[language as keyof typeof content];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/4c7e4344-7b1e-4dac-8922-7356da9646e3.png" 
                alt="Gavé"
                className="w-14 h-14 object-contain"
              />
            </div>
            <Link to="/">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>{currentContent.backToHome}</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-primary">
            {currentContent.title}
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <div>
              <p className="font-semibold text-lg mb-4">Fecha de publicación: 2025</p>
            </div>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Responsable que recaba la información</h2>
              <p>
                El responsable del tratamiento de sus datos personales es la entidad denominada GAVE AGROTECNOLOGÍA, S.P.R. DE R.L. DE C.V. (en lo sucesivo "Gavé").
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Finalidades del tratamiento de datos</h2>
              <p>
                La finalidad con la que Gavé recaba y trata sus datos personales, es para proveer aquellos servicios que se contemplan dentro de su objeto social, incluyendo, más no limitando, cualquier acuerdo o contrato relacionado con el uso de nuestro sitio web, aplicaciones móviles, software, plataformas y/o cualesquiera otros servicios que voluntariamente, usted decida adquirir o realizar (en lo sucesivo los "Servicios").
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Medios para ejercer los derechos de acceso, rectificación, cancelación u oposición (ARCO)</h2>
              <p>
                Por sus propios derechos, o por conducto de su representante legal, usted podrá ejercer cualquiera de los derechos de acceso, rectificación, cancelación u oposición (en lo sucesivo "Derechos ARCO"), así como revocar su consentimiento para el tratamiento de sus datos personales enviando un correo electrónico a la dirección <a href="mailto:hola@gaveagro.com" className="text-primary hover:underline">hola@gaveagro.com</a> donde se le atenderá en tiempo y forma.
              </p>
              <p>
                Su petición deberá ser realizada a través del "Formulario para el Ejercicio de Derechos ARCO, Limitación del Uso o Divulgación de Datos Personales" (en lo sucesivo el "Formulario") que se encuentra a su disposición en la siguiente página web: https://www.gaveagro.com/aviso-privacidad y contiene todos los elementos para poder atender su solicitud conforme a la normatividad vigente aplicable. Para que Gavé pueda darle seguimiento a su solicitud, usted o su representante legal, según sea el caso, deberá completar todos los campos indicados en el Formulario y acompañarlo de una copia simple de alguna identificación oficial vigente de las que se señalan en el mismo, a efectos de acreditar correcta y fehacientemente su identidad.
              </p>
              <p>
                En caso de que la información proporcionada en el Formulario sea errónea o insuficiente, o bien, no se acompañen los documentos de acreditación correspondientes, Gavé podrá requerir los elementos o documentos que hayan faltado, dentro de los 5 (cinco) días hábiles siguientes a la recepción de la solicitud, a efectos de dar trámite a la misma. Bajo este supuesto, usted contará con diez (10) días hábiles contados a partir de la recepción del requerimiento de Gavé, para atenderlo en tiempo y forma. En caso de no dar respuesta en dicho plazo, se tendrá por no presentada la solicitud correspondiente.
              </p>
              <p>
                Gavé le comunicará su resolución adoptada, en un plazo máximo de veinte (20) días hábiles contados desde la fecha en que se recibió la solicitud, a efecto de que, si resulta procedente, se haga efectiva la misma dentro de los quince (15) días hábiles siguientes a que se comunique la respuesta. La respuesta se dará vía electrónica a la dirección de correo que haya sido indicada o sea especificada en el Formulario.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Opciones y medios que el responsable ofrezca a los titulares para limitar el uso o divulgación de los datos</h2>
              <p>
                Los requisitos para acreditar su identidad, así como el procedimiento para atender su solicitud, se regirán por los mismos criterios señalados en el apartado inmediato que antecede.
              </p>
              <p>
                En caso de que su solicitud resulte procedente, será registrado en el listado de exclusión propio de Gavé con el objeto de que usted deje de recibir nuestras promociones.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Transferencias de datos</h2>
              <p>
                Gavé podrá transferir sus datos personales tanto a entidades nacionales como extranjeras, bajo los siguientes supuestos:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Autoridades competentes y terceros en los casos legalmente previstos.</li>
                <li>Al Instituto Nacional Electoral (INE) para fines de validación y autenticación de su identidad, conforme a las finalidades descritas en el presente Aviso de Privacidad.</li>
                <li>A empresas subsidiarias, filiales, o que formen parte del mismo grupo empresarial de Gavé, para que éstas le puedan contactar, directa o indirectamente, para llevar a cabo actividades de promoción y/u ofrecimiento de productos y/o servicios que dichas empresas pueden comercializar y/o prestar de manera conjunta con Gavé o de manera independiente. Todas las empresas subsidiarias, filiales, o pertenecientes al mismo grupo empresarial de Gavé, operan bajo políticas de privacidad que cumplen con las disposiciones aplicables correspondientes.</li>
                <li>A los terceros que usted autorice para que se les proporcione información relacionada con los Servicios.</li>
                <li>En el caso de contar con su consentimiento, Gavé podrá transferir sus datos personales a socios comerciales y/o terceros, para que estos puedan contactarle y ofrecerle bienes y/o servicios que resulten de su interés, o bien, para que puedan determinar si usted es sujeto a adquirir los bienes y/o servicios que dichos socios comerciales y/o terceros ofrecen.</li>
                <li>Si usted no desea que Gavé lleve a cabo la transferencia de datos personales referida en el párrafo que antecede, usted deberá enviar un correo electrónico a la siguiente dirección: <a href="mailto:hola@gaveagro.com" className="text-primary hover:underline">hola@gaveagro.com</a>. Usted podrá cambiar su consentimiento en cualquier momento.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Cambios al presente Aviso de Privacidad</h2>
              <p>
                Gavé se reserva el derecho de cambiar, modificar, agregar o eliminar partes del presente Aviso de Privacidad en cualquier momento, bajo su exclusiva discreción. En tal caso, Gavé mantendrá su Aviso de Privacidad Integral vigente en el siguiente sitio web: https://www.gaveagro.com/aviso-privacidad, motivo por el cual, le recomendamos visitar periódicamente esta página con la finalidad de informarse si ocurre algún cambio al presente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Cookies y/o web beacons</h2>
              <p>
                Nuestros sitios de internet y aplicaciones pueden hacer uso de cookies, web beacons y otras tecnologías de rastreo que nos permiten cumplir con las finalidades informadas en el presente Aviso de Privacidad.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">INAI</h2>
              <p>
                De manera adicional a las medidas internas que ofrece Gavé, le informamos que, en caso de considerarlo necesario, usted tiene el derecho de acudir ante el Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI) para hacer valer cualquier inconformidad relacionada con el tratamiento de sus datos personales por parte de Gavé.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;