import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { columns } from '@/features/shared/components/Table/columns';
import { DataTable } from '@/features/shared/components/Table/data-table';
import { data } from '@/features/shared/components/Table/page';
import { CheckSquare, Download, LayoutGrid, List, Plus } from 'lucide-react';
import { ReactNode } from 'react';

export default function Tasks() {
  return (
    <main className="flex flex-col gap-5 p-5">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">All Tasks</h1>
          <sub className="text-muted-foreground">
            12 tasks across all workspaces
          </sub>
        </div>

        <div>
          <Button variant={'outline'} className="mr-2">
            <Download /> Export
          </Button>
          <Button className="">
            <Plus /> New Task
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 ">
        <TaskCard
          description="Total"
          title={12}
          action={<CheckSquare className="size-5 text-green-500" />}
        />
        <TaskCard
          description="To Do"
          title={4}
          action={<div className="w-2 h-2 rounded-full bg-gray-500" />}
        />
        <TaskCard
          description="In Progress"
          title={12}
          action={<div className="w-2 h-2 rounded-full bg-blue-500" />}
        />
        <TaskCard
          description="Review"
          title={12}
          action={<div className="w-2 h-2 rounded-full bg-yellow-500" />}
        />
        <TaskCard
          description="Done"
          title={12}
          action={<div className="w-2 h-2 rounded-full bg-green-500" />}
        />
      </div>

      <Card>
        <CardContent className="flex flex-row justify-between items-center">
          <Tabs defaultValue="option1" className="">
            <TabsList>
              <TabsTrigger value="option1">All Tasks</TabsTrigger>
              <TabsTrigger value="option2">My Tasks</TabsTrigger>
            </TabsList>
          </Tabs>

          <Input placeholder="Search tasks..." type="text" className="w-1/4" />

          <Select defaultValue="All Workspaces">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Workspaces" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Workspaces">All Workspaces</SelectItem>
              <SelectItem value="Product Team">Product Team</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="All Workspaces">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Workspaces" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Workspaces">All Workspaces</SelectItem>
              <SelectItem value="Product Team">Product Team</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="All Workspaces">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Workspaces" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Workspaces">All Workspaces</SelectItem>
              <SelectItem value="Product Team">Product Team</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="container mx-auto ">
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}

interface TaskCardProps {
  description: string;
  title: string | number;
  action?: ReactNode;
}

function TaskCard({ description, title, action }: TaskCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-row justify-between items-center">
        <div>
          <CardDescription>{description}</CardDescription>
          <CardTitle>{title}</CardTitle>
        </div>
        {action}
      </CardContent>
    </Card>
  );
}
