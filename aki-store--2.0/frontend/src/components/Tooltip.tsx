import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

interface TooltipProps {
    text: string;
    position?: "top" | "bottom" | "left" | "right";
}

export default function Tooltip({ text, position = "top" }: TooltipProps) {
    const [visible, setVisible] = useState(false);

    const positionClasses: Record<string, string> = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
    };

    return (
        <span
            className="relative inline-flex items-center"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            onFocus={() => setVisible(true)}
            onBlur={() => setVisible(false)}
        >
            <button
                type="button"
                tabIndex={0}
                className="text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors focus:outline-none"
                aria-label="More information"
            >
                <FontAwesomeIcon icon={faCircleInfo} className="h-3 w-3" />
            </button>

            {visible && (
                <span
                    className={`absolute z-[200] w-56 pointer-events-none ${positionClasses[position]}`}
                >
                    <span className="block border border-gray-200 bg-white dark:bg-[#111] dark:border-white/10 px-4 py-3 text-[10px] leading-relaxed tracking-wide text-gray-600 dark:text-gray-300 shadow-xl">
                        {text}
                    </span>
                </span>
            )}
        </span>
    );
}
