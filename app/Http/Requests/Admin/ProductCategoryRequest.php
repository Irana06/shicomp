<?php

namespace App\Http\Requests\Admin;

use App\Models\ProductCategory;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ProductCategoryRequest extends FormRequest
{
    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique(ProductCategory::class)->ignore($this->route('category')),
            ],
            'description' => ['nullable', 'string', 'max:1000'],
            'sort_order' => ['required', 'integer', 'min:0', 'max:65535'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'name' => 'nama',
            'description' => 'deskripsi',
            'sort_order' => 'urutan',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            // An empty slug is generated from the name.
            'slug' => Str::slug($this->string('slug')->trim()->toString() ?: $this->string('name')->toString()),
            'sort_order' => $this->input('sort_order') ?? 0,
        ]);
    }
}
