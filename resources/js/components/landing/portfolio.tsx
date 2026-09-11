import { Container, SectionHeading } from '@/components/landing/primitives';
import { portfolio } from '@/data/portfolio';

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

                <ul className="grid gap-7 md:grid-cols-3 md:gap-6">
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
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}
