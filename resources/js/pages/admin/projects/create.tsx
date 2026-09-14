import { Head } from '@inertiajs/react';
import ProjectController from '@/actions/App/Http/Controllers/Admin/ProjectController';
import { AdminPage, PageHeader } from '@/components/admin/layout';
import { ProjectForm } from '@/components/admin/project-form';
import type { Option, SelectItem } from '@/types';

type Props = {
    products: SelectItem[];
    paymentOptions: Option[];
};

export default function CreateProject({ products, paymentOptions }: Props) {
    return (
        <>
            <Head title="Buat project" />

            <AdminPage>
                <PageHeader
                    title="Buat project"
                    description="Kode project (SHC-XXXX-XXXX) dibuat otomatis setelah disimpan."
                />
                <ProjectForm
                    products={products}
                    paymentOptions={paymentOptions}
                />
            </AdminPage>
        </>
    );
}

CreateProject.layout = {
    breadcrumbs: [
        { title: 'Project', href: ProjectController.index() },
        { title: 'Buat', href: ProjectController.create() },
    ],
};
