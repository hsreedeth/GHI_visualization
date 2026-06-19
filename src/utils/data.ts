import { CountryGhiRecord, GhiSeverity, GhiYear } from '../types';

export const YEARS: GhiYear[] = [2000, 2006, 2012, 2021];

export function getGhiSeverity(value: number | null): GhiSeverity {
  if (value === null) return 'Missing';
  if (value < 10) return 'Low';
  if (value < 20) return 'Moderate';
  if (value < 35) return 'Serious';
  if (value < 50) return 'Alarming';
  return 'Extreme';
}

export function getGhiColor(value: number | null): string {
  if (value === null) return '#27272a'; // dark grey for missing on black bg
  if (value < 10) return '#31955E'; // green
  if (value < 20) return '#EEDD53'; // yellow
  if (value < 35) return '#F2A154'; // orange
  if (value < 50) return '#E96745'; // red-orange
  return '#9A0000'; // dark red
}

export function formatGhiValue(value: number | null): string {
  return value === null ? 'No value' : value.toFixed(1);
}

export async function loadGhiData(): Promise<CountryGhiRecord[]> {
  try {
    const response = await fetch('/data/global-hunger-index.csv');
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.statusText}`);
    }
    const csvText = await response.text();
    
    const lines = csvText.trim().split('\n');
    const recordsMap = new Map<string, CountryGhiRecord>();
    
    // Skip header line
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim()) continue;
      
      const parts = line.split(',');
      const entity = parts[0];
      const code = parts[1];
      const year = parseInt(parts[2], 10) as GhiYear;
      const valueStr = parts[3];
      const value = valueStr ? parseFloat(valueStr) : null;
      
      if (!recordsMap.has(entity)) {
        recordsMap.set(entity, {
          entity,
          code,
          values: { 2000: null, 2006: null, 2012: null, 2021: null }
        });
      }
      
      const record = recordsMap.get(entity)!;
      if (isValidYear(year)) {
        record.values[year] = value;
      }
    }
    
    // Keep only countries with a 2021 value, and sort descending
    const validRecords = Array.from(recordsMap.values()).filter(r => r.values[2021] !== null);
    
    // Sort descending by 2021 GHI
    validRecords.sort((a, b) => (b.values[2021] || 0) - (a.values[2021] || 0));
    
    return validRecords;
  } catch (err) {
    console.error('Error loading GHI data:', err);
    throw err;
  }
}

function isValidYear(year: number): year is GhiYear {
  return [2000, 2006, 2012, 2021].includes(year);
}
