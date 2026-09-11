<?php

namespace Tests\Feature\Admin;

use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ProductManagementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->actingAs(User::factory()->admin()->create());
    }

    public function test_non_admins_cannot_manage_packages()
    {
        $this->actingAs(User::factory()->create());

        $this->get(route('admin.products.index'))->assertForbidden();
        $this->post(route('admin.categories.store'), ['name' => 'Website'])->assertForbidden();
    }

    public function test_admin_can_create_a_category_with_a_generated_slug()
    {
        $this->post(route('admin.categories.store'), [
            'name' => 'Aplikasi Mobile',
            'slug' => '',
            'sort_order' => 2,
        ])->assertRedirect(route('admin.categories.index'));

        $this->assertDatabaseHas('product_categories', [
            'name' => 'Aplikasi Mobile',
            'slug' => 'aplikasi-mobile',
            'sort_order' => 2,
        ]);
    }

    public function test_category_with_packages_cannot_be_deleted()
    {
        $product = Product::factory()->create();

        $this->from(route('admin.categories.index'))
            ->delete(route('admin.categories.destroy', $product->category_id))
            ->assertRedirect(route('admin.categories.index'));

        $this->assertDatabaseHas('product_categories', ['id' => $product->category_id]);
    }

    public function test_admin_can_create_a_package_from_form_input()
    {
        $category = ProductCategory::factory()->create();

        $this->post(route('admin.products.store'), [
            'category_id' => $category->id,
            'name' => 'Take',
            'tagline' => 'Bisnis yang sedang tumbuh',
            'price' => 'Rp 3.500.000',
            'features' => "Panel admin\n\n  SEO dasar  \n",
            'wa_template' => 'Halo, saya mau paket {paket}.',
            'published' => 'on',
            'sort_order' => '2',
        ])->assertRedirect(route('admin.products.index'));

        $product = Product::where('slug', 'take')->firstOrFail();

        $this->assertSame('3500000.00', $product->price);
        $this->assertSame(['Panel admin', 'SEO dasar'], $product->features);
        $this->assertTrue($product->published);
        $this->assertFalse($product->is_featured);
    }

    public function test_empty_price_means_price_depends_on_the_brief()
    {
        $product = Product::factory()->create();

        $this->put(route('admin.products.update', $product), [
            'category_id' => $product->category_id,
            'name' => $product->name,
            'slug' => $product->slug,
            'price' => '',
            'features' => '',
            'sort_order' => 0,
        ])->assertRedirect(route('admin.products.index'));

        $product->refresh();
        $this->assertNull($product->price);
        $this->assertFalse($product->published);
    }

    public function test_package_used_by_a_project_cannot_be_deleted()
    {
        $project = Project::factory()->create();

        $this->from(route('admin.products.index'))
            ->delete(route('admin.products.destroy', $project->product_id))
            ->assertRedirect(route('admin.products.index'));

        $this->assertDatabaseHas('products', ['id' => $project->product_id]);
    }

    public function test_package_index_groups_packages_by_category()
    {
        Product::factory()->count(2)->create([
            'category_id' => ProductCategory::factory()->create(['sort_order' => 1])->id,
        ]);

        $this->get(route('admin.products.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('admin/products/index')
                ->has('groups', 1)
                ->has('groups.0.products', 2)
            );
    }
}
