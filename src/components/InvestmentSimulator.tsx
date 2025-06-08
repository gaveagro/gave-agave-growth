
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';

const InvestmentSimulator = () => {
  const [language, setLanguage] = useState(() => {
    return (window as any).currentLanguage || 'EN';
  });

  const [plantYear, setPlantYear] = useState(2024);
  const [investmentAmount, setInvestmentAmount] = useState(50000);
  const [weightPerPlant, setWeightPerPlant] = useState([50]);
  const [pricePerKg, setPricePerKg] = useState([12]);
  
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
      title: 'Investment Simulator',
      subtitle: 'Calculate your potential returns with our investment calculator',
      plantYearLabel: 'Plant Year',
      investmentLabel: 'Initial Investment (MXN)',
      weightLabel: 'Weight per Plant at Harvest (kg)',
      priceLabel: 'Market Price per kg (MXN)',
      results: 'Projected Results',
      plantsAcquired: 'Plants Acquired',
      maturationTime: 'Maturation Time',
      grossRevenue: 'Gross Revenue',
      yourReturn: 'Your Return',
      totalReturn: 'Total Return',
      annualROI: 'Annual ROI',
      simulate: 'Recalculate',
      disclaimer: 'These calculations are estimates based on current market conditions and historical data. Actual results may vary.',
      years: 'years'
    },
    ES: {
      title: 'Simulador de Inversión',
      subtitle: 'Calcula tus retornos potenciales con nuestra calculadora de inversión',
      plantYearLabel: 'Año de Planta',
      investmentLabel: 'Inversión Inicial (MXN)',
      weightLabel: 'Peso por Planta en Cosecha (kg)',
      priceLabel: 'Precio de Mercado por kg (MXN)',
      results: 'Resultados Proyectados',
      plantsAcquired: 'Plantas Adquiridas',
      maturationTime: 'Tiempo de Maduración',
      grossRevenue: 'Ingresos Brutos',
      yourReturn: 'Tu Retorno',
      totalReturn: 'Retorno Total',
      annualROI: 'ROI Anual',
      simulate: 'Recalcular',
      disclaimer: 'Estos cálculos son estimaciones basadas en condiciones actuales del mercado y datos históricos. Los resultados reales pueden variar.',
      years: 'años'
    }
  };

  const currentContent = content[language as keyof typeof content];

  // Pricing logic
  const getPlantPrice = (year: number) => {
    const basePrice = 250;
    const yearDiff = 2025 - year;
    return basePrice + (yearDiff * 50);
  };

  const getMaturationYears = () => {
    return 6; // Assuming Espadín for simplicity
  };

  // Calculations
  const plantPrice = getPlantPrice(plantYear);
  const plantsCount = Math.floor(investmentAmount / plantPrice);
  const maturationYears = getMaturationYears();
  const totalWeight = plantsCount * weightPerPlant[0];
  const grossRevenue = totalWeight * pricePerKg[0];
  const profit = grossRevenue - investmentAmount;
  const investorShare = profit * 0.65;
  const totalReturn = investmentAmount + investorShare;
  const totalROI = ((totalReturn - investmentAmount) / investmentAmount) * 100;
  const annualROI = totalROI / maturationYears;

  return (
    <section id="investment-simulator" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gave-blue">
            {currentContent.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Controls */}
            <Card className="border-gave-blue/20">
              <CardHeader>
                <CardTitle className="flex items-center text-gave-blue">
                  <Calculator className="w-5 h-5 mr-2" />
                  {language === 'EN' ? 'Investment Parameters' : 'Parámetros de Inversión'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">{currentContent.plantYearLabel}</label>
                  <select 
                    value={plantYear} 
                    onChange={(e) => setPlantYear(Number(e.target.value))}
                    className="w-full p-2 border border-input rounded-md bg-background"
                  >
                    <option value={2021}>2021 - $450 MXN</option>
                    <option value={2022}>2022 - $400 MXN</option>
                    <option value={2023}>2023 - $350 MXN</option>
                    <option value={2024}>2024 - $300 MXN</option>
                    <option value={2025}>2025 - $250 MXN</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{currentContent.investmentLabel}</label>
                  <Input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    min={50000}
                    step={1000}
                    className="border-gave-blue/20"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {language === 'EN' ? 'Minimum: $50,000 MXN' : 'Mínimo: $50,000 MXN'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {currentContent.weightLabel}: {weightPerPlant[0]} kg
                  </label>
                  <Slider
                    value={weightPerPlant}
                    onValueChange={setWeightPerPlant}
                    max={120}
                    min={30}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>30 kg</span>
                    <span>120 kg</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {currentContent.priceLabel}: ${pricePerKg[0]} MXN
                  </label>
                  <Slider
                    value={pricePerKg}
                    onValueChange={setPricePerKg}
                    max={50}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>$0 MXN</span>
                    <span>$50 MXN</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {language === 'EN' ? 'Normal range: $8-15 MXN' : 'Rango normal: $8-15 MXN'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <Card className="border-gave-blue/20">
              <CardHeader>
                <CardTitle className="flex items-center text-gave-blue">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  {currentContent.results}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gave-sand/20 rounded-lg">
                    <div className="text-2xl font-bold text-gave-blue">{plantsCount.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">{currentContent.plantsAcquired}</div>
                  </div>
                  <div className="text-center p-4 bg-gave-sand/20 rounded-lg">
                    <div className="text-2xl font-bold text-gave-blue">{maturationYears}</div>
                    <div className="text-sm text-muted-foreground">{currentContent.maturationTime} ({currentContent.years})</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gave-sand/10 rounded">
                    <span className="font-medium">{currentContent.grossRevenue}:</span>
                    <span className="text-lg font-bold text-gave-blue">${grossRevenue.toLocaleString()} MXN</span>
                  </div>
                  
                  <div className="text-sm text-muted-foreground px-3">
                    {language === 'EN' ? 'Profit calculation:' : 'Cálculo de ganancias:'}
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gave-sand/10 rounded">
                    <span>{language === 'EN' ? 'Gross Profit:' : 'Ganancia Bruta:'}</span>
                    <span className="font-bold">${profit.toLocaleString()} MXN</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gave-blue/10 rounded">
                    <span className="font-medium">{currentContent.yourReturn} (65%):</span>
                    <span className="text-lg font-bold text-gave-blue">${investorShare.toLocaleString()} MXN</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold">{currentContent.totalReturn}:</span>
                    <span className="text-2xl font-bold text-gave-blue">${totalReturn.toLocaleString()} MXN</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{currentContent.annualROI}:</span>
                    <span className="text-xl font-bold text-gave-green">{annualROI.toFixed(1)}%</span>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground bg-gave-sand/20 p-3 rounded">
                  {currentContent.disclaimer}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentSimulator;
