import { usePage } from '@inertiajs/react';

import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    const { name } = usePage().props;

    return (
        <>
            <AppLogoIcon className="size-8" />
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="font-display mb-0.5 truncate leading-tight font-bold">
                    {name}
                </span>
            </div>
        </>
    );
}
