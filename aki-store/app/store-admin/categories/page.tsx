"use client";

import { useState } from "react";
import { Plus, Search, Edit, Trash2, X, Tags } from "lucide-react";

// Dummy category data
const initialCategories = [
  { id: "1", name: "Outerwear", description: "Jackets, coats, and hoodies.", productCount: 14, status: "Active" },
  { id: "2", name: "Accessories", description: "Watches, belts, and jewelry.", productCount: 8, status: "Active" },
  { id: "3", name: "Vintage Denim", description: "Pre-loved jeans and denim jackets.", productCount: 22, status: "Active" },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State to track if we are editing an existing category or adding a new one
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const openAddModal = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const openEditModal = (category: any) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    // In a real app, you'd want a confirmation prompt here!
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Categories</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Organize your products to help shoppers find what they need.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          <Plus className="h-4 w-4" /> Add Category
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-gray-900">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search categories..." 
            className="w-full rounded-lg bg-transparent py-2 pl-10 pr-4 text-sm text-gray-900 focus:outline-none dark:text-white placeholder-gray-500"
          />
        </div>
      </div>

      {/* Categories Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-gray-500 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4 font-medium">Category Name</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium">Products</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {categories.length === 0 ? (
                 <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                       <Tags className="mx-auto mb-3 h-8 w-8 opacity-20" />
                       No categories found. Create one to organize your store!
                    </td>
                 </tr>
              ) : categories.map((category) => (
                <tr key={category.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{category.name}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400 max-w-xs truncate">{category.description}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-bold text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                      {category.productCount} items
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => openEditModal(category)}
                        className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(category.id)}
                        className="p-2 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-950 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {editingCategory ? "Edit Category" : "Add New Category"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-bold text-gray-700 dark:text-gray-300">Category Name</label>
                  <input 
                    type="text" 
                    defaultValue={editingCategory?.name || ""}
                    placeholder="e.g. Summer Collection" 
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-black focus:ring-1 focus:ring-black" 
                  />
                </div>
                
                <div>
                  <label className="mb-1 block text-sm font-bold text-gray-700 dark:text-gray-300">Description (Optional)</label>
                  <textarea 
                    rows={3} 
                    defaultValue={editingCategory?.description || ""}
                    placeholder="A brief description of what belongs in this category..." 
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-black focus:ring-1 focus:ring-black" 
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors">
                    Cancel
                  </button>
                  <button type="button" className="rounded-lg bg-black px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                    {editingCategory ? "Save Changes" : "Create Category"}
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