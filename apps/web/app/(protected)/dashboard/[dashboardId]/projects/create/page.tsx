export default function CreateProjectPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="mx-auto max-w-2xl py-8 space-y-6">
        <div className="flex items-center space-x-2 mb-12">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">
              Create Project
            </h2>
            <p className="text-muted-foreground">
              Create a new project in your workspace.
            </p>
          </div>
        </div>
        {/* TODO: Add Project Form */}
        <div className="p-8 text-center border rounded-lg bg-muted/10 text-muted-foreground">
          Project Form Component will go here
        </div>
      </div>
    </div>
  );
}
