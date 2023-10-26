import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiManager from '../../api/apiManager';
import CardProductVertical from '../../Components/Misc/CardProductVertical';
import { Loading } from '../../common/Loading';
import { useSelector } from 'react-redux';

function RestaurantPage() {
    useEffect( () => window.scrollTo( 0, 0 ) );
    const [ loading, setLoading ] = useState( true );
    const [ disabled, setDisabled ] = useState( true );
    const { restaurantSlug } = useParams();
    const [ restaurant, setRestaurant ] = useState( [] );
    const info = useSelector( ( state ) => state.info.info );

    const navigate = useNavigate();

    function handleActionProduct( productSlug ) {

        navigate( `/producto/${ productSlug }` );
    }


    async function getRestaurantDetails( restaurantSlug ) {
        let json = await apiManager.getRestaurantDetails( restaurantSlug );
        if (json != 500) {
            if (json.code == 'ok') {
                setRestaurant( json.restaurant );
                setDisabled( Boolean( json.restaurant.status === 'inactive' ) );
            } else {
            }
        }
        setLoading( false );
    }

    useEffect( () => {
        getRestaurantDetails( restaurantSlug );
    }, [ restaurantSlug ] );

    return (
        <>
            { loading ? (
                <Loading />
            ) : (
                <div className="min-h-screen mb-10 lg:pt-10" style={ disabled ? { pointerEvents: 'none', opacity: '0.4' } : {} }>
                    <div
                        className="min-h-80 p-10 lg:pt-16 rounded-lg lg:px-20 lg:flex lg:flex-col  "
                        style={ { backgroundImage: 'url(\'/assets/img/fondo.webp\')' } }
                    >
                        <div className="flex flex-col lg:flex-row justify-between flex-wrap">

                            <div className="inline-block  lg:hidden h-14 w-14 rounded-full   overflow-hidden bg-gray-100">
                                <img
                                    className="h-full b-3 my-1 w-full"
                                    src={ apiManager.UrlBase + restaurant.avatar }
                                />
                            </div>
                            <div className="flex">
                                <div className="  hidden lg:block  h-14 w-14 rounded-full mr-3 overflow-hidden bg-gray-100">
                                    <img
                                        className="h-full w-full"
                                        src={ apiManager.UrlBase + restaurant.avatar }
                                    />
                                </div>
                                { disabled ? (
                                    <div className="flex mt-3 lg:mt-0 flex-col">
                                      <span className="text-md color">{ restaurant.name }</span>
                                      <span className="text-2xl lg:text-4xl color font-medium uppercase">{ info.principal_text } </span>
                                    </div>
                                ) : (
                                    <div className="flex mt-3 lg:mt-0 flex-col">
                  <span className="text-2xl lg:text-4xl color font-medium uppercase">
                    { restaurant.name }
                  </span>
                                        <span className="text-md color">{ restaurant.address } </span>
                                        <hr />
                                        <span className="text-md color">
                    { restaurant.description }{ ' ' }
                  </span>
                                    </div>
                                ) }

                            </div>
                            { restaurant.schedule && !disabled && (
                                <div>
                                    <p className="color font-bold mt-7 ">
                                        Servicio: { restaurant.schedule }
                                    </p>
                                </div>
                            ) }
                        </div>
                    </div>

                    <div className="overflow-y-auto ">
                        <div className="grid grid-cols-1 pt-3  lg:mx-16 md:grid-cols-1">

                            { restaurant.experiences?.length > 0 && (
                                <div className="lg:grid lg:p-5  lg:grid-cols-3">
                                    <div className="lg:col-span-1">
                    <span className="text-2xl ml-3 color mt-3 font-sans font-medium">
                      Experiencias YaVoy{ ' ' }
                    </span>
                                    </div>
                                    <div className="lg:col-span-2">
                                        <div className="lg:grid lg:grid-cols-2">
                                            { restaurant.experiences.map( ( exp ) => {

                                                if (exp.status == 'active') {
                                                    return (
                                                        <div key={ `exp--` + exp.id }>
                                                            <CardProductVertical
                                                                experience={ true }
                                                                rating={ 4 }
                                                                price={ exp.price }
                                                                img={ exp.photos[0]?.path_photo ?? '/assets/img/sinfotos.jpg' }
                                                                name={ exp.name }
                                                                slug={ exp.slug }
                                                                id={ exp.id }
                                                                restaurantId={ exp.restaurant_id }
                                                                restaurantName={ restaurant.name }
                                                            />
                                                        </div>
                                                    );
                                                }
                                            } ) }
                                        </div>
                                    </div>
                                </div>
                            ) }

                            { restaurant.categories?.length > 0 &&
                                restaurant.categories.map( ( category ) => {
                                    if (
                                        category.products.filter( ( prod ) => prod.status == 'active' && prod.experience == 'N' )
                                            .length > 0
                                    ) {
                                        return (
                                            <div key={ category.id }>
                                                <div className="lg:grid mt-10 lg:p-5  lg:grid-cols-3">
                                                    <div className="lg:col-span-1">
                            <span className="text-2xl ml-3 color mt-3 font-sans font-medium">
                              { category.category.name }
                            </span>
                                                    </div>
                                                    <div className="lg:col-span-2">
                                                        <div className="lg:grid lg:grid-cols-2">
                                                            { category.products.map( ( product ) => {
                                                                if (
                                                                    product.category_id == category.id &&
                                                                    product.status == 'active' && product.experience == 'N'
                                                                ) {
                                                                    return (
                                                                        <div key={ `product-` + product.id }>
                                                                            <CardProductVertical
                                                                                onClickFunction={ handleActionProduct }
                                                                                rating={ 4 }
                                                                                price={ product.price }
                                                                                img={ product.photos[0]?.path_photo ?? '/assets/img/sinfotos.jpg' }
                                                                                name={ product.name }
                                                                                slug={ product.slug }
                                                                                id={ product.id }
                                                                                restaurantId={ product.restaurant_id }
                                                                                restaurantName={ restaurant.name }
                                                                            />

                                                                            {/* <ProductRestaurant product={product} /> */ }
                                                                        </div>
                                                                    );
                                                                }
                                                            } ) }
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />
                                            </div>
                                        );
                                    }
                                } ) }
                        </div>
                    </div>
                </div>
            ) }
        </>
    );
}

export default RestaurantPage;
