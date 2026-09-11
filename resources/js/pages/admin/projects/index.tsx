import { Form, Head, Link } from '@inertiajs/react';
import { FolderKanban, Plus, Search } from 'lucide-react';
import ProjectController from '@/actions/App/Http/Controllers/Admin/ProjectController';
import {
    DataTable,
    Pagination,
    PaymentStatusBadge,
    ProjectStatusBadge,
    Td,
    Th,
} from '@/components/admin/data';
import { NativeSelect } from '@/components/admin/form';
import { AdminPage, EmptyState, PageHeader } from '@/components/admin/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { AdminProjectListItem, Option, Paginated } from '@/types';

type Props = {
    projects: Paginated<AdminProjectListItem>;
    filters: { search: string; status: string | null };
    statusOptions: Option[];
};

export default function ProjectsIndex({
    projects,
    filters,
    statusOptions,
}: Props) {
    const isFiltered = filters.search !== '' || filters.status !== null;

    return (
        <>
            <Head title="Project" />

            <AdminPage>
                <PageHeader
                    title="Project"
                    description="Semua order klien beserta status pengerjaan dan pembayarannya."
                    actions={
                        <Button asChild>
                            <Link href={ProjectController.create()}>
                                <Plus />
                                Buat project
                            </Link>
                        </Button>
                    }
                />

                <Form
                    {...ProjectController.index.form()}
                    options={{ preserveState: true }}
                    className="flex flex-col gap-3 sm:flex-row"
                >
                    <label htmlFor="search" className="sr-only">
                        Cari project
                    </label>
                    <div className="relative flex-1">
                        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                        <Input
                            id="search"
                            name="search"
                            type="search"
                            defaultValue={filters.search}
                            placeholder="Cari kode, judul, atau nama klien"
                            className="pl-9"
                        />
                    </div>
                    <label htmlFor="status" className="sr-only">
                        Status
                    </label>
                    <NativeSelect
                        id="status"
                        name="status"
                        defaultValue={filters.status ?? ''}
                        className="sm:w-52"
                    >
                        <option value="">Semua status</option>
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </NativeSelect>
                    <div className="flex gap-2">
                        <Button
                            type="submit"
                            variant="secondary"
                            className="flex-1 sm:flex-none"
                        >
                            Terapkan
                        </Button>
                        {isFiltered && (
                            <Button variant="ghost" asChild>
                                <Link href={ProjectController.index()}>
                                    Reset
                                </Link>
                            </Button>
                        )}
                    </div>
                </Form>

                {projects.data.length === 0 ? (
                    <EmptyState
                        icon={FolderKanban}
                        title={
                            isFiltered
                                ? 'Tidak ada project yang cocok'
                                : 'Belum ada project'
                        }
                        description={
                            isFiltered
                                ? 'Coba kata kunci atau status lain.'
                                : 'Buat project setelah klien order lewat WhatsApp, lalu kirim kodenya ke klien.'
                        }
                    />
                ) : (
                    <>
                        <DataTable>
                            <thead>
                                <tr>
                                    <Th>Project</Th>
                                    <Th>Klien</Th>
                                    <Th>Paket</Th>
                                    <Th>Status</Th>
                                    <Th>Pembayaran</Th>
                                    <Th>Diperbarui</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.data.map((project) => (
                                    <tr
                                        key={project.id}
                                        className="hover:bg-muted/40 transition-colors"
                                    >
                                        <Td>
                                            <Link
                                                href={ProjectController.show(
                                                    project.id,
                                                )}
                                                className="group block"
                                            >
                                                <span className="font-medium group-hover:underline">
                                                    {project.title}
                                                </span>
                                                <span className="text-muted-foreground block font-mono text-xs">
                                                    {project.project_code}
                                                </span>
                                            </Link>
                                        </Td>
                                        <Td>{project.client ?? '—'}</Td>
                                        <Td className="text-muted-foreground">
                                            {project.package ?? 'Custom'}
                                        </Td>
                                        <Td>
                                            <ProjectStatusBadge
                                                status={project.status}
                                                label={project.status_label}
                                            />
                                        </Td>
                                        <Td>
                                            <PaymentStatusBadge
                                                status={project.payment_status}
                                                label={
                                                    project.payment_status_label
                                                }
                                            />
                                        </Td>
                                        <Td className="text-muted-foreground whitespace-nowrap">
                                            {project.updated_at}
                                        </Td>
                                    </tr>
                                ))}
                            </tbody>
                        </DataTable>
                        <Pagination page={projects} />
                    </>
                )}
            </AdminPage>
        </>
    );
}

ProjectsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Project',
            href: ProjectController.index(),
        },
    ],
};
