'use client';

import { joinOrgSchema, JoinOrgValues } from '@repo/shared-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/ui/button';
import { Form } from '@/shared/components/form/form';
import FormInput from '@/shared/components/form/input';
import { KeyRound } from 'lucide-react';
import { useTransition } from 'react';
import { useJoinOrganization } from '../presentation/hooks/use-join-organization';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/config/routes';

interface JoinOrganizationFormProps {
  onJoinOrganization?: (values: JoinOrgValues) => void;
}

export function JoinOrganizationForm({
  onJoinOrganization,
}: JoinOrganizationFormProps) {
  const { joinOrganization, isLoading } = useJoinOrganization();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (values: JoinOrgValues) => {
    try {
      await joinOrganization(values);
      // Navigate to dashboard after successful join
      startTransition(() => {
        router.push(ROUTES.DASHBOARD.ROOT);
      });
      onJoinOrganization?.(values);
    } catch (error) {
      // Error is already handled by the hook with toast
      console.error(error);
    }
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

          <Button type="submit" className="w-full" disabled={isLoading || form.formState.isSubmitting || isPending}>
            {isLoading || form.formState.isSubmitting || isPending ? 'Joining...' : 'Join Organization'}
          </Button>
        </>
      )}
    </Form>
  );
}
