import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import apiManager from '../../api/apiManager';

const CardProductVertical = ( props ) => {
    const { cart } = useSelector( ( state ) => state.cart );

    const productAdd = ( type ) => {
        toast.success( 'Producto agregado!', {
            position:        'top-center',
            autoClose:       5000,
            hideProgressBar: false,
            closeOnClick:    true,
            pauseOnHover:    true,
            draggable:       true,
            progress:        undefined,
        } );
    };
    const productExisted = ( type ) => {
        toast.warning(
            'No puedes comprar productos de diferentes restaurantes en un mismo pedido!',
            {
                position:        'top-center',
                autoClose:       5000,
                hideProgressBar: false,
                closeOnClick:    true,
                pauseOnHover:    true,
                draggable:       true,
                progress:        undefined,
            },
        );
    };

    const dispatch = useDispatch();

    const { id, name, price, img, rating, slug, restaurantId, restaurantName, restaurantSlug } = props;

    const addToCartHandler = () => {
        //check if not exist another product with same restaurantId
        let exist = cart?.find( ( item ) => item.restaurantId !== restaurantId );
        if (exist) {
            productExisted();
        } else {
            dispatch(
                addToCart( {
                    id,
                    name,
                    price,
                    img:      apiManager.UrlBase + img,
                    rating,
                    slug,
                    restaurantId,
                    quantity: 1,
                    restaurantName,
                    restaurantSlug,
                } ),
            );
            productAdd();
        }
    };

    return (
        <div className="bg-gray-100  rounded-lg m-2   mt-3  shadow-xl">
            <div className="flex text-left flex-col ">
                <div className="flex ">
                    <div className="flex relative">

                        <img onClick={ () => props.onClickFunction( slug ) }
                             className="object-cover h-32 w-32 cursor-pointer  object-center rounded-md"
                             src={ apiManager.UrlBase + img }
                             alt={ name }
                        />


                        { props.experience && (<svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 bg-main text-white p-1 shadow-xl absolute   left-2 -mt-0.1"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ) }
                    </div>

                    <div className={ `flex w-full  ${ props.experience && 'bg-color-100' } flex-col` }>
                        <button onClick={ () => props.onClickFunction( slug ) }
                                className="text-xl cursor-poiner pt-3 px-3 text-left  font-medium  text-gray-800  ">
                            { name }
                        </button>

                        <div className="flex justify-between  ">
              <span className="text-xl font-bold pt-3 px-3 text-gray-700  ">
                ${ Number( price ).toFixed( 2 ) } usd
              </span>{ ' ' }
                            <div className="flex p-1  ">
                                <button
                                    onClick={ () => addToCartHandler() }
                                    className="bg-main p-2 m-2 rounded-full"
                                >
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5h4m-2 2V3M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.938-11H17l-2 7H5m0 0L3 4m0 0h2M3 4l-.792-3H1"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        { props.search && (
                            <div className="flex justify-center">
                                <div className="flex flex-row items-center pb-3 ">
                                    <button className="btn-main mt-5" onClick={ () => props.onClickVisitStore( restaurantSlug ) }>
                                        Visitar comercio
                                    </button>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardProductVertical;
