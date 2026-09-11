<?php

namespace App\Http\Requests\Admin;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ProductRequest extends FormRequest
{
    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'category_id' => ['required', 'uuid', Rule::exists(ProductCategory::class, 'id')],
            'name' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique(Product::class)->ignore($this->route('product')),
            ],
            'tagline' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:2000'],
            'price' => ['nullable', 'numeric', 'min:0', 'max:9999999999999'],
            'features' => ['array', 'max:20'],
            'features.*' => ['string', 'max:255'],
            'wa_template' => ['nullable', 'string', 'max:1000'],
            'is_featured' => ['boolean'],
            'published' => ['boolean'],
            'sort_order' => ['required', 'integer', 'min:0', 'max:65535'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'category_id' => 'kategori',
            'name' => 'nama',
            'price' => 'harga',
            'features' => 'fitur',
            'wa_template' => 'template WhatsApp',
            'sort_order' => 'urutan',
        ];
    }

    protected function prepareForValidation(): void
    {
        $price = preg_replace('/\D/', '', $this->string('price')->toString());

        $this->merge([
            'slug' => Str::slug($this->string('slug')->trim()->toString() ?: $this->string('name')->toString()),
            // Accept "1.500.000" or "Rp 1500000"; an empty price means "depends on the brief".
            'price' => $price === '' ? null : $price,
            // Features are typed one per line.
            'features' => Str::of($this->string('features')->toString())
                ->explode("\n")
                ->map(fn (string $feature) => trim($feature))
                ->filter()
                ->values()
                ->all(),
            'is_featured' => $this->boolean('is_featured'),
            'published' => $this->boolean('published'),
            'sort_order' => $this->input('sort_order') ?? 0,
        ]);
    }
}
