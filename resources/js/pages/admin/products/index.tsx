import { Head, Link } from '@inertiajs/react';
import { EyeOff, Package, Pencil, Plus, Star, Tags } from 'lucide-react';
import ProductCategoryController from '@/actions/App/Http/Controllers/Admin/ProductCategoryController';
import ProductController from '@/actions/App/Http/Controllers/Admin/ProductController';
import {
    ConfirmDeleteDialog,
    DataTable,
    Td,
    Th,
} from '@/components/admin/data';
import { AdminPage, EmptyState, PageHeader } from '@/components/admin/layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatRupiah } from '@/lib/format';
import type { AdminProductGroup } from '@/types';

export default function ProductsIndex({
    groups,
}: {
    groups: AdminProductGroup[];
}) {
    return (
        <>
            <Head title="Paket" />

            <AdminPage>
                <PageHeader
                    title="Paket & harga"
                    description="Paket yang ditampilkan di website, lengkap dengan harga, fitur, dan template pesan WhatsApp."
                    actions={
                        groups.length > 0 && (
                            <Button asChild>
                                <Link href={ProductController.create()}>
                                    <Plus />
                                    Tambah paket
                                </Link>
                            </Button>
                        )
                    }
                />

                {groups.length === 0 ? (
                    <EmptyState
                        icon={Tags}
                        title="Buat kategori dulu"
                        description="Setiap paket masuk ke satu kategori, misalnya Website atau Aplikasi Mobile."
                        action={
                            <Button asChild>
                                <Link href={ProductCategoryController.create()}>
                                    <Plus />
                                    Tambah kategori
                                </Link>
                            </Button>
                        }
                    />
                ) : (
                    groups.map((group) => (
                        <section key={group.id} className="space-y-3">
                            <h2 className="font-display text-lg font-bold">
                                {group.name}
                            </h2>

                            {group.products.length === 0 ? (
                                <EmptyState
                                    icon={Package}
                                    title={`Belum ada paket ${group.name}`}
                                    description="Kategori tanpa paket tidak tampil di website."
                                />
                            ) : (
                                <DataTable>
                                    <thead>
                                        <tr>
                                            <Th>Paket</Th>
                                            <Th>Harga</Th>
                                            <Th>Tampilan</Th>
                                            <Th className="text-right">
                                                Project
                                            </Th>
                                            <Th className="text-right">
                                                Urutan
                                            </Th>
                                            <Th className="w-24">
                                                <span className="sr-only">
                                                    Aksi
                                                </span>
                                            </Th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {group.products.map((product) => (
                                            <tr key={product.id}>
                                                <Td>
                                                    <p className="font-medium">
                                                        {product.name}
                                                    </p>
                                                    {product.tagline && (
                                                        <p className="text-muted-foreground text-xs">
                                                            {product.tagline}
                                                        </p>
                                                    )}
                                                </Td>
                                                <Td className="whitespace-nowrap tabular-nums">
                                                    {product.price === null ? (
                                                        <span className="text-muted-foreground">
                                                            Sesuai brief
                                                        </span>
                                                    ) : (
                                                        formatRupiah(
                                                            product.price,
                                                        )
                                                    )}
                                                </Td>
                                                <Td>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {product.published ? (
                                                            <Badge variant="secondary">
                                                                Tampil
                                                            </Badge>
                                                        ) : (
                                                            <Badge
                                                                variant="outline"
                                                                className="text-muted-foreground"
                                                            >
                                                                <EyeOff />
                                                                Tersembunyi
                                                            </Badge>
                                                        )}
                                                        {product.is_featured && (
                                                            <Badge>
                                                                <Star />
                                                                Rekomendasi
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </Td>
                                                <Td className="text-right tabular-nums">
                                                    {product.projects_count}
                                                </Td>
                                                <Td className="text-right tabular-nums">
                                                    {product.sort_order}
                                                </Td>
                                                <Td>
                                                    <div className="flex justify-end gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            asChild
                                                        >
                                                            <Link
                                                                href={ProductController.edit(
                                                                    product.id,
                                                                )}
                                                                aria-label={`Edit ${product.name}`}
                                                            >
                                                                <Pencil />
                                                            </Link>
                                                        </Button>
                                                        <ConfirmDeleteDialog
                                                            iconOnly
                                                            form={ProductController.destroy.form(
                                                                product.id,
                                                            )}
                                                            title={`Hapus paket ${product.name}?`}
                                                            description="Paket yang sudah dipakai project tidak bisa dihapus. Sembunyikan saja dari website."
                                                        />
                                                    </div>
                                                </Td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </DataTable>
                            )}
                        </section>
                    ))
                )}
            </AdminPage>
        </>
    );
}

ProductsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Paket',
            href: ProductController.index(),
        },
    ],
};
