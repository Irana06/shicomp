import { Head, Link, usePage } from '@inertiajs/react';
import type { LucideIcon } from 'lucide-react';
import {
    CircleDollarSign,
    FolderKanban,
    Globe,
    Hourglass,
    Package,
    Plus,
    SquareCheckBig,
} from 'lucide-react';
import ProductController from '@/actions/App/Http/Controllers/Admin/ProductController';
import ProjectController from '@/actions/App/Http/Controllers/Admin/ProjectController';
import { ProjectStatusBadge } from '@/components/admin/data';
import { AdminPage, EmptyState, PageHeader } from '@/components/admin/layout';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { dashboard, home } from '@/routes';
import type { DashboardStats, RecentUpdate } from '@/types';

type Props = {
    stats: DashboardStats;
    recentUpdates: RecentUpdate[];
};

export default function Dashboard({ stats, recentUpdates }: Props) {
    const { auth } = usePage().props;

    const cards: {
        label: string;
        value: number;
        icon: LucideIcon;
        hint: string;
    }[] = [
        {
            label: 'Project berjalan',
            value: stats.active,
            icon: FolderKanban,
            hint: 'Belum selesai atau dibatalkan',
        },
        {
            label: 'Brief baru',
            value: stats.pending,
            icon: Hourglass,
            hint: 'Menunggu dirancang',
        },
        {
            label: 'Belum lunas',
            value: stats.awaiting_payment,
            icon: CircleDollarSign,
            hint: 'Belum bayar atau baru DP',
        },
        {
            label: 'Selesai',
            value: stats.completed,
            icon: SquareCheckBig,
            hint: 'Sudah online & diserahkan',
        },
    ];

    return (
        <>
            <Head title="Dashboard" />

            <AdminPage>
                <PageHeader
                    title={`Halo, ${auth.user.name.split(' ')[0]}`}
                    description="Ringkasan project ShikaComp hari ini."
                    actions={
                        <>
                            <Button variant="outline" asChild>
                                <a
                                    href={home.url()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Globe />
                                    Lihat website
                                </a>
                            </Button>
                            <Button asChild>
                                <Link href={ProjectController.create()}>
                                    <Plus />
                                    Buat project
                                </Link>
                            </Button>
                        </>
                    }
                />

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {cards.map(({ label, value, icon: Icon, hint }) => (
                        <Card key={label} className="gap-3 py-5">
                            <CardHeader className="flex flex-row items-center justify-between px-5">
                                <CardDescription>{label}</CardDescription>
                                <Icon className="text-muted-foreground size-4" />
                            </CardHeader>
                            <CardContent className="px-5">
                                <p className="font-display text-3xl font-bold">
                                    {value}
                                </p>
                                <p className="text-muted-foreground mt-1 text-xs">
                                    {hint}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-start justify-between gap-4">
                        <div className="space-y-1.5">
                            <CardTitle>Update terbaru</CardTitle>
                            <CardDescription>
                                Perubahan status dan catatan yang dilihat klien.
                            </CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={ProjectController.index()}>
                                Semua project
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {recentUpdates.length === 0 ? (
                            <EmptyState
                                icon={Package}
                                title="Belum ada project"
                                description="Buat project pertama setelah klien order lewat WhatsApp. Kodenya bisa langsung dikirim ke klien."
                                action={
                                    <div className="flex flex-wrap justify-center gap-2">
                                        <Button asChild>
                                            <Link
                                                href={ProjectController.create()}
                                            >
                                                <Plus />
                                                Buat project
                                            </Link>
                                        </Button>
                                        <Button variant="outline" asChild>
                                            <Link
                                                href={ProductController.index()}
                                            >
                                                Atur paket
                                            </Link>
                                        </Button>
                                    </div>
                                }
                            />
                        ) : (
                            <ul className="divide-y">
                                {recentUpdates.map((update) => (
                                    <li key={update.id}>
                                        <Link
                                            href={ProjectController.show(
                                                update.project_id,
                                            )}
                                            className="hover:bg-muted/60 -mx-2 flex flex-col gap-1.5 rounded-lg px-2 py-3 transition-colors sm:flex-row sm:items-center sm:gap-4"
                                        >
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-medium">
                                                    {update.project_title}
                                                </p>
                                                <p className="text-muted-foreground truncate text-sm">
                                                    <span className="font-mono text-xs">
                                                        {update.project_code}
                                                    </span>
                                                    {update.comment &&
                                                        ` · ${update.comment}`}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <ProjectStatusBadge
                                                    status={update.status}
                                                    label={update.status_label}
                                                />
                                                <span className="text-muted-foreground text-xs whitespace-nowrap">
                                                    {update.created_at}
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>
            </AdminPage>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
