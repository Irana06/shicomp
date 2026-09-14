<?php

namespace App\Enums;

enum PaymentStatusEnum: string
{
    case Unpaid = 'unpaid';
    case DownPayment = 'down_payment';
    case Paid = 'paid';

    /**
     * @return list<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * @return list<array{value: string, label: string}>
     */
    public static function options(): array
    {
        return array_map(
            fn (self $status) => ['value' => $status->value, 'label' => $status->label()],
            self::cases(),
        );
    }

    public function label(): string
    {
        return match ($this) {
            self::Unpaid => 'Belum bayar',
            self::DownPayment => 'DP dibayar',
            self::Paid => 'Lunas',
        };
    }
}
