import { Link } from '@inertiajs/react';
import { Menu, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import {
    buttonDark,
    buttonPrimary,
    Container,
    WhatsappLink,
} from '@/components/landing/primitives';
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { portfolio } from '@/data/portfolio';
import { cn } from '@/lib/utils';
import { CONSULT_MESSAGE } from '@/lib/whatsapp';
import { home } from '@/routes';

const navItems = [
    { label: 'Layanan', href: '/#layanan' },
    { label: 'Proses', href: '/#proses' },
    { label: 'Paket', href: '/#paket' },
    ...(portfolio.length > 0
        ? [{ label: 'Portofolio', href: '/#portofolio' }]
        : []),
    { label: 'Cek Status', href: '/#status' },
    { label: 'FAQ', href: '/#faq' },
];

export function BrandMark({ className }: { className?: string }) {
    return (
        <Link
            href={home()}
            className={cn('flex items-center gap-3', className)}
            aria-label="Yushika · ShikaComp, ke beranda"
        >
            <img
                src="/images/brand/logo-icon.jpg"
                alt=""
                width={46}
                height={46}
                className="size-10 rounded-[11px] object-cover sm:size-[46px] sm:rounded-xl"
            />
            <span className="flex flex-col gap-1">
                <span className="font-display text-[21px] leading-none font-black sm:text-2xl">
                    Yushika
                </span>
                <span className="text-ink-subtle text-[10px] leading-none font-bold tracking-[0.14em] sm:text-[11px]">
                    SHIKACOMP ·{' '}
                    <span lang="ja" className="tracking-normal">
                        ユシカ
                    </span>
                </span>
            </span>
        </Link>
    );
}

export function SiteHeader() {
    const [open, setOpen] = useState(false);

    return (
        <header className="border-line bg-paper/90 sticky top-0 z-40 border-b backdrop-blur-md">
            <Container className="flex h-16 items-center justify-between gap-6 sm:h-[88px]">
                <BrandMark />

                <nav
                    aria-label="Navigasi utama"
                    className="hidden items-center gap-9 text-[15px] font-medium lg:flex"
                >
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="text-ink hover:text-shu transition-colors"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <WhatsappLink
                    message={CONSULT_MESSAGE}
                    className={cn(
                        buttonDark,
                        'hidden h-11 px-5 text-sm lg:inline-flex',
                    )}
                >
                    <MessageCircle className="size-[18px]" />
                    Konsultasi
                </WhatsappLink>

                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger
                        className="text-ink -mr-2 flex size-11 items-center justify-center rounded-xl lg:hidden"
                        aria-label="Buka menu"
                    >
                        <Menu className="size-6" />
                    </SheetTrigger>
                    <SheetContent
                        side="right"
                        className="border-line bg-paper text-ink w-[300px] p-6"
                    >
                        <SheetTitle className="sr-only">Menu</SheetTitle>
                        <nav
                            aria-label="Navigasi utama"
                            className="mt-10 flex flex-col"
                        >
                            {navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="border-line border-b py-4 text-lg font-medium"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                        <WhatsappLink
                            message={CONSULT_MESSAGE}
                            className={cn(buttonPrimary, 'mt-8 w-full')}
                        >
                            <MessageCircle className="size-5" />
                            Konsultasi via WhatsApp
                        </WhatsappLink>
                    </SheetContent>
                </Sheet>
            </Container>
        </header>
    );
}
