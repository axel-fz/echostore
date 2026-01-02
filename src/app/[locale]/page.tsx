import { Suspense } from 'react';
import { products } from '@/data/products';
import ProductGrid from '@/components/ProductGrid';
import HeroSection from '@/components/HeroSection';

interface HomeProps {
  searchParams: Promise<{ category?: string }>;
}

function ProductGridFallback() {
  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
        <div className="h-6 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-6 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-6 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square w-full rounded-lg bg-gray-200 dark:bg-gray-700"></div>
            <div className="mt-4 h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-600"></div>
            <div className="mt-2 h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-600"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const category = params.category || 'all';

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 bg-white dark:bg-black ">
      <Suspense fallback={<ProductGridFallback />}>
        <HeroSection />
        <ProductGrid products={products} initialCategory={category} />
      </Suspense>
    </div>
  );
}
