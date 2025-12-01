import { ProductType } from "@/app/types/ProductType";
import { useCartStore } from "@/store";

type CartItemProps = {
  product: ProductType;
};

export default function CartItem({ product }: CartItemProps) {
  const { addProduct, removeProduct } = useCartStore();

  return (
    <div className="flex justify-between items-center">
      <img src={product.image} className="w-16 h-16 object-cover" />

      <div className="flex flex-col flex-1 ml-3">
        <p className="font-semibold">{product.name}</p>
        <p className="text-gray-600">R$ {(product.price / 100).toFixed(2)}</p>

        <div className="flex items-center gap-2 mt-2">
          <button onClick={() => removeProduct(product)}>-</button>
          <span>{product.quantity}</span>
          <button onClick={() => addProduct(product)}>+</button>
        </div>
      </div>
    </div>
  );
}