import React from "react";
import { Link } from "react-router-dom";

import convertRupiah from "rupiah-format";

export default function ProductCard({ item, index }) {
  return (
    <Link
      to={`/product/` + item.id}
      style={{ textDecoration: "none" }}
      key={index}
    >
      <div className="card-product mt-sm-3 ">
        <img src={item.image} className="img-rounded img-sm-fluid img-product"/>
        <div className="p-2 card-bg ">
          <div className="text-header-product-item">{(item.name.length > 20) ? item.name.slice(0, 20) + '...' : item.name}</div>
          <div className="text-product-item">
            {convertRupiah.convert(item.price)}
          </div>
          <div className="text-product-item">Stock : {item.qty}</div>
        </div>
      </div>
    </Link>
  );
}
