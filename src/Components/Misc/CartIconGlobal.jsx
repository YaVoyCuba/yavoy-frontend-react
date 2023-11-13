import React, { useState, Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { decrementQuantity, incrementQuantity, removeItem } from '../../redux/cartSlice';


const CartIconGlobal = () => {
    const { cart } = useSelector( ( state ) => state.cart );
    const dispatch = useDispatch();
    const [ open, setOpen ] = useState( false );
    const getMunicipality = useSelector( ( state ) => state.location.municipality );
    const [quantity, setQuantity] = useState(1);

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

    const getTotalQuantity = () => {
        let total = 0;

        if (cart) {
            cart.forEach( ( item ) => {
                total += item.quantity;
            } );
        }
        return Number( total ).toFixed();
    };

    const getStoreLink = () => {
        if (cart && cart.length)
            return 'restaurante/' + cart[0]?.restaurantSlug
        return ''
    }


    const getTotalPrice = () => {
        let total = 0;
        cart?.forEach( ( item ) => {
            total += item.price * item.quantity;
        } );

        return Number( total ).toFixed( 2 );
    };

    return (
        <div>
            <button
                onClick={ () => setOpen( !open ) }
                className=" flex cursor-pointer  pr-3 "
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={ 1.5 }
                    stroke="currentColor"
                    className="w-7 pt-1 h-7"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                </svg>

                { getTotalQuantity() }
            </button>


            <Transition.Root show={ open } as={ Fragment }>
                <Dialog as="div" className="relative z-10" onClose={ setOpen }>
                    <div className="fixed inset-0" />

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex pl-10">
                                <Transition.Child
                                    as={ Fragment }
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white pt-6 shadow-xl">
                                            <div className="px-4 flex justify-between pb-3 sm:px-6">
                        <span className="subtitle uppercase">
                          Carrito de compra
                        </span>
                                                <div className="flex items-start justify-end">
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="rounded-md bg-white main-color hover:text-gray-500 focus:outline-none focus:outline-none  "
                                                            onClick={ () => setOpen( false ) }
                                                        >
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon
                                                                className="h-6 w-6 main-color"
                                                                aria-hidden="true"
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="separator mx-3" />
                                            <div className="px-4 flex justify-between pb-3 sm:px-6">
                        <span className="">
                          {/*TODO: add get restaurantName and validate*/ }
                            Comercio: { cart[0]?.restaurantName }
                        </span>
                                            </div>
                                            <div className="px-4 flex justify-between pb-3 sm:px-6">
                        <span className="">
                          Municipio: { getMunicipality.label }
                        </span>
                                            </div>
                                            <hr className="separator mx-3" />
                                            <div>
                                                { cart?.map( ( product, index ) => {
                                                    return (
                                                        <div className="flex justify-between mb-4" key={ `productcartglobal-${ index }` } style={{ paddingLeft: `1rem`, paddingRight: `1rem` }}>
                                                            <div className="flex items-center">
                                                                <img
                                                                    className="w-24 object-contain p-2 mr-2 mt-2"
                                                                    src={ product.img }
                                                                    alt={ product.name } />
                                                                    <div className="mt-2">
                                                                        <h2 className="font-bold">{ product.name }</h2>
                                                                        <div className="flex space-x-2 mb-4">
                                                                            <p className="text-lg text-gray-700">
                                                                              { product.quantity }
                                                                            </p>
                                                                            <span className="text-lg">X</span>
                                                                            <span className=" text-lg font-medium color-green">
                                                                              ${ Number( product.price ).toFixed( 2 ) } usd
                                                                            </span>
                                                                        </div>
                                                                        <div className="flex border-2 py-2  px-2 border-gray-500 rounded-md" style={{width: `9rem`}}>
                                                                            <button
                                                                                onClick={() => {
                                                                                    setQuantity(quantity > 0 ? quantity - 1 : 0 );
                                                                                    dispatch(decrementQuantity(product.id));
                                                                                }}
                                                                                className="mr-1 text-2xl"
                                                                                style={{width: `40px`}}
                                                                            >
                                                                                -
                                                                            </button>
                                                                            <div
                                                                                className="h-6 my-1  bg-black"
                                                                                style={ { width: 1 } }
                                                                            />
                                                                            <span
                                                                                className="text-2xl font-bold px-2 mx-1">{ product.quantity }</span>
                                                                            <div
                                                                                className="h-6 my-1  bg-black"
                                                                                style={ { width: 1 } }
                                                                            />
                                                                            <button
                                                                                className="ml-1 text-2xl"
                                                                                style={{width: `40px`}}
                                                                                onClick={() => {
                                                                                    setQuantity(quantity + 1);
                                                                                    dispatch(incrementQuantity(product.id));
                                                                                }}
                                                                            >
                                                                                +
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <button
                                                                    onClick={ () =>
                                                                        dispatch( removeItem( product.id ) )
                                                                    }
                                                                    style={ {
                                                                        borderColor:  'black',
                                                                        borderStyle:  'solid',
                                                                        borderWidth:  1,
                                                                        borderRadius: 100,
                                                                    } }
                                                                    className=" p-0.5 focus:outline-none"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth="1.5"
                                                                        stroke="currentColor"
                                                                        className="w-6 h-6"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M6 18L18 6M6 6l12 12"
                                                                        />
                                                                    </svg>


                                                                </button>
                                                            </div>
                                                        </div>
                                                    );
                                                } ) }
                                            </div>
                                            <div className="mx-3">
                                                <hr className="separator  " />
                                                <div className="flex py-2 justify-between">
                                                    <span className="subtitle-2 px-2">Subtotal</span>
                                                    <span className="subtitle-2 px-2">
                            ${ Number( getTotalPrice() ).toFixed( 2 ) } usd
                          </span>
                                                </div>
                                                <hr className="separator  " />
                                                <div className="flex flex-col">
                                                    <Link className=" mt-3 text-center" to={ 'carrito' }>
                            <span
                                onClick={ () => setOpen( false ) }
                                className="text-center text-lg  color-main  font-medium mt-3 hidden"
                            >
                              Ver Carrito
                            </span>
                                                    </Link>
                                                    <Link className=" mt-3 text-center" to={ getStoreLink() }>
                            <span
                                onClick={ () => setOpen( false ) }
                                className="text-center text-lg  color-main  font-medium mt-3"
                            >
                              Ver comercio
                            </span>
                                                    </Link>
                                                    <Link
                                                        onClick={ () => setOpen( false ) }
                                                        className="btn-main  mt-5 text-center"
                                                        to={ 'caja' }
                                                    >
                                                        <button

                                                            className="uppercase"
                                                        >
                                                            Completar pago
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    );
};

export default CartIconGlobal;
