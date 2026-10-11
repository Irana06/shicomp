export type Testimonial = {
    /** The client's own words, unedited apart from typos. */
    quote: string;
    name: string;
    /** e.g. "Pemilik Toko Kue Manis" */
    role: string;
    /** Optional: which project it was about */
    project?: string;
};

// Only real client words, with their permission. The block stays hidden while this is empty.
export const testimonials: Testimonial[] = [];
