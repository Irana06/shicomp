import { Head } from '@inertiajs/react';
import ProductController from '@/actions/App/Http/Controllers/Admin/ProductController';
import { ConfirmDeleteDialog } from '@/components/admin/data';
import { AdminPage, PageHeader } from '@/components/admin/layout';
import { ProductForm } from '@/components/admin/product-form';
import type { AdminProduct, SelectItem } from '@/types';

type Props = {
    product: AdminProduct;
    categories: SelectItem[];
};

export default function EditProduct({ product, categories }: Props) {
    return (
        <>
            <Head title={`Edit ${product.name}`} />

            <AdminPage>
                <PageHeader
                    title={`Edit paket ${product.name}`}
                    actions={
                        <ConfirmDeleteDialog
                            form={ProductController.destroy.form(product.id)}
                            title={`Hapus paket ${product.name}?`}
                            description="Paket yang sudah dipakai project tidak bisa dihapus. Sembunyikan saja dari website."
                        />
                    }
                />
                <ProductForm product={product} categories={categories} />
            </AdminPage>
        </>
    );
}

EditProduct.layout = {
    breadcrumbs: [
        { title: 'Paket', href: ProductController.index() },
        { title: 'Edit', href: ProductController.index() },
    ],
};
