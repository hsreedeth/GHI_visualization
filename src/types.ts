export type GhiYear = 2000 | 2006 | 2012 | 2021;

export type CountryGhiRecord = {
  entity: string;
  code: string;
  values: {
    2000: number | null;
    2006: number | null;
    2012: number | null;
    2021: number | null;
  };
};

export type GhiSeverity = 'Low' | 'Moderate' | 'Serious' | 'Alarming' | 'Extreme' | 'Missing';
