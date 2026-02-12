import { ArrowLeft } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { CreateOrganizationForm } from './create-organization-form';

interface CreateOrganizationFlowProps {
  onBack: () => void;
}

export function CreateOrganizationFlow({
  onBack,
}: CreateOrganizationFlowProps) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <Button variant="ghost" onClick={onBack} className="mb-2 -ml-2">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <CreateOrganizationForm />
    </div>
  );
}
