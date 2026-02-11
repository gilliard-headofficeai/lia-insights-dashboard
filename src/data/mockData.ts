export const kpiData = [
  { title: "Leads Ativos Totais", value: "12.450", change: 12, positive: true, icon: "Users" as const },
  { title: "Msgs/Lead (Média)", value: "8,4", change: -2.1, positive: false, icon: "MessageSquare" as const },
  { title: "Taxa de Conversão", value: "14,2%", change: 4.5, positive: true, icon: "TrendingUp" as const },
  { title: "Retenção (Dia 7)", value: "42%", change: 1.2, positive: true, icon: "RefreshCw" as const },
];

export const cohortData = [
  { cohort: "Out 23", values: [12.4, 8.2, 6.1, 4.8, 3.9, 3.2, 2.4, 1.5] },
  { cohort: "Out 30", values: [14.1, 9.5, 7.0, 5.5, 4.2, 3.5, 2.8, 1.8] },
  { cohort: "Nov 06", values: [11.8, 7.8, 5.6, 4.3, 3.4, 2.7, 2.0, 1.2] },
  { cohort: "Nov 13", values: [13.2, 8.9, 6.5, 5.0, 3.8, 3.0, 2.2, 1.4] },
  { cohort: "Nov 20", values: [15.0, 10.2, 7.4, 5.8, 4.5, 3.6, 2.9, 1.9] },
];

export const barrierData = [
  { label: "Candidato Menor de Idade", value: 35, color: "hsl(0, 72%, 55%)" },
  { label: "Já Cadastrado", value: 28, color: "hsl(25, 80%, 55%)" },
  { label: "Sem Capital de Investimento", value: 15, color: "hsl(43, 80%, 55%)" },
  { label: "Fora da Área de Cobertura", value: 12, color: "hsl(35, 60%, 45%)" },
  { label: "Outros/Sem Resposta", value: 10, color: "hsl(20, 30%, 40%)" },
];

export const peakHoursData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, "0")}:00`,
  volume: i >= 14 && i <= 16
    ? 180 + Math.floor(Math.random() * 60)
    : 30 + Math.floor(Math.random() * 70),
  isPeak: i >= 14 && i <= 16,
}));

export const geoData = [
  { city: "São Paulo", state: "SP", percentage: 18, leads: 2450 },
  { city: "Rio de Janeiro", state: "RJ", percentage: 14, leads: 1820 },
  { city: "Belo Horizonte", state: "MG", percentage: 9, leads: 1105 },
  { city: "Curitiba", state: "PR", percentage: 7, leads: 980 },
];
