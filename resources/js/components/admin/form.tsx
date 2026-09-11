import type { InertiaLinkProps } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

type FormFieldProps = {
    label: string;
    htmlFor: string;
    error?: string;
    hint?: ReactNode;
    optional?: boolean;
    className?: string;
    children: ReactNode;
};

export function FormField({
    label,
    htmlFor,
    error,
    hint,
    optional = false,
    className,
    children,
}: FormFieldProps) {
    return (
        <div className={cn('grid content-start gap-2', className)}>
            <Label htmlFor={htmlFor}>
                {label}
                {optional && (
                    <span className="text-muted-foreground font-normal">
                        (opsional)
                    </span>
                )}
            </Label>
            {children}
            {hint && (
                <p className="text-muted-foreground text-xs leading-relaxed">
                    {hint}
                </p>
            )}
            <InputError message={error} />
        </div>
    );
}

export function NativeSelect({
    className,
    children,
    ...props
}: ComponentProps<'select'>) {
    return (
        <div className={cn('relative', className)}>
            <select
                className="border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive dark:bg-input/30 [&>option]:bg-popover h-9 w-full appearance-none rounded-md border bg-transparent py-1 pr-9 pl-3 text-base shadow-xs outline-none focus-visible:ring-[3px] md:text-sm"
                {...props}
            >
                {children}
            </select>
            <ChevronDown
                aria-hidden="true"
                className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2"
            />
        </div>
    );
}

export function MoneyInput({
    className,
    ...props
}: Omit<ComponentProps<'input'>, 'type'>) {
    return (
        <div className={cn('relative', className)}>
            <span className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm">
                Rp
            </span>
            <input
                inputMode="numeric"
                autoComplete="off"
                className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 flex h-9 w-full min-w-0 rounded-md border bg-transparent py-1 pr-3 pl-10 text-base shadow-xs outline-none focus-visible:ring-[3px] md:text-sm"
                {...props}
            />
        </div>
    );
}

/** "3500000.00" -> "3.500.000" for editing; the server strips the dots again. */
export function formatMoneyInput(value: string | null | undefined): string {
    if (value === null || value === undefined || value === '') {
        return '';
    }

    return new Intl.NumberFormat('id-ID').format(Math.round(Number(value)));
}

export function CheckboxField({
    id,
    label,
    description,
    defaultChecked,
}: {
    id: string;
    label: string;
    description?: string;
    defaultChecked?: boolean;
}) {
    return (
        <div className="flex items-start gap-3">
            <Checkbox
                id={id}
                name={id}
                defaultChecked={defaultChecked}
                className="mt-0.5"
            />
            <div className="grid gap-1">
                <Label htmlFor={id} className="leading-snug">
                    {label}
                </Label>
                {description && (
                    <p className="text-muted-foreground text-xs">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}

export function FormActions({
    processing,
    submitLabel,
    cancelHref,
}: {
    processing: boolean;
    submitLabel: string;
    cancelHref: NonNullable<InertiaLinkProps['href']>;
}) {
    return (
        <div className="flex items-center justify-end gap-3">
            <Button variant="outline" asChild>
                <Link href={cancelHref}>Batal</Link>
            </Button>
            <Button type="submit" disabled={processing}>
                {processing && <Spinner />}
                {submitLabel}
            </Button>
        </div>
    );
}

/** Laravel reports array item errors as "features.0"; show the first one. */
export function firstNestedError(
    errors: Record<string, string>,
    field: string,
): string | undefined {
    return (
        errors[field] ??
        Object.entries(errors).find(([key]) => key.startsWith(`${field}.`))?.[1]
    );
}
