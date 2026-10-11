export type PortfolioItem = {
    title: string;
    /** e.g. "Website · Laravel + React" */
    category: string;
    /** One sentence: the client's problem and the result. */
    summary: string;
    /** Path under /public, e.g. /images/portfolio/toko-kue.jpg */
    image: string;
    url?: string;
    /** Optional short case-study points: what was built and why. */
    highlights?: string[];
};

// The Portfolio section and its nav link only appear once this list has items.
export const portfolio: PortfolioItem[] = [
    {
        title: 'Monshika',
        category: 'Aplikasi Mobile · Flutter',
        summary:
            'Produk ShikaComp: aplikasi keuangan pribadi yang datanya tetap di HP, bisa dipakai offline, dengan backup terenkripsi ke Google Drive.',
        image: '/images/portfolio/monshika.webp',
        url: 'https://github.com/Irana06/monshika',
        highlights: [
            'Data di SQLite dalam HP, tetap jalan tanpa internet',
            'Backup terenkripsi AES-256 ke Google Drive milik pengguna',
            'Kurs 200+ mata uang, emas, dan kripto; 8 widget Android',
        ],
    },
    {
        title: 'yushika.my.id',
        category: 'Website · React',
        summary:
            'Portofolio pribadi dengan terminal interaktif, di-hosting sendiri di home server lewat Cloudflare Tunnel.',
        image: '/images/portfolio/yushika-portfolio.webp',
        url: 'https://yushika.my.id',
        highlights: [
            'Terminal yang benar-benar bisa diketik, diagram alur ala BPMN',
            'Satu file data untuk semua konten dan halaman CV',
            'Server di rumah, tanpa port terbuka, lewat Cloudflare Tunnel',
        ],
    },
];
