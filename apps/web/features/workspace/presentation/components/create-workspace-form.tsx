'use client';

import { createOrgSchema, CreateOrgValues } from '@repo/shared-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import { Form } from '@/shared/components/form/form';
import { ROUTES } from '@/shared/config/routes';
import FormInput from '@/shared/components/form/input';
import { FormTextarea } from '@/shared/components/form/textarea';

import { useCreateWorkspace } from '../hooks/use-create-workspace';

export function CreateWorkspaceForm() {
  const router = useRouter();
  const params = useParams();
  const organizationId = params.dashboardId as string;
  const { createWorkspace, isLoading } = useCreateWorkspace();

  async function onSubmit(data: CreateOrgValues) {
    try {
      const workspace = await createWorkspace({
        name: data.name,
        description: data.description,
        organizationId,
      });

      if (workspace) {
        toast.success('Workspace created successfully!');
        router.push(ROUTES.DASHBOARD.HOME(workspace.id));
      }
    } catch (error) {
      toast.error('Failed to create workspace. Please try again.');
      console.error(error);
    }
  }

  return (
    <Form<CreateOrgValues>
      resolver={zodResolver(createOrgSchema)}
      defaultValues={{
        name: '',
        description: '',
      }}
      onSubmit={onSubmit}
      className="space-y-6"
    >
      {(form) => (
        <>
          <FormInput
            control={form.control}
            name="name"
            label="Workspace Name"
            placeholder="Enter workspace name"
            requiredMarker
          />

          <FormTextarea
            control={form.control}
            name="description"
            label="Description"
            placeholder="Describe your workspace"
            className="resize-none"
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Workspace'}
          </Button>
        </>
      )}
    </Form>
  );
}
