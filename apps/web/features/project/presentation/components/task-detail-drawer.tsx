import { useState } from 'react';
import { X, Calendar, User, Flag, Tag, Send } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs';
import { SimpleSelect } from '@/shared/components/form/select';
import { Task } from '@repo/domain/src/task/entities/task.entity';
import { Badge } from '@/shared/components/ui/badge';

interface TaskDetailDrawerProps {
  task: Task;
  onClose: () => void;
}

const comments = [
  {
    id: '1',
    user: 'Michael Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    content:
      'Great progress on this! I think we should also consider the mobile viewport.',
    time: '2 hours ago',
  },
  {
    id: '2',
    user: 'Sarah Anderson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    content:
      'Updated the designs based on feedback. Please review when you get a chance.',
    time: '5 hours ago',
  },
];

const activities = [
  {
    id: '1',
    action: 'Sarah Anderson changed status from In Progress to Review',
    time: '1 hour ago',
  },
  { id: '2', action: 'Michael Chen added a comment', time: '2 hours ago' },
  { id: '3', action: 'Sarah Anderson updated the due date', time: '1 day ago' },
  {
    id: '4',
    action: 'David Kim assigned this task to Sarah Anderson',
    time: '2 days ago',
  },
];

export function TaskDetailDrawer({ task, onClose }: TaskDetailDrawerProps) {
  const [comment, setComment] = useState('');

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-background h-full overflow-y-auto animate-in slide-in-from-right duration-300 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between z-10">
          <h2 className="text-lg font-semibold">Task Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <Input
              defaultValue={task.title}
              className="text-xl font-medium border-0 px-0 focus-visible:ring-0 shadow-none"
            />
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Assignee</span>
              </label>
              <div className="flex items-center space-x-2 p-2 bg-secondary rounded-lg">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={task.assignee.avatar} />
                  <AvatarFallback>
                    {task.assignee.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{task.assignee.name}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Due Date</span>
              </label>
              <div className="p-2 bg-secondary rounded-lg text-sm">
                {task.dueDate.toLocaleDateString()}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground flex items-center space-x-2">
                <Flag className="w-4 h-4" />
                <span>Priority</span>
              </label>
              <SimpleSelect
                value={task.priority}
                onValueChange={() => {}}
                options={[
                  { value: 'low', label: 'Low' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'high', label: 'High' },
                  { value: 'urgent', label: 'Urgent' },
                ]}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground flex items-center space-x-2">
                <Tag className="w-4 h-4" />
                <span>Status</span>
              </label>
              <SimpleSelect
                value={task.status || 'in-progress'}
                onValueChange={() => {}}
                options={[
                  { value: 'todo', label: 'To Do' },
                  { value: 'in-progress', label: 'In Progress' },
                  { value: 'review', label: 'Review' },
                  { value: 'done', label: 'Done' },
                ]}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Description</label>
            <Textarea
              defaultValue={task.description || 'Add a description...'}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Tags</label>
              <div className="flex flex-wrap gap-2">
                {task.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Tabs */}
          <Tabs defaultValue="comments" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="comments" className="flex-1">
                Comments ({comments.length})
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex-1">
                Activity
              </TabsTrigger>
            </TabsList>

            <TabsContent value="comments" className="space-y-4 mt-4">
              {/* Comment List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={comment.avatar} />
                      <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">
                          {comment.user}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {comment.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment Input */}
              <div className="flex space-x-2 pt-4 border-t border-border">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
                  <AvatarFallback>SA</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex space-x-2">
                  <Input
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button size="icon">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-3 mt-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex space-x-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-muted-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
