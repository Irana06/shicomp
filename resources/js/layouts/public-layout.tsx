import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/landing/site-footer';
import { SiteHeader } from '@/components/landing/site-header';

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <div className="bg-paper text-ink flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
        </div>
    );
}
