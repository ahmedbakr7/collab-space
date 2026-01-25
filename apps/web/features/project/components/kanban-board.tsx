import { Plus } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { TaskCard, Task } from './task-card';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { cn } from '@/shared/lib/utils';

interface Column {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
}

interface KanbanBoardProps {
  columns: Column[];
  onTaskClick: (task: Task) => void;
}

export function KanbanBoard({ columns, onTaskClick }: KanbanBoardProps) {
  return (
    <div className="flex space-x-4 h-full overflow-x-auto pb-4">
      {columns.map((column) => (
        <div key={column.id} className="flex-shrink-0 w-80">
          <div className="bg-card rounded-xl border border-border h-full flex flex-col max-h-[calc(100vh-12rem)]">
            {/* Column Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className={cn('w-2 h-2 rounded-full', column.color)} />
                  <h3 className="font-semibold">{column.title}</h3>
                  <span className="text-sm text-muted-foreground bg-secondary px-2 py-0.5 rounded-md">
                    {column.tasks.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Tasks */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {column.tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => onTaskClick(task)}
                  />
                ))}
              </div>
            </ScrollArea>

            {/* Add Task Button */}
            <div className="p-4 border-t border-border">
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add task
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
