export type FaqItem = {
    question: string;
    answer: string;
};

// Answers with a [BRACKETED] part are hidden on the site until the real policy is filled in.
export const faq: FaqItem[] = [
    {
        question: 'Berapa lama waktu pengerjaannya?',
        answer: 'Tergantung paket dan fitur. Estimasi waktu yang pasti diberikan di tahap Rancang, sebelum pengerjaan dimulai, dan progresnya bisa Anda pantau lewat halaman Cek Status.',
    },
    {
        question: 'Bagaimana sistem pembayarannya?',
        answer: '[Jelaskan skema pembayaran, misalnya DP di awal dan pelunasan sebelum serah terima.]',
    },
    {
        question: 'Apakah harga sudah termasuk domain & hosting?',
        answer: 'Rinciannya dibahas saat diskusi brief, karena tergantung kebutuhan. Saya bisa bantu memilih dan menyiapkan domain, hosting, atau server yang sesuai, termasuk SSL dan deploy.',
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
