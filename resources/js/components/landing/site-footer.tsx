import { usePage } from '@inertiajs/react';
import { Container } from '@/components/landing/primitives';
import { portfolio } from '@/data/portfolio';

export function SiteFooter() {
    const { contact } = usePage().props;

    const instagram = contact.instagram?.replace(/^@/, '');

    return (
        <footer className="bg-paper-deep text-ink-soft">
            <Container className="flex flex-col gap-10 py-10 sm:gap-12 sm:py-16">
                <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))] md:gap-12">
                    <div className="flex items-center gap-5 sm:gap-6">
                        <img
                            src="/images/brand/logo-full.jpg"
                            alt="Logo Yushika ShikaComp"
                            width={480}
                            height={468}
                            loading="lazy"
                            className="h-auto w-28 shrink-0 sm:w-40"
                        />
                        <p className="text-ink-muted max-w-[260px] text-sm leading-[1.7] sm:text-[15px]">
                            Jasa pembuatan website, aplikasi mobile, dan deploy
                            server. Dirancang teliti, dibangun sepenuh hati.
                        </p>
                    </div>

                    <FooterColumn title="LAYANAN">
                        <a href="/#layanan">Pembuatan Website</a>
                        <a href="/#layanan">Aplikasi Mobile</a>
                        <a href="/#layanan">Deploy &amp; Maintenance</a>
                    </FooterColumn>

                    <FooterColumn title="SHIKACOMP">
                        {portfolio.length > 0 && (
                            <a href="/#portofolio">Portofolio</a>
                        )}
                        <a href="/#status">Cek Status Project</a>
                        <a href="/#tentang">Tentang</a>
                        <a href="/#faq">FAQ</a>
                    </FooterColumn>

                    <FooterColumn title="KONTAK">
                        <span>WhatsApp {contact.whatsapp ?? '[NOMOR]'}</span>
                        {contact.email ? (
                            <a href={`mailto:${contact.email}`}>
                                {contact.email}
                            </a>
                        ) : (
                            <span>[EMAIL]</span>
                        )}
                        {instagram ? (
                            <a
                                href={`https://instagram.com/${instagram}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Instagram @{instagram}
                            </a>
                        ) : (
                            <span>Instagram [@AKUN]</span>
                        )}
                    </FooterColumn>
                </div>

                <div className="border-line-strong text-ink-subtle flex items-center justify-between gap-4 border-t pt-5 text-[13px] sm:pt-7 sm:text-sm">
                    <p>© {new Date().getFullYear()} ShikaComp · Yushika</p>
                    <p lang="ja" className="font-display tracking-[0.3em]">
                        丁寧に、つくる。
                    </p>
                </div>
            </Container>
        </footer>
    );
}

function FooterColumn({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="[&_a:hover]:text-shu flex flex-col gap-3 text-sm sm:gap-3.5 sm:text-[15px] [&_a]:transition-colors">
            <p className="text-ink-subtle text-xs font-bold tracking-[0.08em] sm:text-[13px]">
                {title}
            </p>
            {children}
        </div>
    );
}
