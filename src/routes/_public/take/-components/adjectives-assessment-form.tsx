import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { useToastClientContext } from '@/contexts/toast-client';
import { useSubmitAssessmentMutation } from '@/hooks/query/assessments/use-submit-assessment-mutation';
import { cn } from '@/lib/utils';
import { parseError } from '@/utils/error-parser';
import { useNavigate } from '@tanstack/react-router';
import { useMemo } from 'react';
import {
  type ControllerRenderProps,
  type FieldValues,
  type SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useAssessmentUserStore } from '../-stores/use-assessment-user';
import { getShuffledAdjectives } from '../-utils/adjectives';

export function AdjectivesAssessmentForm() {
  const adjectives = useMemo(getShuffledAdjectives, []);
  const form = useForm();
  const navigate = useNavigate();

  const actions = useAssessmentUserStore(state => ({
    reset: state.reset,
    resetProgress: state.resetProgress,
    runProgressUpTo: state.runProgressUpTo,
  }));
  const user = useAssessmentUserStore(state => state.user);
  const toastClient = useToastClientContext();

  const { mutate: submitAssessment, isPending: isSubmitting } = useSubmitAssessmentMutation({
    onMutate: () => {
      actions.runProgressUpTo(100);
    },
    onSuccess: data => {
      useAssessmentUserStore.persist.clearStorage();
      setTimeout(() => {
        navigate({ to: '/report/$id', params: { id: data.code.id } });
      }, 1000);
    },
    onError: err => {
      actions.resetProgress();
      const error = parseError(err);

      if (error.name === 'ConflictError') {
        toastClient.error('Invalid access code', { description: error.message });
        return;
      }

      toastClient.error('Something went wrong', {
        description: error.message,
      });
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (!user) return;

    const checkedAdjectives = processCheckedValues(data);

    if (checkedAdjectives.length < 30) {
      toastClient.error('Please select at least 30 words.');
      return;
    }

    submitAssessment({
      requestBody: {
        code: user.accessCode,
        optInCommunication: user.agreeToComms,
        adjectiveNumbers: checkedAdjectives,
        email: user.email,
        first: user.firstName,
        last: user.lastName,
        role: user.jobTitle,
        companySlug: user.organization,
      },
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-5 md:max-w-[668px]"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 items-stretch justify-stretch gap-3 md:grid-cols-3 md:gap-5 [&>div]:grow">
          {adjectives.map(([adjectiveNumber, value]) => (
            <FormField
              key={adjectiveNumber}
              control={form.control}
              name={adjectiveNumber}
              render={({ field }) => (
                <FormItem>
                  <AdjectiveCheckbox field={field}>{value.en}</AdjectiveCheckbox>
                </FormItem>
              )}
            />
          ))}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}

export type AdjectiveCheckboxProps = {
  children: React.ReactNode;
  field: ControllerRenderProps<FieldValues, string>;
  onClick?: () => void;
};

export function AdjectiveCheckbox({ children, field, onClick }: AdjectiveCheckboxProps) {
  return (
    <label className="relative h-full w-full cursor-pointer">
      <input
        type="checkbox"
        className="peer absolute h-0 w-0 opacity-0"
        onChange={e => {
          field.onChange(e);
          onClick?.();
        }}
        value={field.value}
      />
      <div
        className={cn(
          'rounded-[4px] bg-[#F4F4F5] px-4 py-3 text-center text-base font-medium leading-[180%] text-[#A1A1AA]',
          'flex h-full w-full items-center justify-center',
          'peer-checked:font-bolder peer-checked:bg-primary peer-checked:text-primary-content'
        )}
      >
        {children}
      </div>
    </label>
  );
}

export const processCheckedValues = (data: FieldValues) => {
  return Object.entries(data)
    .filter(([, value]) => Boolean(value))
    .map(([value]) => Number(value))
    .filter(Number);
};
