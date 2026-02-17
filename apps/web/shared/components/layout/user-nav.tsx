'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { createClient } from '@/shared/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export function UserNav() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, [supabase.auth]);

  if (loading) {
    return (
      <div className="flex items-center space-x-3 px-3 py-2 mt-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const email = user.email || '';
  const name = user.user_metadata?.full_name || email.split('@')[0];
  const avatarUrl =
    user.user_metadata?.avatar_url ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`;
  const initials = name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex items-center space-x-3 px-3 py-2 mt-2">
      <Avatar className="w-8 h-8">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{name}</p>
        <p className="text-xs text-muted-foreground truncate">{email}</p>
      </div>
    </div>
  );
}
