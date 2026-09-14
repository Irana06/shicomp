import {
    Container,
    SakuraFlower,
    SakuraPetal,
    SectionHeading,
} from '@/components/landing/primitives';

const expertise = [
    { area: 'Web', tools: 'Laravel · React' },
    { area: 'Mobile', tools: 'Flutter' },
    { area: 'Infrastruktur', tools: 'Server · CI/CD' },
];

export function About() {
    return (
        <section
            id="tentang"
            className="bg-paper-deep scroll-mt-16 py-14 sm:scroll-mt-[88px] sm:py-20 lg:py-28"
        >
            <Container className="grid items-center gap-8 lg:grid-cols-[440px_minmax(0,1fr)] lg:gap-24">
                <div className="relative mx-auto hidden h-[480px] w-full max-w-[440px] items-center justify-center lg:flex">
                    <SakuraPetal className="text-sakura absolute top-10 left-2 size-11 -rotate-[24deg]" />
                    <SakuraPetal className="text-shu absolute bottom-14 left-9 size-7 rotate-30" />
                    <SakuraFlower className="text-sakura absolute top-5 right-4 size-[72px]" />
                    <img
                        src="/images/brand/avatar.jpg"
                        alt="Maskot rusa Yushika"
                        width={720}
                        height={720}
                        loading="lazy"
                        className="border-surface relative size-[400px] rounded-full border-[10px] object-cover shadow-[0_28px_56px_-28px_rgba(53,35,28,0.45)]"
                    />
                </div>

                <div className="flex flex-col gap-5 sm:gap-6">
                    <SectionHeading
                        numeral="六"
                        label="TENTANG"
                        title={
                            <span className="flex items-center gap-4">
                                <img
                                    src="/images/brand/avatar.jpg"
                                    alt=""
                                    width={88}
                                    height={88}
                                    loading="lazy"
                                    className="border-surface size-[88px] shrink-0 rounded-full border-4 object-cover lg:hidden"
                                />
                                Halo, saya Yushika.
                            </span>
                        }
                    />
                    <p className="text-ink-soft text-[15px] leading-[1.75] sm:text-lg sm:leading-[1.8]">
                        Developer fullstack di balik ShikaComp. Sehari-hari saya
                        membangun website dengan Laravel dan React, aplikasi
                        mobile dengan Flutter, dan mengurus server sampai
                        semuanya benar-benar online.
                    </p>
                    <p className="text-ink-soft text-[15px] leading-[1.75] sm:text-lg sm:leading-[1.8]">
                        Nama ShikaComp berasal dari{' '}
                        <span lang="ja" className="font-display font-bold">
                            鹿
                        </span>{' '}
                        <span className="font-bold">shika</span>, rusa dalam
                        bahasa Jepang. Rusa di Nara terkenal menyambut
                        pengunjung dengan membungkuk. Semangat itu yang saya
                        bawa: melayani dengan sopan, teliti, dan sepenuh hati.
                    </p>
                    <dl className="border-line-strong hidden gap-10 border-t pt-5 sm:flex">
                        {expertise.map((item) => (
                            <div
                                key={item.area}
                                className="flex flex-col gap-1"
                            >
                                <dt className="text-ink-subtle text-[13px]">
                                    {item.area}
                                </dt>
                                <dd className="font-bold">{item.tools}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </Container>
        </section>
    );
}
