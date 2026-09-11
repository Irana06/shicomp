export const CONSULT_MESSAGE =
    'Halo ShikaComp, saya ingin konsultasi tentang pembuatan website/aplikasi.';

export const PACKAGE_MESSAGE =
    'Halo ShikaComp, saya tertarik dengan paket {paket} ({kategori}). Boleh konsultasi dulu?';

/**
 * Build a wa.me link. Local numbers (08xx) are converted to 628xx.
 * Falls back to the contact section while no number is configured.
 */
export function whatsappLink(number: string | null, message: string): string {
    const digits = (number ?? '').replace(/\D/g, '');

    if (digits === '') {
        return '/#kontak';
    }

    const international = digits.startsWith('0')
        ? `62${digits.slice(1)}`
        : digits;

    return `https://wa.me/${international}?text=${encodeURIComponent(message)}`;
}

/**
 * Replace {placeholders} in a WhatsApp template.
 */
export function fillTemplate(
    template: string,
    values: Record<string, string>,
): string {
    return template.replace(
        /\{(\w+)\}/g,
        (match, key: string) => values[key] ?? match,
    );
}
