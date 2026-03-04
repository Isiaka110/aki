/**
 * VerifiedBadge
 * Renders the AKI verification badge using Flaticon Uicons:
 * - Light theme → fi-ss-badge-check (solid straight, filled)
 * - Dark theme  → fi-rr-badge-check (regular rounded, outlined)
 *
 * Usage:  <VerifiedBadge />
 *         <VerifiedBadge size="lg" className="mt-1" />
 */
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

type BadgeSize = 'sm' | 'md' | 'lg' | 'xl';

const SIZE_MAP: Record<BadgeSize, string> = {
    sm: 'text-sm',    // ~14px
    md: 'text-lg',    // ~18px  ← default
    lg: 'text-2xl',   // ~24px
    xl: 'text-4xl',   // ~36px
};

interface VerifiedBadgeProps {
    size?: BadgeSize;
    className?: string;
    title?: string;
}

export default function VerifiedBadge({
    size = 'md',
    className = '',
    title = 'AKI Verified Store',
}: VerifiedBadgeProps) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    // Avoid hydration mismatch — render nothing until theme resolves
    if (!mounted) return null;

    const isDark = resolvedTheme === 'dark';
    const iconClass = isDark ? 'fi fi-rr-badge-check' : 'fi fi-ss-badge-check';

    return (
        <i
            className={`${iconClass} ${SIZE_MAP[size]} leading-none text-emerald-500 ${className}`}
            title={title}
            aria-label={title}
            role="img"
        />
    );
}
