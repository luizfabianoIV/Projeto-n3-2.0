"use client"
import { useCartStore } from "@/store";
import CartDrawer from "./CartDrawer";

export default function Cart() {
    const useStore = useCartStore();

    return(
      <>
        <div 
        onClick={() => useStore.toggleCart()}
        className="flex items-center gap-8">
              <div className="flex items-center cursor-pointer relative">
                <i className="bi bi-cart"></i>
                <span className="bg-teal-600 text-sm font-bold rounded-full h-5 w-5 flex items-center justify-center absolute left-3 bottom-3">{useStore.cart?.length}</span>
              </div>
            </div>
            {useStore.isOpen && <CartDrawer />}
      </>
    );
}