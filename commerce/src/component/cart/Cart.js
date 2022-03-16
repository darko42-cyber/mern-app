import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCart from "./CartItemCart";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart } from "../../actions/cartActions";
import { Link } from "react-router-dom";
import {Typography} from '@material-ui/core'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'
const Cart = ({history}) => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }

    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const checkoutHandler = ()=>{
    history.push("/login?redirect=shipping")
  }

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className = "emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>No product in your cart</Typography>
          <Link to = "/products">view products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCart item={item} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input readOnly type="number" value={item.quantity} />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">
                    {" "}
                    {`$${item.price * item.quantity}`}{" "}
                  </p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p> {`$${cartItems.reduce((a, c)=> a + c.quantity * c.price,0)}`} </p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick = {checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Cart;
