'use client';

import { useState } from 'react';
import { Product } from '@/types/product';
import { useTranslations } from 'next-intl';

interface ProductOptionsProps {
  product: Product;
  onSelectionChange?: (selections: {
    color?: string;
    size?: string;
    quantity: number;
  }) => void;
}
export default function ProductOptions({
  product,
  onSelectionChange,
}: ProductOptionsProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors?.[0] || null
  );
  const t = useTranslations("productOption")
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes?.[0] || null
  );
  const [quantity, setQuantity] = useState(1);

  const maxQuantity = product.stock || 99;

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    notifyChange(color, selectedSize, quantity);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    notifyChange(selectedColor, size, quantity);
  };

  const handleQuantityChange = (newQuantity: number) => {
    const clampedQuantity = Math.max(1, Math.min(newQuantity, maxQuantity));
    setQuantity(clampedQuantity);
    notifyChange(selectedColor, selectedSize, clampedQuantity);
  };

  const notifyChange = (
    color: string | null,
    size: string | null,
    qty: number
  ) => {
    if (onSelectionChange) {
      onSelectionChange({
        color: color || undefined,
        size: size || undefined,
        quantity: qty,
      });
    }
  };

  return (
    <div className="space-y-8 border-t border-gray-200 pt-8">
  
      {/* Size Selection */}
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <div className="flex items-center justify-start mb-4">
            <label className="block text-base font-semibold text-gray-900 dark:text-indigo-400 mr-2">
              {t("size")}
            </label>
            {selectedSize && (
              <span className="text-sm font-medium text-gray-600">
                ({selectedSize})
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={`px-5 py-2.5 min-w-[65px] text-sm font-semibold rounded-lg border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-gray-900 bg-gray-900 text-white shadow-md scale-105'
                      : 'border-gray-300 text-gray-700 bg-white hover:border-gray-900 hover:bg-gray-50 hover:shadow-sm'
                  }`}
                  aria-label={`Select size ${size}`}
                  aria-pressed={isSelected}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity Selection */}
      <div>
        <div className="flex items-center justify-start mb-4">
          <label className="block dark:text-indigo-400 text-base font-semibold text-gray-900 mr-2">
            {t("quantity")}
          </label>
          <span className="text-sm font-medium text-gray-600">
            ({quantity})
          </span>
          {product.stock && (
            <span className="text-sm text-gray-500 ml-2">
              • {product.stock} {t("instock")}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="flex items-center justify-center w-12 h-12 text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
              aria-label="Decrease quantity"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M20 12H4"
                />
              </svg>
            </button>
            <input
              type="number"
              min="1"
              max={maxQuantity}
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              className="w-16 text-center border-x-2 border-gray-300 py-2 text-base font-semibold text-gray-900 focus:outline-none focus:ring-0 bg-transparent"
              aria-label="Quantity"
            />
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= maxQuantity}
              className="flex items-center justify-center w-12 h-12 text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
              aria-label="Increase quantity"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get color values for common color names
/* function getColorValue(colorName: string): string | null {
  const colorMap: Record<string, string> = {
    black: '#000000',
    white: '#FFFFFF',
    red: '#EF4444',
    blue: '#3B82F6',
    green: '#10B981',
    yellow: '#FBBF24',
    orange: '#F97316',
    purple: '#A855F7',
    pink: '#EC4899',
    gray: '#6B7280',
    grey: '#6B7280',
    navy: '#1E3A8A',
    brown: '#92400E',
    beige: '#F5F5DC',
    tan: '#D2B48C',
  };

  const normalized = colorName.toLowerCase().trim();
  return colorMap[normalized] || null;
}
 */
