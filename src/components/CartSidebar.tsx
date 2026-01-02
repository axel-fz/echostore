'use client';

import { useCart } from '@/contexts/CartContext';
import { FiX, FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import ProductImage from './ProductImage';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const t = useTranslations('cartSidebar');
  const p = useTranslations();
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } =
    useCart();

  const total = getTotalPrice();

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed h-full backdrop-blur-xs z-50 inset-0 bg-black/50"
        />
      )}

      <div
        className={`
          fixed right-0 top-0 h-full w-full max-w-md z-50
          transform transition-transform duration-300 ease-in-out
          bg-white dark:bg-black
          shadow-xl
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex ring ring-gray-100 dark:ring-gray-700 flex-col h-full">

          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('shoppingCart')}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={t('closeCart')}
            >
              <FiX className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {t('cartEmpty')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  {t('startAdding')}
                </p>
                <Link
                  href="/"
                  onClick={onClose}
                  className="
                    px-6 py-3 rounded-lg font-medium
                    bg-gray-900 dark:bg-white
                    text-white dark:text-black
                    hover:opacity-90 transition
                  "
                >
                  {t('continueShopping')}
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${index}`}
                    className="flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-800 last:border-0"
                  >
                    <Link
                      href={`/product/${item.product.slug}`}
                      onClick={onClose}
                      className="shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900"
                    >
                      <ProductImage
                        src={item.product.image}
                        alt={item.product.nameKey}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                        fallbackText={item.product.nameKey}
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {p(item.product.nameKey)}
                      </h3>

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

                      <div className="mt-2 flex items-center justify-between">
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
                            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            <FiMinus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
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
                            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            <FiPlus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() =>
                              removeFromCart(
                                item.product.id,
                                item.selectedColor,
                                item.selectedSize
                              )
                            }
                            className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <FiTrash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-800 p-6 space-y-4">
              <div className="flex items-center justify-between text-lg font-bold text-gray-900 dark:text-white">
                <span>{t('total')}:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <Link
                href="/checkout"
                onClick={onClose}
                className="
                  block w-full text-center px-6 py-3 rounded-lg font-semibold
                  bg-gray-900 dark:bg-white
                  text-white dark:text-black
                  hover:opacity-90 transition
                "
              >
                {t('proceedCheckout')}
              </Link>

              <button
                onClick={clearCart}
                className="
                  w-full px-6 py-3 rounded-lg font-semibold
                  border-2 border-gray-300 dark:border-gray-700
                  text-gray-700 dark:text-gray-300
                  hover:bg-gray-50 dark:hover:bg-gray-900 transition
                "
              >
                {t('clearCart')}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
