<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\ProductCategory;
use Database\Seeders\ProductSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class HomePageTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_page_lists_only_published_packages_in_order()
    {
        $this->seed(ProductSeeder::class);

        Product::factory()->unpublished()->create([
            'category_id' => ProductCategory::where('slug', 'website')->value('id'),
        ]);

        $this->get(route('home'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('public/home')
                ->has('categories', 1)
                ->where('categories.0.slug', 'website')
                ->has('categories.0.products', 3)
                ->where('categories.0.products.0.name', 'Ume')
                ->where('categories.0.products.1.is_featured', true)
                ->has('categories.0.products.2.features', 4)
            );
    }

    public function test_home_page_shares_contact_details()
    {
        config(['shikacomp.whatsapp' => '081234567890']);

        $this->get(route('home'))
            ->assertInertia(fn (Assert $page) => $page
                ->where('contact.whatsapp', '081234567890')
            );
    }
}
