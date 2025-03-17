import { describe, expect, it, vi } from 'vitest';
import {
  calculateReportService,
  parseE3Scales21,
  type Threshold,
  type TraitScaleMappingReport,
} from './calculate-report';

vi.mock('@/utils/e3-scales', async () => ({
  E3_SCALES: ['scale1', 'scale2', 'scale3'],
}));

describe('parseE3Scales21', () => {
  it('parses array of numbers correctly', () => {
    const result = parseE3Scales21([25, 50, 75]);
    expect(result).toEqual([25, 50, 75]);
  });

  it('parses comma-separated string correctly', () => {
    const result = parseE3Scales21('25,50,75');
    expect(result).toEqual([25, 50, 75]);
  });

  it('returns null for invalid data type', () => {
    const result = parseE3Scales21({ foo: 'bar' });
    expect(result).toBeNull();
  });

  it('returns null if array length does not match E3_SCALES length', () => {
    const result = parseE3Scales21([25, 50]);
    expect(result).toBeNull();
  });

  it('converts invalid numbers to 50', () => {
    const result = parseE3Scales21([25, -10, 150]);
    expect(result).toEqual([25, 50, 50]);
  });

  it('converts NaN values to 50', () => {
    const result = parseE3Scales21(['25', 'invalid', '75']);
    expect(result).toEqual([25, 50, 75]);
  });
});

describe('calculateResults', () => {
  const mockThresholds: Threshold[] = [
    { id: 'low', label: 'Low', min: 0, max: 33, color: 'red' },
    { id: 'mid', label: 'Mid', min: 34, max: 66, color: 'yellow' },
    { id: 'high', label: 'High', min: 67, max: 100, color: 'green' },
  ];

  const mockReport = {
    uuid: '1',
    is_test: false,
    description: 'Test Report',
    is_active: true,
    name: 'Test Report',
    strong_weight: 1.5,
    moderate_weight: 0.8,
    sections: [
      {
        name: 'Section 1',
        description: 'Section 1 Description',
        traits: [
          {
            name: 'Trait 1',
            description: 'Trait 1 Description',
            lines: [
              { e3_scale: 'scale1', direction: 'Positive', strength: 'Strong', notes: '' },
              { e3_scale: 'scale2', direction: 'Negative', strength: 'Moderate', notes: '' },
            ],
            thresholdOverrides: {
              high: { content: 'High override content', actions: ['Action 1', 'Action 2'] },
            },
          },
          {
            name: 'Trait 2',
            description: 'Trait 2 Description',
            lines: [{ e3_scale: 'scale3', direction: 'Positive', strength: 'Strong', notes: '' }],
            thresholdOverrides: {},
          },
        ],
      },
    ] as TraitScaleMappingReport['sections'],
  };

  it('calculates trait scores correctly', () => {
    const mockScores = [80, 60, 40];
    const results = calculateReportService({
      report: mockReport as TraitScaleMappingReport,
      scores: mockScores,
      thresholds: mockThresholds,
    });

    expect(results).toHaveProperty('Section 1');
    expect(results['Section 1']).toHaveLength(2);

    // First trait: (80 * 1.5 + (100-60) * 0.8) / (1.5 + 0.8) = 66.09
    const trait1 = results['Section 1']?.[0];

    expect(trait1?.traitName).toBe('Trait 1');
    expect(trait1?.score).toBeCloseTo(66.09);
    expect(trait1?.thresholdLabel).toBe('Mid');
    expect(trait1?.thresholdColor).toBe('yellow');
    expect(trait1?.thresholdId).toBe('mid');
    expect(trait1?.overrideContent).toBeNull();
    expect(trait1?.overrideActions).toBeNull();

    // Second trait: (40 * 1.0) / 1.0 = 40
    const trait2 = results['Section 1']?.[1];
    expect(trait2?.traitName).toBe('Trait 2');
    expect(trait2?.score).toBeCloseTo(40);
    expect(trait2?.thresholdLabel).toBe('Mid');
    expect(trait2?.thresholdColor).toBe('yellow');
    expect(trait2?.thresholdId).toBe('mid');
    expect(trait2?.overrideContent).toBeNull();
    expect(trait2?.overrideActions).toBeNull();
  });

  it('handles missing scores by defaulting to 50', () => {
    const mockScores = [80]; // Missing scores for scale2 and scale3
    const results = calculateReportService({
      report: mockReport as TraitScaleMappingReport,
      scores: mockScores,
      thresholds: mockThresholds,
    });

    const trait1 = results['Section 1']?.[0];
    // (80 * 1.5 + (100-50) * 0.8) / (1.5 + 0.8) = 69.57
    expect(trait1?.score).toBeCloseTo(69.57);

    const trait2 = results['Section 1']?.[1];
    // (50 * 1.0) / 1.0 = 50
    expect(trait2?.score).toBeCloseTo(50);
  });

  it('handles invalid scale names', () => {
    const mockReportWithInvalidScale = {
      ...mockReport,
      sections: [
        {
          name: 'Section 1',
          description: 'Invalid Section Description',
          traits: [
            {
              name: 'Invalid Trait',
              description: 'Invalid Trait Description',
              lines: [
                { e3_scale: 'nonexistent', direction: 'Positive', strength: 'Strong', notes: '' },
              ],
              thresholdOverrides: {},
            },
          ],
        },
      ],
    } as TraitScaleMappingReport;

    const mockScores = [80, 60, 40];
    const results = calculateReportService({
      report: mockReportWithInvalidScale as TraitScaleMappingReport,
      scores: mockScores,
      thresholds: mockThresholds,
    });

    // Since all scales are invalid, the denominator (sumWeight) will be 0, resulting in NaN
    expect(isNaN(results['Section 1']?.[0]?.score ?? 0)).toBe(true);
  });

  it('handles no matching threshold', () => {
    const emptyThresholds: Threshold[] = [];
    const mockScores = [80, 60, 40];
    const results = calculateReportService({
      report: mockReport as TraitScaleMappingReport,
      scores: mockScores,
      thresholds: emptyThresholds,
    });

    const trait1 = results['Section 1']?.[0];
    expect(trait1?.thresholdLabel).toBeNull();
    expect(trait1?.thresholdColor).toBe('transparent');
    expect(trait1?.thresholdId).toBeNull();
    expect(trait1?.overrideContent).toBeNull();
    expect(trait1?.overrideActions).toBeNull();
  });
});
