import { type GetTraitScaleMappingsReportsByIdResponse } from '@/data/core-api-v2';
import { E3_SCALES } from '@/utils/e3-scales';

export type Threshold = {
  id: string;
  label: string;
  color: string | null;
  min: number;
  max: number;
};

export const TraitLineStrength = {
  Strong: 'Strong',
  Moderate: 'Moderate',
} as const;

export const TraitLineDirection = {
  Positive: 'Positive',
  Negative: 'Negative',
} as const;

export type TraitLine = {
  e3_scale: string;
  strength: (typeof TraitLineStrength)[keyof typeof TraitLineStrength];
  direction: (typeof TraitLineDirection)[keyof typeof TraitLineDirection];
  notes: string;
};

export type ThresholdOverrideAction = {
  label: string;
  description: string;
};

export type ThresholdOverrideDetails = {
  content: string;
  actions: Array<ThresholdOverrideAction>;
};

export type Trait = {
  name: string;
  description: string;
  lines: TraitLine[];
  thresholdOverrides: { [key: Threshold['id']]: ThresholdOverrideDetails };
};

export type Section = {
  name: string;
  description: string;
  traits: Trait[];
};

export type TraitScaleMappingReport = Omit<
  GetTraitScaleMappingsReportsByIdResponse,
  'sections' | 'thresholds' | 'created_at' | 'updated_at' | 'archived_at'
> & {
  sections: Section[];
  thresholds: Threshold[];
};

export interface CalculationResult {
  traitName: string;
  score: number;
  thresholdLabel: string | null;
  thresholdColor: string;
  thresholdId: string | null;
  overrideContent: string | null;
  overrideActions: ThresholdOverrideAction[] | null;
}

// Helper: Parse the survey result (e3_scales21) into a valid number array.
export function parseE3Scales21(data: unknown): number[] | null {
  let parsedScores: unknown[] = [];
  if (Array.isArray(data)) {
    parsedScores = data;
  } else if (typeof data === 'string') {
    parsedScores = data.split(',').map(Number);
  } else {
    return null;
  }
  if (parsedScores.length !== E3_SCALES.length) {
    return null;
  }
  const validScores = parsedScores.map(score => {
    const numScore = Number(score);
    if (Number.isNaN(numScore) || numScore < 0 || numScore > 100) {
      return 50;
    }
    return numScore;
  });
  return validScores;
}

export type CalculateReportServiceArgs = {
  report: TraitScaleMappingReport;
  scores: number[];
  thresholds: Threshold[];
};

export function calculateReportService({
  report,
  scores,
  thresholds,
}: CalculateReportServiceArgs): Record<string, CalculationResult[]> {
  const results: Record<string, CalculationResult[]> = {};
  const getWeight = (str: string) => {
    if (!str) return 1.0;
    if (str.toLowerCase() === 'strong') return report.strong_weight || 1.0;
    return report.moderate_weight || 0.5;
  };
  const findMatchingThreshold = (score: number) => {
    // Round to handle floating point precision issues
    const roundedScore = Math.round(score);
    for (const thr of thresholds) {
      if (roundedScore >= thr.min && roundedScore <= thr.max) return thr;
    }
    return null;
  };

  report.sections.forEach(section => {
    results[section.name] = [];
    section.traits.forEach(trait => {
      let sumContrib = 0;
      let sumWeight = 0;
      trait.lines.forEach(ln => {
        const direction = ln.direction?.toLowerCase() ?? 'positive';
        const idx = E3_SCALES.indexOf(ln.e3_scale as (typeof E3_SCALES)[number]);
        if (idx < 0) return;
        const score = scores[idx] ?? 50;
        const w = getWeight(ln.strength);
        sumContrib += direction === 'positive' ? score * w : (100 - score) * w;
        sumWeight += w;
      });
      const finalScore = sumWeight ? parseFloat((sumContrib / sumWeight).toFixed(2)) : NaN;
      const matched = findMatchingThreshold(finalScore);

      // Get threshold overrides - try both ID and label-based lookup
      let thresholdOverride = null;
      if (matched) {
        thresholdOverride = trait.thresholdOverrides[matched.id] || null;
      }

      results[section.name]?.push({
        traitName: trait.name,
        score: finalScore,
        thresholdLabel: matched ? matched.label : null,
        thresholdColor: matched ? matched.color || 'transparent' : 'transparent',
        thresholdId: matched ? matched.id : null,
        overrideContent: thresholdOverride?.content || null,
        overrideActions: thresholdOverride?.actions || null,
      });
    });
  });
  return results;
}
