<?php

namespace App\Models;

use App\Enums\PaymentStatusEnum;
use App\Enums\StatusEnum;
use Carbon\CarbonImmutable;
use Database\Factories\ProjectFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;

/**
 * @property string $id
 * @property string $project_code
 * @property string $title
 * @property string|null $brief
 * @property string|null $budget
 * @property StatusEnum $status
 * @property PaymentStatusEnum $payment_status
 * @property string|null $user_id
 * @property string|null $product_id
 * @property string|null $guest_name
 * @property string|null $guest_email
 * @property string|null $guest_phone
 * @property CarbonImmutable|null $created_at
 * @property CarbonImmutable|null $updated_at
 */
#[Fillable(['title', 'brief', 'budget', 'status', 'payment_status', 'user_id', 'product_id', 'guest_name', 'guest_email', 'guest_phone'])]
class Project extends Model
{
    /** @use HasFactory<ProjectFactory> */
    use HasFactory, HasUuids;

    /**
     * Characters used in project codes (no 0/O or 1/I, so codes are easy to read out).
     */
    private const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

    /**
     * @var array<string, mixed>
     */
    protected $attributes = [
        'status' => 'pending',
        'payment_status' => 'unpaid',
    ];

    protected static function booted(): void
    {
        static::creating(function (Project $project) {
            $project->project_code ??= static::generateCode();
        });

        static::created(function (Project $project) {
            $project->statusLogs()->create(['status' => $project->status]);
        });
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'budget' => 'decimal:2',
            'status' => StatusEnum::class,
            'payment_status' => PaymentStatusEnum::class,
        ];
    }

    /**
     * Generate a unique, human-friendly project code, e.g. SHC-7KQ2-M9XA.
     */
    public static function generateCode(): string
    {
        $segment = fn (): string => implode('', array_map(
            fn (): string => self::CODE_ALPHABET[random_int(0, strlen(self::CODE_ALPHABET) - 1)],
            range(1, 4),
        ));

        do {
            $code = 'SHC-'.$segment().'-'.$segment();
        } while (static::where('project_code', $code)->exists());

        return $code;
    }

    /**
     * Move the project to a new status and record it in the status log.
     */
    public function updateStatus(StatusEnum $status, ?string $comment = null): ProjectStatusLog
    {
        return DB::transaction(function () use ($status, $comment) {
            $this->update(['status' => $status]);

            return $this->statusLogs()->create([
                'status' => $status,
                'comment' => $comment,
            ]);
        });
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return BelongsTo<Product, $this>
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * @return HasMany<ProjectStatusLog, $this>
     */
    public function statusLogs(): HasMany
    {
        return $this->hasMany(ProjectStatusLog::class);
    }
}
