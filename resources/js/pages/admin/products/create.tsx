import { Head } from '@inertiajs/react';
import ProductController from '@/actions/App/Http/Controllers/Admin/ProductController';
import { AdminPage, PageHeader } from '@/components/admin/layout';
import { ProductForm } from '@/components/admin/product-form';
import type { SelectItem } from '@/types';

export default function CreateProduct({
    categories,
}: {
    categories: SelectItem[];
}) {
    return (
        <>
            <Head title="Tambah paket" />

            <AdminPage>
                <PageHeader title="Tambah paket" />
                <ProductForm categories={categories} />
            </AdminPage>
        </>
    );
}

CreateProduct.layout = {
    breadcrumbs: [
        { title: 'Paket', href: ProductController.index() },
        { title: 'Tambah', href: ProductController.create() },
    ],
};
