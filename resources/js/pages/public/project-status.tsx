import { Head } from '@inertiajs/react';
import { MessageCircle, SearchX } from 'lucide-react';
import {
    buttonOutline,
    Container,
    SectionHeading,
    WhatsappLink,
} from '@/components/landing/primitives';
import { ProjectStatusCard } from '@/components/landing/project-status-card';
import { StatusCheckForm } from '@/components/landing/status-check-form';
import { cn } from '@/lib/utils';
import type { ProjectStatus } from '@/types';

type Props = {
    code: string | null;
    project: ProjectStatus | null;
};

export default function ProjectStatusPage({ code, project }: Props) {
    return (
        <>
            <Head
                title={
                    project ? `Status ${project.code}` : 'Cek Status Project'
                }
            >
                <meta head-key="robots" name="robots" content="noindex" />
            </Head>

            <section className="py-12 sm:py-20">
                <Container className="flex max-w-[760px] flex-col gap-8 sm:gap-10">
                    <SectionHeading
                        numeral="四"
                        label="CEK STATUS PROJECT"
                        title="Pantau progres project Anda."
                        description={
                            <>
                                Masukkan kode project yang Anda terima saat
                                order. Formatnya{' '}
                                <span className="font-mono whitespace-nowrap">
                                    SHC-XXXX-XXXX
                                </span>
                                .
                            </>
                        }
                    />

                    <StatusCheckForm defaultCode={code} tone="light" />

                    {project && (
                        <ProjectStatusCard
                            project={project}
                            className="border-line bg-surface border"
                        />
                    )}

                    {code && !project && (
                        <div className="border-line bg-surface flex flex-col items-start gap-4 rounded-xl border p-6 sm:p-8">
                            <SearchX
                                className="text-shu size-8"
                                strokeWidth={1.6}
                            />
                            <div className="flex flex-col gap-2">
                                <h2 className="text-lg font-bold sm:text-xl">
                                    Kode{' '}
                                    <span className="font-mono tracking-[0.04em]">
                                        {code}
                                    </span>{' '}
                                    tidak ditemukan
                                </h2>
                                <p className="text-ink-muted text-[15px] leading-[1.7]">
                                    Periksa kembali penulisan kodenya. Jika
                                    masih tidak ditemukan, tanyakan langsung
                                    lewat WhatsApp.
                                </p>
                            </div>
                            <WhatsappLink
                                message={`Halo ShikaComp, saya ingin menanyakan status project dengan kode ${code}.`}
                                className={cn(buttonOutline, 'h-11 text-sm')}
                            >
                                <MessageCircle className="size-[18px]" />
                                Tanya via WhatsApp
                            </WhatsappLink>
                        </div>
                    )}
                </Container>
            </section>
        </>
    );
}
