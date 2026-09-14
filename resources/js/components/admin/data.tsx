import { Form, Link } from '@inertiajs/react';
import { Check, ChevronLeft, ChevronRight, Copy, Trash2 } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { useClipboard } from '@/hooks/use-clipboard';
import { cn } from '@/lib/utils';
import type { Paginated } from '@/types';
import type { RouteFormDefinition } from '@/wayfinder';

export function DataTable({ children }: { children: ReactNode }) {
    return (
        <div className="bg-card overflow-hidden rounded-xl border">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm [&_tbody_tr:last-child_td]:border-b-0">
                    {children}
                </table>
            </div>
        </div>
    );
}

export function Th({ className, ...props }: ComponentProps<'th'>) {
    return (
        <th
            className={cn(
                'bg-muted/60 text-muted-foreground border-b px-4 py-3 text-xs font-medium whitespace-nowrap',
                className,
            )}
            {...props}
        />
    );
}

export function Td({ className, ...props }: ComponentProps<'td'>) {
    return (
        <td
            className={cn('border-b px-4 py-3 align-middle', className)}
            {...props}
        />
    );
}

const projectStatusStyles: Record<string, string> = {
    pending: 'bg-secondary text-secondary-foreground',
    design: 'bg-sakura/40 text-ink dark:bg-sakura/15 dark:text-sakura',
    development: 'bg-shu-soft text-shu-deep dark:bg-shu/20 dark:text-sakura',
    review: 'bg-amber-100 text-amber-900 dark:bg-amber-400/15 dark:text-amber-200',
    completed:
        'bg-emerald-100 text-emerald-900 dark:bg-emerald-400/15 dark:text-emerald-200',
    cancelled: 'bg-muted text-muted-foreground',
};

const paymentStatusStyles: Record<string, string> = {
    unpaid: 'bg-muted text-muted-foreground',
    down_payment:
        'bg-amber-100 text-amber-900 dark:bg-amber-400/15 dark:text-amber-200',
    paid: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-400/15 dark:text-emerald-200',
};

type StatusBadgeProps = {
    status: string;
    label: string;
    className?: string;
};

export function ProjectStatusBadge({
    status,
    label,
    className,
}: StatusBadgeProps) {
    return (
        <Badge
            variant="outline"
            className={cn(
                'border-transparent',
                projectStatusStyles[status],
                className,
            )}
        >
            {label}
        </Badge>
    );
}

export function PaymentStatusBadge({
    status,
    label,
    className,
}: StatusBadgeProps) {
    return (
        <Badge
            variant="outline"
            className={cn(
                'border-transparent',
                paymentStatusStyles[status],
                className,
            )}
        >
            {label}
        </Badge>
    );
}

export function Pagination({ page }: { page: Paginated<unknown> }) {
    if (page.last_page <= 1) {
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
            <p className="text-muted-foreground">
                Menampilkan {page.from}–{page.to} dari {page.total}
            </p>
            <div className="flex gap-2">
                <PageLink href={page.prev_page_url}>
                    <ChevronLeft />
                    Sebelumnya
                </PageLink>
                <PageLink href={page.next_page_url}>
                    Berikutnya
                    <ChevronRight />
                </PageLink>
            </div>
        </div>
    );
}

function PageLink({
    href,
    children,
}: {
    href: string | null;
    children: ReactNode;
}) {
    if (href === null) {
        return (
            <Button variant="outline" size="sm" disabled>
                {children}
            </Button>
        );
    }

    return (
        <Button variant="outline" size="sm" asChild>
            <Link href={href} preserveScroll>
                {children}
            </Link>
        </Button>
    );
}

export function CopyButton({
    value,
    label = 'Salin',
    successMessage = 'Disalin ke clipboard.',
    className,
}: {
    value: string;
    label?: string;
    successMessage?: string;
    className?: string;
}) {
    const [copiedText, copy] = useClipboard();

    return (
        <Button
            type="button"
            variant="outline"
            size="sm"
            className={className}
            onClick={() => {
                void copy(value).then((copied) => {
                    if (copied) {
                        toast.success(successMessage);
                    }
                });
            }}
        >
            {copiedText === value ? <Check /> : <Copy />}
            {label}
        </Button>
    );
}

export function ConfirmDeleteDialog({
    form,
    title,
    description,
    triggerLabel = 'Hapus',
    iconOnly = false,
}: {
    form: RouteFormDefinition<'post'>;
    title: string;
    description: string;
    triggerLabel?: string;
    iconOnly?: boolean;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {iconOnly ? (
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label={triggerLabel}
                        className="text-muted-foreground hover:text-destructive"
                    >
                        <Trash2 />
                    </Button>
                ) : (
                    <Button
                        variant="outline"
                        className="text-destructive hover:text-destructive"
                    >
                        <Trash2 />
                        {triggerLabel}
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
                <Form {...form} options={{ preserveScroll: true }}>
                    {({ processing }) => (
                        <DialogFooter className="gap-2">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Batal
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                variant="destructive"
                                disabled={processing}
                            >
                                {processing && <Spinner />}
                                {triggerLabel}
                            </Button>
                        </DialogFooter>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
