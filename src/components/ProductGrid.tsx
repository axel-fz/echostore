'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Product } from '@/types/product';
import { categories } from '@/data/products';
import ProductCard from './ProductCard';
import { FiSearch, FiX } from 'react-icons/fi';

interface ProductGridProps {
  products: Product[];
  initialCategory?: string;
}

export default function ProductGrid({
  products,
  initialCategory = 'all',
}: ProductGridProps) {
  const t = useTranslations('productGrid'); // Translation hook
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || initialCategory
  );
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const category = searchParams.get('category') || 'all';
    setSelectedCategory(category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    const params = new URLSearchParams(searchParams.toString());

    if (categorySlug === 'all') {
      params.delete('category');
    } else {
      params.set('category', categorySlug);
    }

    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const clearSearch = () => setSearchQuery('');

  const categoryFiltered =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.categoryKey === selectedCategory);

  const filteredProducts = searchQuery.trim()
    ? categoryFiltered.filter((p) =>
        p.nameKey.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categoryFiltered;

  return (
    <div id="product_grid" className="w-full px-4 sm:px-6 lg:px-8">
      {/* SEARCH + CATEGORY */}
      <div className="mt-20 mb-10 border-b border-indigo-200 dark:border-indigo-800 pb-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* SEARCH */}
          <div className="relative w-full lg:max-w-xl">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="
                w-full pl-12 pr-12 py-3
                rounded-full
                bg-white dark:bg-gray-800
                border-2 border-indigo-200 dark:border-indigo-800
                text-indigo-900 dark:text-white
                placeholder:text-indigo-400
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                transition
              "
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-600"
              >
                <FiX className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* CATEGORIES */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 lg:overflow-visible">
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => handleCategoryChange(category.slug)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition ${
                  selectedCategory === category.slug
                    ? 'bg-indigo-900 dark:bg-indigo-600 text-white shadow scale-105'
                    : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-300 hover:scale-105'
                }`}
              >
                {/* Translated category name */}
                {t(`categories.${category.slug}`)}
              </button>
            ))}
          </div>
        </div>

        {/* RESULT INFO */}
        {searchQuery && (
          <div className="mt-4 flex flex-col sm:flex-row sm:justify-between text-sm gap-2">
            <p className="text-indigo-700 dark:text-indigo-300">
              {t('foundProducts', { count: filteredProducts.length, query: searchQuery })}
            </p>
            <button
              onClick={clearSearch}
              className="text-indigo-600 hover:underline"
            >
              {t('clearSearch')}
            </button>
          </div>
        )}
      </div>

      {/* PRODUCT GRID */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* EMPTY STATE */}
      {filteredProducts.length === 0 && (
        <div className="py-20 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
            <FiSearch className="h-10 w-10 text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold text-indigo-900 dark:text-white">
            {t('noProducts')}
          </h3>
          <p className="mt-2 text-indigo-600 dark:text-indigo-400">
            {t('tryAnother')}
          </p>
        </div>
      )}
    </div>
  );
}
