import { Form } from '@inertiajs/react';
import ProductController from '@/actions/App/Http/Controllers/Admin/ProductController';
import {
    CheckboxField,
    firstNestedError,
    formatMoneyInput,
    FormActions,
    FormField,
    MoneyInput,
    NativeSelect,
} from '@/components/admin/form';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PACKAGE_MESSAGE } from '@/lib/whatsapp';
import type { AdminProduct, SelectItem } from '@/types';

type Props = {
    product?: AdminProduct;
    categories: SelectItem[];
};

export function ProductForm({ product, categories }: Props) {
    const form = product
        ? ProductController.update.form(product.id)
        : ProductController.store.form();

    return (
        <Form
            {...form}
            options={{ preserveScroll: true }}
            className="grid items-start gap-6 lg:grid-cols-3"
        >
            {({ processing, errors }) => (
                <>
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Informasi paket</CardTitle>
                            <CardDescription>
                                Tampil di bagian Paket &amp; Harga pada website.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-6 sm:grid-cols-2">
                                <FormField
                                    label="Nama paket"
                                    htmlFor="name"
                                    error={errors.name}
                                >
                                    <Input
                                        id="name"
                                        name="name"
                                        required
                                        defaultValue={product?.name}
                                        placeholder="Take"
                                    />
                                </FormField>

                                <FormField
                                    label="Kategori"
                                    htmlFor="category_id"
                                    error={errors.category_id}
                                >
                                    <NativeSelect
                                        id="category_id"
                                        name="category_id"
                                        required
                                        defaultValue={
                                            product?.category_id ??
                                            categories[0]?.id
                                        }
                                    >
                                        {categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </NativeSelect>
                                </FormField>
                            </div>

                            <FormField
                                label="Tagline"
                                htmlFor="tagline"
                                optional
                                error={errors.tagline}
                                hint="Untuk siapa paket ini, misalnya “UMKM & personal”."
                            >
                                <Input
                                    id="tagline"
                                    name="tagline"
                                    defaultValue={product?.tagline ?? ''}
                                />
                            </FormField>

                            <FormField
                                label="Harga mulai dari"
                                htmlFor="price"
                                optional
                                error={errors.price}
                                hint="Kosongkan jika harga menyesuaikan brief. Website akan menampilkan “Sesuai brief”."
                            >
                                <MoneyInput
                                    id="price"
                                    name="price"
                                    className="sm:max-w-xs"
                                    defaultValue={formatMoneyInput(
                                        product?.price,
                                    )}
                                    placeholder="3.500.000"
                                />
                            </FormField>

                            <FormField
                                label="Fitur"
                                htmlFor="features"
                                optional
                                error={firstNestedError(errors, 'features')}
                                hint="Satu fitur per baris. Tampil sebagai daftar centang di kartu paket."
                            >
                                <Textarea
                                    id="features"
                                    name="features"
                                    rows={5}
                                    defaultValue={product?.features.join('\n')}
                                    placeholder={
                                        'Website multi-halaman + panel admin\nSEO dasar & kecepatan halaman'
                                    }
                                />
                            </FormField>

                            <FormField
                                label="Deskripsi"
                                htmlFor="description"
                                optional
                                error={errors.description}
                                hint="Catatan internal, belum ditampilkan di website."
                            >
                                <Textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    defaultValue={product?.description ?? ''}
                                />
                            </FormField>
                        </CardContent>
                    </Card>

                    <div className="flex flex-col gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Tampilan</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-5">
                                <CheckboxField
                                    id="published"
                                    label="Tampilkan di website"
                                    description="Paket tersembunyi tetap bisa dipakai untuk project."
                                    defaultChecked={product?.published ?? true}
                                />
                                <CheckboxField
                                    id="is_featured"
                                    label="Tandai sebagai Rekomendasi"
                                    description="Kartu paket tampil menonjol."
                                    defaultChecked={
                                        product?.is_featured ?? false
                                    }
                                />
                                <FormField
                                    label="Urutan"
                                    htmlFor="sort_order"
                                    error={errors.sort_order}
                                    hint="Angka kecil tampil lebih dulu."
                                >
                                    <Input
                                        id="sort_order"
                                        name="sort_order"
                                        type="number"
                                        min={0}
                                        className="w-32"
                                        defaultValue={product?.sort_order ?? 0}
                                    />
                                </FormField>
                                <FormField
                                    label="Slug"
                                    htmlFor="slug"
                                    optional
                                    error={errors.slug}
                                    hint="Kosongkan untuk dibuat dari nama."
                                >
                                    <Input
                                        id="slug"
                                        name="slug"
                                        defaultValue={product?.slug}
                                    />
                                </FormField>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Pesan WhatsApp</CardTitle>
                                <CardDescription>
                                    Terisi otomatis saat klien menekan tombol
                                    pesan. Gunakan <code>{'{paket}'}</code> dan{' '}
                                    <code>{'{kategori}'}</code>.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <FormField
                                    label="Template"
                                    htmlFor="wa_template"
                                    optional
                                    error={errors.wa_template}
                                    hint="Kosongkan untuk memakai pesan bawaan."
                                >
                                    <Textarea
                                        id="wa_template"
                                        name="wa_template"
                                        rows={4}
                                        defaultValue={
                                            product?.wa_template ?? ''
                                        }
                                        placeholder={PACKAGE_MESSAGE}
                                    />
                                </FormField>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-3">
                        <FormActions
                            processing={processing}
                            submitLabel={
                                product ? 'Simpan perubahan' : 'Tambah paket'
                            }
                            cancelHref={ProductController.index()}
                        />
                    </div>
                </>
            )}
        </Form>
    );
}
