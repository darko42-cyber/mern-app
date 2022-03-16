import React from "react";
import { Link } from "react-router-dom";

import { Rating } from "@material-ui/lab";

export const ProductCard = ({ product }) => {
  const options = {
    readOnly: true,
    value: product.rating,
    precision: 0.5,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p> {product.name} </p>
      <div>
        <Rating {...options} /> <span className = "productCardSpan"> ({product.numOfReviews} reviews) </span>
      </div>
      <span> {`$${product.price}`} </span>
    </Link>
  );
};



