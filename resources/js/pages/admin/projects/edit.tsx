import { Head } from '@inertiajs/react';
import ProjectController from '@/actions/App/Http/Controllers/Admin/ProjectController';
import { AdminPage, PageHeader } from '@/components/admin/layout';
import { ProjectForm } from '@/components/admin/project-form';
import type { AdminProject, Option, SelectItem } from '@/types';

type Props = {
    project: AdminProject;
    products: SelectItem[];
    paymentOptions: Option[];
};

export default function EditProject({
    project,
    products,
    paymentOptions,
}: Props) {
    return (
        <>
            <Head title={`Edit ${project.project_code}`} />

            <AdminPage>
                <PageHeader
                    title="Edit project"
                    description={
                        <span className="font-mono">
                            {project.project_code}
                        </span>
                    }
                />
                <ProjectForm
                    project={project}
                    products={products}
                    paymentOptions={paymentOptions}
                />
            </AdminPage>
        </>
    );
}

EditProject.layout = {
    breadcrumbs: [
        { title: 'Project', href: ProjectController.index() },
        { title: 'Edit', href: ProjectController.index() },
    ],
};
