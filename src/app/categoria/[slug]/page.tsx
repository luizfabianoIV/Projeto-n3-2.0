import { fetchProducts } from "@/app/actions";
import Product from "@/app/components/Product";

export default async function CategoryPage({ params }: any) {
  const slug = params.slug || "";

  // transformar slug (ex: direção -> direcao)
  const categoryName = slug
    .replace(/-/g, " ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  try {
    const { formatedProducts } = await fetchProducts({
      query: categoryName,
    });

    return (
      <div className="max-w-7xl mx-auto px-6 pt-48 pb-20">
        <h1 className="text-xl font-semibold mb-6">
          Categoria:{" "}
          <span className="text-orange-500">{categoryName.toUpperCase()}</span>
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
    console.error("Erro ao carregar categoria:", error);
    return (
      <div className="max-w-7xl mx-auto px-6 pt-32">
        <p className="text-red-500">Erro ao carregar categoria.</p>
      </div>
    );
  }
}
