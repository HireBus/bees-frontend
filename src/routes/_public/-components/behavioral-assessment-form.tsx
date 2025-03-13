import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export function BehavioralAssessmentForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    organization: '',
    accessCode: '',
    agreeToComms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, agreeToComms: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    // eslint-disable-next-line no-console
    console.log(formData);
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

        <form onSubmit={handleSubmit}>
          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Input
                label="First Name"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Input
                label="Last Name"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-6 space-y-2">
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="johndoe@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6 space-y-2">
            <Input
              label="Job Title"
              name="jobTitle"
              placeholder="Manager"
              value={formData.jobTitle}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6 space-y-2">
            <Input
              label="Organization"
              name="organization"
              placeholder="MMM company"
              value={formData.organization}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6 space-y-2">
            <Input
              label="Access Code"
              name="accessCode"
              placeholder="BE12345"
              value={formData.accessCode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-8 flex items-center space-x-2">
            <Checkbox
              label="Agree to receive communication messages"
              checked={formData.agreeToComms}
              onCheckedChange={handleCheckboxChange}
              className="h-4 w-4 border-gray-300"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary font-medium text-primary-foreground hover:bg-primary/90"
          >
            Next
          </Button>
        </form>
      </div>
    </div>
  );
}
