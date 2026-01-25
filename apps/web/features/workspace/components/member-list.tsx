import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { MoreVertical, Crown, Shield, LucideIcon } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'owner' | 'admin' | 'member';
  joinedDate: string;
}

interface MemberListProps {
  members: Member[];
}

const roleVariants: Record<
  string,
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  owner: 'default',
  admin: 'secondary',
  member: 'outline',
};

export function MemberList({ members }: MemberListProps) {
  return (
    <div className="space-y-2">
      {members.map((member) => {
        const variant = roleVariants[member.role] || 'outline';
        const RoleIcon =
          member.role === 'owner'
            ? Crown
            : member.role === 'admin'
              ? Shield
              : null;
        const label =
          member.role.charAt(0).toUpperCase() + member.role.slice(1);

        return (
          <div
            key={member.id}
            className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center space-x-4 flex-1">
              <Avatar className="w-12 h-12">
                <AvatarImage src={member.avatar} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="mb-1 truncate font-medium">{member.name}</h4>
                <p className="text-sm text-muted-foreground truncate">
                  {member.email}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Badge className="flex items-center space-x-1" variant={variant}>
                {RoleIcon && <RoleIcon className="w-3 h-3" />}
                <span>{label}</span>
              </Badge>
              <span className="text-sm text-muted-foreground hidden sm:block">
                Joined {member.joinedDate}
              </span>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
