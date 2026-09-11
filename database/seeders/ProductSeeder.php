<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Seed the service categories and the Ume / Take / Matsu website packages.
     *
     * Prices are left empty on purpose: fill them in from the admin panel.
     */
    public function run(): void
    {
        $categories = collect([
            ['slug' => 'website', 'name' => 'Website', 'sort_order' => 1, 'description' => 'Company profile, toko online, hingga sistem dan dashboard custom dengan Laravel & React.'],
            ['slug' => 'aplikasi-mobile', 'name' => 'Aplikasi Mobile', 'sort_order' => 2, 'description' => 'Aplikasi Android & iOS dari satu kode dengan Flutter.'],
            ['slug' => 'maintenance', 'name' => 'Maintenance', 'sort_order' => 3, 'description' => 'Setup server, domain, SSL, CI/CD, pemantauan, dan backup.'],
        ])->mapWithKeys(fn (array $category) => [
            $category['slug'] => ProductCategory::updateOrCreate(['slug' => $category['slug']], $category),
        ]);

        $waTemplate = 'Halo ShikaComp, saya tertarik dengan paket {paket} ({kategori}). Boleh konsultasi dulu?';

        $packages = [
            [
                'slug' => 'website-ume',
                'name' => 'Ume',
                'tagline' => 'UMKM & personal',
                'features' => [
                    'Landing page atau company profile',
                    'Tampilan rapi di HP & desktop',
                    'Tombol WhatsApp & Google Maps',
                    'Bantuan setup domain & hosting',
                ],
                'is_featured' => false,
                'sort_order' => 1,
            ],
            [
                'slug' => 'website-take',
                'name' => 'Take',
                'tagline' => 'Bisnis yang sedang tumbuh',
                'features' => [
                    'Website multi-halaman + panel admin',
                    'Katalog produk atau blog yang bisa dikelola sendiri',
                    'SEO dasar & kecepatan halaman',
                ],
                'is_featured' => true,
                'sort_order' => 2,
            ],
            [
                'slug' => 'website-matsu',
                'name' => 'Matsu',
                'tagline' => 'Startup, korporat & instansi',
                'features' => [
                    'Sistem web custom (Laravel + React)',
                    'Dashboard, laporan & manajemen user',
                    'Integrasi API & payment gateway',
                    'Deploy ke server + CI/CD',
                ],
                'is_featured' => false,
                'sort_order' => 3,
            ],
        ];

        foreach ($packages as $package) {
            Product::updateOrCreate(['slug' => $package['slug']], [
                ...$package,
                'category_id' => $categories['website']->id,
                'price' => null,
                'wa_template' => $waTemplate,
                'published' => true,
            ]);
        }
    }
}
