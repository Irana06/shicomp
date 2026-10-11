<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Seed the service categories and their packages.
     *
     * Prices are suggested starting prices. Running the seeder again only fills
     * prices that are still empty, so prices set from the admin panel are kept.
     */
    public function run(): void
    {
        $categories = collect([
            ['slug' => 'website', 'name' => 'Website', 'sort_order' => 1, 'description' => 'Company profile, toko online, hingga sistem dan dashboard custom dengan Laravel & React.'],
            ['slug' => 'aplikasi-mobile', 'name' => 'Aplikasi Mobile', 'sort_order' => 2, 'description' => 'Aplikasi Android & iOS dari satu kode dengan Flutter.'],
            ['slug' => 'maintenance', 'name' => 'Maintenance', 'sort_order' => 3, 'description' => 'Website dan aplikasi tetap online, aman, dan terbarui. Dibayar per bulan.'],
            ['slug' => 'perbaikan', 'name' => 'Perbaikan & Integrasi', 'sort_order' => 4, 'description' => 'Pemulihan website kena hack, perbaikan bug, dan integrasi sistem. Dibayar per pekerjaan.'],
        ])->mapWithKeys(fn (array $category) => [
            $category['slug'] => ProductCategory::updateOrCreate(['slug' => $category['slug']], $category),
        ]);

        $waTemplate = 'Halo ShikaComp, saya tertarik dengan paket {paket} ({kategori}). Boleh konsultasi dulu?';

        $packages = [
            'website' => [
                [
                    'slug' => 'website-ume',
                    'name' => 'Ume',
                    'tagline' => 'UMKM & personal',
                    'price' => 1500000,
                    'features' => [
                        'Landing page atau company profile',
                        'Tampilan rapi di HP & desktop',
                        'Tombol WhatsApp & Google Maps',
                        'Bantuan setup domain & hosting',
                    ],
                ],
                [
                    'slug' => 'website-take',
                    'name' => 'Take',
                    'tagline' => 'Bisnis yang sedang tumbuh',
                    'price' => 4500000,
                    'is_featured' => true,
                    'features' => [
                        'Website multi-halaman + panel admin',
                        'Katalog produk atau blog yang bisa dikelola sendiri',
                        'SEO dasar & kecepatan halaman',
                    ],
                ],
                [
                    'slug' => 'website-matsu',
                    'name' => 'Matsu',
                    'tagline' => 'Startup, korporat & instansi',
                    'price' => 12000000,
                    'features' => [
                        'Sistem web custom (Laravel + React)',
                        'Dashboard, laporan & manajemen user',
                        'Integrasi API & payment gateway',
                        'Deploy ke server + CI/CD',
                    ],
                ],
            ],
            'aplikasi-mobile' => [
                [
                    'slug' => 'mobile-ume',
                    'name' => 'Ume',
                    'tagline' => 'Aplikasi sederhana',
                    'price' => 5000000,
                    'features' => [
                        'Hingga 6 halaman aplikasi',
                        'Data tersimpan di HP, bisa dipakai offline',
                        'File APK siap dipasang di Android',
                    ],
                ],
                [
                    'slug' => 'mobile-take',
                    'name' => 'Take',
                    'tagline' => 'Aplikasi dengan akun & server',
                    'price' => 12000000,
                    'is_featured' => true,
                    'features' => [
                        'Login & akun pengguna',
                        'Backend & API (Laravel)',
                        'Notifikasi',
                        'Rilis ke Google Play Store',
                    ],
                ],
                [
                    'slug' => 'mobile-matsu',
                    'name' => 'Matsu',
                    'tagline' => 'Aplikasi custom',
                    'price' => null,
                    'features' => [
                        'Fitur sesuai kebutuhan bisnis',
                        'Pembayaran & integrasi sistem lain',
                        'Rilis ke Play Store & App Store',
                    ],
                ],
            ],
            'maintenance' => [
                [
                    'slug' => 'maintenance-ume',
                    'name' => 'Ume',
                    'tagline' => 'Website tetap aman',
                    'price' => 250000,
                    'features' => [
                        'Backup mingguan',
                        'Update keamanan',
                        'Pemantauan website online 24 jam',
                        'Laporan bulanan',
                    ],
                ],
                [
                    'slug' => 'maintenance-take',
                    'name' => 'Take',
                    'tagline' => 'Website bisnis yang aktif',
                    'price' => 600000,
                    'is_featured' => true,
                    'features' => [
                        'Semua di paket Ume',
                        'Hosting di server ShikaComp, termasuk SSL',
                        'Perbaikan bug & perubahan kecil hingga 2 jam per bulan',
                        'Backup harian',
                    ],
                ],
                [
                    'slug' => 'maintenance-matsu',
                    'name' => 'Matsu',
                    'tagline' => 'Sistem yang harus selalu jalan',
                    'price' => 1500000,
                    'features' => [
                        'Semua di paket Take',
                        'Server / VPS khusus yang dikelola penuh',
                        'Perubahan & pengembangan hingga 6 jam per bulan',
                        'Respons prioritas',
                    ],
                ],
            ],
            'perbaikan' => [
                [
                    'slug' => 'pemulihan-website',
                    'name' => 'Pemulihan Website',
                    'tagline' => 'Website kena hack',
                    'price' => 500000,
                    'features' => [
                        'Hapus malware & backdoor',
                        'Tutup celah keamanan',
                        'Website kembali bisa diakses',
                        'Laporan apa yang terjadi',
                    ],
                ],
                [
                    'slug' => 'perbaikan-bug',
                    'name' => 'Perbaikan Bug',
                    'tagline' => 'Error, lambat, atau mati',
                    'price' => 300000,
                    'is_featured' => true,
                    'features' => [
                        'Cari penyebab sampai ke akar',
                        'Perbaikan website atau server',
                        'Penjelasan singkat apa yang diperbaiki',
                    ],
                ],
                [
                    'slug' => 'integrasi-sistem',
                    'name' => 'Integrasi Sistem',
                    'tagline' => 'Payment gateway & API',
                    'price' => 1000000,
                    'features' => [
                        'Payment gateway (Midtrans, dll.)',
                        'API pihak ketiga',
                        'Sinkronisasi data antar sistem',
                    ],
                ],
            ],
        ];

        foreach ($packages as $categorySlug => $categoryPackages) {
            foreach ($categoryPackages as $index => $package) {
                $product = Product::firstOrNew(['slug' => $package['slug']]);

                // Keep a price set from the admin panel; only fill one that is still empty.
                $price = $product->price ?? $package['price'];

                $product->fill([
                    ...$package,
                    'category_id' => $categories[$categorySlug]->id,
                    'price' => $price,
                    'is_featured' => $package['is_featured'] ?? false,
                    'sort_order' => $index + 1,
                    'wa_template' => $waTemplate,
                    'published' => true,
                ])->save();
            }
        }
    }
}
