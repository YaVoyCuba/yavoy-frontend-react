import React, { useState, Fragment, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import apiManager from '../../api/apiManager';
import { setProvince, setMunicipality } from '../../redux/locationSlice';
import { toast } from 'react-toastify';
import { LoadingSmall } from '../../common/LoadingSmall';
import CookieConsent from 'react-cookie-consent';
import Select from 'react-select';

const Location = () => {

    const getProvince = useSelector( ( state ) => state.location.province );
    const getMunicipality = useSelector( ( state ) => state.location.municipality );
    const { cart } = useSelector( ( state ) => state.cart );
    const [ provinces, setProvinces ] = useState( [] );
    const [ municipalities, setMunicipalities ] = useState( [] );
    const [ loadingProvinces, setLoadingProvinces ] = useState( false );
    const [ provinceSelected, setProvinceSelected ] = useState( getProvince );
    const [ municipalitySelected, setMunicipalitySelected ] = useState( getMunicipality );
    const [ isLocationFormOpen, setIsLocationFormOpen ] = useState( false );

    const onLocationFormOpen = () => setIsLocationFormOpen( true );
    const onLocationFormClose = () => setIsLocationFormOpen( false );

    const dispatch = useDispatch();
    console.log(municipalitySelected)

    useEffect( () => {
        console.log( 'useEffect provinceSelected' );
        // get all municipalities by a province selected only if Location Form is open
        if (isLocationFormOpen) {
            setMunicipalitiesByProvince( provinceSelected ).then( r => {
            } );
        }
    }, [ provinceSelected ] );

    useEffect( () => {
        console.log( 'useEffect location 1' );
        if (getMunicipality.value?.id === 0) {
            console.log( 'useEffect location 1 - inside' );
            // open Location Form and throw useEffect "isLocationFormOpen"
            onLocationFormOpen();
        }
    }, [] );

    useEffect( () => {
        console.log( 'useEffect location 2' );
        if (isLocationFormOpen) {
            console.log( 'useEffect location 2 - inside' );
            getProvinces().then( r => {
                setMunicipalitiesByProvince( provinceSelected ).catch( err => {
                } );
            } ).catch( err => {
            } );
        }
    }, [ isLocationFormOpen ] );

    const getProvinces = async () => {
        console.log( 'getProvinces' );
        let json = await apiManager.getLocationData();
        if (json.code === 'ok') {
            const provincesOptions = json.data.provinces.map( ( province ) => {
                    // Ideally you can change the value to something different that is easier to keep track of like the UTC offset
                    return {
                        value: province,
                        label: province.name,
                    };
                },
            );
            setProvinces( provincesOptions );
            setLoadingProvinces( false );
        }
    };

    const setMunicipalitiesByProvince = async ( event ) => {
        let jsonM = await apiManager.getMunicipalities( event.value.id );
        if (jsonM.code === 'ok') {
            const municipalitiesOptions = jsonM.data.map( ( item ) => {
                    // Ideally you can change the value to something different that is easier to keep track of like the UTC offset
                    return {
                        value: item,
                        label: item.name,
                    };
                },
            );
            setMunicipalities( municipalitiesOptions );
            // setMunicipalitySelected( municipalitiesOptions[0] );
        }
    };

    const storeLocation = async () => {
        // close Location Form
        onLocationFormClose();

        if (cart?.length > 0) {
            console.log( '--> check cart: ', cart );
            let can = await checkIfNewLocationCanBeAddedWithRestaurantInCart();
            console.log( '--> can: ', can );
            if (can) {
                // save location to localstorage
                dispatch( setProvince( provinceSelected ) );
                dispatch( setMunicipality( municipalitySelected ) );
            } else {
                console.log( '--> can else: ', can );
                toast.warning(
                    'No puedes cambiar a esta ubicacion porque el restaurante de los productos del carrito no hace envíos a la misma',

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
            }
        } else {
            // save location to localstorage
            dispatch( setProvince( provinceSelected ) );
            dispatch( setMunicipality( municipalitySelected ) );
        }
    };

    const checkIfNewLocationCanBeAddedWithRestaurantInCart = async () => {
        let isFound = false;
        let response = await apiManager.getZones( cart[0].restaurantId );

        if (response.code === 'ok') {
            isFound = response.zones.some( zone => {
                return zone.municipalitie_id === municipalitySelected.value.id;
            } );
        }

        console.log( '--> ', isFound, 'muniSelct: ', municipalitySelected );
        return isFound; //let zones = apiManager.getZones(cart[0].restaurantId);
    };

    const cancelButtonRef = useRef( null );
    return (
        <>
            <div className="flex py-3 mx-auto  bg-gray-200 mt-1 mb-3 rounded-lg px-3   lg:w-3/4">
                <button
                    className="btn flex mx-auto "
                    onClick={ ( event ) => {
                        setIsLocationFormOpen( !isLocationFormOpen );
                    } }
                >
                    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 17 21">
                        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                            <path d="M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                            <path
                                d="M13.8 12.938h-.01a7 7 0 1 0-11.465.144h-.016l.141.17c.1.128.2.252.3.372L8 20l5.13-6.248c.193-.209.373-.429.54-.66l.13-.154Z" />
                        </g>
                    </svg>
                    <span className="text-gray-700 text-sm font-medium pl-3">
            Delivery fijado en { getMunicipality.label }
          </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={ 1.5 }
                        stroke="currentColor"
                        className="w-6 ml-3 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                    </svg>
                </button>
            </div>

            <Transition.Root show={ isLocationFormOpen } as={ Fragment }>
                <Dialog
                    as="div"
                    className="relative z-10"
                    initialFocus={ cancelButtonRef }
                    onClose={ () => getMunicipality.label && onLocationFormClose() }
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
                                    className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    <CookieConsent buttonText="De acuerdo" overlay> Utilizamos cookies propias y de terceros para optimizar
                                        tu experiencia en la plataforma. Si sigue
                                        navegando estarás aceptando su uso.</CookieConsent>
                                    <div>
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                            <CheckIcon
                                                className="h-6 w-6 text-green-600"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Favor de establecer una dirección de entrega
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Te mostraremos los resultados en correspondencia a
                                                    esta dirección
                                                </p>
                                            </div>
                                            { loadingProvinces ? (
                                                <div className="my-20">
                                                    <LoadingSmall />
                                                </div>
                                            ) : (
                                                <div className="flex my-5 flex-col">
                                                    <Select
                                                        aria-labelledby="aria-label"
                                                        inputId="aria-example-input"
                                                        name="aria-live-province"
                                                        // onMenuOpen={onMenuOpen}
                                                        // ={onMenuClose}
                                                        options={ provinces }
                                                        // menuIsOpen={false}
                                                        className="react-select-container my-5"
                                                        classNamePrefix="react-select"
                                                        placeholder="Select a province"
                                                        value={ "" || provinceSelected }
                                                        onChange={ ( event ) => {
                                                            setProvinceSelected( event );
                                                        } }
                                                    />
                                                    {
                                                        (municipalities?.length > 0 ||
                                                            provinceSelected.value?.id > 0) && (
                                                            <Select
                                                                aria-labelledby="aria-label"
                                                                inputId="aria-example-input"
                                                                name="aria-live-municipalities"
                                                                options={ municipalities }
                                                                className="react-select-container"
                                                                classNamePrefix="react-select"
                                                                placeholder="Select a municipality"
                                                                value={ municipalitySelected }
                                                                onChange={ ( event ) => {
                                                                    setMunicipalitySelected( event );
                                                                } }
                                                            />
                                                        )
                                                    }
                                                </div>
                                            ) }
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-main px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                                            onClick={ () => {
                                                municipalitySelected?.value?.id > 0 ?
                                                    storeLocation() : alert( 'Selecciona una provincia y un municipio' );
                                            }
                                            }
                                        >
                                            Aceptar
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                                            onClick={ () => {
                                                getMunicipality.value.id > 0 && onLocationFormClose();
                                            } }
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

export default Location;
