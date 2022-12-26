import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { decrementQuantity } from "../../redux/cartSlice";
import { incrementQuantity } from "../../redux/cartSlice";

const Cart = () => {
  useEffect(() => window.scrollTo(0, 0));
  const [quantity, setQuantity] = useState(1);

  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  
  const getTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
   
    return Number(total).toFixed(2);
  };

  useEffect(() => {
    getTotalPrice();
    let totalProduct = 0;
    //Update the quantity by all in cart
    cart.forEach((item) => {
      totalProduct += item.quantity;
    });

    //Update the quantity by all in cart
    setQuantity(totalProduct);
     
  }, [cart]);


  return   <div className="mx-auto">
  {cart.length > 0 ? (
    <div className="grid grid-cols-7 overflow-x-scroll ">
      <div className="col-span-5 lg:col-span-4  p-3 lg:p-7">
        <div className=" ">
          <table className=" w-[100%]  text-left   ">
            <thead className="uppercase border-gray-500 border-b-2 text-lg text-gray-700">
              <th>Productos</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th></th>
            </thead>
            <tbody>
              {cart.map((product, index) => {
                return (
                  <tr key={`productcart-${index}`}>
                    <td className="flex p-3">
                      <div className="bg-slate-100 rounded-lg">
                        <img
                          className="h-32 w-32 object-contain p-2"
                          src={product.img}
                        />
                      </div>
                      <div className="p-4">
                        <span className="  subtitle">Primer producto</span>
                      </div>
                    </td>
                    <td className="subtitle">${product.price}</td>
                    <td className="px-2 w-auto ">
                      <div className="flex border-2 py-3  px-5 border-gray-500 rounded-md pl-4">
                        <button
                          onClick={() => {
                            setQuantity(quantity === 1 ? 1 : quantity - 1);
                            dispatch(decrementQuantity(product.id));
                          }}
                          className="mr-4 text-2xl"
                        >
                          -
                        </button>
                        <div
                          className="h-8 my-1  bg-black"
                          style={{ width: 1 }}
                        ></div>
                        <span className="text-2xl font-bold px-2 mx-3">
                          {quantity}
                        </span>
                        <div
                          className="h-8 my-1  bg-black"
                          style={{ width: 1 }}
                        ></div>
                        <button
                          onClick={() => {
                            setQuantity(quantity + 1);
                            dispatch(incrementQuantity(product.id));
                          }}
                          className="ml-2 text-2xl"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="subtitle">
                      {Number(product.quantity * product.price).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-span-7 lg:col-span-2  p-3 lg:p-7">
        <div className="border-2 border-gray-500 rounded-sm p-4">
          <span className="uppercase subtitle">Totales del carrito</span>
          <hr className="my-3 separator" />
          <div className="flex justify-between">
            <span className="text-lg">Subtotal</span>
            <span className="text-lg">${getTotalPrice()}</span>
          </div>
          <hr className="my-3 separator" />
          <div className="flex mb-5 justify-between">
            <span className="text-lg">Total</span>
            <span className="text-lg">${getTotalPrice()}</span>
          </div>
          <Link  className="mt-4" to={"/caja"}>
            <button className="btn-main">Proceder a completar pago</button>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className=" flex flex-col text-center h-screen justify-center">
      <div className="flex self-center">
        <img
          className="h-96 w-96 object-cover text-center justify-center"
          src="/assets/img/notfound.png"
        />
      </div>
      <span className="title px-7">No hay productos en el carrito</span>
      <Link to={"/"}>
        <span className="subtitle ">Regresar al Inicio</span>
      </Link>
    </div>
  )}
</div>
};

export default Cart;
