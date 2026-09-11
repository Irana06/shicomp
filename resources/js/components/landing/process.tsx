import { Container, SectionHeading } from '@/components/landing/primitives';
import { cn } from '@/lib/utils';

const steps = [
    {
        kanji: '聞く',
        romaji: 'KIKU',
        title: 'Dengar Kebutuhan',
        description:
            'Ngobrol soal tujuan, target pengguna, fitur, dan budget. Belum yakin butuh apa? Justru di sini kita cari tahu bersama.',
    },
    {
        kanji: '設計',
        romaji: 'SEKKEI',
        title: 'Rancang',
        description:
            'Alur, desain tampilan, estimasi waktu, dan penawaran harga yang jelas sebelum pengerjaan dimulai.',
    },
    {
        kanji: '作る',
        romaji: 'TSUKURU',
        title: 'Bangun',
        description:
            'Pengerjaan bertahap. Progres bisa Anda pantau kapan saja lewat kode project di halaman Cek Status.',
    },
    {
        kanji: '届ける',
        romaji: 'TODOKERU',
        title: 'Serahkan',
        description:
            'Deploy ke server, serah terima akses, dan pendampingan agar Anda nyaman memakainya sendiri.',
    },
];

export function Process() {
    return (
        <section
            id="proses"
            className="bg-paper-deep scroll-mt-16 py-14 sm:scroll-mt-[88px] sm:py-20 lg:py-28"
        >
            <Container className="flex flex-col gap-7 sm:gap-16">
                <SectionHeading
                    numeral="二"
                    label="PROSES KERJA"
                    title="Empat langkah, tanpa kejutan di tengah jalan."
                    className="lg:items-center lg:text-center"
                />

                <ol className="grid sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4">
                    {steps.map((step, index) => {
                        const number = String(index + 1).padStart(2, '0');

                        return (
                            <li
                                key={step.romaji}
                                className={cn(
                                    'flex gap-5 border-t-2 py-5 sm:flex-col sm:gap-3.5 sm:pt-7 sm:pb-8',
                                    index === 0
                                        ? 'border-shu'
                                        : 'border-line-strong',
                                )}
                            >
                                <div className="flex w-[92px] shrink-0 items-baseline justify-between sm:w-auto">
                                    <span
                                        lang="ja"
                                        className="font-display text-[30px] leading-[1.1] font-black whitespace-nowrap sm:text-5xl lg:text-[64px] lg:leading-none"
                                    >
                                        {step.kanji}
                                    </span>
                                    <span className="text-shu hidden font-mono text-[13px] sm:inline">
                                        {number}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1.5 sm:gap-3.5">
                                    <p className="text-ink-subtle font-mono text-[11px] tracking-[0.16em] sm:text-xs sm:tracking-[0.18em]">
                                        <span className="sm:hidden">
                                            {number} ·{' '}
                                        </span>
                                        {step.romaji}
                                    </p>
                                    <h3 className="text-[17px] font-bold sm:text-xl">
                                        {step.title}
                                    </h3>
                                    <p className="text-ink-muted text-sm leading-[1.65] sm:text-[15px] sm:leading-[1.7]">
                                        {step.description}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </Container>
        </section>
    );
}
