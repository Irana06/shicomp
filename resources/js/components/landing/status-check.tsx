import { Container, SectionHeading } from '@/components/landing/primitives';
import { ProjectStatusCard } from '@/components/landing/project-status-card';
import { StatusCheckForm } from '@/components/landing/status-check-form';
import type { ProjectStatus } from '@/types';

const example: ProjectStatus = {
    code: 'SHC-XXXX-XXXX',
    title: 'Website Company Profile',
    package: 'Paket Take · Website',
    status: 'development',
    status_label: 'Development',
    timeline: [
        { status: 'pending', label: 'Brief diterima', reached_at: '2 Sep' },
        { status: 'design', label: 'Desain', reached_at: '9 Sep' },
        { status: 'development', label: 'Development', reached_at: null },
        { status: 'review', label: 'Review & revisi', reached_at: null },
        {
            status: 'completed',
            label: 'Online & serah terima',
            reached_at: null,
        },
    ],
    latest_note: {
        comment: 'Halaman beranda dan katalog sudah bisa dicoba.',
        date: null,
    },
};

export function StatusCheck() {
    return (
        <section
            id="status"
            className="seigaiha-night text-cream scroll-mt-16 py-14 sm:scroll-mt-[88px] sm:py-20 lg:py-28"
        >
            <Container className="grid items-center gap-6 sm:gap-10 lg:grid-cols-2 lg:gap-20">
                <div className="flex flex-col gap-6">
                    <SectionHeading
                        numeral="四"
                        label="CEK STATUS PROJECT"
                        title="Pantau progres project Anda, kapan saja."
                        description="Setiap order mendapat kode project. Masukkan kodenya untuk melihat tahap pengerjaan terbaru beserta catatan dari developer, tanpa perlu menunggu balasan chat."
                        tone="dark"
                    />
                    <StatusCheckForm />
                </div>

                <ProjectStatusCard
                    project={example}
                    badge="Contoh tampilan"
                    className="shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)]"
                />
            </Container>
        </section>
    );
}
