import { useContext, useEffect } from "react"
import { CarrinhoContext } from "@/context/CarrinhoContext"

export const useCarrinhoContext = () => {
  const {
    carrinho,
    setCarrinho,
    quantidade,
    setQuantidade,
    valorTotal,
    setValorTotal,
  } = useContext(CarrinhoContext)

  const mudarQuantidade = (id, quantidade) => {
    return carrinho.map((itemDoCarrinho) => {
      if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade
      return itemDoCarrinho
    })
  }

  const adicionarProduto = (novoProduto) => {
    const temProduto = carrinho.some(
      (itemCarrinho) => itemCarrinho.id === novoProduto.id
    )

    if (!temProduto) {
      novoProduto.quantidade = 1
      return setCarrinho((carrinhoAnterior) => [
        ...carrinhoAnterior,
        novoProduto,
      ])
    }

    const carrinhoAtualizado = mudarQuantidade(novoProduto.id, 1)
    setCarrinho([...carrinhoAtualizado])
  }

  const removerProduto = (id) => {
    const produto = carrinho.find((itemDoCarrinho) => itemDoCarrinho.id === id)
    const ehOUltimo = produto.quantidade === 1
    if (ehOUltimo) {
      return setCarrinho((carrinhoAnterior) =>
        carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id)
      )
    }

    const carrinhoAtualizado = mudarQuantidade(id, -1)

    setCarrinho([...carrinhoAtualizado])
  }

  const removerProdutoCarrinho = (id) => {
    const produto = carrinho.filter(
      (itemDoCarrinho) => itemDoCarrinho.id !== id
    )
    setCarrinho(produto)
  }

  useEffect(() => {
    const { totalTemp, quantidadeTemp } = carrinho.reduce(
      (acumulador, produto) => ({
        quantidadeTemp: acumulador.quantidadeTemp + produto.quantidade,
        totalTemp: acumulador.totalTemp + produto.preco * produto.quantidade,
      }),
      {
        quantidadeTemp: 0,
        totalTemp: 0,
      }
    )

    setQuantidade(quantidadeTemp)
    setValorTotal(totalTemp)
  }, [carrinho])

  return {
    carrinho,
    setCarrinho,
    quantidade,
    valorTotal,
    adicionarProduto,
    removerProduto,
    removerProdutoCarrinho,
  }
}
