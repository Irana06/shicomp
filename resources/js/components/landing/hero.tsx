import { ArrowRight, MessageCircle } from 'lucide-react';
import {
    buttonOutline,
    buttonPrimary,
    Container,
    WhatsappLink,
} from '@/components/landing/primitives';
import { cn } from '@/lib/utils';
import { CONSULT_MESSAGE } from '@/lib/whatsapp';

const stack = ['Laravel', 'React', 'Flutter', 'Server & CI/CD'];

export function Hero() {
    return (
        <section className="overflow-hidden">
            <Container className="grid items-center gap-6 pt-8 pb-14 sm:gap-10 sm:pt-12 lg:grid-cols-2 lg:gap-[72px] lg:pt-24 lg:pb-28">
                <div className="flex flex-col gap-5 sm:gap-7 lg:gap-8">
                    <p className="text-ink-muted flex items-center gap-3 text-[13px] font-medium tracking-[0.06em] sm:text-sm sm:tracking-[0.08em]">
                        <span className="bg-shu h-0.5 w-6 sm:w-8" />
                        Jasa Pembuatan Website &amp; Aplikasi
                    </p>

                    <h1 className="font-display text-[36px] leading-[1.28] font-black text-pretty sm:text-5xl sm:leading-[1.24] lg:text-[56px]">
                        Website &amp; aplikasi yang dirancang teliti, dibangun{' '}
                        <span className="text-shu">sepenuh hati.</span>
                    </h1>

                    <p className="text-ink-muted max-w-[540px] text-base leading-[1.7] sm:text-lg lg:text-[19px] lg:leading-[1.75]">
                        ShikaComp membantu UMKM, startup, instansi, hingga
                        kebutuhan personal: website dengan Laravel &amp; React,
                        aplikasi mobile dengan Flutter, sampai benar-benar
                        online di server.
                    </p>

                    <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                        <WhatsappLink
                            message={CONSULT_MESSAGE}
                            className={cn(
                                buttonPrimary,
                                'h-14 px-7 sm:text-base',
                            )}
                        >
                            <MessageCircle className="size-5" />
                            Konsultasi via WhatsApp
                        </WhatsappLink>
                        <a
                            href="/#status"
                            className={cn(buttonOutline, 'h-14 sm:text-base')}
                        >
                            Cek Status Project
                            <ArrowRight className="size-[18px]" />
                        </a>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 sm:pt-2">
                        <span className="text-ink-subtle hidden text-[13px] sm:inline">
                            Dikerjakan dengan
                        </span>
                        <ul className="flex flex-wrap gap-2">
                            {stack.map((item) => (
                                <li
                                    key={item}
                                    className="border-line bg-surface flex h-8 items-center rounded-xl border px-3 text-xs font-medium sm:text-[13px]"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="order-first lg:order-last lg:-mr-12">
                    <img
                        src="/images/brand/hero-mascot.jpg"
                        alt="Maskot rusa Yushika di depan torii dan matahari merah, dikelilingi bunga sakura"
                        width={1280}
                        height={1004}
                        fetchPriority="high"
                        className="mx-auto h-auto w-full max-w-[650px]"
                    />
                </div>
            </Container>
        </section>
    );
}
