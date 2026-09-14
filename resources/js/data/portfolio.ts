export type PortfolioItem = {
    title: string;
    /** e.g. "Website · Laravel + React" */
    category: string;
    /** One sentence: the client's problem and the result. */
    summary: string;
    /** Path under /public, e.g. /images/portfolio/toko-kue.jpg */
    image: string;
    url?: string;
};

// The Portfolio section and its nav link only appear once this list has items.
export const portfolio: PortfolioItem[] = [];
