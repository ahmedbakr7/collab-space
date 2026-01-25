import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { ChevronLeft, Filter, LayoutGrid, List, Plus } from 'lucide-react';
import { KanbanBoard } from './KanbanBoard';

const mockColumns = [
  {
    id: 'todo',
    title: 'To Do',
    color: 'bg-gray-400',
    tasks: [
      {
        id: '1',
        title: 'Design new landing page',
        description:
          'Create mockups for the new product landing page with updated branding',
        assignee: {
          name: 'Emma Wilson',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
        },
        priority: 'high' as const,
        dueDate: 'Oct 30',
        comments: 3,
        attachments: 2,
        tags: ['Design', 'Marketing'],
      },
      {
        id: '2',
        title: 'Update API documentation',
        description: 'Add documentation for the new authentication endpoints',
        assignee: {
          name: 'Michael Chen',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
        },
        priority: 'medium' as const,
        dueDate: 'Nov 2',
        comments: 1,
        attachments: 0,
        tags: ['Documentation'],
      },
      {
        id: '3',
        title: 'Research competitor features',
        assignee: {
          name: 'Lisa Rodriguez',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
        },
        priority: 'low' as const,
        dueDate: 'Nov 5',
        comments: 0,
        attachments: 1,
      },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: 'bg-blue-500',
    tasks: [
      {
        id: '4',
        title: 'Implement user authentication',
        description: 'Add OAuth 2.0 support and JWT token handling',
        assignee: {
          name: 'David Kim',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
        },
        priority: 'urgent' as const,
        dueDate: 'Oct 28',
        comments: 8,
        attachments: 3,
        tags: ['Backend', 'Security'],
      },
      {
        id: '5',
        title: 'Mobile app testing',
        description: 'Test new features on iOS and Android devices',
        assignee: {
          name: 'Sarah Anderson',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        },
        priority: 'high' as const,
        dueDate: 'Oct 29',
        comments: 5,
        attachments: 1,
        tags: ['QA', 'Mobile'],
      },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    color: 'bg-yellow-500',
    tasks: [
      {
        id: '6',
        title: 'Code review for payment flow',
        assignee: {
          name: 'Alex Turner',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        },
        priority: 'high' as const,
        dueDate: 'Oct 27',
        comments: 12,
        attachments: 0,
        tags: ['Backend', 'Payments'],
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    color: 'bg-green-500',
    tasks: [
      {
        id: '7',
        title: 'Update user profile UI',
        description: 'Redesigned profile page with new layout and features',
        assignee: {
          name: 'Sophie Martinez',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
        },
        priority: 'medium' as const,
        dueDate: 'Oct 25',
        comments: 6,
        attachments: 4,
        tags: ['Frontend', 'UI'],
      },
      {
        id: '8',
        title: 'Database migration',
        assignee: {
          name: 'Chris Lee',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chris',
        },
        priority: 'high' as const,
        dueDate: 'Oct 24',
        comments: 2,
        attachments: 1,
        tags: ['Backend', 'Database'],
      },
    ],
  },
];

export default function Projects() {
  return (
    <main className="flex flex-col flex-1">
      <div className="flex flex-row justify-between py-10 px-5 bg-sidebar border-b items-center">
        <div className="flex flex-row gap-3 items-center">
          <ChevronLeft />
          <div className="flex flex-col gap-2">
            <h2 className="font-bold">Product Roadmap Q4</h2>
            <p className="text-muted-foreground">Product Team • 12 members</p>
          </div>
        </div>

        <div className="flex flex-row gap-3">
          <Button>
            <Filter />
            Filter
          </Button>

          <Tabs defaultValue="option1" className="">
            <TabsList>
              <TabsTrigger value="option1">
                <LayoutGrid />
              </TabsTrigger>
              <TabsTrigger value="option2">
                <List />
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button>
            <Plus />
            New Task
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden p-6">
        <KanbanBoard
          columns={mockColumns}
          // onTaskClick={setSelectedTask}
        />
      </div>
    </main>
  );
}

function ProjectsGrid() {
  return <div className="flex-1 flex flex-row gap-3 p-3 overflow-scroll"></div>;
}

function KanbanCard({ title }: { title: string }) {
  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      <CardContent></CardContent>
    </Card>
  );
}

function TaskCard({
  title,
  badgeText,
  badgeColor,
  description,
}: {
  title: string;
  badgeText?: string;
  badgeColor?: string;
  description?: string;
}) {
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardAction>
        <Badge className={`${badgeColor}`} variant={'default'}>
          {badgeText}
        </Badge>
      </CardAction>
      <CardDescription>{description}</CardDescription>
      <div className="flex flex-row gap-1 items-center">
        <Badge> Design</Badge>
        <Badge> Marketing</Badge>
      </div>
    </CardHeader>
    <CardFooter className="flex flex-row items-center justify-between text-xs text-muted-foreground">
      <Avatar>
        <AvatarImage
          src={'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma'}
        />
        <AvatarFallback>XS</AvatarFallback>
      </Avatar>

      <div className="flex flex-row gap-2"></div>
    </CardFooter>
  </Card>;
}
