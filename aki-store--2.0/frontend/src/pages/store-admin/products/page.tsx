
import { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faTimes, faIcons, faTruck, faCheck } from '@fortawesome/free-solid-svg-icons';

type Product = {
  id: string;
  title: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  images: string[];
};

import { apiGetProducts, apiGetCategories, apiCreateProduct, apiUpdateProduct, apiDeleteProduct } from "../../../services/api";

export default function ProductsPage() {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("info"); // Tabs: info, media, pricing, delivery
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [viewedProduct, setViewedProduct] = useState<any | null>(null);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    images: [] as string[],
    status: "Active"
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [prodsData, catsData] = await Promise.all([
        apiGetProducts(),
        apiGetCategories().catch(() => []) // fallback if fails
      ]);
      setProducts(prodsData || []);
      setCategories(catsData || []);
    } catch (error) {
      console.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddBuilder = () => {
    setFormData({ title: "", category: categories.length > 0 ? categories[0].name : "", description: "", price: "", stock: "", images: [], status: "Active" });
    setEditingProduct(null);
    setActiveTab("info");
    setIsBuilderOpen(true);
  };

  const openEditBuilder = (product: any) => {
    setFormData({
      title: product.title,
      category: product.category,
      description: product.description || "",
      price: product.price.toString(),
      stock: product.stock.toString(),
      images: product.images || [],
      status: product.status
    });
    setEditingProduct(product);
    setActiveTab("info");
    setViewedProduct(null);
    setIsBuilderOpen(true);
  };

  const handleDelete = async (productId: string) => {
    try {
      await apiDeleteProduct(productId);
      setProducts(products.filter(p => p.productId !== productId));
      if (viewedProduct?.productId === productId) setViewedProduct(null);
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.category || !formData.price || !formData.stock) return;
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock)
      };

      if (editingProduct) {
        const updated = await apiUpdateProduct(editingProduct.productId, payload);
        setProducts(products.map(p => p.productId === updated.productId ? updated : p));
      } else {
        const created = await apiCreateProduct(payload);
        setProducts([created, ...products]);
      }
      setIsBuilderOpen(false);
    } catch (error) {
      console.error("Failed to save product", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* --- PAGE HEADER & TABLE --- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-cinzel text-3xl font-medium tracking-wider text-gray-900 dark:text-white uppercase mb-2">Curated Products</h1>
          <p className="text-sm font-light tracking-wide text-gray-500">The definitive source for your atelier collection.</p>
        </div>
        <button
          onClick={openAddBuilder}
          className="flex items-center justify-center gap-2 border border-gray-900 bg-gray-900 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white"
        >
          <FontAwesomeIcon icon={faPlus} className="h-4 w-4" /> Add Piece
        </button>
      </div>

      <div className="border border-gray-200 bg-transparent dark:border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-100 bg-gray-50/50 dark:border-white/5 dark:bg-white/5">
              <tr>
                <th className="px-8 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500">Piece</th>
                <th className="px-8 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500">Collection</th>
                <th className="px-8 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500">Value</th>
                <th className="px-8 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500">Inventory</th>
                <th className="px-8 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500">Status</th>
                <th className="px-8 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5 font-light tracking-wide text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-gray-500 uppercase tracking-widest text-[10px]">
                    Loading products...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-gray-500 uppercase tracking-widest text-[10px]">
                    No products found.
                  </td>
                </tr>
              ) : products.map((product) => (
                <tr
                  key={product.productId}
                  onClick={() => setViewedProduct(product)}
                  className="transition-colors hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-6">
                      <div className="relative h-16 w-12 shrink-0 overflow-hidden bg-gray-50 dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-white/10">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt={product.title} className="object-cover w-full h-full" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
                            <FontAwesomeIcon icon={faIcons} className="text-gray-300 dark:text-gray-600" />
                          </div>
                        )}
                      </div>
                      <span className="font-cinzel text-gray-900 dark:text-white uppercase tracking-wider">{product.title}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-gray-600 dark:text-gray-300">{product.category}</td>
                  <td className="px-8 py-5 font-cinzel text-gray-900 dark:text-white tracking-widest">${product.price.toFixed(2)}</td>
                  <td className="px-8 py-5 text-gray-500">{product.stock}</td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center border px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em]
                       ${product.status === 'Active' ? 'border-gray-900 text-gray-900 dark:border-white dark:text-white' : 'border-gray-300 text-gray-500 dark:border-gray-700 dark:text-gray-400'}
                    `}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right relative">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); setViewedProduct(product); }}
                        className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        <FontAwesomeIcon icon={faIcons} className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); openEditBuilder(product); }}
                        className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(product.productId); }}
                        className="p-2 text-gray-400 hover:text-red-900 dark:hover:text-red-500 transition-colors"
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
      </div>

      {/* --- PRODUCT DETAILS DRAWER --- */}
      <>
        {/* Backdrop */}
        {viewedProduct && (
          <div
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
            onClick={() => setViewedProduct(null)}
          />
        )}

        {/* Sliding Panel */}
        <div
          className={`fixed inset-y-0 right-0 z-[70] w-full sm:w-[500px] border-l border-gray-200 bg-[#fcfcfc] dark:border-white/10 dark:bg-[#050505] shadow-2xl transition-transform duration-500 ease-in-out flex flex-col ${viewedProduct ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {viewedProduct && (
            <>
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 p-6 sm:p-8 shrink-0">
                <div>
                  <h2 className="font-cinzel text-xl font-medium tracking-widest text-gray-900 dark:text-white uppercase mb-1">
                    {viewedProduct.title}
                  </h2>
                  <p className="text-xs font-light tracking-wide text-gray-500 uppercase">
                    {viewedProduct.category}
                  </p>
                </div>
                <button
                  onClick={() => setViewedProduct(null)}
                  className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 space-y-10">

                {/* Image Gallery */}
                <div>
                  <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 mb-4 border-b border-gray-200 dark:border-white/10 pb-2">Visual Media</h3>
                  <div className="flex items-start gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
                    {viewedProduct.images.map((imgUrl, idx) => (
                      <div key={idx} className="relative h-64 w-48 shrink-0 snap-center overflow-hidden bg-gray-50 dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-white/10">
                        <img src={imgUrl} alt={`${viewedProduct.title} view ${idx + 1}`} className="object-cover w-full h-full" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 mb-4 border-b border-gray-200 dark:border-white/10 pb-2">Valuation</h3>
                    <div className="font-cinzel text-xl text-gray-900 dark:text-white tracking-widest">${viewedProduct.price.toFixed(2)}</div>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 mb-4 border-b border-gray-200 dark:border-white/10 pb-2">Inventory</h3>
                    <div className="text-lg text-gray-900 dark:text-white">{viewedProduct.stock} Units</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 mb-4 border-b border-gray-200 dark:border-white/10 pb-2">Status</h3>
                  <span className="inline-flex items-center border border-gray-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-900 dark:border-white dark:text-white">
                    {viewedProduct.status}
                  </span>
                </div>

              </div>

              <div className="border-t border-gray-200 dark:border-white/10 p-6 sm:p-8 shrink-0 flex gap-4">
                <button onClick={() => openEditBuilder(viewedProduct)} className="flex-1 border border-gray-300 px-4 py-3 text-xs font-semibold uppercase tracking-widest text-gray-500 hover:border-gray-900 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:border-white dark:hover:text-white transition-all">
                  Edit Piece
                </button>
                <button onClick={() => handleDelete(viewedProduct.productId)} className="flex-1 border border-gray-900 bg-gray-900 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white">
                  Delete
                </button>
              </div>

            </>
          )}
        </div>
      </>

      {/* --- THE NEW ADVANCED PRODUCT BUILDER --- */}
      {isBuilderOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-500">
          <div className="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden bg-[#fcfcfc] dark:bg-[#050505] shadow-2xl animate-in zoom-in-[0.98] duration-500 border border-gray-200 dark:border-white/10">

            {/* Builder Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-8 py-6 dark:border-white/10">
              <h2 className="font-cinzel text-xl font-medium tracking-[0.2em] text-gray-900 dark:text-white uppercase">Create New Piece</h2>
              <button onClick={() => setIsBuilderOpen(false)} className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">

              {/* Left Sidebar: Tabs */}
              <div className="w-full md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-gray-200 bg-transparent p-6 dark:border-white/10">
                <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto custom-scrollbar">
                  <button onClick={() => setActiveTab("info")} className={`flex items-center gap-4 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] transition-all whitespace-nowrap min-w-max md:min-w-0 md:border-l-2 ${activeTab === "info" ? "border-gray-900 bg-gray-50 text-gray-900 dark:border-white dark:bg-white/5 dark:text-white" : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:border-white/10 dark:hover:text-white"}`}>
                    <FontAwesomeIcon icon={faIcons} className="h-4 w-4 hidden md:block" /> Basic Info
                  </button>
                  <button onClick={() => setActiveTab("media")} className={`flex items-center gap-4 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] transition-all whitespace-nowrap min-w-max md:min-w-0 md:border-l-2 ${activeTab === "media" ? "border-gray-900 bg-gray-50 text-gray-900 dark:border-white dark:bg-white/5 dark:text-white" : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:border-white/10 dark:hover:text-white"}`}>
                    <FontAwesomeIcon icon={faIcons} className="h-4 w-4 hidden md:block" /> Visual Media
                  </button>
                  <button onClick={() => setActiveTab("pricing")} className={`flex items-center gap-4 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] transition-all whitespace-nowrap min-w-max md:min-w-0 md:border-l-2 ${activeTab === "pricing" ? "border-gray-900 bg-gray-50 text-gray-900 dark:border-white dark:bg-white/5 dark:text-white" : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:border-white/10 dark:hover:text-white"}`}>
                    <FontAwesomeIcon icon={faIcons} className="h-4 w-4 hidden md:block" /> Valuation
                  </button>
                  <button onClick={() => setActiveTab("delivery")} className={`flex items-center gap-4 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] transition-all whitespace-nowrap min-w-max md:min-w-0 md:border-l-2 ${activeTab === "delivery" ? "border-gray-900 bg-gray-50 text-gray-900 dark:border-white dark:bg-white/5 dark:text-white" : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:border-white/10 dark:hover:text-white"}`}>
                    <FontAwesomeIcon icon={faTruck} className="h-4 w-4 hidden md:block" /> Logistics
                  </button>
                </nav>
              </div>

              {/* Right Side: Tab Content */}
              <div className="flex-1 overflow-y-auto p-8 lg:p-12 custom-scrollbar">
                <form className="mx-auto max-w-2xl space-y-10">

                  {/* TAB 1: BASIC INFO */}
                  {activeTab === "info" && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                      <div>
                        <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Title of Piece</label>
                        <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="E.g. Vintage Leather Jacket" className="w-full border-b border-gray-300 bg-transparent px-0 py-3 text-sm dark:border-gray-700 dark:text-white focus:border-gray-900 focus:outline-none focus:ring-0 dark:focus:border-white" />
                      </div>
                      <div>
                        <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Collection</label>
                        <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full border-b border-gray-300 bg-transparent px-0 py-3 text-sm dark:border-gray-700 dark:text-white focus:border-gray-900 focus:outline-none focus:ring-0 dark:focus:border-white appearance-none">
                          <option value="">Select Collection...</option>
                          {categories.map(c => (
                            <option key={c.id} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Description</label>
                        <textarea rows={5} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Describe the materials, provenance, and style..." className="w-full border border-gray-300 bg-transparent px-4 py-3 text-sm dark:border-gray-700 dark:text-white focus:border-gray-900 focus:outline-none focus:ring-0 dark:focus:border-white resize-none" />
                      </div>
                    </div>
                  )}

                  {/* TAB 2: MEDIA (2-4 Image Slider) */}
                  {activeTab === "media" && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                      <div className="border border-gray-200 bg-transparent p-6 dark:border-white/10">
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-900 dark:text-white mb-2">Notice</span>
                        <p className="text-xs font-light tracking-wide text-gray-500">Upload multiple variations to showcase different angles. Maintain 4:5 ratios.</p>
                      </div>

                      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-transparent py-20 transition-colors hover:border-gray-900 dark:border-gray-700 dark:hover:border-white cursor-pointer group">
                        <FontAwesomeIcon icon={faIcons} className="mb-6 h-8 w-8 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Select Assets</p>
                      </div>

                      {/* Mockup of uploaded images */}
                      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                        <div className="flex aspect-[4/5] items-center justify-center border border-gray-900 bg-gray-50 text-[9px] font-semibold uppercase tracking-widest dark:border-white dark:bg-gray-900 text-center">Primary Image</div>
                        <div className="flex aspect-[4/5] items-center justify-center border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950/50"></div>
                        <div className="flex aspect-[4/5] items-center justify-center border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950/50"></div>
                        <div className="flex aspect-[4/5] items-center justify-center border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950/50"></div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: PRICING, DISCOUNTS & PROMO CODES */}
                  {activeTab === "pricing" && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                          <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Valuation (USD)</label>
                          <input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} placeholder="0.00" className="font-cinzel tracking-widest w-full border-b border-gray-300 bg-transparent px-0 py-3 text-lg dark:border-gray-700 dark:text-white focus:border-gray-900 focus:outline-none focus:ring-0 dark:focus:border-white" />
                        </div>
                        <div>
                          <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Inventory Allocation</label>
                          <input type="number" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} placeholder="0" className="font-cinzel tracking-widest w-full border-b border-gray-300 bg-transparent px-0 py-3 text-lg dark:border-gray-700 dark:text-white focus:border-gray-900 focus:outline-none focus:ring-0 dark:focus:border-white" />
                        </div>
                      </div>

                      <hr className="border-gray-200 dark:border-white/10" />

                      <div>
                        <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Archived Price (Optional)</label>
                        <p className="mb-4 text-xs font-light text-gray-500">Provides context for current valuation.</p>
                        <input type="number" placeholder="0.00" className="font-cinzel tracking-widest w-full border-b border-gray-300 bg-transparent px-0 py-3 text-lg dark:border-gray-700 dark:text-white focus:border-gray-900 focus:outline-none focus:ring-0 dark:focus:border-white" />
                      </div>

                      <div className="border border-gray-200 bg-transparent p-6 dark:border-white/10">
                        <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Privilege Access Code</label>
                        <div className="flex flex-col sm:flex-row gap-4 mt-4">
                          <input type="text" placeholder="CODE" className="w-full border-b border-gray-300 bg-transparent px-0 py-3 text-sm uppercase dark:border-gray-700 dark:text-white focus:border-gray-900 focus:outline-none focus:ring-0 dark:focus:border-white" />
                          <input type="number" placeholder="Rate %" className="w-full sm:w-32 border-b border-gray-300 bg-transparent px-0 py-3 text-sm dark:border-gray-700 dark:text-white focus:border-gray-900 focus:outline-none focus:ring-0 dark:focus:border-white" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: DELIVERY REQUIREMENTS */}
                  {activeTab === "delivery" && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                      <div>
                        <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Preparation Timeline</label>
                        <select className="w-full border-b border-gray-300 bg-transparent px-0 py-3 text-sm dark:border-gray-700 dark:text-white focus:border-gray-900 focus:outline-none focus:ring-0 dark:focus:border-white appearance-none">
                          <option>Immediate (1-2 days)</option>
                          <option>Made to order (3-5 days)</option>
                          <option>Pre-order configuration (1-2 weeks)</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Logistics Configuration</label>
                        <div className="space-y-6">
                          <label className="flex items-start gap-4">
                            <div className="relative flex items-center">
                              <input type="checkbox" defaultChecked className="h-5 w-5 appearance-none border border-gray-300 checked:bg-gray-900 checked:border-gray-900 dark:border-gray-700 dark:checked:bg-white dark:checked:border-white transition-colors cursor-pointer" />
                              <FontAwesomeIcon icon={faCheck} className="absolute left-[3px] top-[3px] h-3.5 w-3.5 text-white dark:text-black pointer-events-none opacity-0 peer-checked:opacity-100" />
                            </div>
                            <div>
                              <span className="block text-sm font-medium tracking-wide text-gray-900 dark:text-white">Global Dispatch</span>
                              <span className="block text-xs font-light text-gray-500 mt-1">International shipping enabled.</span>
                            </div>
                          </label>
                          <label className="flex items-start gap-4">
                            <div className="relative flex items-center">
                              <input type="checkbox" className="h-5 w-5 appearance-none border border-gray-300 checked:bg-gray-900 checked:border-gray-900 dark:border-gray-700 dark:checked:bg-white dark:checked:border-white transition-colors cursor-pointer" />
                              <FontAwesomeIcon icon={faCheck} className="absolute left-[3px] top-[3px] h-3.5 w-3.5 text-white dark:text-black pointer-events-none opacity-0 peer-checked:opacity-100" />
                            </div>
                            <div>
                              <span className="block text-sm font-medium tracking-wide text-gray-900 dark:text-white">Atelier Collection</span>
                              <span className="block text-xs font-light text-gray-500 mt-1">Client can physically retrieve the piece.</span>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Standard Shipping Tariff ($)</label>
                        <input type="number" placeholder="0.00" className="font-cinzel tracking-widest w-full border-b border-gray-300 bg-transparent px-0 py-3 text-lg dark:border-gray-700 dark:text-white focus:border-gray-900 focus:outline-none focus:ring-0 dark:focus:border-white" />
                      </div>
                    </div>
                  )}

                </form>
              </div>
            </div>

            {/* Builder Footer / Actions */}
            <div className="flex flex-col sm:flex-row shrink-0 items-center justify-between border-t border-gray-200 bg-transparent px-8 py-6 dark:border-white/10 gap-4 sm:gap-0">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                Phase <span className="font-cinzel text-lg text-gray-900 dark:text-white mx-2">
                  {activeTab === 'info' ? 'I' : activeTab === 'media' ? 'II' : activeTab === 'pricing' ? 'III' : 'IV'}
                </span>
              </span>
              <div className="flex gap-4 w-full sm:w-auto">
                <button onClick={() => setIsBuilderOpen(false)} className="flex-1 sm:flex-none border border-gray-300 px-8 py-3 text-xs font-semibold uppercase tracking-widest text-gray-500 hover:border-gray-900 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:border-white dark:hover:text-white transition-all">
                  Withdraw
                </button>
                <button disabled={isSubmitting} onClick={handleSubmit} className="flex items-center justify-center flex-1 sm:flex-none border border-gray-900 bg-gray-900 px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-transparent hover:text-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white disabled:opacity-50">
                  {isSubmitting ? "Saving..." : editingProduct ? "Save Changes" : "Publish Piece"}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}