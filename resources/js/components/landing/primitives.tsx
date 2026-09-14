import { usePage } from '@inertiajs/react';
import type { ComponentProps, ReactNode } from 'react';
import { whatsappLink } from '@/lib/whatsapp';
import { cn } from '@/lib/utils';

export const buttonBase =
    'inline-flex items-center justify-center gap-2.5 rounded-xl px-6 text-[15px] font-bold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0';

export const buttonPrimary = cn(
    buttonBase,
    'bg-shu text-surface hover:bg-shu-deep h-12 shadow-[0_10px_24px_-12px_rgba(213,59,58,0.5)]',
);

export const buttonOutline = cn(
    buttonBase,
    'border-ink text-ink hover:bg-ink hover:text-paper h-12 border',
);

export const buttonDark = cn(
    buttonBase,
    'bg-ink text-paper hover:bg-ink-soft h-12',
);

export function Container({ className, ...props }: ComponentProps<'div'>) {
    return (
        <div
            className={cn(
                'mx-auto w-full max-w-[1200px] px-5 sm:px-8',
                className,
            )}
            {...props}
        />
    );
}

type SectionHeadingProps = {
    numeral: string;
    label: string;
    title: ReactNode;
    description?: ReactNode;
    align?: 'left' | 'center';
    tone?: 'light' | 'dark';
    className?: string;
};

export function SectionHeading({
    numeral,
    label,
    title,
    description,
    align = 'left',
    tone = 'light',
    className,
}: SectionHeadingProps) {
    return (
        <div
            className={cn(
                'flex flex-col gap-3 sm:gap-4',
                align === 'center' && 'items-center text-center',
                className,
            )}
        >
            <div
                className={cn(
                    'flex items-center gap-2.5 text-[13px] font-bold tracking-[0.08em] sm:text-sm',
                    tone === 'dark' ? 'text-sakura' : 'text-shu',
                )}
            >
                <span lang="ja" className="font-display text-lg sm:text-xl">
                    {numeral}
                </span>
                {label}
            </div>
            <h2 className="font-display max-w-[760px] text-[28px] leading-[1.3] font-black text-balance sm:text-4xl lg:text-[44px] lg:leading-[1.25]">
                {title}
            </h2>
            {description && (
                <p
                    className={cn(
                        'max-w-[600px] text-[15px] leading-[1.7] text-pretty sm:text-[17px]',
                        tone === 'dark' ? 'text-night-muted' : 'text-ink-muted',
                    )}
                >
                    {description}
                </p>
            )}
        </div>
    );
}

type WhatsappLinkProps = Omit<ComponentProps<'a'>, 'href'> & {
    message: string;
};

/**
 * Opens WhatsApp with a pre-filled message, using the configured business number.
 */
export function WhatsappLink({ message, ...props }: WhatsappLinkProps) {
    const { contact } = usePage().props;
    const href = whatsappLink(contact.whatsapp, message);
    const external = href.startsWith('https://');

    return (
        <a
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            {...props}
        />
    );
}

const PETAL_PATH =
    'M50 92 C22 70 18 36 38 12 L50 24 L62 12 C82 36 78 70 50 92 Z';
const FLOWER_PETAL_PATH =
    'M50 50 C36 40 34 18 45 8 L50 15 L55 8 C66 18 64 40 50 50 Z';

export function SakuraPetal({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
            <path fill="currentColor" d={PETAL_PATH} />
        </svg>
    );
}

export function SakuraFlower({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
            <g fill="currentColor">
                {[0, 72, 144, 216, 288].map((angle) => (
                    <path
                        key={angle}
                        d={FLOWER_PETAL_PATH}
                        transform={`rotate(${angle} 50 50)`}
                    />
                ))}
            </g>
            <circle cx="50" cy="50" r="6" className="fill-shu" />
        </svg>
    );
}
