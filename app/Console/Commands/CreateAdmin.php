<?php

namespace App\Console\Commands;

use App\Concerns\ProfileValidationRules;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;

use function Laravel\Prompts\password;
use function Laravel\Prompts\text;

class CreateAdmin extends Command
{
    use ProfileValidationRules;

    /**
     * @var string
     */
    protected $signature = 'shikacomp:admin {email : Email of the admin account}';

    /**
     * @var string
     */
    protected $description = 'Create an admin account, or give an existing user admin access';

    public function handle(): int
    {
        $email = Str::lower(trim($this->argument('email')));

        $emailError = $this->validationError('email', $email, ['required', 'email', 'max:255']);

        if ($emailError !== null) {
            $this->components->error($emailError);

            return self::FAILURE;
        }

        $user = User::where('email', $email)->first();

        if ($user === null) {
            $this->components->info("No account for {$email} yet, creating one.");

            $user = new User([
                'email' => $email,
                'name' => text(label: 'Nama', required: true),
                'phone' => text(
                    label: 'Nomor HP',
                    placeholder: '081234567890',
                    required: true,
                    validate: fn (string $value) => $this->validationError('phone', $value, $this->phoneRules()),
                ),
                'password' => password(
                    label: 'Password',
                    required: true,
                    validate: fn (string $value) => $this->validationError('password', $value, [Password::default()]),
                ),
            ]);
        }

        $user->forceFill([
            'is_admin' => true,
            'email_verified_at' => $user->email_verified_at ?? now(),
        ])->save();

        $this->components->info("{$user->email} now has admin access.");

        return self::SUCCESS;
    }

    /**
     * @param  array<int, mixed>  $rules
     */
    private function validationError(string $field, string $value, array $rules): ?string
    {
        $validator = Validator::make([$field => $value], [$field => $rules]);

        return $validator->fails() ? $validator->errors()->first($field) : null;
    }
}
