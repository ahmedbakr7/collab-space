import { Card, CardContent } from '@/shared/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  iconColor: string;
}

export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor,
}: StatsCardProps) {
  const isPositive = change?.startsWith('+');

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-semibold mb-2">{value}</h3>
            {change && (
              <p
                className={cn(
                  'text-sm',
                  isPositive ? 'text-emerald-600' : 'text-destructive',
                )}
              >
                {change}
              </p>
            )}
          </div>
          <div
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center',
              iconColor,
            )}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
