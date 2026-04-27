import React, { useState, Fragment, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { Trans } from '@lingui/react/macro'
import { t } from '@lingui/macro'
import apiManager from '../../api/apiManager';
import { setProvince, setMunicipality } from '../../redux/locationSlice';
import { LOCATION_PICKER_ENABLED, FIXED_PROVINCE, FIXED_MUNICIPALITY } from '../../utils/constants';
import { toast } from 'react-toastify';
import { LoadingSmall } from '../../common/LoadingSmall';
import Select from 'react-select';

const COOKIE_CONSENT_KEY = 'yavoy_cookie_consent';

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
    const [ hasCookieConsent, setHasCookieConsent ] = useState( () => {
        try {
            return window.localStorage.getItem( COOKIE_CONSENT_KEY ) === 'accepted';
        } catch {
            return false;
        }
    } );

    const onLocationFormOpen = () => setIsLocationFormOpen( true );
    const onLocationFormClose = () => setIsLocationFormOpen( false );

    const dispatch = useDispatch();
    // When the picker is disabled, dispatch the fixed location once on mount.
    useEffect( () => {
        if (!LOCATION_PICKER_ENABLED) {
            dispatch( setProvince( FIXED_PROVINCE ) );
            dispatch( setMunicipality( FIXED_MUNICIPALITY ) );
        }
    }, [] ); // eslint-disable-line react-hooks/exhaustive-deps

    const cancelButtonRef = useRef( null );

    const fetchProvinces = useCallback( async () => {
        setLoadingProvinces( true );
        try {
            const json = await apiManager.getLocationData();
            if (json.code === 'ok') {
                const provincesOptions = json.data.provinces.map( ( province ) => ( {
                    value: province,
                    label: province.name,
                } ) );
                setProvinces( provincesOptions );
            }
        } catch {
            toast.error( t`Failed to load provinces. Please try again.` );
        } finally {
            setLoadingProvinces( false );
        }
    }, [] );

    const fetchMunicipalitiesByProvince = useCallback( async ( selected ) => {
        if (!selected?.value?.id) return;
        try {
            const jsonM = await apiManager.getMunicipalities( selected.value.id );
            if (jsonM.code === 'ok') {
                const municipalitiesOptions = jsonM.data.map( ( item ) => ( {
                    value: item,
                    label: item.name,
                } ) );
                setMunicipalities( municipalitiesOptions );
            }
        } catch {
            toast.error( t`Failed to load municipalities. Please try again.` );
        }
    }, [] );

    // Auto-open on first visit when no location has been set (picker mode only)
    useEffect( () => {
        if (LOCATION_PICKER_ENABLED && getMunicipality.value?.id === 0) {
            onLocationFormOpen();
        }
    }, [] ); // eslint-disable-line react-hooks/exhaustive-deps

    // Load provinces when the dialog opens
    useEffect( () => {
        if (isLocationFormOpen) {
            fetchProvinces();
        }
    }, [ isLocationFormOpen, fetchProvinces ] );

    // Load municipalities whenever the selected province changes (while the dialog is open)
    useEffect( () => {
        if (isLocationFormOpen && provinceSelected?.value?.id) {
            fetchMunicipalitiesByProvince( provinceSelected );
        }
    }, [ provinceSelected, isLocationFormOpen, fetchMunicipalitiesByProvince ] );

    const storeLocation = useCallback( async () => {
        if (cart?.length > 0) {
            try {
                const response = await apiManager.getZones( cart[0].restaurantId );
                if (response.code === 'ok') {
                    const canDeliver = response.zones.some(
                        ( zone ) => zone.municipalitie_id === municipalitySelected.value.id,
                    );
                    if (canDeliver) {
                        dispatch( setProvince( provinceSelected ) );
                        dispatch( setMunicipality( municipalitySelected ) );
                        onLocationFormClose();
                    } else {
                        toast.warning(
                            t`You cannot change to this location because the restaurant in your cart does not deliver there`,
                            { position: 'top-center', autoClose: 5000 },
                        );
                    }
                }
            } catch {
                toast.error( t`Failed to validate delivery zones. Please try again.` );
            }
        } else {
            dispatch( setProvince( provinceSelected ) );
            dispatch( setMunicipality( municipalitySelected ) );
            onLocationFormClose();
        }
    }, [ cart, dispatch, municipalitySelected, provinceSelected ] );

    const setValuesByDefault = () => {
        setProvinceSelected( getProvince );
        setMunicipalitySelected( getMunicipality );
    };

    const acceptCookieConsent = () => {
        try {
            window.localStorage.setItem( COOKIE_CONSENT_KEY, 'accepted' );
        } catch {
            // localStorage not available
        }
        setHasCookieConsent( true );
    };

    const handleAccept = () => {
        if (municipalitySelected?.value?.id > 0) {
            storeLocation();
        } else {
            toast.warning( t`Please select a province and a municipality`, {
                position: 'top-center',
                autoClose: 4000,
            } );
        }
    };

    const handleCancel = () => {
        if (getMunicipality.value.id > 0) {
            onLocationFormClose();
            setValuesByDefault();
        }
    };

    if (!LOCATION_PICKER_ENABLED) {
        return null;
    }

    return (
        <>
            <div className="flex py-3 mx-auto bg-gray-200 mt-1 mb-3 rounded-lg px-3 lg:w-3/4">
                <button
                    className="btn flex mx-auto"
                    onClick={ () => setIsLocationFormOpen( !isLocationFormOpen ) }
                    aria-expanded={ isLocationFormOpen }
                    aria-haspopup="dialog"
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
                        <Trans>Delivery set to</Trans> { getMunicipality.label }
                    </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={ 1.5 }
                        stroke="currentColor"
                        className="w-6 ml-3 h-6"
                        aria-hidden="true"
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
                                    { !hasCookieConsent && (
                                        <div className="mb-4 rounded-md border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
                                            <p>
                                                <Trans>We use our own and third-party cookies to optimize your experience on the platform. By continuing to browse, you agree to their use.</Trans>
                                            </p>
                                            <button
                                                type="button"
                                                className="mt-2 inline-flex rounded-md bg-main px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-red-700"
                                                onClick={ acceptCookieConsent }
                                            >
                                                { t`I agree` }
                                            </button>
                                        </div>
                                    ) }
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
                                                <Trans>Please set a delivery address</Trans>
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    <Trans>We will show you results based on this address</Trans>
                                                </p>
                                            </div>
                                            { loadingProvinces ? (
                                                <div className="my-20">
                                                    <LoadingSmall />
                                                </div>
                                            ) : (
                                                <div className="flex my-5 flex-col">
                                                    <Select
                                                        inputId="province-select"
                                                        name="province"
                                                        options={ provinces }
                                                        className="react-select-container my-5"
                                                        classNamePrefix="react-select"
                                                        placeholder={ t`Select province` }
                                                        value={ provinceSelected?.value?.id ? provinceSelected : null }
                                                        onChange={ ( event ) => {
                                                            setMunicipalitySelected( { label: '', value: { id: 0 } } );
                                                            setMunicipalities( [] );
                                                            setProvinceSelected( event );
                                                        } }
                                                    />
                                                    { (municipalities?.length > 0 || provinceSelected.value?.id > 0) && (
                                                        <Select
                                                            inputId="municipality-select"
                                                            name="municipality"
                                                            options={ municipalities }
                                                            className="react-select-container"
                                                            classNamePrefix="react-select"
                                                            placeholder={ t`Select municipality` }
                                                            value={ municipalitySelected?.value?.id ? municipalitySelected : null }
                                                            onChange={ ( event ) => setMunicipalitySelected( event ) }
                                                        />
                                                    ) }
                                                </div>
                                            ) }
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-main px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                                            onClick={ handleAccept }
                                        >
                                            <Trans>Accept</Trans>
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                                            onClick={ handleCancel }
                                            ref={ cancelButtonRef }
                                        >
                                            <Trans>Cancel</Trans>
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
