
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch, faEdit, faTrash, faTimes, faTags } from '@fortawesome/free-solid-svg-icons';

// Dummy category data
const initialCategories = [
  { id: "1", name: "Outerwear", description: "Jackets, coats, and hoodies.", productCount: 14, status: "Active" },
  { id: "2", name: "Accessories", description: "Watches, belts, and jewelry.", productCount: 8, status: "Active" },
  { id: "3", name: "Vintage Denim", description: "Pre-loved jeans and denim jackets.", productCount: 22, status: "Active" },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);

  interface Category {
    id: string;
    name: string;
    description: string;
    productCount: number;
    status: string;
  }

  // State to track if we are editing an existing category or adding a new one
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const openAddModal = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    // In a real app, you'd want a confirmation prompt here!
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-cinzel text-3xl font-medium tracking-wider text-gray-900 dark:text-white uppercase mb-2">Collections</h1>
          <p className="text-sm font-light tracking-wide text-gray-500">Curate and organize your products.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 border border-gray-900 bg-gray-900 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white"
        >
          <FontAwesomeIcon icon={faPlus}  className="h-4 w-4"  /> Add Collection
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-4 border border-gray-200 bg-transparent p-2 dark:border-white/10">
        <div className="relative flex-1">
          <FontAwesomeIcon icon={faSearch}  className="absolute left-4 top-3 h-4 w-4 text-gray-400"  />
          <input
            type="text"
            placeholder="Search collections..."
            className="w-full bg-transparent py-2.5 pl-12 pr-4 text-sm text-gray-900 focus:outline-none dark:text-white placeholder-gray-500 tracking-wide font-light"
          />
        </div>
      </div>

      {/* Categories Table */}
      <div className="border border-gray-200 bg-transparent dark:border-white/10">
        <div className="overflow-x-auto">
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
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-16 text-center text-gray-500">
                    <FontAwesomeIcon icon={faTags}  className="mx-auto mb-4 h-8 w-8 opacity-20"  />
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
                        <FontAwesomeIcon icon={faEdit}  className="h-4 w-4"  />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="p-2 text-gray-400 hover:text-red-900 dark:text-gray-500 dark:hover:text-red-500 transition-colors"
                      >
                        <FontAwesomeIcon icon={faTrash}  className="h-4 w-4"  />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                <FontAwesomeIcon icon={faTimes}  className="h-5 w-5"  />
              </button>
            </div>

            <div className="p-8">
              <form className="space-y-8">
                <div>
                  <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Collection Name</label>
                  <input
                    type="text"
                    defaultValue={editingCategory?.name || ""}
                    placeholder="E.g. Summer Archives"
                    className="w-full border-b border-gray-300 bg-transparent px-0 py-3 text-sm dark:border-gray-700 dark:text-white focus:border-gray-900 focus:outline-none focus:ring-0 dark:focus:border-white"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Narrative (Optional)</label>
                  <textarea
                    rows={3}
                    defaultValue={editingCategory?.description || ""}
                    placeholder="A brief description of this collection's theme..."
                    className="w-full border border-gray-300 bg-transparent px-4 py-3 text-sm dark:border-gray-700 dark:text-white focus:border-gray-900 focus:outline-none focus:ring-0 dark:focus:border-white resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="w-full sm:w-1/2 border border-gray-300 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-gray-500 hover:border-gray-900 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:border-white dark:hover:text-white transition-all">
                    Discard
                  </button>
                  <button type="button" className="w-full sm:w-1/2 border border-gray-900 bg-gray-900 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white text-center">
                    {editingCategory ? "Save" : "Create"}
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