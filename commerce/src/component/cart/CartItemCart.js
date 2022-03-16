

import React from 'react'
import "./CartItemCart.css"
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeItemsFromCart } from '../../actions/cartActions'
const CartItemCart = ({item}) => {
  const dispatch = useDispatch();
  
  return (
    <div className = "CartItemCart">
        <img src = {item.image} alt = "yoo" />
        <div>
            <Link to = {`/product/${item.product}`}>{item.name} </Link>
            <span>{`Price: $${item.price} `}</span>
            <p onClick={() => dispatch(removeItemsFromCart(item.product))}>Remove</p>
        </div>
    </div>
  )
}

export default CartItemCart