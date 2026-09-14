<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProductRequest;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        $categories = ProductCategory::query()
            ->with(['products' => fn ($query) => $query->withCount('projects')->orderBy('sort_order')])
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('admin/products/index', [
            'groups' => $categories->map(fn (ProductCategory $category) => $this->presentGroup($category)),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/products/create', [
            'categories' => $this->categoryOptions(),
        ]);
    }

    public function store(ProductRequest $request): RedirectResponse
    {
        Product::create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Paket ditambahkan.']);

        return to_route('admin.products.index');
    }

    public function edit(Product $product): Response
    {
        return Inertia::render('admin/products/edit', [
            'product' => [
                'id' => $product->id,
                'category_id' => $product->category_id,
                'name' => $product->name,
                'slug' => $product->slug,
                'tagline' => $product->tagline,
                'description' => $product->description,
                'price' => $product->price,
                'features' => $product->features ?? [],
                'wa_template' => $product->wa_template,
                'is_featured' => $product->is_featured,
                'published' => $product->published,
                'sort_order' => $product->sort_order,
            ],
            'categories' => $this->categoryOptions(),
        ]);
    }

    public function update(ProductRequest $request, Product $product): RedirectResponse
    {
        $product->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Paket disimpan.']);

        return to_route('admin.products.index');
    }

    public function destroy(Product $product): RedirectResponse
    {
        if ($product->projects()->exists()) {
            Inertia::flash('toast', [
                'type' => 'error',
                'message' => 'Paket ini sudah dipakai project. Sembunyikan dari website (unpublish) saja.',
            ]);

            return back();
        }

        $product->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Paket dihapus.']);

        return to_route('admin.products.index');
    }

    /**
     * @return array<string, mixed>
     */
    private function presentGroup(ProductCategory $category): array
    {
        return [
            'id' => $category->id,
            'name' => $category->name,
            'products' => $category->products->map(fn (Product $product) => $this->presentListItem($product)),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function presentListItem(Product $product): array
    {
        return [
            'id' => $product->id,
            'name' => $product->name,
            'tagline' => $product->tagline,
            'price' => $product->price,
            'published' => $product->published,
            'is_featured' => $product->is_featured,
            'sort_order' => $product->sort_order,
            'projects_count' => $product->projects_count ?? 0,
        ];
    }

    /**
     * @return array<int, array{id: string, name: string}>
     */
    private function categoryOptions(): array
    {
        return ProductCategory::query()
            ->orderBy('sort_order')
            ->get()
            ->map(fn (ProductCategory $category) => ['id' => $category->id, 'name' => $category->name])
            ->values()
            ->all();
    }
}
