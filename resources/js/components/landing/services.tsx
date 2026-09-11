import { AppWindow, Server, Smartphone } from 'lucide-react';
import { Container, SectionHeading } from '@/components/landing/primitives';

const services = [
    {
        icon: AppWindow,
        title: 'Pembuatan Website',
        description:
            'Company profile, toko online, hingga sistem dan dashboard custom. Dibangun dengan Laravel & React supaya cepat, aman, dan mudah dikembangkan.',
        tags: ['Laravel', 'React'],
    },
    {
        icon: Smartphone,
        title: 'Aplikasi Mobile',
        description:
            'Aplikasi Android & iOS dari satu kode dengan Flutter. Cocok untuk aplikasi kasir, booking, member, atau pendamping website bisnis Anda.',
        tags: ['Flutter', 'Android & iOS'],
    },
    {
        icon: Server,
        title: 'Deploy & Maintenance',
        description:
            'Setup server, domain, SSL, dan deploy otomatis (CI/CD). Setelah online, website dan aplikasi Anda tetap dipantau, di-backup, dan diperbarui.',
        tags: ['VPS & Docker', 'CI/CD'],
    },
];

export function Services() {
    return (
        <section
            id="layanan"
            className="border-line scroll-mt-16 border-t py-14 sm:scroll-mt-[88px] sm:py-20 lg:py-28"
        >
            <Container className="flex flex-col gap-7 sm:gap-14">
                <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-end lg:gap-12">
                    <SectionHeading
                        numeral="一"
                        label="LAYANAN"
                        title="Satu tempat untuk web, aplikasi, dan servernya."
                    />
                    <p className="text-ink-muted max-w-[420px] text-[15px] leading-[1.7] sm:text-[17px]">
                        Tidak perlu mencari developer dan admin server terpisah.
                        Dari desain sampai online, dikerjakan dan dijaga oleh
                        orang yang sama.
                    </p>
                </div>

                <ul className="grid gap-3.5 md:grid-cols-3 md:gap-6">
                    {services.map(
                        ({ icon: Icon, title, description, tags }) => (
                            <li
                                key={title}
                                className="border-line bg-surface flex flex-col gap-3 rounded-xl border p-6 sm:gap-5 sm:p-9"
                            >
                                <div className="flex items-center gap-3.5 md:flex-col md:items-start md:gap-5">
                                    <span className="bg-shu-soft text-shu flex size-11 shrink-0 items-center justify-center rounded-xl sm:size-[52px]">
                                        <Icon
                                            className="size-[22px] sm:size-[26px]"
                                            strokeWidth={1.6}
                                        />
                                    </span>
                                    <h3 className="text-[19px] font-bold sm:text-[23px]">
                                        {title}
                                    </h3>
                                </div>
                                <p className="text-ink-muted text-[15px] leading-[1.65] sm:text-base sm:leading-[1.7]">
                                    {description}
                                </p>
                                <ul className="mt-auto hidden flex-wrap gap-2 pt-2 sm:flex">
                                    {tags.map((tag) => (
                                        <li
                                            key={tag}
                                            className="bg-paper-deep rounded-lg px-2.5 py-1 text-xs font-medium"
                                        >
                                            {tag}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ),
                    )}
                </ul>
            </Container>
        </section>
    );
}
