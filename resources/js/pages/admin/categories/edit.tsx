import { Head } from '@inertiajs/react';
import ProductCategoryController from '@/actions/App/Http/Controllers/Admin/ProductCategoryController';
import { CategoryForm } from '@/components/admin/category-form';
import { ConfirmDeleteDialog } from '@/components/admin/data';
import { AdminPage, PageHeader } from '@/components/admin/layout';
import type { AdminCategory } from '@/types';

export default function EditCategory({
    category,
}: {
    category: AdminCategory;
}) {
    return (
        <>
            <Head title={`Edit ${category.name}`} />

            <AdminPage>
                <PageHeader
                    title={`Edit kategori ${category.name}`}
                    actions={
                        <ConfirmDeleteDialog
                            form={ProductCategoryController.destroy.form(
                                category.id,
                            )}
                            title={`Hapus kategori ${category.name}?`}
                            description="Kategori yang masih punya paket tidak bisa dihapus."
                        />
                    }
                />
                <CategoryForm category={category} />
            </AdminPage>
        </>
    );
}

EditCategory.layout = {
    breadcrumbs: [
        { title: 'Kategori', href: ProductCategoryController.index() },
        { title: 'Edit', href: ProductCategoryController.index() },
    ],
};
