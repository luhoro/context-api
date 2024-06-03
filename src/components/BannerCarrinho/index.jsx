import React from "react"
import bannerCarrinho from "/assets/images/banner-carrinho.png"

const BannerCarrinho = () => {
  return (
    <div className="pt-70">
      <img
        className="custom-img"
        src={bannerCarrinho}
        alt="Imagem de uma sacola de compras"
      />
    </div>
  )
}

export default BannerCarrinho
