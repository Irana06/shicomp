<?php

namespace App\Http\Requests\Admin;

use App\Enums\PaymentStatusEnum;
use App\Models\Product;
use App\Models\Project;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProjectRequest extends FormRequest
{
    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $project = $this->route('project');
        $hasAccount = $project instanceof Project && $project->user_id !== null;

        return [
            'title' => ['required', 'string', 'max:255'],
            'brief' => ['nullable', 'string', 'max:5000'],
            'budget' => ['nullable', 'numeric', 'min:0', 'max:9999999999999'],
            'product_id' => ['nullable', 'uuid', Rule::exists(Product::class, 'id')],
            'payment_status' => ['required', Rule::enum(PaymentStatusEnum::class)],
            // Projects created from WhatsApp orders have no account: the contact lives on the project.
            'guest_name' => [Rule::requiredIf(! $hasAccount), 'nullable', 'string', 'max:255'],
            'guest_email' => ['nullable', 'email', 'max:255'],
            'guest_phone' => ['nullable', 'string', 'regex:/^\+?[0-9]{9,15}$/'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'title' => 'judul',
            'budget' => 'budget',
            'product_id' => 'paket',
            'payment_status' => 'status pembayaran',
            'guest_name' => 'nama klien',
            'guest_email' => 'email klien',
            'guest_phone' => 'nomor HP klien',
        ];
    }

    protected function prepareForValidation(): void
    {
        $budget = preg_replace('/\D/', '', $this->string('budget')->toString());
        $phone = preg_replace('/[\s\-()]/', '', $this->string('guest_phone')->toString());

        $this->merge([
            'budget' => $budget === '' ? null : $budget,
            'guest_phone' => $phone === '' ? null : $phone,
        ]);
    }
}
