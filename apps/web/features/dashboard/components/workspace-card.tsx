import { MoreVertical } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { Progress } from '@/shared/components/ui/progress';
import { cn } from '@/shared/lib/utils';

interface WorkspaceCardProps {
  name: string;
  description: string;
  color: string;
  members: number;
  projects: number;
  tasksCompleted: number;
  totalTasks: number;
  memberAvatars: string[];
  onClick?: () => void;
}

export function WorkspaceCard({
  name,
  description,
  color,
  members,
  projects,
  tasksCompleted,
  totalTasks,
  memberAvatars,
  onClick,
}: WorkspaceCardProps) {
  const progress = totalTasks > 0 ? (tasksCompleted / totalTasks) * 100 : 0;

  return (
    <Card
      className={cn('hover:shadow-lg transition-shadow cursor-pointer group')}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center mb-3',
              color,
            )}
          >
            <span className="text-white text-xl">{name.charAt(0)}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">
              {tasksCompleted}/{totalTasks} tasks
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t border-border">
        <div className="flex items-center justify-between w-full">
          <div className="flex -space-x-2">
            {memberAvatars.slice(0, 3).map((avatar, index) => (
              <Avatar key={index} className="w-7 h-7 border-2 border-card">
                <AvatarImage src={avatar} />
                <AvatarFallback>M{index + 1}</AvatarFallback>
              </Avatar>
            ))}
            {members > 3 && (
              <div className="w-7 h-7 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs">
                +{members - 3}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>{projects} projects</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
