'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import { Form } from '@/shared/components/form/form';
import { ROUTES } from '@/shared/config/routes';
import FormInput from '@/shared/components/form/input';
import { FormTextarea } from '@/shared/components/form/textarea';
import { FormSelect } from '@/shared/components/form/select';

import { useCreateTask } from '../hooks/use-create-task';
import { createTaskSchema, CreateTaskValues } from '@repo/shared-schemas';

export function CreateTaskForm() {
  const router = useRouter();
  const params = useParams();
  const dashboardId = params.dashboardId as string;
  const { createTask, isLoading } = useCreateTask();

  async function onSubmit(data: CreateTaskValues) {
    try {
      const task = await createTask({
        title: data.title,
        description: data.description,
        projectId: data.projectId,
        priority: data.priority,
      });

      if (task) {
        toast.success('Task created successfully!');
        router.push(ROUTES.DASHBOARD.HOME(dashboardId)); // or to project tasks
      }
    } catch (error) {
      toast.error('Failed to create task. Please try again.');
      console.error(error);
    }
  }

  return (
    <Form
      resolver={zodResolver(createTaskSchema) as any}
      defaultValues={{
        title: '',
        description: '',
        projectId: '',
        priority: 'medium',
      }}
      onSubmit={onSubmit}
      className="space-y-6"
    >
      {(form) => (
        <>
          <FormInput
            control={form.control}
            name="title"
            label="Task Title"
            placeholder="Enter task title"
            requiredMarker
          />

          <FormTextarea
            control={form.control}
            name="description"
            label="Description"
            placeholder="Describe the task"
            className="resize-none"
          />

          <FormInput
            control={form.control}
            name="projectId"
            label="Project ID"
            placeholder="Enter Project ID this task belongs to"
            requiredMarker
          />

          <FormSelect
            control={form.control}
            name="priority"
            label="Priority"
            options={[
              { label: 'Low', value: 'low' },
              { label: 'Medium', value: 'medium' },
              { label: 'High', value: 'high' },
              { label: 'Urgent', value: 'urgent' },
            ]}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Task'}
          </Button>
        </>
      )}
    </Form>
  );
}
