
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faTimes } from '@fortawesome/free-solid-svg-icons';

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: 'danger' | 'warning' | 'default';
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmModal({
    isOpen,
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    variant = 'default',
    onConfirm,
    onCancel,
}: ConfirmModalProps) {
    if (!isOpen) return null;

    const confirmBtnClass =
        variant === 'danger'
            ? 'flex-1 border border-red-700 bg-red-700 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-transparent hover:text-red-700 transition-all'
            : variant === 'warning'
                ? 'flex-1 border border-amber-600 bg-amber-600 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-transparent hover:text-amber-600 transition-all'
                : 'flex-1 border border-gray-900 bg-gray-900 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white transition-all';

    const iconColor =
        variant === 'danger'
            ? 'text-red-600 dark:text-red-400'
            : variant === 'warning'
                ? 'text-amber-500'
                : 'text-gray-900 dark:text-white';

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in duration-200">
            <div className="bg-[#fcfcfc] dark:bg-[#050505] border border-gray-200 dark:border-white/10 p-8 sm:p-12 max-w-md w-full shadow-2xl relative animate-in zoom-in-[0.97] duration-200">

                {/* Close X */}
                <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
                </button>

                {/* Icon */}
                <div className={`mb-6 flex items-center justify-center h-14 w-14 border border-gray-200 dark:border-white/10 ${iconColor}`}>
                    <FontAwesomeIcon icon={faExclamationTriangle} className="h-6 w-6" />
                </div>

                {/* Title */}
                <h3 className="font-cinzel text-xl text-gray-900 dark:text-white mb-3 uppercase tracking-widest">
                    {title}
                </h3>

                {/* Message */}
                <p className="text-sm font-light leading-relaxed tracking-wide text-gray-600 dark:text-gray-400 mb-10">
                    {message}
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={onCancel}
                        className="flex-1 border border-gray-300 dark:border-gray-700 py-3 text-xs font-semibold uppercase tracking-widest text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                        {cancelLabel}
                    </button>
                    <button onClick={onConfirm} className={confirmBtnClass}>
                        {confirmLabel}
                    </button>
                </div>

            </div>
        </div>
    );
}
