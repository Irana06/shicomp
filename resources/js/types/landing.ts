export type Contact = {
    whatsapp: string | null;
    email: string | null;
    instagram: string | null;
    business_hours: string | null;
};

export type PackageProduct = {
    id: string;
    name: string;
    slug: string;
    tagline: string | null;
    /** Decimal string, or null when the price depends on the brief. */
    price: string | null;
    features: string[];
    wa_template: string | null;
    is_featured: boolean;
};

export type PackageCategory = {
    id: string;
    name: string;
    slug: string;
    products: PackageProduct[];
};

export type ProjectTimelineStep = {
    status: string;
    label: string;
    reached_at: string | null;
};

export type ProjectStatus = {
    code: string;
    title: string;
    package: string | null;
    status: string;
    status_label: string;
    timeline: ProjectTimelineStep[];
    latest_note: { comment: string; date: string | null } | null;
};
