
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIcons, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';

interface Category {
  id: string;
  name: string;
  productCount: number;
}

interface StoreSidebarProps {
  categories?: Category[];
  totalProducts?: number;
}

export default function StoreSidebar({ categories = [], totalProducts = 0 }: StoreSidebarProps) {
  const { storeSlug } = useParams();
  const baseUrl = storeSlug ? `/${storeSlug}` : "/explore";

  return (
    <aside className="sticky top-12 hidden w-64 shrink-0 flex-col gap-10 md:flex">
      {/* Category Section */}
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-cinzel tracking-widest uppercase text-gray-900 dark:text-white">Directory</h2>
        <ul className="flex flex-col gap-2">
          <li>
            <Link to={baseUrl} className="flex items-center justify-between px-3 py-3 text-sm font-medium tracking-wide text-gray-900 border-l-2 border-gray-900 dark:border-white transition-colors bg-gray-50 dark:bg-white/5 dark:text-white group">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faIcons} className="h-4 w-4" />
                <span className="font-cinzel tracking-widest text-xs uppercase">All Curations</span>
              </div>
              <span className="flex h-4 w-4 items-center justify-center border border-gray-900 dark:border-white text-[9px] text-gray-900 dark:text-white">
                {totalProducts}
              </span>
            </Link>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link to={`${baseUrl}?category=${cat.name.toLowerCase()}`} className="flex items-center justify-between border-l-2 border-transparent px-3 py-3 text-sm font-light tracking-wide text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white transition-colors group">
                <div className="flex items-center gap-4">
                  <FontAwesomeIcon icon={faIcons} className="h-4 w-4 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                  <span className="font-cinzel tracking-widest text-xs uppercase">{cat.name}</span>
                </div>
                <span className="text-[10px] text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                  {cat.productCount}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <hr className="border-gray-200 dark:border-white/10" />

      {/* Quick Filters Section */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-cinzel tracking-widest uppercase text-gray-900 dark:text-white mb-4">Highlights</h2>
        <Link to={`${baseUrl}?filter=new`} className="flex items-center justify-between border border-transparent px-3 py-3 text-sm font-light tracking-wide text-gray-500 hover:border-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:border-white/10 dark:hover:bg-white/5 dark:hover:text-white transition-all group">
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faIcons} className="h-4 w-4 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
            <span className="font-cinzel tracking-widest text-xs uppercase">New Acquisitions</span>
          </div>
        </Link>
        <Link to={`${baseUrl}?filter=best`} className="flex items-center justify-between border border-transparent px-3 py-3 text-sm font-light tracking-wide text-gray-500 hover:border-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:border-white/10 dark:hover:bg-white/5 dark:hover:text-white transition-all group">
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faArrowTrendUp} className="h-4 w-4 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
            <span className="font-cinzel tracking-widest text-xs uppercase">Most Coveted</span>
          </div>
        </Link>
        <Link to={`${baseUrl}?filter=discount`} className="flex items-center justify-between border border-transparent px-3 py-3 text-sm font-light tracking-wide text-gray-500 hover:border-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:border-white/10 dark:hover:bg-white/5 dark:hover:text-white transition-all group">
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faIcons} className="h-4 w-4 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
            <span className="font-cinzel tracking-widest text-xs uppercase">Seasonal Reductions</span>
          </div>
        </Link>
      </div>

    </aside>
  );
}