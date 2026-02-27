"use client";

import { useState, useEffect } from "react";
import { Star, Send } from "lucide-react";
import { useCartStore } from "../../store/useCartStore";

export default function ClientFeedbackForm() {
    const { lastOrder } = useCartStore();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check if the user dropped a review today based on localStorage
        const lastReviewDate = localStorage.getItem("aki_last_review_date");
        if (lastReviewDate) {
            const today = new Date().toDateString();
            if (lastReviewDate === today) {
                setCanSubmit(false);
            }
        }
    }, []);

    if (!mounted) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!lastOrder) return;
        if (!canSubmit) return;

        // Save submission state
        localStorage.setItem("aki_last_review_date", new Date().toDateString());
        setSubmitted(true);
        setCanSubmit(false);
    };

    // User has to be verified (has an order)
    const isVerified = !!lastOrder;

    return (
        <div className="mx-auto max-w-3xl mt-16 border border-gray-200 dark:border-white/10 p-8 sm:p-12 bg-[#fcfcfc] dark:bg-[#050505] shadow-sm transition-colors">
            <div className="text-center mb-8">
                <h3 className="font-cinzel text-xl font-medium tracking-widest text-gray-900 dark:text-white uppercase mb-2">Submit Evaluation</h3>
                <p className="text-sm font-light tracking-wide text-gray-500">Provide feedback on your recent acquisition.</p>
            </div>

            {!isVerified ? (
                <div className="text-center py-8">
                    <p className="font-cinzel text-sm text-gray-900 dark:text-gray-400 uppercase tracking-widest">Verification Required</p>
                    <p className="text-xs font-light text-gray-500 mt-2">Only verified clients with prior acquisitions are eligible to submit feedback.</p>
                </div>
            ) : !canSubmit && !submitted ? (
                <div className="text-center py-8">
                    <p className="font-cinzel text-sm text-gray-900 dark:text-gray-400 uppercase tracking-widest">Rate Limit Reached</p>
                    <p className="text-xs font-light text-gray-500 mt-2">You have already submitted an evaluation today. Please return tomorrow.</p>
                </div>
            ) : submitted ? (
                <div className="text-center py-8 animate-in fade-in duration-500">
                    <p className="font-cinzel text-lg font-semibold text-gray-900 dark:text-white uppercase tracking-widest mb-2">Evaluation Received</p>
                    <p className="text-xs font-light text-gray-500">Thank you. Your feedback is under review by the Store Admin.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-8 animate-in fade-in duration-500">
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Product Rating</span>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    type="button"
                                    key={star}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="p-1 focus:outline-none transition-transform hover:scale-110"
                                >
                                    <Star
                                        className={`h-6 w-6 ${(hoverRating || rating) >= star ? "fill-gray-900 text-gray-900 dark:fill-white dark:text-white" : "fill-transparent text-gray-300 dark:text-gray-700"} transition-colors`}
                                        strokeWidth={1}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Your Experience</label>
                        <textarea
                            required
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Describe the fit, material, and your overall experience..."
                            className="w-full min-h-[120px] border border-gray-300 bg-transparent p-4 text-sm focus:border-gray-900 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-white transition-colors tracking-wide resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={rating === 0 || comment.trim() === ""}
                        className="flex items-center justify-center gap-2 border border-gray-900 bg-gray-900 py-4 text-xs font-semibold uppercase tracking-widest text-white hover:bg-transparent hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white transition-all duration-300"
                    >
                        Submit Feedback <Send className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                </form>
            )}
        </div>
    );
}
