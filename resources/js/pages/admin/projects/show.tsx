import { Form, Head, Link } from '@inertiajs/react';
import { ExternalLink, MessageCircle, Pencil } from 'lucide-react';
import ProjectController from '@/actions/App/Http/Controllers/Admin/ProjectController';
import ProjectStatusUpdateController from '@/actions/App/Http/Controllers/Admin/ProjectStatusUpdateController';
import {
    ConfirmDeleteDialog,
    CopyButton,
    PaymentStatusBadge,
    ProjectStatusBadge,
} from '@/components/admin/data';
import { FormField, NativeSelect } from '@/components/admin/form';
import { AdminPage, PageHeader } from '@/components/admin/layout';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { formatRupiah } from '@/lib/format';
import { whatsappLink } from '@/lib/whatsapp';
import type { AdminProjectDetail, Option } from '@/types';

type Props = {
    project: AdminProjectDetail;
    statusOptions: Option[];
};

export default function ShowProject({ project, statusOptions }: Props) {
    const { client } = project;
    const clientMessage = `Halo ${client.name ?? ''}, ini update project "${project.title}" dari ShikaComp. Progres terbaru bisa dicek di ${project.status_url} (kode ${project.project_code}).`;

    return (
        <>
            <Head title={project.project_code} />

            <AdminPage>
                <PageHeader
                    title={project.title}
                    description={
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono">
                                {project.project_code}
                            </span>
                            <ProjectStatusBadge
                                status={project.status}
                                label={project.status_label}
                            />
                            <PaymentStatusBadge
                                status={project.payment_status}
                                label={project.payment_status_label}
                            />
                        </div>
                    }
                    actions={
                        <>
                            <Button variant="outline" asChild>
                                <Link href={ProjectController.edit(project.id)}>
                                    <Pencil />
                                    Edit
                                </Link>
                            </Button>
                            <ConfirmDeleteDialog
                                form={ProjectController.destroy.form(
                                    project.id,
                                )}
                                title={`Hapus project ${project.project_code}?`}
                                description="Project dan seluruh riwayat statusnya akan dihapus permanen. Klien tidak bisa lagi mengecek kode ini."
                            />
                        </>
                    }
                />

                <div className="grid items-start gap-6 lg:grid-cols-3">
                    <div className="flex flex-col gap-6 lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Update progres</CardTitle>
                                <CardDescription>
                                    Status dan catatan langsung terlihat oleh
                                    klien di halaman Cek Status.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form
                                    {...ProjectStatusUpdateController.form(
                                        project.id,
                                    )}
                                    options={{ preserveScroll: true }}
                                    resetOnSuccess={['comment']}
                                    className="grid gap-5"
                                >
                                    {({ processing, errors }) => (
                                        <>
                                            <FormField
                                                label="Status"
                                                htmlFor="status"
                                                error={errors.status}
                                                className="sm:max-w-xs"
                                            >
                                                <NativeSelect
                                                    key={project.status}
                                                    id="status"
                                                    name="status"
                                                    defaultValue={
                                                        project.status
                                                    }
                                                >
                                                    {statusOptions.map(
                                                        (option) => (
                                                            <option
                                                                key={
                                                                    option.value
                                                                }
                                                                value={
                                                                    option.value
                                                                }
                                                            >
                                                                {option.label}
                                                            </option>
                                                        ),
                                                    )}
                                                </NativeSelect>
                                            </FormField>
                                            <FormField
                                                label="Catatan untuk klien"
                                                htmlFor="comment"
                                                optional
                                                error={errors.comment}
                                                hint="Contoh: “Halaman beranda dan katalog sudah bisa dicoba.” Biarkan status sama untuk sekadar menambah catatan."
                                            >
                                                <Textarea
                                                    id="comment"
                                                    name="comment"
                                                    rows={3}
                                                />
                                            </FormField>
                                            <div className="flex justify-end">
                                                <Button
                                                    type="submit"
                                                    disabled={processing}
                                                >
                                                    {processing && <Spinner />}
                                                    Simpan update
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </Form>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Riwayat status</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ol className="relative flex flex-col gap-5 border-l pl-6">
                                    {project.logs.map((log, index) => (
                                        <li key={log.id} className="relative">
                                            <span
                                                className={
                                                    index === 0
                                                        ? 'bg-primary ring-card absolute top-1.5 -left-[29px] size-2.5 rounded-full ring-4'
                                                        : 'bg-border ring-card absolute top-1.5 -left-[29px] size-2.5 rounded-full ring-4'
                                                }
                                            />
                                            <div className="flex flex-wrap items-center gap-2">
                                                <ProjectStatusBadge
                                                    status={log.status}
                                                    label={log.status_label}
                                                />
                                                <span className="text-muted-foreground text-xs">
                                                    {log.created_at}
                                                </span>
                                            </div>
                                            {log.comment && (
                                                <p className="mt-2 text-sm leading-relaxed whitespace-pre-line">
                                                    {log.comment}
                                                </p>
                                            )}
                                        </li>
                                    ))}
                                </ol>
                            </CardContent>
                        </Card>

                        {project.brief && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Brief</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm leading-relaxed whitespace-pre-line">
                                        {project.brief}
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    <div className="flex flex-col gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Bagikan ke klien</CardTitle>
                                <CardDescription>
                                    Klien memantau progres dengan kode ini.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-3">
                                <p className="bg-muted rounded-lg px-3 py-2 text-center font-mono text-lg font-medium tracking-wider">
                                    {project.project_code}
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                    <CopyButton
                                        value={project.project_code}
                                        label="Salin kode"
                                    />
                                    <CopyButton
                                        value={project.status_url}
                                        label="Salin link"
                                    />
                                </div>
                                {client.phone && (
                                    <Button asChild>
                                        <a
                                            href={whatsappLink(
                                                client.phone,
                                                clientMessage,
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <MessageCircle />
                                            Kirim via WhatsApp
                                        </a>
                                    </Button>
                                )}
                                <Button variant="ghost" size="sm" asChild>
                                    <a
                                        href={project.status_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <ExternalLink />
                                        Lihat halaman klien
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Detail</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <dl className="grid gap-3 text-sm">
                                    <DetailRow
                                        label="Klien"
                                        value={client.name}
                                    />
                                    <DetailRow
                                        label="WhatsApp"
                                        value={client.phone}
                                    />
                                    <DetailRow
                                        label="Email"
                                        value={client.email}
                                    />
                                    <DetailRow
                                        label="Paket"
                                        value={project.package ?? 'Custom'}
                                    />
                                    <DetailRow
                                        label="Budget"
                                        value={
                                            project.budget === null
                                                ? null
                                                : formatRupiah(project.budget)
                                        }
                                    />
                                    <DetailRow
                                        label="Dibuat"
                                        value={project.created_at}
                                    />
                                </dl>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </AdminPage>
        </>
    );
}

function DetailRow({ label, value }: { label: string; value: string | null }) {
    return (
        <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="min-w-0 text-right font-medium break-words">
                {value ?? '—'}
            </dd>
        </div>
    );
}

ShowProject.layout = {
    breadcrumbs: [
        { title: 'Project', href: ProjectController.index() },
        { title: 'Detail', href: ProjectController.index() },
    ],
};
