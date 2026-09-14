export type FaqItem = {
    question: string;
    answer: string;
};

// TODO(Yushika): replace every [BRACKETED] part with your real policy before launch.
export const faq: FaqItem[] = [
    {
        question: 'Berapa lama waktu pengerjaannya?',
        answer: 'Tergantung paket dan fitur. Website sederhana biasanya [X] minggu, sistem custom atau aplikasi mobile [X] minggu atau lebih. Estimasi pasti diberikan di tahap Rancang.',
    },
    {
        question: 'Bagaimana sistem pembayarannya?',
        answer: '[Jelaskan skema pembayaran, misalnya DP di awal dan pelunasan sebelum serah terima.]',
    },
    {
        question: 'Apakah harga sudah termasuk domain & hosting?',
        answer: '[Jelaskan apakah domain & hosting termasuk harga paket.] Saya juga bisa bantu memilih dan menyiapkan server yang sesuai kebutuhan.',
    },
    {
        question: 'Berapa kali saya bisa minta revisi?',
        answer: 'Jumlah revisi mengikuti paket: [X] kali untuk Ume, [X] kali untuk Take, dan disepakati bersama untuk Matsu.',
    },
    {
        question: 'Apakah source code diserahkan ke saya?',
        answer: '[Jelaskan kebijakan serah terima source code dan akses server.]',
    },
    {
        question: 'Bisa bantu merawat website yang sudah ada?',
        answer: 'Bisa. Lewat layanan Maintenance, website atau aplikasi yang sudah berjalan bisa dipantau, di-backup, dan diperbarui secara berkala.',
    },
];
