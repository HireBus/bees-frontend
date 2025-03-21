import { cn } from '@/lib/utils';
import { AdjectivesAssessmentForm } from './adjectives-assessment-form';

export type AdjectivesAssessmentProps = {
  className?: string;
};

export function AdjectivesAssessment({ className }: AdjectivesAssessmentProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-[49px] px-5 pb-20 pt-40',
        className
      )}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <div className="text-[28px] font-bold">This quick survey typically takes 5-10 minutes.</div>
        <div className="flex items-center pt-3 font-light text-[#52525B]">
          Read each word, and select words that describe how you act most of the time.
        </div>
      </div>
      <AdjectivesAssessmentForm />
    </div>
  );
}
