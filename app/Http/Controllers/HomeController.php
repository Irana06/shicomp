<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Show the public landing page with the published packages.
     */
    public function __invoke(): Response
    {
        $categories = ProductCategory::query()
            ->whereHas('products', fn ($query) => $query->where('published', true))
            ->with(['products' => fn ($query) => $query->where('published', true)->orderBy('sort_order')])
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('public/home', [
            'categories' => $categories->map(fn (ProductCategory $category) => $this->presentCategory($category)),
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function presentCategory(ProductCategory $category): array
    {
        return [
            'id' => $category->id,
            'name' => $category->name,
            'slug' => $category->slug,
            'products' => $category->products->map(fn (Product $product) => $this->presentProduct($product)),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function presentProduct(Product $product): array
    {
        return [
            'id' => $product->id,
            'name' => $product->name,
            'slug' => $product->slug,
            'tagline' => $product->tagline,
            'price' => $product->price,
            'features' => $product->features ?? [],
            'wa_template' => $product->wa_template,
            'is_featured' => $product->is_featured,
        ];
    }
}
