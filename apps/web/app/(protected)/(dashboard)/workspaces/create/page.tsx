import { CreateWorkspaceForm } from '@/features/workspace/presentation/components/create-workspace-form';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

export default function CreateWorkspacePage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="mx-auto max-w-2xl py-8 space-y-6">
        <div className="flex items-center space-x-2 mb-12">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">
              Create Workspace
            </h2>
            <p className="text-muted-foreground">
              Create a new workspace to organize your projects and tasks.
            </p>
          </div>
        </div>
        <CreateWorkspaceForm />
      </div>
    </div>
  );
}
