"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Product } from "@/types/product";
import ProductImage from "./ProductImage";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations();

  return (
    <Link href={`/product/${product.slug}`} className="group">
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
        <ProductImage
          src={product.image}
          alt={t(product.nameKey)}
          fallbackText={t(product.nameKey)}
          width={400}
          height={400}
          className="object-cover group-hover:scale-105 transition"
        />
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-medium text-indigo-900 dark:text-white">
          {t(product.nameKey)}
        </h3>

        <p className="text-sm font-semibold">
          ${product.price.toFixed(2)} {product.currency}
        </p>
      </div>
    </Link>
  );
}
