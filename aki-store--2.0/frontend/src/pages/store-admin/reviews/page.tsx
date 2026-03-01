
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCheckCircle, faTimesCircle, faComment, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useAuthStore } from '../../../store/useAuthStore';
import { apiGetReviews, apiUpdateReviewStatus } from "../../../services/api";

// Reviews moderation page for store administrators.

export default function ReviewsPage() {
  const { user } = useAuthStore();
  const storeName = user?.storeName || 'Your Boutique';

  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Pending", "Approved", "Rejected"];

  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await apiGetReviews();
      setReviews(data);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthorize = async (id: string) => {
    try {
      await apiUpdateReviewStatus(id, "Approved");
      setReviews(prev => prev.map(r => (r._id === id || r.id === id) ? { ...r, status: "Approved" } : r));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecline = async (id: string) => {
    try {
      await apiUpdateReviewStatus(id, "Rejected");
      setReviews(prev => prev.map(r => (r._id === id || r.id === id) ? { ...r, status: "Rejected" } : r));
    } catch (err) {
      console.error(err);
    }
  };

  const pendingCount = reviews.filter(r => r.status === "Pending").length;
  const approvedCount = reviews.filter(r => r.status === "Approved").length;
  const avgRating = approvedCount > 0
    ? (reviews.filter(r => r.status === "Approved").reduce((sum, r) => sum + r.rating, 0) / approvedCount).toFixed(1)
    : "0.0";

  // Render stars helper
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <FontAwesomeIcon icon={faStar}
            key={i}
            className={`h-3 w-3 ${i < rating ? "fill-gray-900 text-gray-900 dark:fill-white dark:text-white" : "fill-transparent text-gray-300 dark:text-gray-700"}`}

          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Page Header & Stats Summary */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="font-cinzel text-3xl font-medium tracking-wider text-gray-900 dark:text-white uppercase mb-2">Evaluations: {storeName}</h1>
          <p className="text-sm font-light tracking-wide text-gray-500">Moderate client feedback prior to storefront publication.</p>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-4">
          <div className="flex items-center gap-4 border border-gray-200 bg-transparent px-6 py-4 dark:border-white/10">
            <div className="flex h-10 w-10 items-center justify-center border border-gray-900 text-gray-900 dark:border-white dark:text-white">
              <FontAwesomeIcon icon={faStar} className="h-4 w-4 fill-current" />
            </div>
            <div>
              <p className="text-[9px] font-semibold text-gray-500 uppercase tracking-[0.2em]">Avg Rating</p>
              <p className="font-cinzel text-xl text-gray-900 dark:text-white tracking-widest mt-1">{avgRating} <span className="text-xs font-light text-gray-500 font-sans tracking-wide">/ 5.0</span></p>
            </div>
          </div>
          <div className="flex items-center gap-4 border border-gray-200 bg-transparent px-6 py-4 dark:border-white/10">
            <div className="flex h-10 w-10 items-center justify-center border border-gray-900 text-gray-900 dark:border-white dark:text-white">
              <FontAwesomeIcon icon={faComment} className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[9px] font-semibold text-gray-500 uppercase tracking-[0.2em]">Pending</p>
              <p className="font-cinzel text-xl text-gray-900 dark:text-white tracking-widest mt-1">{pendingCount} <span className="text-xs font-light text-gray-500 font-sans tracking-wide">Reviews</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`border px-6 py-2.5 text-[10px] font-semibold uppercase tracking-widest transition-all ${activeTab === tab
              ? "border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-black"
              : "border-gray-200 bg-transparent text-gray-500 hover:border-gray-400 dark:border-white/10 dark:text-gray-400 dark:hover:border-white/40"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="flex flex-col gap-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <FontAwesomeIcon icon={faSpinner} className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-gray-200 dark:border-white/10">
            <p className="font-cinzel text-sm text-gray-500 uppercase tracking-widest">No evaluations found in this category.</p>
          </div>
        ) : reviews.filter(r => activeTab === "All" || r.status === activeTab).map((review) => (
          <div key={review._id || review.id} className="flex flex-col justify-between gap-6 border border-gray-200 bg-transparent p-8 transition-colors hover:border-gray-300 dark:border-white/10 dark:hover:border-white/20 sm:flex-row sm:items-start group">

            {/* Review Content */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between sm:justify-start sm:gap-6">
                {renderStars(review.rating)}
                <span className={`inline-flex items-center gap-1 border px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em]
                  ${review.status === 'Pending' ? 'border-gray-300 text-gray-500 dark:border-gray-600 dark:text-gray-400' : ''}
                  ${review.status === 'Approved' ? 'border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-black' : ''}
                  ${review.status === 'Rejected' ? 'border-gray-300 text-gray-400 line-through dark:border-gray-800 dark:text-gray-600' : ''}
                `}>
                  {review.status}
                </span>
              </div>

              <p className="font-cinzel text-lg tracking-wide text-gray-900 dark:text-white max-w-3xl leading-relaxed italic">
                &quot;{review.comment}&quot;
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-light text-gray-500 tracking-wide uppercase">
                <span className="font-semibold text-gray-900 dark:text-white tracking-widest">{review.customerName}</span>
                <span className="text-gray-300 dark:text-gray-700">|</span>
                <span>{review.date ? new Date(review.date).toLocaleDateString() : 'Recent'}</span>
                <span className="text-gray-300 dark:text-gray-700">|</span>
                <span>Piece: <span className="font-medium text-gray-700 dark:text-gray-300">{review.productName}</span></span>
              </div>
            </div>

            {/* Moderation Actions (Only show for Pending) */}
            {review.status === "Pending" && (
              <div className="flex w-full shrink-0 flex-row gap-3 sm:w-auto sm:flex-col opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleAuthorize(review._id || review.id)}
                  className="flex flex-1 items-center justify-center gap-2 border border-gray-900 bg-gray-900 px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white cursor-pointer"
                >
                  <FontAwesomeIcon icon={faCheckCircle} className="h-3 w-3" /> Authorize
                </button>
                <button
                  onClick={() => handleDecline(review._id || review.id)}
                  className="flex flex-1 items-center justify-center gap-2 border border-gray-300 bg-transparent px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 hover:border-gray-900 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:border-white dark:hover:text-white transition-all cursor-pointer"
                >
                  <FontAwesomeIcon icon={faTimesCircle} className="h-3 w-3" /> Decline
                </button>
              </div>
            )}

            {/* Info for already moderated reviews */}
            {review.status !== "Pending" && (
              <div className="flex shrink-0 items-center sm:h-full">
                <p className="text-[9px] tracking-[0.2em] uppercase text-gray-400">Processed {review.updatedAt ? new Date(review.updatedAt).toLocaleDateString() : 'Now'}</p>
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
}