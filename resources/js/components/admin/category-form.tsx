import { Form } from '@inertiajs/react';
import ProductCategoryController from '@/actions/App/Http/Controllers/Admin/ProductCategoryController';
import { FormActions, FormField } from '@/components/admin/form';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { AdminCategory } from '@/types';

export function CategoryForm({ category }: { category?: AdminCategory }) {
    const form = category
        ? ProductCategoryController.update.form(category.id)
        : ProductCategoryController.store.form();

    return (
        <Form
            {...form}
            options={{ preserveScroll: true }}
            className="max-w-2xl space-y-6"
        >
            {({ processing, errors }) => (
                <>
                    <Card>
                        <CardContent className="grid gap-6">
                            <FormField
                                label="Nama"
                                htmlFor="name"
                                error={errors.name}
                            >
                                <Input
                                    id="name"
                                    name="name"
                                    required
                                    autoFocus
                                    defaultValue={category?.name}
                                    placeholder="Website"
                                />
                            </FormField>

                            <FormField
                                label="Slug"
                                htmlFor="slug"
                                optional
                                error={errors.slug}
                                hint="Kosongkan untuk dibuat otomatis dari nama."
                            >
                                <Input
                                    id="slug"
                                    name="slug"
                                    defaultValue={category?.slug}
                                    placeholder="website"
                                />
                            </FormField>

                            <FormField
                                label="Deskripsi"
                                htmlFor="description"
                                optional
                                error={errors.description}
                            >
                                <Textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    defaultValue={category?.description ?? ''}
                                />
                            </FormField>

                            <FormField
                                label="Urutan"
                                htmlFor="sort_order"
                                error={errors.sort_order}
                                hint="Angka kecil tampil lebih dulu sebagai tab di website."
                            >
                                <Input
                                    id="sort_order"
                                    name="sort_order"
                                    type="number"
                                    min={0}
                                    className="w-32"
                                    defaultValue={category?.sort_order ?? 0}
                                />
                            </FormField>
                        </CardContent>
                    </Card>

                    <FormActions
                        processing={processing}
                        submitLabel={
                            category ? 'Simpan perubahan' : 'Tambah kategori'
                        }
                        cancelHref={ProductCategoryController.index()}
                    />
                </>
            )}
        </Form>
    );
}
