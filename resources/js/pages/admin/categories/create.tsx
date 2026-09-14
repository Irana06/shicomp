import { Head } from '@inertiajs/react';
import ProductCategoryController from '@/actions/App/Http/Controllers/Admin/ProductCategoryController';
import { CategoryForm } from '@/components/admin/category-form';
import { AdminPage, PageHeader } from '@/components/admin/layout';

export default function CreateCategory() {
    return (
        <>
            <Head title="Tambah kategori" />

            <AdminPage>
                <PageHeader title="Tambah kategori" />
                <CategoryForm />
            </AdminPage>
        </>
    );
}

CreateCategory.layout = {
    breadcrumbs: [
        { title: 'Kategori', href: ProductCategoryController.index() },
        { title: 'Tambah', href: ProductCategoryController.create() },
    ],
};
