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
        answer: 'DP 50% sebelum pengerjaan dimulai, pelunasan 50% setelah project selesai dan sebelum online atau serah terima. Paket Maintenance dibayar di awal setiap bulan.',
    },
    {
        question: 'Apakah harga sudah termasuk domain & hosting?',
        answer: 'Rinciannya dibahas saat diskusi brief, karena tergantung kebutuhan. Saya bisa bantu memilih dan menyiapkan domain, hosting, atau server yang sesuai, termasuk SSL dan deploy.',
    },
    {
        question: 'Berapa kali saya bisa minta revisi?',
        answer: 'Ume 2 kali, Take 3 kali, dan Matsu disepakati bersama di tahap Rancang. Perubahan di luar itu dihitung sebagai pekerjaan tambahan, dengan harga yang disampaikan dulu sebelum dikerjakan.',
    },
    {
        question: 'Apakah source code diserahkan ke saya?',
        answer: 'Bisa. Setelah project selesai ada dua pilihan: dirawat ShikaComp lewat paket Maintenance (website tetap online di server saya, update dan backup diurus), atau serah terima penuh berupa source code, database, dan akses server beserta panduan singkat. Mulai dengan Maintenance pun tetap bisa minta serah terima kapan saja.',
    },
    {
        question: 'Apakah ada garansi?',
        answer: 'Ada. Bug yang muncul dalam 30 hari setelah website atau aplikasi online diperbaiki gratis, selama penyebabnya bukan perubahan dari pihak lain.',
    },
    {
        question: 'Bisa bantu merawat website yang sudah ada?',
        answer: 'Bisa. Lewat layanan Maintenance, website atau aplikasi yang sudah berjalan bisa dipantau, di-backup, dan diperbarui secara berkala.',
    },
];
