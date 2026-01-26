'use client';

import { joinOrgSchema, JoinOrgValues } from '@repo/shared-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/ui/button';
import { Form } from '@/shared/components/form/form';
import FormInput from '@/shared/components/form/input';
import { KeyRound } from 'lucide-react';

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
