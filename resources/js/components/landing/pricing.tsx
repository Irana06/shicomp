import { Check, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import {
    buttonOutline,
    buttonPrimary,
    Container,
    SectionHeading,
    WhatsappLink,
} from '@/components/landing/primitives';
import { formatRupiah } from '@/lib/format';
import { cn } from '@/lib/utils';
import { fillTemplate, PACKAGE_MESSAGE } from '@/lib/whatsapp';
import type { PackageCategory, PackageProduct } from '@/types';

// 松竹梅: the traditional Japanese three-tier ranking.
const tierKanji: Record<string, string> = {
    ume: '梅',
    take: '竹',
    matsu: '松',
};

export function Pricing({ categories }: { categories: PackageCategory[] }) {
    const [activeSlug, setActiveSlug] = useState(categories[0]?.slug);
    const active =
        categories.find((category) => category.slug === activeSlug) ??
        categories[0];

    if (!active) {
        return null;
    }

    return (
        <section
            id="paket"
            className="scroll-mt-16 py-14 sm:scroll-mt-[88px] sm:py-20 lg:py-28"
        >
            <Container className="flex flex-col gap-6 sm:gap-12">
                <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end lg:gap-12">
                    <SectionHeading
                        numeral="三"
                        label="PAKET & HARGA"
                        title="Pilih paket: Ume, Take, atau Matsu."
                        description={
                            <>
                                Terinspirasi tingkatan{' '}
                                <span lang="ja">松竹梅</span> (pinus, bambu,
                                plum) yang biasa dipakai di Jepang. Semua paket
                                bisa disesuaikan dengan kebutuhan Anda.
                            </>
                        }
                    />

                    {categories.length > 1 && (
                        <div
                            role="tablist"
                            aria-label="Kategori layanan"
                            className="bg-paper-deep flex gap-1 rounded-[14px] p-1"
                        >
                            {categories.map((category) => {
                                const selected = category.slug === active.slug;

                                return (
                                    <button
                                        key={category.slug}
                                        type="button"
                                        role="tab"
                                        aria-selected={selected}
                                        onClick={() =>
                                            setActiveSlug(category.slug)
                                        }
                                        className={cn(
                                            'h-11 flex-1 rounded-[10px] px-4 text-sm whitespace-nowrap transition-colors sm:px-5 sm:text-[15px]',
                                            selected
                                                ? 'bg-surface font-bold shadow-[0_1px_2px_rgba(53,35,28,0.08)]'
                                                : 'text-ink-muted hover:text-ink font-medium',
                                        )}
                                    >
                                        {category.name}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                <ul
                    role={categories.length > 1 ? 'tabpanel' : undefined}
                    className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
                >
                    {active.products.map((product) => (
                        <PackageCard
                            key={product.id}
                            product={product}
                            categoryName={active.name}
                        />
                    ))}
                </ul>

                <p className="text-ink-subtle text-center text-[13px] leading-[1.6] sm:text-sm">
                    Harga final ditentukan setelah diskusi brief. Tombol pesan
                    membuka WhatsApp dengan pesan yang sudah terisi otomatis.
                </p>
            </Container>
        </section>
    );
}

function PackageCard({
    product,
    categoryName,
}: {
    product: PackageProduct;
    categoryName: string;
}) {
    const featured = product.is_featured;
    const kanji = tierKanji[product.name.toLowerCase()];
    const message = fillTemplate(product.wa_template ?? PACKAGE_MESSAGE, {
        paket: product.name,
        kategori: categoryName,
    });

    return (
        <li
            className={cn(
                'relative flex flex-col gap-5 rounded-xl px-6 py-7 sm:gap-6 sm:px-9 sm:py-10',
                featured
                    ? 'bg-ink text-paper mt-3 md:mt-0'
                    : 'border-line bg-surface border',
            )}
        >
            {featured && (
                <span className="bg-shu text-surface absolute -top-3 left-6 flex h-6 items-center rounded-lg px-2.5 text-[11px] font-bold tracking-[0.06em] sm:-top-3.5 sm:left-9 sm:h-7 sm:px-3 sm:text-xs">
                    REKOMENDASI
                </span>
            )}

            <div className="flex items-center gap-3.5">
                {kanji && (
                    <span
                        lang="ja"
                        className={cn(
                            'font-display text-[32px] leading-none font-black sm:text-[40px]',
                            featured ? 'text-sakura' : 'text-shu',
                        )}
                    >
                        {kanji}
                    </span>
                )}
                <div className="flex flex-col gap-0.5">
                    <h3 className="text-[19px] font-bold sm:text-[22px]">
                        {product.name}
                    </h3>
                    {product.tagline && (
                        <p
                            className={cn(
                                'text-[13px] sm:text-sm',
                                featured
                                    ? 'text-night-muted'
                                    : 'text-ink-subtle',
                            )}
                        >
                            {product.tagline}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <p
                    className={cn(
                        'text-[13px]',
                        featured ? 'text-night-muted' : 'text-ink-subtle',
                    )}
                >
                    {product.price === null ? 'Harga' : 'Mulai dari'}
                </p>
                <p className="font-display text-[28px] font-black sm:text-4xl">
                    {product.price === null
                        ? 'Sesuai brief'
                        : formatRupiah(product.price)}
                </p>
            </div>

            {product.features.length > 0 && (
                <ul
                    className={cn(
                        'flex flex-col gap-2.5 border-t pt-5 text-sm leading-normal sm:gap-3 sm:pt-6 sm:text-[15px]',
                        featured ? 'border-night-line' : 'border-line',
                    )}
                >
                    {product.features.map((feature) => (
                        <li key={feature} className="flex gap-2.5">
                            <Check
                                className={cn(
                                    'mt-0.5 size-[18px] shrink-0',
                                    featured ? 'text-sakura' : 'text-shu',
                                )}
                                strokeWidth={2.2}
                            />
                            {feature}
                        </li>
                    ))}
                </ul>
            )}

            <WhatsappLink
                message={message}
                className={cn(
                    'mt-auto',
                    featured ? cn(buttonPrimary, 'shadow-none') : buttonOutline,
                )}
            >
                <MessageCircle className="size-[18px]" />
                {product.price === null
                    ? 'Diskusikan via WhatsApp'
                    : 'Pesan via WhatsApp'}
            </WhatsappLink>
        </li>
    );
}
