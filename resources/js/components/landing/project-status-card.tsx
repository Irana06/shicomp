import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProjectStatus } from '@/types';

type StepState = 'done' | 'current' | 'upcoming';

function stepStates(project: ProjectStatus): StepState[] {
    const { timeline, status } = project;

    if (status === 'completed') {
        return timeline.map(() => 'done');
    }

    if (status === 'cancelled') {
        return timeline.map((step) => (step.reached_at ? 'done' : 'upcoming'));
    }

    const currentIndex = timeline.findIndex((step) => step.status === status);

    return timeline.map((_, index) => {
        if (index < currentIndex) {
            return 'done';
        }

        return index === currentIndex ? 'current' : 'upcoming';
    });
}

type Props = {
    project: ProjectStatus;
    /** Small label shown above the code, e.g. "Contoh tampilan". */
    badge?: string;
    className?: string;
};

export function ProjectStatusCard({ project, badge, className }: Props) {
    const states = stepStates(project);
    const isOpen =
        project.status !== 'completed' && project.status !== 'cancelled';

    return (
        <article
            className={cn(
                'bg-paper text-ink flex flex-col gap-5 rounded-xl p-5 sm:gap-6 sm:p-8',
                className,
            )}
        >
            <header className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 flex-col gap-1 sm:gap-1.5">
                    {badge && (
                        <p className="text-ink-subtle text-[11px] font-bold tracking-[0.08em] uppercase">
                            {badge}
                        </p>
                    )}
                    <p className="text-shu font-mono text-xs tracking-[0.06em] sm:text-[13px]">
                        {project.code}
                    </p>
                    <h3 className="text-[17px] font-bold sm:text-xl">
                        {project.title}
                    </h3>
                    {project.package && (
                        <p className="text-ink-subtle text-sm">
                            {project.package}
                        </p>
                    )}
                </div>
                <span
                    className={cn(
                        'flex h-7 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-xs font-bold sm:h-[30px] sm:gap-2 sm:px-3 sm:text-[13px]',
                        project.status === 'completed' && 'bg-ink text-paper',
                        project.status === 'cancelled' &&
                            'bg-paper-deep text-ink-muted',
                        isOpen && 'bg-shu-soft text-shu-deep',
                    )}
                >
                    {isOpen && <span className="bg-shu size-2 rounded-full" />}
                    {project.status_label}
                </span>
            </header>

            {project.status === 'cancelled' && (
                <p className="bg-paper-deep text-ink-muted rounded-xl px-4 py-3 text-sm leading-[1.6]">
                    Project ini dibatalkan. Hubungi kami lewat WhatsApp jika ada
                    pertanyaan.
                </p>
            )}

            <ol className="border-line flex flex-col gap-4 border-t pt-5 text-sm sm:gap-[18px] sm:pt-6 sm:text-[15px]">
                {project.timeline.map((step, index) => {
                    const state = states[index];

                    return (
                        <li
                            key={step.status}
                            className={cn(
                                'flex gap-3 sm:gap-4',
                                state === 'upcoming' && 'text-ink-subtle',
                            )}
                            aria-current={
                                state === 'current' ? 'step' : undefined
                            }
                        >
                            <StepMarker state={state} />
                            <div className="flex min-w-0 flex-1 flex-col gap-2.5">
                                <div className="flex justify-between gap-3">
                                    <span
                                        className={cn(
                                            state === 'done' && 'font-medium',
                                            state === 'current' &&
                                                'text-shu font-bold',
                                        )}
                                    >
                                        {step.label}
                                    </span>
                                    <span className="text-ink-subtle shrink-0">
                                        {state === 'current'
                                            ? 'Sedang dikerjakan'
                                            : step.reached_at}
                                    </span>
                                </div>
                                {state === 'current' && project.latest_note && (
                                    <Note note={project.latest_note} />
                                )}
                            </div>
                        </li>
                    );
                })}
            </ol>

            {!isOpen && project.latest_note && (
                <Note note={project.latest_note} />
            )}
        </article>
    );
}

function StepMarker({ state }: { state: StepState }) {
    if (state === 'done') {
        return (
            <span className="bg-ink text-paper mt-px flex size-[22px] shrink-0 items-center justify-center rounded-full sm:size-6">
                <Check className="size-3 sm:size-3.5" strokeWidth={3} />
            </span>
        );
    }

    if (state === 'current') {
        return (
            <span className="border-shu mt-px flex size-[22px] shrink-0 items-center justify-center rounded-full border-2 sm:size-6">
                <span className="bg-shu size-2.5 rounded-full" />
            </span>
        );
    }

    return (
        <span className="border-line-strong mt-px size-[22px] shrink-0 rounded-full border-2 sm:size-6" />
    );
}

function Note({ note }: { note: NonNullable<ProjectStatus['latest_note']> }) {
    return (
        <p className="bg-paper-deep text-ink-muted rounded-xl px-3.5 py-3 text-[13px] leading-[1.6] sm:text-sm">
            <span className="text-ink-soft font-medium">Catatan terbaru</span>
            {note.date && <span> · {note.date}</span>}
            <br />
            {note.comment}
        </p>
    );
}
