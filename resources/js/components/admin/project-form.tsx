import { Form } from '@inertiajs/react';
import ProjectController from '@/actions/App/Http/Controllers/Admin/ProjectController';
import {
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
import type { AdminProject, Option, SelectItem } from '@/types';

type Props = {
    project?: AdminProject;
    products: SelectItem[];
    paymentOptions: Option[];
};

export function ProjectForm({ project, products, paymentOptions }: Props) {
    const form = project
        ? ProjectController.update.form(project.id)
        : ProjectController.store.form();
    const hasAccount = project?.has_account ?? false;

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
                            <CardTitle>Detail project</CardTitle>
                            <CardDescription>
                                Judul dan paket terlihat oleh klien di halaman
                                Cek Status.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <FormField
                                label="Judul project"
                                htmlFor="title"
                                error={errors.title}
                            >
                                <Input
                                    id="title"
                                    name="title"
                                    required
                                    autoFocus={!project}
                                    defaultValue={project?.title}
                                    placeholder="Website Toko Kue Sakura"
                                />
                            </FormField>

                            <div className="grid gap-6 sm:grid-cols-2">
                                <FormField
                                    label="Paket"
                                    htmlFor="product_id"
                                    error={errors.product_id}
                                >
                                    <NativeSelect
                                        id="product_id"
                                        name="product_id"
                                        defaultValue={project?.product_id ?? ''}
                                    >
                                        <option value="">
                                            Custom (tanpa paket)
                                        </option>
                                        {products.map((product) => (
                                            <option
                                                key={product.id}
                                                value={product.id}
                                            >
                                                {product.name}
                                            </option>
                                        ))}
                                    </NativeSelect>
                                </FormField>

                                <FormField
                                    label="Budget / nilai project"
                                    htmlFor="budget"
                                    optional
                                    error={errors.budget}
                                >
                                    <MoneyInput
                                        id="budget"
                                        name="budget"
                                        defaultValue={formatMoneyInput(
                                            project?.budget,
                                        )}
                                        placeholder="3.500.000"
                                    />
                                </FormField>
                            </div>

                            <FormField
                                label="Brief"
                                htmlFor="brief"
                                optional
                                error={errors.brief}
                                hint="Catatan kebutuhan klien. Hanya terlihat di admin."
                            >
                                <Textarea
                                    id="brief"
                                    name="brief"
                                    rows={6}
                                    defaultValue={project?.brief ?? ''}
                                />
                            </FormField>
                        </CardContent>
                    </Card>

                    <div className="flex flex-col gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Klien</CardTitle>
                                <CardDescription>
                                    {hasAccount
                                        ? 'Klien ini punya akun; data di bawah hanya catatan tambahan.'
                                        : 'Kontak klien dari order WhatsApp.'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-5">
                                <FormField
                                    label="Nama klien"
                                    htmlFor="guest_name"
                                    optional={hasAccount}
                                    error={errors.guest_name}
                                >
                                    <Input
                                        id="guest_name"
                                        name="guest_name"
                                        required={!hasAccount}
                                        defaultValue={project?.guest_name ?? ''}
                                    />
                                </FormField>
                                <FormField
                                    label="Nomor WhatsApp"
                                    htmlFor="guest_phone"
                                    optional
                                    error={errors.guest_phone}
                                    hint="Dipakai untuk tombol kirim update ke klien."
                                >
                                    <Input
                                        id="guest_phone"
                                        name="guest_phone"
                                        type="tel"
                                        inputMode="tel"
                                        defaultValue={
                                            project?.guest_phone ?? ''
                                        }
                                        placeholder="081234567890"
                                    />
                                </FormField>
                                <FormField
                                    label="Email"
                                    htmlFor="guest_email"
                                    optional
                                    error={errors.guest_email}
                                >
                                    <Input
                                        id="guest_email"
                                        name="guest_email"
                                        type="email"
                                        defaultValue={
                                            project?.guest_email ?? ''
                                        }
                                    />
                                </FormField>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Pembayaran</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <FormField
                                    label="Status pembayaran"
                                    htmlFor="payment_status"
                                    error={errors.payment_status}
                                >
                                    <NativeSelect
                                        id="payment_status"
                                        name="payment_status"
                                        defaultValue={
                                            project?.payment_status ?? 'unpaid'
                                        }
                                    >
                                        {paymentOptions.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </NativeSelect>
                                </FormField>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-3">
                        <FormActions
                            processing={processing}
                            submitLabel={
                                project ? 'Simpan perubahan' : 'Buat project'
                            }
                            cancelHref={
                                project
                                    ? ProjectController.show(project.id)
                                    : ProjectController.index()
                            }
                        />
                    </div>
                </>
            )}
        </Form>
    );
}
