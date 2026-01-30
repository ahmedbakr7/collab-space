'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import { Form } from '@/shared/components/form/form';
import FormInput from '@/shared/components/form/input';
import { FormTextarea } from '@/shared/components/form/textarea';

import { useCreateWorkspace } from '../hooks/use-create-workspace';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  slug: z.string().min(2, 'Slug must be at least 2 characters.').optional(),
  description: z.string().optional(),
  organizationId: z.string().uuid('Invalid Organization ID'),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateWorkspaceForm() {
  const router = useRouter();
  const { createWorkspace, isLoading } = useCreateWorkspace();

  async function onSubmit(data: FormValues) {
    try {
      const workspace = await createWorkspace({
        name: data.name,
        // If slug is empty, we don't pass it or pass undefined if logic handles it
        // My DTO doesn't have slug actually, just name, description, organizationId
        // So I'll just pass those three
        organizationId: data.organizationId,
        description: data.description,
      });

      if (workspace) {
        toast.success('Workspace created successfully!');
        router.push(`/workspaces/${workspace.id}`);
      }
    } catch (error) {
      toast.error('Failed to create workspace. Please try again.');
      console.error(error);
    }
  }

  return (
    <Form<FormValues>
      resolver={zodResolver(formSchema)}
      defaultValues={{
        name: '',
        slug: '',
        description: '',
        organizationId: 'f2b55893-288b-4468-972f-a5175cc312ef', // Hardcoded as per layout
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
