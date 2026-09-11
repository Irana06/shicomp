import { Head, Link } from '@inertiajs/react';
import { Pencil, Plus, Tags } from 'lucide-react';
import ProductCategoryController from '@/actions/App/Http/Controllers/Admin/ProductCategoryController';
import {
    ConfirmDeleteDialog,
    DataTable,
    Td,
    Th,
} from '@/components/admin/data';
import { AdminPage, EmptyState, PageHeader } from '@/components/admin/layout';
import { Button } from '@/components/ui/button';
import type { AdminCategoryListItem } from '@/types';

export default function CategoriesIndex({
    categories,
}: {
    categories: AdminCategoryListItem[];
}) {
    const createButton = (
        <Button asChild>
            <Link href={ProductCategoryController.create()}>
                <Plus />
                Tambah kategori
            </Link>
        </Button>
    );

    return (
        <>
            <Head title="Kategori" />

            <AdminPage>
                <PageHeader
                    title="Kategori layanan"
                    description="Kelompok paket yang tampil sebagai tab di bagian Paket & Harga."
                    actions={createButton}
                />

                {categories.length === 0 ? (
                    <EmptyState
                        icon={Tags}
                        title="Belum ada kategori"
                        description="Buat kategori seperti Website atau Aplikasi Mobile sebelum menambah paket."
                        action={createButton}
                    />
                ) : (
                    <DataTable>
                        <thead>
                            <tr>
                                <Th>Nama</Th>
                                <Th>Slug</Th>
                                <Th className="text-right">Paket</Th>
                                <Th className="text-right">Urutan</Th>
                                <Th className="w-24">
                                    <span className="sr-only">Aksi</span>
                                </Th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category.id}>
                                    <Td>
                                        <p className="font-medium">
                                            {category.name}
                                        </p>
                                        {category.description && (
                                            <p className="text-muted-foreground line-clamp-1 max-w-md text-xs">
                                                {category.description}
                                            </p>
                                        )}
                                    </Td>
                                    <Td className="text-muted-foreground font-mono text-xs">
                                        {category.slug}
                                    </Td>
                                    <Td className="text-right tabular-nums">
                                        {category.products_count}
                                    </Td>
                                    <Td className="text-right tabular-nums">
                                        {category.sort_order}
                                    </Td>
                                    <Td>
                                        <div className="flex justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                asChild
                                            >
                                                <Link
                                                    href={ProductCategoryController.edit(
                                                        category.id,
                                                    )}
                                                    aria-label={`Edit ${category.name}`}
                                                >
                                                    <Pencil />
                                                </Link>
                                            </Button>
                                            <ConfirmDeleteDialog
                                                iconOnly
                                                form={ProductCategoryController.destroy.form(
                                                    category.id,
                                                )}
                                                title={`Hapus kategori ${category.name}?`}
                                                description="Kategori yang masih punya paket tidak bisa dihapus."
                                            />
                                        </div>
                                    </Td>
                                </tr>
                            ))}
                        </tbody>
                    </DataTable>
                )}
            </AdminPage>
        </>
    );
}

CategoriesIndex.layout = {
    breadcrumbs: [
        {
            title: 'Kategori',
            href: ProductCategoryController.index(),
        },
    ],
};
