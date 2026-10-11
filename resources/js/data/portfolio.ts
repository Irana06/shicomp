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
export const portfolio: PortfolioItem[] = [
    {
        title: 'Monshika',
        category: 'Aplikasi Mobile · Flutter',
        summary:
            'Produk ShikaComp: aplikasi keuangan pribadi yang datanya tetap di HP, bisa dipakai offline, dengan backup terenkripsi ke Google Drive.',
        image: '/images/portfolio/monshika.webp',
        url: 'https://github.com/Irana06/monshika',
    },
    {
        title: 'yushika.my.id',
        category: 'Website · React',
        summary:
            'Portofolio pribadi dengan terminal interaktif, di-hosting sendiri di home server lewat Cloudflare Tunnel.',
        image: '/images/portfolio/yushika-portfolio.webp',
        url: 'https://yushika.my.id',
    },
    {
        title: 'RuangKelas',
        category: 'Sistem Web · Laravel',
        summary:
            'LMS sekolah dengan empat peran, nilai berbobot, dan kuis acak per siswa. Dikerjakan untuk Script Media.',
        image: '/images/portfolio/ruangkelas-lms.webp',
    },
    {
        title: 'Sewa Toko Online',
        category: 'Sistem Web · Laravel',
        summary:
            'Platform sewa toko online: etalase untuk pembeli, panel paket dan tagihan, pembayaran Midtrans. Dikerjakan untuk Script Media.',
        image: '/images/portfolio/sewa-toko-online.webp',
    },
    {
        title: 'Pondok Panggung',
        category: 'Website · WordPress',
        summary:
            'Perawatan dan pengembangan lanjutan website klien. Dikerjakan di GSM Studio.',
        image: '/images/portfolio/pondok-panggung.webp',
        url: 'https://pondokpanggung.com',
    },
    {
        title: 'Script Media',
        category: 'Website · WordPress',
        summary:
            'Ikut mengerjakan website perusahaan Script Media saat bekerja di GSM Studio.',
        image: '/images/portfolio/script-media.webp',
        url: 'https://script-media.net',
    },
];
