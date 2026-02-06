import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Calculator, TrendingUp, DollarSign, Leaf } from 'lucide-react';

const InvestmentSimulator = () => {
  const [language, setLanguage] = useState(() => {
    return (window as any).currentLanguage || 'ES';
  });

  const [plantYear, setPlantYear] = useState(2026);
  const [investmentAmount, setInvestmentAmount] = useState(50000);
  const [pricePerKg, setPricePerKg] = useState([12]);
  const [selectedSpecies, setSelectedSpecies] = useState('espadín');
  
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
      speciesLabel: 'Agave Species',
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
      totalROI: 'Total ROI',
      annualROI: 'Annual ROI',
      co2Sequestered: 'Total CO₂ Sequestered',
      simulate: 'Recalculate',
      disclaimer: 'These calculations are estimates based on current market conditions and historical data. Actual results may vary.',
      years: 'years',
      profitDistribution: 'Profit Distribution Explained',
      gaveShare: 'Gavé Share (35%)',
      investorShare: 'Investor Share (65%)',
      profitExplanation: 'After recovering your initial investment, Gavé keeps 35% of profits for cultivation management and finding buyers. You receive 65% of the profits.',
      grossProfit: 'Gross Profit',
      investmentRecovery: 'Investment Recovery',
      tons: 'tons'
    },
    ES: {
      title: 'Simulador de Inversión',
      subtitle: 'Calcula tus retornos potenciales con nuestra calculadora de inversión',
      speciesLabel: 'Especie de Agave',
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
      totalROI: 'ROI Total',
      annualROI: 'ROI Anual',
      co2Sequestered: 'Total CO₂ Capturado',
      simulate: 'Recalcular',
      disclaimer: 'Estos cálculos son estimaciones basadas en condiciones actuales del mercado y datos históricos. Los resultados reales pueden variar.',
      years: 'años',
      profitDistribution: 'Distribución de Ganancias Explicada',
      gaveShare: 'Parte de Gavé (35%)',
      investorShare: 'Parte del Inversionista (65%)',
      profitExplanation: 'Después de recuperar tu inversión inicial, Gavé se queda con el 35% de las ganancias por el manejo del cultivo y encontrar compradores. Tú recibes el 65% de las ganancias.',
      grossProfit: 'Ganancia Bruta',
      investmentRecovery: 'Recuperación de Inversión',
      tons: 'toneladas'
    }
  };

  const currentContent = content[language as keyof typeof content];

  const species = {
    'espadín': {
      name: 'Espadín',
      maturationYears: 5.5,
      weightPerPlant: 60
    },
    'salmiana': {
      name: 'Salmiana', 
      maturationYears: 7,
      weightPerPlant: 90
    }
  };

  // Pricing logic
  const getPlantPrice = (year: number) => {
    const prices: { [key: number]: number } = {
      2024: 350,
      2025: 300,
      2026: 250
    };
    return prices[year] || 250;
  };

  const getMaturationYears = () => {
    const totalMaturationYears = species[selectedSpecies as keyof typeof species].maturationYears;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0-11 (enero=0, mayo=4)
    
    // Si es mayo (mes 4) o después, usamos el año actual como referencia
    // Si es antes de mayo, usamos el año anterior
    const referenceYear = currentMonth >= 4 ? currentYear : currentYear - 1;
    
    // Calculamos cuántos años han pasado desde la plantación hasta mayo del año de referencia
    const yearsAlreadyGrown = referenceYear - plantYear;
    const remainingYears = Math.max(0, totalMaturationYears - yearsAlreadyGrown);
    return remainingYears;
  };

  // CO2 Sequestration calculation - CORRECTED to be per year over maturation period
  const calculateCO2Sequestration = (plantsCount: number, maturationYears: number) => {
    // Assuming density of 2,000 plants per hectare
    // 20-60 tons CO2 per hectare PER YEAR
    const hectares = plantsCount / 2000;
    const averageCO2PerHectarePerYear = 40; // Using average of 20-60 tons/hectare/year
    const totalCO2 = hectares * averageCO2PerHectarePerYear * maturationYears; // Total over entire maturation period
    return totalCO2;
  };

  // Calculations
  const plantPrice = getPlantPrice(plantYear);
  const plantsCount = Math.floor(investmentAmount / plantPrice);
  const maturationYears = getMaturationYears();
  const weightPerPlant = species[selectedSpecies as keyof typeof species].weightPerPlant;
  const totalWeight = plantsCount * weightPerPlant;
  const grossRevenue = totalWeight * pricePerKg[0];
  const profit = grossRevenue - investmentAmount;
  const gaveShare = profit * 0.35;
  const investorShare = profit * 0.65;
  const totalReturn = investmentAmount + investorShare;
  const totalROI = ((totalReturn - investmentAmount) / investmentAmount) * 100;
  const annualROI = totalROI / maturationYears;
  const co2Sequestered = calculateCO2Sequestration(plantsCount, maturationYears);

  return (
    <section id="investment-simulator" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gave-green">
            {currentContent.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Controls */}
            <Card className="border-gave-green/20">
              <CardHeader>
                <CardTitle className="flex items-center text-gave-green">
                  <Calculator className="w-5 h-5 mr-2" />
                  {language === 'EN' ? 'Investment Parameters' : 'Parámetros de Inversión'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">{currentContent.speciesLabel}</label>
                  <select 
                    value={selectedSpecies} 
                    onChange={(e) => setSelectedSpecies(e.target.value)}
                    className="w-full p-2 border border-input rounded-md bg-background"
                  >
                    <option value="espadín">Espadín (5.5 {currentContent.years}) - 60 kg</option>
                    <option value="salmiana">Salmiana (7 {currentContent.years}) - 90 kg</option>
                  </select>
                  <p className="text-xs text-muted-foreground mt-1">
                    {language === 'EN' ? 'Weight per plant at harvest:' : 'Peso por planta a la cosecha:'} {species[selectedSpecies as keyof typeof species].weightPerPlant} kg
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{currentContent.plantYearLabel}</label>
                  <select 
                    value={plantYear} 
                    onChange={(e) => setPlantYear(Number(e.target.value))}
                    className="w-full p-2 border border-input rounded-md bg-background"
                  >
                    <option value={2024}>2024 - $350 MXN</option>
                    <option value={2025}>2025 - $300 MXN</option>
                    <option value={2026}>2026 - $250 MXN</option>
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
                    className="border-gave-green/20"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {language === 'EN' ? 'Minimum: $50,000 MXN' : 'Mínimo: $50,000 MXN'}
                  </p>
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
            <Card className="border-gave-green/20">
              <CardHeader>
                <CardTitle className="flex items-center text-gave-green">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  {currentContent.results}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gave-sand/20 rounded-lg">
                    <div className="text-2xl font-bold text-gave-green">{plantsCount.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">{currentContent.plantsAcquired}</div>
                  </div>
                  <div className="text-center p-4 bg-gave-sand/20 rounded-lg">
                    <div className="text-2xl font-bold text-gave-green">{maturationYears}</div>
                    <div className="text-sm text-muted-foreground">{currentContent.maturationTime} ({currentContent.years})</div>
                  </div>
                </div>

                {/* CO2 Sequestration Section */}
                <div className="bg-gave-green/10 p-4 rounded-lg border border-gave-green/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Leaf className="w-5 h-5 text-gave-green mr-2" />
                      <span className="font-medium text-gave-green">{currentContent.co2Sequestered}:</span>
                    </div>
                    <span className="text-lg font-bold text-gave-green">{co2Sequestered.toFixed(1)} {currentContent.tons}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {language === 'EN' ? 'Based on 20-60 tons CO₂/hectare/year sequestration with 2,000 plants/hectare density over the entire maturation period' : 'Basado en 20-60 toneladas CO₂/hectárea/año con densidad de 2,000 plantas/hectárea durante todo el período de maduración'}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gave-sand/10 rounded">
                    <span className="font-medium">{currentContent.grossRevenue}:</span>
                    <span className="text-lg font-bold text-gave-green">${grossRevenue.toLocaleString()} MXN</span>
                  </div>
                  
                  <div className="text-sm text-muted-foreground px-3">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    {currentContent.profitDistribution}:
                  </div>
                  
                  <div className="bg-gave-sand/20 p-4 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-3">
                      {currentContent.profitExplanation}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span>{currentContent.grossProfit}:</span>
                        <span className="font-bold">${profit.toLocaleString()} MXN</span>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <span>{currentContent.gaveShare}:</span>
                        <span className="text-gave-earth">${gaveShare.toLocaleString()} MXN</span>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <span>{currentContent.investorShare}:</span>
                        <span className="text-gave-green font-bold">${investorShare.toLocaleString()} MXN</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold">{currentContent.totalReturn}:</span>
                    <span className="text-2xl font-bold text-gave-green">${totalReturn.toLocaleString()} MXN</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{currentContent.totalROI}:</span>
                    <span className="text-xl font-bold text-gave-natural">{totalROI.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{currentContent.annualROI}:</span>
                    <span className="text-lg font-bold text-gave-natural">{annualROI.toFixed(1)}%</span>
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
