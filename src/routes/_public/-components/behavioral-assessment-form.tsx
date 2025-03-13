import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useBeesApiClientContext } from '@/contexts/bees-api-client';
import { useToastClientContext } from '@/contexts/toast-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const behavioralAssessmentSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Please enter a valid email' }).toLowerCase(),
  jobTitle: z.string().min(1, { message: 'Job title is required' }),
  organization: z.string().min(1, { message: 'Organization is required' }),
  accessCode: z.string().min(1, { message: 'Access code is required' }).toUpperCase(),
  agreeToComms: z.boolean().refine(value => value === true, {
    message: 'You must agree to receive communication messages',
  }),
});

type BehavioralAssessmentFormValues = z.infer<typeof behavioralAssessmentSchema>;

export function BehavioralAssessmentForm() {
  const form = useForm<BehavioralAssessmentFormValues>({
    resolver: zodResolver(behavioralAssessmentSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      jobTitle: '',
      organization: '',
      accessCode: '',
      agreeToComms: false,
    },
  });

  const beesApiClient = useBeesApiClientContext();
  const toastClient = useToastClientContext();

  const onSubmit = async (data: BehavioralAssessmentFormValues) => {
    try {
      await beesApiClient.getCodesValidate({ code: data.accessCode });
      toastClient.success('Access code validated', {
        description: 'Your access code is valid.',
      });
    } catch {
      toastClient.error('Invalid access code', {
        description: 'Please check your access code and try again.',
      });
    }
  };

  return (
    <div className="max-w-[450px] overflow-hidden">
      <div className="">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">Behavioral Assessment</h1>
          <p className="text-sm font-light leading-[140%] text-secondary-content">
            Designed with your development in mind, the E5 Behavioral Assessment reveals the roles
            where you&apos;ll naturally thrive and delivers the behavioral insights you need to fuel
            personal and professional growth.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        label="First Name"
                        placeholder="John"
                        required
                        error={form.formState.errors.firstName?.message}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        label="Last Name"
                        placeholder="Doe"
                        required
                        error={form.formState.errors.lastName?.message}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-6 space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="johndoe@gmail.com"
                        required
                        error={form.formState.errors.email?.message}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-6 space-y-2">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        label="Job Title"
                        placeholder="Manager"
                        required
                        error={form.formState.errors.jobTitle?.message}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-6 space-y-2">
              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        label="Organization"
                        placeholder="MMM company"
                        required
                        error={form.formState.errors.organization?.message}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-6 space-y-2">
              <FormField
                control={form.control}
                name="accessCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="uppercase"
                        label="Access Code"
                        placeholder="BSDKDJEU98202"
                        error={form.formState.errors.accessCode?.message}
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-8 flex items-center space-x-2">
              <FormField
                control={form.control}
                name="agreeToComms"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        label="Agree to receive communication messages"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        error={form.formState.errors.agreeToComms?.message}
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary font-medium text-primary-foreground hover:bg-primary/90"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Submitting...' : 'Next'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
