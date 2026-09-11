import { usePage } from '@inertiajs/react';
import { MessageCircle } from 'lucide-react';
import {
    buttonBase,
    Container,
    SakuraFlower,
    SakuraPetal,
    WhatsappLink,
} from '@/components/landing/primitives';
import { cn } from '@/lib/utils';
import { CONSULT_MESSAGE } from '@/lib/whatsapp';

export function CallToAction() {
    const { contact } = usePage().props;

    return (
        <section
            id="kontak"
            className="scroll-mt-16 pb-14 sm:scroll-mt-[88px] sm:pb-20 lg:pb-28"
        >
            <Container>
                <div className="bg-shu text-surface relative flex flex-col justify-between gap-5 overflow-hidden rounded-xl px-6 py-10 sm:gap-8 sm:px-12 sm:py-16 lg:flex-row lg:items-center lg:gap-16 lg:px-24 lg:py-[88px]">
                    <SakuraFlower className="text-surface [&_circle]:fill-surface absolute -top-9 right-[30%] hidden size-40 rotate-20 opacity-20 lg:block" />
                    <SakuraPetal className="text-surface absolute bottom-7 left-[44%] hidden size-9 -rotate-30 opacity-25 lg:block" />
                    <span
                        lang="ja"
                        aria-hidden="true"
                        className="font-display text-surface pointer-events-none absolute -right-6 -bottom-12 text-[180px] leading-none font-black opacity-[0.08] lg:-right-5 lg:-bottom-[90px] lg:text-[320px]"
                    >
                        鹿
                    </span>

                    <div className="relative flex flex-col gap-4 sm:gap-5">
                        <h2 className="font-display max-w-[680px] text-[28px] leading-[1.3] font-black text-balance sm:text-4xl lg:text-[46px] lg:leading-[1.25]">
                            Punya ide project? Ceritakan dulu, kita rancang
                            bersama.
                        </h2>
                        <p className="text-shu-soft text-[15px] sm:text-lg">
                            {contact.business_hours
                                ? `Balasan pada ${contact.business_hours}.`
                                : 'Balasan pada [JAM OPERASIONAL].'}
                        </p>
                    </div>

                    <WhatsappLink
                        message={CONSULT_MESSAGE}
                        className={cn(
                            buttonBase,
                            'bg-surface text-ink hover:bg-paper-deep focus-visible:outline-surface relative h-14 shrink-0 px-8 sm:h-[62px] sm:text-[17px]',
                        )}
                    >
                        <MessageCircle className="text-shu size-[22px]" />
                        Chat via WhatsApp
                    </WhatsappLink>
                </div>
            </Container>
        </section>
    );
}
