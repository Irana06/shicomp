export type Option = {
    value: string;
    label: string;
};

export type SelectItem = {
    id: string;
    name: string;
};

export type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    prev_page_url: string | null;
    next_page_url: string | null;
};

export type DashboardStats = {
    active: number;
    pending: number;
    completed: number;
    awaiting_payment: number;
};

export type RecentUpdate = {
    id: string;
    project_id: string;
    project_code: string;
    project_title: string;
    status: string;
    status_label: string;
    comment: string | null;
    created_at: string | null;
};

export type AdminCategory = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    sort_order: number;
};

export type AdminCategoryListItem = AdminCategory & {
    products_count: number;
};

export type AdminProduct = {
    id: string;
    category_id: string;
    name: string;
    slug: string;
    tagline: string | null;
    description: string | null;
    price: string | null;
    features: string[];
    wa_template: string | null;
    is_featured: boolean;
    published: boolean;
    sort_order: number;
};

export type AdminProductListItem = {
    id: string;
    name: string;
    tagline: string | null;
    price: string | null;
    published: boolean;
    is_featured: boolean;
    sort_order: number;
    projects_count: number;
};

export type AdminProductGroup = {
    id: string;
    name: string;
    products: AdminProductListItem[];
};

export type AdminProjectListItem = {
    id: string;
    project_code: string;
    title: string;
    client: string | null;
    package: string | null;
    status: string;
    status_label: string;
    payment_status: string;
    payment_status_label: string;
    updated_at: string | null;
};

export type AdminProject = {
    id: string;
    project_code: string;
    title: string;
    brief: string | null;
    budget: string | null;
    product_id: string | null;
    payment_status: string;
    guest_name: string | null;
    guest_email: string | null;
    guest_phone: string | null;
    has_account: boolean;
};

export type AdminProjectLog = {
    id: string;
    status: string;
    status_label: string;
    comment: string | null;
    created_at: string | null;
};

export type AdminProjectDetail = {
    id: string;
    project_code: string;
    title: string;
    brief: string | null;
    budget: string | null;
    status: string;
    status_label: string;
    payment_status: string;
    payment_status_label: string;
    package: string | null;
    client: {
        name: string | null;
        email: string | null;
        phone: string | null;
        has_account: boolean;
    };
    created_at: string | null;
    status_url: string;
    logs: AdminProjectLog[];
};
