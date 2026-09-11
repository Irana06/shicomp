import { Form } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { buttonPrimary } from '@/components/landing/primitives';
import { cn } from '@/lib/utils';
import { projectStatus } from '@/routes';

type Props = {
    defaultCode?: string | null;
    tone?: 'light' | 'dark';
};

export function StatusCheckForm({ defaultCode, tone = 'dark' }: Props) {
    return (
        <Form
            {...projectStatus.form()}
            className="flex flex-col gap-2.5 sm:flex-row sm:gap-3"
        >
            {({ processing }) => (
                <>
                    <label htmlFor="kode" className="sr-only">
                        Kode project
                    </label>
                    <div className="relative flex-1">
                        <Search
                            aria-hidden="true"
                            className="text-ink-subtle pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2"
                        />
                        <input
                            id="kode"
                            name="kode"
                            defaultValue={defaultCode ?? ''}
                            required
                            placeholder="SHC-XXXX-XXXX"
                            autoComplete="off"
                            autoCapitalize="characters"
                            spellCheck={false}
                            className={cn(
                                'text-ink placeholder:text-ink-subtle focus-visible:outline-shu h-14 w-full rounded-xl pr-4 pl-12 font-mono text-[15px] tracking-[0.06em] uppercase focus-visible:outline-2 focus-visible:outline-offset-2 sm:text-base',
                                tone === 'dark'
                                    ? 'bg-paper'
                                    : 'border-line-strong bg-surface border',
                            )}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className={cn(
                            buttonPrimary,
                            'h-14 px-7 shadow-none sm:text-base',
                        )}
                    >
                        Cek Status
                    </button>
                </>
            )}
        </Form>
    );
}
