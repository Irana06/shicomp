import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function AdminPage({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) {
    return (
        <div className={cn('flex flex-1 flex-col gap-6 p-4 md:p-6', className)}>
            {children}
        </div>
    );
}

export function PageHeader({
    title,
    description,
    actions,
}: {
    title: ReactNode;
    description?: ReactNode;
    actions?: ReactNode;
}) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0 space-y-1">
                <h1 className="font-display text-2xl font-bold tracking-tight">
                    {title}
                </h1>
                {description && (
                    <div className="text-muted-foreground text-sm">
                        {description}
                    </div>
                )}
            </div>
            {actions && (
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                    {actions}
                </div>
            )}
        </div>
    );
}

export function EmptyState({
    icon: Icon,
    title,
    description,
    action,
}: {
    icon: LucideIcon;
    title: string;
    description: string;
    action?: ReactNode;
}) {
    return (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-14 text-center">
            <span className="bg-secondary text-primary flex size-12 items-center justify-center rounded-full">
                <Icon className="size-6" />
            </span>
            <div className="space-y-1">
                <p className="font-medium">{title}</p>
                <p className="text-muted-foreground max-w-sm text-sm">
                    {description}
                </p>
            </div>
            {action && <div className="mt-2">{action}</div>}
        </div>
    );
}
