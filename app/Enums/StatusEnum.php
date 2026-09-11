<?php

namespace App\Enums;

enum StatusEnum: string
{
    case Pending = 'pending';
    case Design = 'design';
    case Development = 'development';
    case Review = 'review';
    case Completed = 'completed';
    case Cancelled = 'cancelled';

    /**
     * @return list<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public function label(): string
    {
        return match ($this) {
            self::Pending => 'Brief diterima',
            self::Design => 'Desain',
            self::Development => 'Development',
            self::Review => 'Review & revisi',
            self::Completed => 'Online & serah terima',
            self::Cancelled => 'Dibatalkan',
        };
    }
}
