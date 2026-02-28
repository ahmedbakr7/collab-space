export default function CreateTaskPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="mx-auto max-w-2xl py-8 space-y-6">
        <div className="flex items-center space-x-2 mb-12">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Create Task</h2>
            <p className="text-muted-foreground">
              Create a new task for your project.
            </p>
          </div>
        </div>
        {/* TODO: Add Task Form */}
        <div className="p-8 text-center border rounded-lg bg-muted/10 text-muted-foreground">
          Task Form Component will go here
        </div>
      </div>
    </div>
  );
}
