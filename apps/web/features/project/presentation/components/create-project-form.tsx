'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import { Form } from '@/shared/components/form/form';
import { ROUTES } from '@/shared/config/routes';
import FormInput from '@/shared/components/form/input';
import { FormTextarea } from '@/shared/components/form/textarea';

import { useCreateProject } from '../hooks/use-create-project';
import { createProjectSchema, CreateProjectValues } from '@repo/shared-schemas';

export function CreateProjectForm() {
  const router = useRouter();
  const params = useParams();
  // Using dashboardId as workspaceId based on current routing setup in this app
  const workspaceId = params.dashboardId as string;
  const { createProject, isLoading } = useCreateProject();

  async function onSubmit(data: CreateProjectValues) {
    try {
      const project = await createProject({
        name: data.name,
        description: data.description,
        workspaceId,
      });

      if (project) {
        toast.success('Project created successfully!');
        router.push(ROUTES.DASHBOARD.HOME(workspaceId)); // or project page if it exists
      }
    } catch (error) {
      toast.error('Failed to create project. Please try again.');
      console.error(error);
    }
  }

  return (
    <Form
      resolver={zodResolver(createProjectSchema) as any}
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
            label="Project Name"
            placeholder="Enter project name"
            requiredMarker
          />

          <FormTextarea
            control={form.control}
            name="description"
            label="Description"
            placeholder="Describe your project"
            className="resize-none"
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Project'}
          </Button>
        </>
      )}
    </Form>
  );
}
