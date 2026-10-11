import {
    Container,
    SakuraPetal,
    SectionHeading,
} from '@/components/landing/primitives';
import { portfolio } from '@/data/portfolio';
import { testimonials } from '@/data/testimonials';
import { cn } from '@/lib/utils';

export function Portfolio() {
    if (portfolio.length === 0) {
        return null;
    }

    return (
        <section
            id="portofolio"
            className="scroll-mt-16 py-14 sm:scroll-mt-[88px] sm:py-20 lg:py-28"
        >
            <Container className="flex flex-col gap-6 sm:gap-14">
                <SectionHeading
                    numeral="五"
                    label="PORTOFOLIO"
                    title="Karya terpilih."
                />

                <ul
                    className={cn(
                        'grid gap-7 md:gap-6',
                        // Rows stay full: three per row for 3, 6, 9 items, four for 4, otherwise two.
                        portfolio.length % 3 === 0
                            ? 'md:grid-cols-3'
                            : portfolio.length === 4
                              ? 'md:grid-cols-2 xl:grid-cols-4'
                              : 'md:grid-cols-2',
                    )}
                >
                    {portfolio.map((item) => (
                        <li
                            key={item.title}
                            className="flex flex-col gap-3 sm:gap-4"
                        >
                            <img
                                src={item.image}
                                alt={`Tampilan ${item.title}`}
                                loading="lazy"
                                className="bg-paper-deep aspect-[4/3] w-full rounded-xl object-cover"
                            />
                            <p className="text-shu text-xs font-bold tracking-[0.04em] uppercase sm:text-[13px]">
                                {item.category}
                            </p>
                            <h3 className="text-lg font-bold sm:text-[21px]">
                                {item.url ? (
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-shu"
                                    >
                                        {item.title}
                                    </a>
                                ) : (
                                    item.title
                                )}
                            </h3>
                            <p className="text-ink-muted text-sm leading-[1.6] sm:text-[15px]">
                                {item.summary}
                            </p>
                            {item.highlights && item.highlights.length > 0 && (
                                <ul className="flex flex-col gap-1.5 text-sm leading-[1.55] sm:text-[15px]">
                                    {item.highlights.map((point) => (
                                        <li
                                            key={point}
                                            className="flex gap-2.5"
                                        >
                                            <SakuraPetal className="text-sakura mt-1 size-3.5 shrink-0" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>

                {testimonials.length > 0 && (
                    <div className="border-line flex flex-col gap-5 border-t pt-8 sm:gap-7 sm:pt-12">
                        <h3 className="font-display text-[22px] font-black sm:text-[28px]">
                            Kata klien.
                        </h3>
                        <ul className="grid gap-4 md:grid-cols-2 md:gap-6">
                            {testimonials.map((item) => (
                                <li
                                    key={item.name}
                                    className="border-line bg-surface flex flex-col gap-4 rounded-xl border p-6 sm:p-8"
                                >
                                    <blockquote className="text-[15px] leading-[1.75] sm:text-base">
                                        “{item.quote}”
                                    </blockquote>
                                    <p className="mt-auto text-sm">
                                        <span className="font-bold">
                                            {item.name}
                                        </span>
                                        <span className="text-ink-subtle">
                                            {' '}
                                            · {item.role}
                                            {item.project &&
                                                ` · ${item.project}`}
                                        </span>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </Container>
        </section>
    );
}
