<?php

namespace App\Http\Requests\Admin;

use App\Enums\StatusEnum;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProjectStatusRequest extends FormRequest
{
    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'status' => ['required', Rule::enum(StatusEnum::class)],
            'comment' => ['nullable', 'string', 'max:2000'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'comment' => 'catatan',
        ];
    }

    public function status(): StatusEnum
    {
        return StatusEnum::from($this->string('status')->toString());
    }

    public function comment(): ?string
    {
        $comment = $this->string('comment')->trim()->toString();

        return $comment === '' ? null : $comment;
    }
}
