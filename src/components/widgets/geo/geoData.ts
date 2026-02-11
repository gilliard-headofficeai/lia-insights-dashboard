// Group states into regions
export const REGION_STATES: Record<string, string[]> = {
  Norte: ["ac", "am", "ap", "pa", "ro", "rr", "to"],
  Nordeste: ["al", "ba", "ce", "ma", "pb", "pe", "pi", "rn", "se"],
  "Centro-Oeste": ["df", "go", "ms", "mt"],
  Sudeste: ["es", "mg", "rj", "sp"],
  Sul: ["pr", "rs", "sc"],
};

// Reverse lookup: state id -> region
export const STATE_TO_REGION: Record<string, string> = {};
Object.entries(REGION_STATES).forEach(([region, states]) => {
  states.forEach((s) => (STATE_TO_REGION[s] = region));
});

export interface RegionInfo {
  leads: string;
  conversion: string;
  time: string;
  topCities: { name: string; value: number; percent: number }[];
}

export const REGION_DATA: Record<string, RegionInfo> = {
  Nacional: {
    leads: "12.450", conversion: "14,2%", time: "2m 30s",
    topCities: [
      { name: "São Paulo, SP", value: 4520, percent: 100 },
      { name: "Rio de Janeiro, RJ", value: 2840, percent: 62 },
      { name: "Belo Horizonte, MG", value: 1920, percent: 42 },
      { name: "Curitiba, PR", value: 1210, percent: 26 },
      { name: "Salvador, BA", value: 980, percent: 21 },
    ],
  },
  Sudeste: {
    leads: "8.950", conversion: "16,8%", time: "1m 45s",
    topCities: [
      { name: "São Paulo, SP", value: 4520, percent: 100 },
      { name: "Rio de Janeiro, RJ", value: 2840, percent: 62 },
      { name: "Belo Horizonte, MG", value: 1920, percent: 42 },
    ],
  },
  Sul: {
    leads: "2.100", conversion: "13,5%", time: "2m 10s",
    topCities: [
      { name: "Curitiba, PR", value: 1210, percent: 100 },
      { name: "Porto Alegre, RS", value: 890, percent: 73 },
      { name: "Florianópolis, SC", value: 620, percent: 51 },
    ],
  },
  Nordeste: {
    leads: "3.200", conversion: "11,2%", time: "3m 05s",
    topCities: [
      { name: "Salvador, BA", value: 980, percent: 100 },
      { name: "Recife, PE", value: 740, percent: 75 },
      { name: "Fortaleza, CE", value: 680, percent: 69 },
    ],
  },
  "Centro-Oeste": {
    leads: "1.850", conversion: "12,9%", time: "2m 50s",
    topCities: [
      { name: "Brasília, DF", value: 780, percent: 100 },
      { name: "Goiânia, GO", value: 540, percent: 69 },
      { name: "Campo Grande, MS", value: 320, percent: 41 },
    ],
  },
  Norte: {
    leads: "1.350", conversion: "9,4%", time: "4m 20s",
    topCities: [
      { name: "Manaus, AM", value: 480, percent: 100 },
      { name: "Belém, PA", value: 390, percent: 81 },
      { name: "Porto Velho, RO", value: 180, percent: 37 },
    ],
  },
};
