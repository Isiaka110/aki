
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch, faEdit, faTrash, faTimes, faTags, faSync } from '@fortawesome/free-solid-svg-icons';
import { apiGetCategories, apiCreateCategory, apiUpdateCategory, apiDeleteCategory, apiGetStoreAdminOverview } from "../../../services/api";
import ConfirmationModal from "../../../components/ConfirmationModal";
import Tooltip from "../../../components/Tooltip";

export default function CategoriesPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("Pending");
  const [isLockedModalOpen, setIsLockedModalOpen] = useState(false);

  interface Category {
    id: string;
    name: string;
    description: string;
    productCount: number;
    status: string;
  }

  // State to track if we are editing an existing category or adding a new one
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const [data, overviewData] = await Promise.all([
        apiGetCategories().catch(() => []),
        apiGetStoreAdminOverview().catch(() => null)
      ]);
      setCategories(data || []);
      if (overviewData) {
        setVerificationStatus(overviewData.verificationStatus);
      }
    } catch (error) {
      console.error("Failed to load categories/overview", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openAddModal = () => {
    if (verificationStatus !== "Verified") {
      setIsLockedModalOpen(true);
      return;
    }
    setEditingCategory(null);
    setName("");
    setDescription("");
    setIsModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setName(category.name);
    setDescription(category.description || "");
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!pendingDeleteId) return;
    try {
      await apiDeleteCategory(pendingDeleteId);
      setCategories(categories.filter(cat => cat.id !== pendingDeleteId));
    } catch (error) {
      console.error("Failed to delete category", error);
    } finally {
      setPendingDeleteId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      if (editingCategory) {
        const updated = await apiUpdateCategory(editingCategory.id, { name, description });
        setCategories(categories.map(cat => cat.id === updated.id ? updated : cat));
      } else {
        const created = await apiCreateCategory({ name, description });
        setCategories([created, ...categories]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save category", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

      <ConfirmationModal
        isOpen={!!pendingDeleteId}
        title="Dismantle Collection?"
        message="You are about to disassemble this curation collection. While the pieces themselves will remain in your atelier, they will no longer be grouped under this narrative. Proceed?"
        confirmLabel="Confirm Dismantle"
        cancelLabel="Maintain Collection"
        type="danger"
        onConfirm={handleDeleteConfirm}
        onClose={() => setPendingDeleteId(null)}
      />

      {/* Verification Lock Modal */}
      {isLockedModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-sm border border-orange-500/30 bg-[#fcfcfc] dark:bg-[#050505] p-8 shadow-2xl animate-in zoom-in-95 duration-300 text-center">
            <div className="mb-4 flex items-center justify-center">
              <span className="inline-flex items-center justify-center h-14 w-14 border border-orange-500/30 bg-orange-50 dark:bg-orange-950/20">
                <svg className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </span>
            </div>
            <h3 className="font-cinzel text-xl font-medium tracking-widest text-orange-600 dark:text-orange-500 uppercase mb-3">Verification Required</h3>
            <p className="text-xs font-light tracking-wide text-gray-500 leading-relaxed mb-8">
              Collection creation is locked until your identity is verified by a Super Admin. Submit your NIN or Driver's License to begin the 24-hour review process.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => { setIsLockedModalOpen(false); navigate('/store-admin'); }}
                className="border border-gray-900 bg-gray-900 py-3 px-8 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white transition-colors"
              >
                Go to Dashboard &amp; Verify
              </button>
              <button onClick={() => setIsLockedModalOpen(false)} className="border border-orange-500 py-3 px-8 text-[10px] font-bold uppercase tracking-widest text-orange-600 dark:text-orange-500 hover:bg-orange-500 hover:text-white transition-colors">
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-cinzel text-3xl font-medium tracking-wider text-gray-900 dark:text-white uppercase mb-2">Collections</h1>
          <p className="text-sm font-light tracking-wide text-gray-500">Curate and organize your products.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 border border-gray-900 bg-gray-900 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white"
          >
            <FontAwesomeIcon icon={faPlus} className="h-4 w-4" /> Add Collection
          </button>
          <Tooltip
            text="Create a new product collection. Collections help buyers browse similar items together. Requires verified account."
            position="left"
          />
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-4 border border-gray-200 bg-transparent p-2 dark:border-white/10">
        <div className="relative flex-1">
          <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search collections..."
            className="w-full bg-transparent py-2.5 pl-12 pr-4 text-sm text-gray-900 focus:outline-none dark:text-white placeholder-gray-500 tracking-wide font-light"
          />
        </div>
      </div>

      {/* Categories Table */}
      <div className="border border-gray-200 bg-transparent dark:border-white/10">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-100 bg-gray-50/50 dark:border-white/5 dark:bg-white/5">
              <tr>
                <th className="px-8 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500">Collection Name</th>
                <th className="px-8 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500">Description</th>
                <th className="px-8 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500">Pieces</th>
                <th className="px-8 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5 font-light tracking-wide text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-gray-500 uppercase tracking-widest text-[10px]">
                    <FontAwesomeIcon icon={faSync} className="h-4 w-4 mx-auto animate-spin mb-2" /> Loading collections...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-16 text-center text-gray-500">
                    <FontAwesomeIcon icon={faTags} className="mx-auto mb-4 h-8 w-8 opacity-20" />
                    <p className="tracking-widest uppercase text-xs">No collections found. Create one to organize your store.</p>
                  </td>
                </tr>
              ) : categories.map((category) => (
                <tr key={category.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-white/5">
                  <td className="px-8 py-6 font-cinzel text-gray-900 dark:text-white uppercase tracking-wider">{category.name}</td>
                  <td className="px-8 py-6 text-gray-500 max-w-xs truncate">{category.description}</td>
                  <td className="px-8 py-6">
                    <span className="inline-flex items-center border border-gray-200 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-600 dark:border-white/20 dark:text-gray-400">
                      {category.productCount} pieces
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => openEditModal(category)}
                        className="p-2 text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white transition-colors"
                      >
                        <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setPendingDeleteId(category.id)}
                        className="p-2 text-gray-400 hover:text-red-900 dark:text-gray-500 dark:hover:text-red-500 transition-colors"
                      >
                        <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Cards */}
        <div className="md:hidden flex flex-col divide-y divide-gray-100 dark:divide-white/5">
          {isLoading ? (
            <div className="p-12 text-center text-gray-500 uppercase tracking-widest text-[10px]">
              <FontAwesomeIcon icon={faSync} className="h-4 w-4 mx-auto animate-spin mb-2" /> Loading collections...
            </div>
          ) : categories.length === 0 ? (
            <div className="p-12 text-center text-gray-500 uppercase tracking-widest text-[10px]">
              <FontAwesomeIcon icon={faTags} className="mx-auto mb-4 h-8 w-8 opacity-20" />
              <p>No collections found. Create one to organize your store.</p>
            </div>
          ) : categories.map((category) => (
            <div key={category.id} className="p-6 transition-colors hover:bg-gray-50 dark:hover:bg-white/5 flex flex-col gap-4">
              <div>
                <h3 className="font-cinzel text-gray-900 dark:text-white uppercase tracking-wider mb-1">{category.name}</h3>
                <p className="text-sm font-light text-gray-500 max-w-xs">{category.description}</p>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/5 pt-4">
                <span className="inline-flex items-center border border-gray-200 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-600 dark:border-white/20 dark:text-gray-400">
                  {category.productCount} pieces
                </span>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => openEditModal(category)}
                    className="p-2 text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white transition-colors"
                  >
                    <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setPendingDeleteId(category.id)}
                    className="p-2 text-gray-400 hover:text-red-900 dark:text-gray-500 dark:hover:text-red-500 transition-colors"
                  >
                    <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-500">
          <div className="w-full max-w-md overflow-hidden bg-[#fcfcfc] dark:bg-[#050505] shadow-2xl animate-in zoom-in-[0.98] duration-500 border border-gray-200 dark:border-white/10">

            <div className="flex items-center justify-between border-b border-gray-200 px-8 py-6 dark:border-white/10">
              <h2 className="font-cinzel text-lg font-medium tracking-[0.2em] text-gray-900 dark:text-white uppercase">
                {editingCategory ? "Edit Collection" : "New Collection"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
              </button>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Collection Name
                    <Tooltip text="A short, memorable name for this product group. E.g. 'Summer Essentials' or 'Luxury Watches'." />
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g. Summer Archives"
                    className="w-full border-b border-gray-300 bg-transparent px-0 py-3 text-sm dark:border-gray-700 dark:text-white focus:border-gray-900 focus:outline-none focus:ring-0 dark:focus:border-white"
                  />
                </div>

                <div>
                  <label className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Narrative (Optional)
                    <Tooltip text="A brief description of the collection's theme or style. Helps buyers understand what to expect from this collection." />
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="A brief description of this collection's theme..."
                    className="w-full border border-gray-300 bg-transparent px-4 py-3 text-sm dark:border-gray-700 dark:text-white focus:border-gray-900 focus:outline-none focus:ring-0 dark:focus:border-white resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="w-full sm:w-1/2 border border-gray-300 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-gray-500 hover:border-gray-900 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:border-white dark:hover:text-white transition-all">
                    Discard
                  </button>
                  <button type="submit" disabled={isSubmitting} className="w-full sm:w-1/2 border border-gray-900 bg-gray-900 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white text-center disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? "Saving..." : editingCategory ? "Save Modifications" : "Create Collection"}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}