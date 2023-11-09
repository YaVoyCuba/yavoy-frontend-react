import React, { useState, Fragment, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';

import apiManager from '../../api/apiManager';
import RestaurantCard from '../Misc/RestaurantCard';
import CardProductVertical from '../Misc/CardProductVertical';
import { useSelector } from 'react-redux';

const SearchPage = () => {
    const [ open, setOpen ] = useState( false );

    const [ results, setResults ] = useState( [] );
    const [ copyResult, setCopyResults ] = useState( [] );

    const cancelButtonRef = useRef( null );
    const getMunicipality = useSelector( ( state ) => state.location.municipality );

    const navigate = useNavigate();

    function handleAction( restaurantSlug ) {
        setOpen( false );
        navigate( `/restaurante/${ restaurantSlug }` );
    }

    function handleActionProduct( productSlug ) {
        setOpen( false );
        navigate( `/producto/${ productSlug }` );
    }

    function classNames( ...classes ) {
        return classes.filter( Boolean ).join( ' ' );
    }

    async function getRestaurants() {
        let locationFinal = '';
        if (getMunicipality.value?.id === 0) {
            locationFinal = 0;
        } else {
            locationFinal = getMunicipality.value.id;
        }

        let json = await apiManager.getSearchResults( locationFinal );

        if (json !== 500) {
            setResults( json.data );
            setCopyResults( json.data );
        } else {
            console.log( 'error cargando los datos del api' );
            setResults( [] );
        }

    }

    const searchInput = useRef( null );

    function removeDiacritic( texto ) {
        return texto.toLowerCase().normalize( 'NFD' ).replace( /\p{Diacritic}/gu, '' );
    }

    const onSearch = ( searchInputValue ) => {
        if (!open) {
            setOpen( true );
        }

        if (searchInputValue) {
            let restaurantFiltereds = results.filter( ( restaurant ) => {
                return (
                    restaurant.name.toLowerCase().includes( searchInputValue.toLowerCase() )
                );
            } );

            setResults( restaurantFiltereds );
        } else {
            setResults( copyResult );
        }
    };

    useEffect( () => {
        getMunicipality.value.id !== 0 && getRestaurants();
    }, [ getMunicipality ] );

    return (
        <>
            <div>
                <div className="lg:hidden">
                    <button type="button" onClick={ () => setOpen( true ) }>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={ 1.5 }
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </button>
                </div>
                <div className="hidden lg:flex">
                    <div>
                        <div className="relative mt-1 flex items-center">
                            <input
                                onClick={ () => setOpen( true ) }
                                className="bg-gray-100  rounded-full w-96 pl-10 pr-4 py-2 focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Buscar algo"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Transition.Root show={ open } as={ Fragment }>
                <Dialog
                    as="div"
                    className="relative z-10"
                    initialFocus={ cancelButtonRef }
                    onClose={ setOpen }
                >
                    <Transition.Child
                        as={ Fragment }
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={ Fragment }
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel
                                    className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8  h-screen   w-full sm:max-w-6xl sm:p-6">
                                    <div>
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={ 1.5 }
                                                stroke="currentColor"
                                                className="h-6 w-6 text-green-600"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-gray-900"
                                            >
                                                <input
                                                    id="searchInput"
                                                    ref={ searchInput }
                                                    onChange={ ( event ) => onSearch( event.target.value ) }
                                                    className="bg-gray-100    w-full px-3  py-2 focus:outline-none focus:shadow-outline"
                                                    type="text"
                                                    placeholder="Buscar algo"
                                                />
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <span className="text-lg font-bold text-gray-700" />
                                                <div className="grid grid-cols-3 h-screen overflow-y-auto">
                                                    { results.slice( 0, 20 ).map( ( restaurant, index ) => {
                                                        return (
                                                            <div
                                                                key={ `${ Math.random() }
                                    restaurantInSearch-${
                                                                    restaurant.restaurant_id + index
                                                                }-${ restaurant.slug }` }
                                                                className="col-span-3 my-2 lg:col-span-1"
                                                            >
                                                                { restaurant.type ? (
                                                                    <RestaurantCard
                                                                        onClickFunction={ handleAction }
                                                                        restaurant={ restaurant }
                                                                    />
                                                                ) : (

                                                                    <CardProductVertical
                                                                        onClickFunction={ handleActionProduct }
                                                                        onClickVisitStore={ handleAction }
                                                                        experience={ false }
                                                                        search={ true }
                                                                        rating={ 4 }
                                                                        price={ restaurant.price }
                                                                        img={
                                                                            restaurant.photos[0]?.path_photo ??
                                                                            '/assets/img/sinfotos.jpg'
                                                                        }
                                                                        name={ restaurant.name }
                                                                        slug={ restaurant.slug }
                                                                        id={ restaurant.id }
                                                                        restaurantId={ restaurant.restaurant_id }
                                                                        restaurantName={ restaurant?.restaurant?.name }
                                                                        restaurantSlug={ restaurant?.restaurant?.slug }
                                                                    />
                                                                ) }
                                                            </div>
                                                        );
                                                    } ) }

                                                    { results.length === 0 && (
                                                        <div
                                                            className="col-span-3 my-2 lg:col-span-3 text-center justify-center mx-auto px-20">
                                                            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                                                                <div className="p-4">
                                                                    <div className="flex items-center">
                                                                        <div className="text-gray-600">
                                                                            No se encontraron resultados
                                                                            <div className="flex items-center mt-4 text-gray-700">
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    fill="none"
                                                                                    viewBox="0 0 24 24"
                                                                                    strokeWidth={ 1.5 }
                                                                                    stroke="currentColor"
                                                                                    className="w-6 h-6 mr-2"
                                                                                >
                                                                                    <path
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"
                                                                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                                                                    />
                                                                                </svg>
                                                                                <span className="font-semibold">
                                          Intenta con otra palabra
                                        </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex  mt-14 justify-center ">
                                        <button
                                            type="button"
                                            className="w-32  lg:w-96    rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                                            onClick={ () => setOpen( false ) }
                                            ref={ cancelButtonRef }
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};

export default SearchPage;
