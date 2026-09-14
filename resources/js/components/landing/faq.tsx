import { Minus, Plus } from 'lucide-react';
import { Container, SectionHeading } from '@/components/landing/primitives';
import { faq } from '@/data/faq';

export function Faq() {
    return (
        <section
            id="faq"
            className="scroll-mt-16 py-14 sm:scroll-mt-[88px] sm:py-20 lg:py-28"
        >
            <Container className="grid gap-6 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-24">
                <SectionHeading
                    numeral="七"
                    label="FAQ"
                    title="Yang sering ditanyakan."
                    description="Pertanyaan lain? Tanyakan langsung lewat WhatsApp."
                    className="self-start"
                />

                <div className="border-line border-t">
                    {faq.map((item, index) => (
                        <details
                            key={item.question}
                            open={index === 0}
                            className="group border-line border-b"
                        >
                            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 sm:py-7 [&::-webkit-details-marker]:hidden">
                                <h3 className="text-base leading-[1.4] font-bold sm:text-xl">
                                    {item.question}
                                </h3>
                                <Plus className="size-5 shrink-0 group-open:hidden sm:size-[22px]" />
                                <Minus className="text-shu hidden size-5 shrink-0 group-open:block sm:size-[22px]" />
                            </summary>
                            <p className="text-ink-muted -mt-1 max-w-[680px] pb-5 text-sm leading-[1.7] sm:-mt-3 sm:pb-7 sm:text-base sm:leading-[1.75]">
                                {item.answer}
                            </p>
                        </details>
                    ))}
                </div>
            </Container>
        </section>
    );
}
