import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import {
  CheckCircle2,
  MessageSquare,
  UserPlus,
  FileText,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface Activity {
  id: string;
  type: 'task_completed' | 'comment' | 'member_added' | 'project_created';
  user: string;
  avatar: string;
  action: string;
  target: string;
  time: string;
}

// Temporary mock data to match design
const activities: Activity[] = [
  {
    id: '1',
    type: 'task_completed',
    user: 'Sarah Anderson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    action: 'completed',
    target: 'Design system updates',
    time: '2 minutes ago',
  },
  {
    id: '2',
    type: 'comment',
    user: 'Michael Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    action: 'commented on',
    target: 'API Integration',
    time: '15 minutes ago',
  },
  {
    id: '3',
    type: 'member_added',
    user: 'Emma Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    action: 'joined',
    target: 'Marketing workspace',
    time: '1 hour ago',
  },
  {
    id: '4',
    type: 'project_created',
    user: 'David Kim',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    action: 'created',
    target: 'Q4 Product Roadmap',
    time: '2 hours ago',
  },
  {
    id: '5',
    type: 'task_completed',
    user: 'Lisa Rodriguez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    action: 'completed',
    target: 'User research interviews',
    time: '3 hours ago',
  },
];

const iconMap: Record<string, LucideIcon> = {
  task_completed: CheckCircle2,
  comment: MessageSquare,
  member_added: UserPlus,
  project_created: FileText,
};

const colorMap: Record<string, string> = {
  task_completed: 'text-green-500',
  comment: 'text-blue-500',
  member_added: 'text-purple-500',
  project_created: 'text-orange-500',
};

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = iconMap[activity.type];
            const iconColor = colorMap[activity.type];

            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <Avatar className="w-9 h-9">
                  <AvatarImage src={activity.avatar} />
                  <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span>{' '}
                    <span className="text-muted-foreground">
                      {activity.action}
                    </span>{' '}
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.time}
                  </p>
                </div>
                {Icon && (
                  <Icon className={cn('w-5 h-5 flex-shrink-0', iconColor)} />
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
