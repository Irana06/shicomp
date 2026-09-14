import { cn } from '@/lib/utils';

export default function AppLogoIcon({ className }: { className?: string }) {
    return (
        <img
            src="/images/brand/logo-icon.jpg"
            alt=""
            className={cn(
                'aspect-square rounded-[22%] object-cover',
                className,
            )}
        />
    );
}
