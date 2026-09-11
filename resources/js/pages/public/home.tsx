import { Head } from '@inertiajs/react';
import { About } from '@/components/landing/about';
import { CallToAction } from '@/components/landing/call-to-action';
import { Faq } from '@/components/landing/faq';
import { Hero } from '@/components/landing/hero';
import { Portfolio } from '@/components/landing/portfolio';
import { Pricing } from '@/components/landing/pricing';
import { Process } from '@/components/landing/process';
import { Services } from '@/components/landing/services';
import { StatusCheck } from '@/components/landing/status-check';
import type { PackageCategory } from '@/types';

type Props = {
    categories: PackageCategory[];
};

export default function Home({ categories }: Props) {
    return (
        <>
            <Head title="Jasa Pembuatan Website & Aplikasi">
                <meta
                    head-key="description"
                    name="description"
                    content="ShikaComp oleh Yushika: jasa pembuatan website (Laravel & React), aplikasi mobile (Flutter), serta deploy dan maintenance server untuk UMKM, startup, instansi, dan personal."
                />
            </Head>

            <Hero />
            <Services />
            <Process />
            <Pricing categories={categories} />
            <StatusCheck />
            <Portfolio />
            <About />
            <Faq />
            <CallToAction />
        </>
    );
}
