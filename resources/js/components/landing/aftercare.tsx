import { FileCode2, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const options = [
    {
        icon: ShieldCheck,
        title: 'Dirawat ShikaComp',
        badge: 'Paling banyak dipilih',
        description:
            'Website atau aplikasi tetap online di server yang saya kelola. Update, backup, dan perbaikan sudah diurus lewat paket Maintenance bulanan, jadi Anda cukup fokus ke bisnis.',
    },
    {
        icon: FileCode2,
        title: 'Serah terima source code',
        description:
            'Source code, database, dan akses server diserahkan lengkap dengan panduan singkat. Anda bebas mengelola sendiri atau dengan tim Anda.',
    },
];

/**
 * What happens after a project is done: ongoing care or a full handover.
 */
export function Aftercare() {
    return (
        <div className="border-line flex flex-col gap-5 border-t pt-8 sm:gap-7 sm:pt-12">
            <div className="flex flex-col gap-2">
                <h3 className="font-display text-[22px] font-black sm:text-[28px]">
                    Setelah project selesai, pilih yang paling nyaman.
                </h3>
                <p className="text-ink-muted max-w-[640px] text-[15px] leading-[1.7] sm:text-base">
                    Dua-duanya tersedia. Bisa juga mulai dengan Maintenance,
                    lalu minta serah terima kapan saja.
                </p>
            </div>

            <ul className="grid gap-3.5 md:grid-cols-2 md:gap-6">
                {options.map(({ icon: Icon, title, badge, description }) => (
                    <li
                        key={title}
                        className={cn(
                            'flex gap-4 rounded-xl border p-6 sm:gap-5 sm:p-8',
                            badge
                                ? 'border-shu bg-shu-soft/40'
                                : 'border-line bg-surface',
                        )}
                    >
                        <span className="bg-shu-soft text-shu flex size-11 shrink-0 items-center justify-center rounded-xl sm:size-12">
                            <Icon className="size-[22px]" strokeWidth={1.6} />
                        </span>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-wrap items-center gap-2.5">
                                <h4 className="text-lg font-bold sm:text-xl">
                                    {title}
                                </h4>
                                {badge && (
                                    <span className="bg-shu text-surface rounded-lg px-2.5 py-0.5 text-[11px] font-bold tracking-[0.04em] sm:text-xs">
                                        {badge}
                                    </span>
                                )}
                            </div>
                            <p className="text-ink-muted text-[15px] leading-[1.7]">
                                {description}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
