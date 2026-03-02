
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faTimes } from '@fortawesome/free-solid-svg-icons';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    type?: 'danger' | 'warning' | 'info';
}

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmLabel = 'Confirm Action',
    cancelLabel = 'Cancel',
    type = 'danger'
}: ConfirmationModalProps) {
    if (!isOpen) return null;

    const accentColor = type === 'danger' ? 'border-red-500 text-red-500' :
        type === 'warning' ? 'border-amber-500 text-amber-500' :
            'border-gray-900 text-gray-900 dark:border-white dark:text-white';

    const buttonBg = type === 'danger' ? 'bg-red-600 hover:bg-red-700' :
        type === 'warning' ? 'bg-amber-600 hover:bg-amber-700' :
            'bg-gray-900 dark:bg-white dark:text-black';

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

            {/* Modal Card */}
            <div className="relative w-full max-w-md bg-[#fcfcfc] dark:bg-[#0b0b0b] border border-gray-200 dark:border-white/10 shadow-2xl animate-in zoom-in-95 duration-200">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
                </button>

                <div className="p-8">
                    {/* Icon & Title */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-none border-2 ${accentColor}`}>
                            <FontAwesomeIcon icon={faExclamationTriangle} className="h-5 w-5" />
                        </div>
                        <h3 className="font-cinzel text-xl font-medium tracking-widest text-gray-900 dark:text-white uppercase">
                            {title}
                        </h3>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                        <p className="text-sm font-light tracking-wide text-gray-600 dark:text-gray-400 leading-relaxed">
                            {message}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="mt-10 flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={onConfirm}
                            className={`flex-1 px-6 py-4 text-[10px] font-bold tracking-[0.3em] text-white uppercase transition-all duration-300 ${buttonBg} border border-transparent`}
                        >
                            {confirmLabel}
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-4 text-[10px] font-bold tracking-[0.3em] text-gray-900 dark:text-white uppercase transition-all duration-300 border border-gray-200 dark:border-white/10 hover:border-gray-900 dark:hover:border-white"
                        >
                            {cancelLabel}
                        </button>
                    </div>
                </div>

                {/* Decorative bottom bar */}
                <div className={`h-1 w-full ${type === 'danger' ? 'bg-red-600' : type === 'warning' ? 'bg-amber-600' : 'bg-gray-900 dark:bg-white'}`} />
            </div>
        </div>
    );
}
