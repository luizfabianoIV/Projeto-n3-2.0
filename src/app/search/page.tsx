import { fetchProducts } from "@/app/actions";
import Product from "@/app/components/Product";

export default async function SearchPage({ searchParams }: any) {
  const params = await searchParams;

  const query = (params?.query || "").toLowerCase();
  const category = (params?.category || "").toLowerCase();

  const searchTerm = (query || category).toLowerCase();

  try {
    const { formatedProducts } = await fetchProducts({
      query: searchTerm,
    });

    return (
      <div className="max-w-7xl mx-auto px-6 pt-15 pb-20">
        <h1 className="text-xl font-semibold mb-6">
          Resultados para:{" "}
          <span className="text-orange-500">{searchTerm || "todos"}</span>
        </h1>

        {formatedProducts.length === 0 && (
          <p className="text-gray-400">Nenhum produto encontrado.</p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {formatedProducts.map((product: any) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    ); 
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return (
      <div className="max-w-7xl mx-auto px-6 pt-32">
        <p className="text-red-500">Erro ao carregar produtos.</p>
      </div>
    );
  }
}