import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getProductBySlug, products } from "@/data/products";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductActions from "@/components/ProductActions";
import ProductDetailsTabs from "@/components/ProductDetailsTabs";
import RelatedProducts from "@/components/RelatedProducts";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const p = await getTranslations("productPage");
  const t = await getTranslations();

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-black border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Link
              href="/"
              className="hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {p("home")}
            </Link>

            <span>/</span>

            <Link
              href={`/?category=${product.categoryKey}`}
              className="capitalize hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {t(product.categoryKey)}
            </Link>

            <span>/</span>

            <span className="font-medium text-gray-900 dark:text-white">
              {t(product.nameKey)}
            </span>
          </nav>
        </div>
      </div>

      {/* Page Content */}
      <div className="bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Images */}
            <div className="lg:sticky lg:top-24">
              <ProductImageGallery
                images={product.images || [product.image]}
                productName={t(product.nameKey)}
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t(product.nameKey)}
              </h1>

              <div className="flex items-end gap-3 mb-6">
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  ${product.price.toFixed(2)}
                </p>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {product.currency}
                </span>
              </div>

              {/* Rating */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {p("reviews", { count: 24 })}
                </span>

                <span className="hidden sm:inline text-gray-300 dark:text-gray-700">
                  |
                </span>

                <span className="text-sm font-medium text-green-600">
                  {p("inStock")}
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-400 leading-7 mb-8">
                {t(product.descriptionKey)}
              </p>

              <ProductActions product={product} />
            </div>
          </div>

          <div className="space-y-16">
            <ProductDetailsTabs description={t(product.descriptionKey)} />
            <RelatedProducts
              currentProduct={product}
              allProducts={products}
            />
          </div>
        </div>
      </div>
    </>
  );
}
