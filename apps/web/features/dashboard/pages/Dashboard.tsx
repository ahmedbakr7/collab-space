import { Button } from "@/components/ui/button";
import {
    FolderKanban,
    Plus,
    CheckSquare,
    Users,
    TrendingUp,
    LucideIcon,
    CheckCircle2,
    MessageSquare,
    UserPlus,
    FileText,
} from "lucide-react";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Roundel from "@/features/shared/components/Roundel/Roundel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item";

// Added stricter typing for activity types and maps
type ActivityType =
    | "task_completed"
    | "comment"
    | "member_added"
    | "project_created";

interface Activity {
    id: string;
    type: ActivityType;
    user: string;
    avatar: string;
    action: string;
    target: string;
    time: string;
}

const activities: Activity[] = [
    {
        id: "1",
        type: "task_completed",
        user: "Sarah Anderson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        action: "completed",
        target: "Design system updates",
        time: "2 minutes ago",
    },
    {
        id: "2",
        type: "comment",
        user: "Michael Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        action: "commented on",
        target: "API Integration",
        time: "15 minutes ago",
    },
    {
        id: "3",
        type: "member_added",
        user: "Emma Wilson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
        action: "joined",
        target: "Marketing workspace",
        time: "1 hour ago",
    },
    {
        id: "4",
        type: "project_created",
        user: "David Kim",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        action: "created",
        target: "Q4 Product Roadmap",
        time: "2 hours ago",
    },
    {
        id: "5",
        type: "task_completed",
        user: "Lisa Rodriguez",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
        action: "completed",
        target: "User research interviews",
        time: "3 hours ago",
    },
];

const iconMap: Record<ActivityType, LucideIcon> = {
    task_completed: CheckCircle2,
    comment: MessageSquare,
    member_added: UserPlus,
    project_created: FileText,
};

const colorMap: Record<ActivityType, string> = {
    task_completed: "text-green-500",
    comment: "text-blue-500",
    member_added: "text-purple-500",
    project_created: "text-orange-500",
};

const workspaces = [
    {
        name: "Product Team",
        description:
            "Product development and feature planning for our core platform",
        color: "bg-blue-500",
        members: 12,
        projects: 8,
        tasksCompleted: 45,
        totalTasks: 68,
        memberAvatars: [
            "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
            "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
            "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        ],
    },
    {
        name: "Marketing",
        description:
            "Marketing campaigns, content strategy, and brand initiatives",
        color: "bg-purple-500",
        members: 8,
        projects: 5,
        tasksCompleted: 32,
        totalTasks: 45,
        memberAvatars: [
            "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
            "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
            "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna",
        ],
    },
    {
        name: "Engineering",
        description:
            "Software development, infrastructure, and technical operations",
        color: "bg-teal-500",
        members: 15,
        projects: 12,
        tasksCompleted: 78,
        totalTasks: 95,
        memberAvatars: [
            "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
            "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
            "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris",
            "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
        ],
    },
];

export const dashboardData = [
    {
        title: "Total Projects",
        value: "25",
        change: "+12% from last month",
        icon: FolderKanban,
        iconColor: "bg-blue-500",
    },
    {
        title: "Active Tasks",
        value: "208",
        change: "+8% from last week",
        icon: CheckSquare,
        iconColor: "bg-teal-500",
    },
    {
        title: "Team Members",
        value: "35",
        change: "+3 new this month",
        icon: Users,
        iconColor: "bg-purple-500",
    },
    {
        title: "Completion Rate",
        value: "73%",
        change: "+5% from last month",
        icon: TrendingUp,
        iconColor: "bg-green-500",
    },
];

export default function Dashboard() {
    return (
        <>
            <main className="container flex flex-col gap-3 px-5 py-10">
                <div className="md:flex flex-row justify-between">
                    <div>
                        <h1>Welcome back, Sarah</h1>
                        <sub>
                            Here&apos;s what&apos;s happening with your projects
                            today
                        </sub>
                    </div>

                    <Button className="bg-primary flex flex-row gap-3">
                        <Plus className="mr-3" />
                        <p>New Workspace</p>
                    </Button>
                </div>

                <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {dashboardData.map((card_, index) => {
                        return (
                            <DashboardCard
                                key={index}
                                change={card_.change}
                                description={card_.value}
                                icon={card_.icon}
                                iconColor="bg-primary"
                                title={card_.title}
                            />
                        );
                    })}
                </div>

                <h2>Your Workspaces</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {workspaces.map((workspace, index) => {
                        return <ProjectCard key={index} {...workspace} />;
                    })}
                </div>

                <h2>Recent Activity</h2>
                <Card>
                    <CardContent className="">
                        {activities.map((activity, index) => {
                            const [firstName, lastName] =
                                activity.user.split(" "); // removed unused underscore var
                            const Icon = iconMap[activity.type];
                            const iconColor = colorMap[activity.type];
                            return (
                                <Item key={index}>
                                    <ItemMedia>
                                        <Avatar className="size-10">
                                            <AvatarImage
                                                src={activity.avatar}
                                            />
                                            <AvatarFallback>
                                                {(
                                                    firstName.charAt(0) +
                                                    lastName.charAt(0)
                                                ).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </ItemMedia>
                                    <ItemContent>
                                        <ItemTitle>{activity.user}</ItemTitle>
                                        <ItemDescription>
                                            {activity.time}
                                        </ItemDescription>
                                    </ItemContent>
                                    <ItemContent className="flex-none">
                                        <Icon className={iconColor} />
                                    </ItemContent>
                                </Item>
                            );
                        })}
                    </CardContent>
                </Card>
            </main>
        </>
    );
}

function DashboardCard({
    title,
    description,
    icon: Icon,
    iconColor,
    change,
}: {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor: string;
    change: string;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
                <CardAction>
                    <Roundel colorClassName={iconColor}>
                        <Icon />
                    </Roundel>
                </CardAction>
            </CardHeader>
            <CardFooter>{change}</CardFooter>
        </Card>
    );
}

function ProjectCard({
    name,
    description,
    color,
    members,
    projects,
    tasksCompleted,
    totalTasks,
    memberAvatars,
}: {
    name: string;
    description: string;
    color: string;
    members: number;
    projects: number;
    tasksCompleted: number;
    totalTasks: number;
    memberAvatars: string[];
}) {
    return (
        <Card className="">
            <CardHeader className="flex flex-col">
                <Roundel colorClassName={color}>
                    <span className="text-primary-foreground font-semibold">
                        {name[0]}
                    </span>
                </Roundel>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col">
                <div className="flex flex-row justify-between">
                    <sub className="text-muted-foreground">Progress</sub>
                    <span className="font-bold">
                        {tasksCompleted}/{totalTasks} tasks
                    </span>
                </div>
                <progress
                    className="w-full"
                    value={tasksCompleted}
                    max={totalTasks}
                />
            </CardContent>
            <CardFooter className="border-t flex flex-row justify-between items-center">
                <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                    {memberAvatars.map((src, i) => (
                        <Avatar key={i}>
                            <AvatarImage src={src} alt={`@member-${i}`} />
                            <AvatarFallback>{name[0]}</AvatarFallback>
                        </Avatar>
                    ))}
                </div>
                <sub className="text-muted-foreground">
                    {projects} projects • {members} members
                </sub>
            </CardFooter>
        </Card>
    );
}
