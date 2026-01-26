'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/ui/button';
import { Form } from '@/shared/components/form/form';
import FormInput from '@/shared/components/form/input';
import { KeyRound } from 'lucide-react';

const joinOrgSchema = z.object({
  inviteCode: z.string().min(1, 'Invite code is required'),
});

export type JoinOrgValues = z.infer<typeof joinOrgSchema>;

interface JoinOrganizationFormProps {
  onJoinOrganization: (values: JoinOrgValues) => void;
}

export function JoinOrganizationForm({
  onJoinOrganization,
}: JoinOrganizationFormProps) {
  const handleSubmit = async (values: JoinOrgValues) => {
    onJoinOrganization(values);
  };

  return (
    <Form<JoinOrgValues>
      onSubmit={handleSubmit}
      defaultValues={{
        inviteCode: '',
      }}
      resolver={zodResolver(joinOrgSchema)}
      fieldGroupClassName="gap-2"
    >
      {(form) => (
        <>
          <FormInput
            control={form.control}
            name="inviteCode"
            label="Invite Code"
            placeholder="Enter your invite code"
            startContent={
              <KeyRound className="w-5 h-5 text-muted-foreground" />
            }
            className="space-y-1"
          />

          <Button type="submit" className="w-full">
            Join Organization
          </Button>
        </>
      )}
    </Form>
  );
}
