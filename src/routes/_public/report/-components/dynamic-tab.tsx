import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  type ThresholdOverrideAction,
  type TraitScaleMappingReport,
  type calculateReportService,
} from '@/services/calculate-report';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export type DynamicTabContentProps = {
  thresholds: TraitScaleMappingReport['thresholds'];
  calculatedReport: ReturnType<typeof calculateReportService>[keyof ReturnType<
    typeof calculateReportService
  >];
  attributesCount?: number;
  isConsolidateAttributeActions?: boolean;
};

export function DynamicTabContent({
  thresholds,
  calculatedReport,
  isConsolidateAttributeActions = false,
  attributesCount,
}: DynamicTabContentProps) {
  const yourAttributesLabel = !isConsolidateAttributeActions
    ? `Your ${calculatedReport[0].category.name} Blindspots`
    : `Your ${calculatedReport[0].category.name}`;
  const attributesToShow = calculatedReport
    .filter(attribute => attribute.score !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, attributesCount ? attributesCount : undefined);

  const consolidatedAttributesActions = (
    isConsolidateAttributeActions
      ? calculatedReport.map(attribute => attribute.overrideActions).flat()
      : []
  ) as ThresholdOverrideAction[];

  return (
    <div className="mt-12">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold text-primary-content">
          {calculatedReport[0].category.name}
        </h1>
        <p
          className="font-light text-secondary-content"
          dangerouslySetInnerHTML={{
            __html: calculatedReport[0].category.description,
          }}
        />
      </div>

      <h2 className="mt-8 text-xl font-bold text-primary-content">{yourAttributesLabel}</h2>

      <div className="mt-4 space-y-10">
        {attributesToShow.map((attribute, attributeIndex) => (
          <AttributeItem
            key={attributeIndex}
            thresholds={thresholds}
            attribute={attribute}
            isConsolidateAttributeActions={isConsolidateAttributeActions}
            isLastAttribute={attributeIndex === attributesToShow.length - 1}
          />
        ))}
        {isConsolidateAttributeActions && (
          <>
            <Separator />
            <h2 className="mt-8 text-xl font-bold text-primary-content">
              {yourAttributesLabel} Blindspots
            </h2>
            <AttributeItemActions actions={consolidatedAttributesActions} />
          </>
        )}
      </div>
    </div>
  );
}

export type AttributeItemProps = {
  thresholds: TraitScaleMappingReport['thresholds'];
  attribute: ReturnType<typeof calculateReportService>[keyof ReturnType<
    typeof calculateReportService
  >][number];
  isConsolidateAttributeActions: boolean;
  isLastAttribute: boolean;
};

export function AttributeItem({
  thresholds,
  attribute,
  isConsolidateAttributeActions,
  isLastAttribute,
}: AttributeItemProps) {
  return (
    <div>
      <h3 className="mt-5 text-lg font-bold text-primary-content">{attribute.traitName}</h3>

      <div className="mt-5 flex flex-col gap-3">
        <Progress value={attribute.score} className="h-2 bg-[#F4F4F5]" />
        <div className="flex justify-between text-sm text-secondary-content">
          {thresholds.map(threshold => (
            <span key={threshold.id}>{threshold.label}</span>
          ))}
        </div>
      </div>

      <p
        dangerouslySetInnerHTML={{
          __html:
            attribute.overrideContent ||
            'Description of this trait and its implications on your behavior.',
        }}
        className="mt-4 font-light text-secondary-content"
      />

      {!isConsolidateAttributeActions && (
        <>
          <AttributeItemActions actions={attribute.overrideActions} />
          {!isLastAttribute && <Separator className="mt-10" />}
        </>
      )}
    </div>
  );
}

export type AttributeItemActionsProps = {
  actions: ThresholdOverrideAction[] | null;
};

export function AttributeItemActions({ actions }: AttributeItemActionsProps) {
  const [actionsExpanded, setActionsExpanded] = useState(true);

  const handleExpandActions = () => {
    setActionsExpanded(!actionsExpanded);
  };

  return (
    actions &&
    actions.length > 0 && (
      <div className="mt-6 rounded-2xl bg-[#F8F8FA] p-6">
        <button
          onClick={handleExpandActions}
          className="flex w-full items-center justify-between font-bold text-primary-content"
        >
          Actions
          {actionsExpanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>

        {actionsExpanded && (
          <div className="mt-4 space-y-6">
            {actions.map((action, index) => (
              <div key={index} className="flex gap-3">
                <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border border-primary">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-primary-content">{action.label}</h4>
                  <p
                    className="font-light text-secondary-content"
                    dangerouslySetInnerHTML={{ __html: action.description }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  );
}
