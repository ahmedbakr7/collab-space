import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, MessageSquare, Paperclip } from "lucide-react";

export interface Task {
    id: string;
    title: string;
    description?: string;
    assignee: {
        name: string;
        avatar: string;
    };
    priority: "low" | "medium" | "high" | "urgent";
    dueDate: string;
    comments: number;
    attachments: number;
    tags?: string[];
}

interface TaskCardProps {
    task: Task;
    onClick?: () => void;
}

const priorityColors = {
    low: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    medium: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    high: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    urgent: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export function TaskCard({ task, onClick }: TaskCardProps) {
    return (
        <div
            onClick={onClick}
            className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-all cursor-pointer group"
        >
            <div className="flex items-start justify-between mb-3">
                <h4 className="flex-1 pr-2 group-hover:text-primary transition-colors">
                    {task.title}
                </h4>
                <Badge
                    className={`${
                        priorityColors[task.priority]
                    } text-xs px-2 py-0.5`}
                >
                    {task.priority}
                </Badge>
            </div>

            {task.description && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {task.description}
                </p>
            )}

            {task.tags && task.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {task.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-md"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-border">
                <Avatar className="w-7 h-7">
                    <AvatarImage src={task.assignee.avatar} />
                    <AvatarFallback>
                        {task.assignee.name.charAt(0)}
                    </AvatarFallback>
                </Avatar>

                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{task.dueDate}</span>
                    </div>
                    {task.comments > 0 && (
                        <div className="flex items-center space-x-1">
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>{task.comments}</span>
                        </div>
                    )}
                    {task.attachments > 0 && (
                        <div className="flex items-center space-x-1">
                            <Paperclip className="w-3.5 h-3.5" />
                            <span>{task.attachments}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
