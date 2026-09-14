<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category_id' => ProductCategory::factory(),
            'name' => fake()->unique()->words(2, true),
            'slug' => fn (array $attributes) => Str::slug($attributes['name']),
            'tagline' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'price' => fake()->randomFloat(2, 500_000, 25_000_000),
            'features' => fake()->sentences(3),
            'wa_template' => null,
            'is_featured' => false,
            'sort_order' => 0,
            'published' => true,
        ];
    }

    /**
     * Indicate that the product is not visible on the website.
     */
    public function unpublished(): static
    {
        return $this->state(fn (array $attributes) => [
            'published' => false,
        ]);
    }
}
