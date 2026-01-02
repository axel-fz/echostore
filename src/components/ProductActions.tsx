'use client';

import { useState } from 'react';
import { Product } from '@/types/product';
import ProductOptions from './ProductOptions';
import AddToCartButton from './AddToCartButton';

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors?.[0]
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes?.[0]
  );
  const [quantity, setQuantity] = useState(1);

  const handleSelectionChange = (selections: {
    color?: string;
    size?: string;
    quantity: number;
  }) => {
    if (selections.color !== undefined) {
      setSelectedColor(selections.color);
    }
    if (selections.size !== undefined) {
      setSelectedSize(selections.size);
    }
    setQuantity(selections.quantity);
  };

  return (
    <>
      {/* Product Options */}
    {  <div className="mb-8">
        <ProductOptions
          product={product}
          onSelectionChange={handleSelectionChange}
        />
      </div>}

      {/* Add to Cart Section */}
      <div className="space-y-4 mb-8">
        <AddToCartButton
          product={product}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          quantity={quantity}
        />
       
      </div>

    </>
  );
}

