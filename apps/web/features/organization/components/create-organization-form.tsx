'use client';

import { createOrgSchema, CreateOrgValues } from '@repo/shared-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/ui/button';
import { Form } from '@/shared/components/form/form';
import FormInput from '@/shared/components/form/input';
import { Building2 } from 'lucide-react';

interface CreateOrganizationFormProps {
  onCreateOrganization: (values: CreateOrgValues) => void;
}

export function CreateOrganizationForm({
  onCreateOrganization,
}: CreateOrganizationFormProps) {
  const handleSubmit = async (values: CreateOrgValues) => {
    onCreateOrganization(values);
  };

  return (
    <Form<CreateOrgValues>
      onSubmit={handleSubmit}
      defaultValues={{
        name: '',
        slug: '',
      }}
      resolver={zodResolver(createOrgSchema)}
      fieldGroupClassName="gap-2"
    >
      {(form) => (
        <>
          <FormInput
            control={form.control}
            name="name"
            label="Organization Name"
            placeholder="Acme Corp"
            startContent={
              <Building2 className="w-5 h-5 text-muted-foreground" />
            }
            className="space-y-1"
          />

          <FormInput
            control={form.control}
            name="slug"
            label="Organization Slug"
            placeholder="acme-corp"
            description="This will be used in your organization URL"
            className="space-y-1"
          />

          <Button type="submit" className="w-full">
            Create Organization
          </Button>
        </>
      )}
    </Form>
  );
}
