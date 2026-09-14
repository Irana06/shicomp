<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'brief' => fake()->paragraph(),
            'budget' => fake()->randomFloat(2, 1_000_000, 50_000_000),
            'user_id' => User::factory(),
            'product_id' => Product::factory(),
        ];
    }

    /**
     * Indicate that the project was ordered by a guest without an account.
     */
    public function guest(): static
    {
        return $this->state(fn (array $attributes) => [
            'user_id' => null,
            'guest_name' => fake()->name(),
            'guest_email' => fake()->safeEmail(),
            'guest_phone' => fake()->numerify('08##########'),
        ]);
    }
}
