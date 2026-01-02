'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import ProductImage from '@/components/ProductImage';
import { FiLoader, FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useTranslations } from 'next-intl';

export default function CheckoutPage() {
  const t = useTranslations('checkoutPage');
  const p = useTranslations(); // default translations for product names
  const router = useRouter();
  const { items, getTotalPrice, updateQuantity, removeFromCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = getTotalPrice();

  useEffect(() => {
    if (items.length === 0) router.push('/');
  }, [items, router]);

  const handleCheckout = async () => {
    if (items.length === 0) {
      setError(t('cartEmpty'));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Prepare items with translated names & descriptions
      const lineItemsForBackend = items.map(item => ({
        ...item,
        product: {
          ...item.product,
          name: `${p(item.product.nameKey)}${
            item.selectedColor ? ` • ${item.selectedColor}` : ''
          }${item.selectedSize ? ` • ${item.selectedSize}` : ''}`,
          description: p(item.product.descriptionKey),
        },
      }));

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: lineItemsForBackend }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t('checkoutFailed'));
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(t('noCheckoutUrl'));
      }
    } catch (err: any) {
      setError(err.message || t('checkoutError'));
      setLoading(false);
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-white dark:bg-black">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
        {t('checkout')}
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6">
            <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
              {t('orderSummary')}
            </h2>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={`${item.product.slug}-${item.selectedColor}-${item.selectedSize}-${index}`}
                  className="relative flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-800 last:border-0"
                >
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900"
                  >
                    <ProductImage
                      src={item.product.image}
                      alt={p(item.product.nameKey)}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                      fallbackText={p(item.product.nameKey)}
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between pr-8">
                      <div className="min-w-0">
                        <Link href={`/product/${item.product.slug}`}>
                          <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                            {p(item.product.nameKey)}
                          </h3>
                        </Link>

                        {(item.selectedColor || item.selectedSize) && (
                          <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                            {item.selectedColor && (
                              <span>
                                {t('color')}: {item.selectedColor}
                              </span>
                            )}
                            {item.selectedColor && item.selectedSize && (
                              <span className="mx-2">•</span>
                            )}
                            {item.selectedSize && (
                              <span>
                                {t('size')}: {item.selectedSize}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() =>
                          removeFromCart(
                            item.product.id,
                            item.selectedColor,
                            item.selectedSize
                          )
                        }
                        className="absolute top-0 right-0 rounded p-1.5 hover:bg-red-100 dark:hover:bg-red-900/20 transition"
                        aria-label={t('removeItem')}
                      >
                        <FiTrash2 className="w-4 h-4 text-red-600 dark:text-red-500" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.selectedColor,
                              item.selectedSize
                            )
                          }
                          className="rounded p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        >
                          <FiMinus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>

                        <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-white">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.selectedColor,
                              item.selectedSize
                            )
                          }
                          className="rounded p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        >
                          <FiPlus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                      </div>

                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-black p-6">
            <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
              {t('paymentSummary')}
            </h2>

            <div className="mb-6 space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex justify-between">
                <span>{t('subtotal')}</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('shipping')}</span>
                <span>{t('free')}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('tax')}</span>
                <span>{t('calculatedCheckout')}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-800 pt-4 text-lg font-bold text-gray-900 dark:text-white">
                <div className="flex justify-between">
                  <span>{t('total')}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 rounded-lg border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 p-3">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading || items.length === 0}
              className="flex w-full items-center justify-center gap-2 rounded-lg px-6 py-4 text-base font-semibold bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition disabled:opacity-50"
            >
              {loading ? (
                <>
                  <FiLoader className="w-5 h-5 animate-spin" />
                  {t('processing')}
                </>
              ) : (
                t('proceedPayment')
              )}
            </button>

            <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-500">
              {t('securePayment')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
