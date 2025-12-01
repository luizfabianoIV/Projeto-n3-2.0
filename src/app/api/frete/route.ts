import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { cep } = await req.json();

    const cleanCep = cep.replace(/\D/g, "");

    if (!cleanCep || cleanCep.length !== 8) {
      return NextResponse.json({ error: "CEP inválido" }, { status: 400 });
    }

    // CONSULTA VIACEP
    const viaCEP = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);

    if (!viaCEP.ok) {
      return NextResponse.json(
        { error: "Erro ao consultar CEP" },
        { status: 500 }
      );
    }

    const data = await viaCEP.json();
    if (data.erro) {
      return NextResponse.json(
        { error: "CEP não encontrado" },
        { status: 404 }
      );
    }

    // REGRAS SIMPLES DE FRETE
    let frete = 39.9; // padrão BR
    const uf = data.uf;

    if (["SP", "RJ", "MG", "ES"].includes(uf)) frete = 19.9; // sudeste
    if (["PR", "SC", "RS"].includes(uf)) frete = 29.9; // sul

    return NextResponse.json({
      frete,
      cidade: data.localidade,
      estado: data.uf,
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao calcular frete" },
      { status: 500 }
    );
  }
}
