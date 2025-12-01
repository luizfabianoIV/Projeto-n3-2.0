export type ProductType = {
    cartItemId?: string;
    id: string;
    price: number;
    name: string;
    quantity?: number;
    description: string | null;
    image: string;
    currency?: string,
};