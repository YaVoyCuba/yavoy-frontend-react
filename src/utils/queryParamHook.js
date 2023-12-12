import React from 'react';
import { useSearchParams } from 'react-router-dom';
import * as JSURL from 'jsurl';
import { DEFAULT_LOCATION_DATA } from './constants.js';

/**
 * This custom hook is a wrapper around `useSearchParams()` that parses and
 * serializes the search param value using the JSURL library, which permits any
 * JavaScript value to be safely URL-encoded.
 *
 */
const useQueryParam = () => {
    const key = 'location';
    let [ searchParams, setSearchParams ] = useSearchParams();
    let paramValueSTR = searchParams.get( key );

    if (!paramValueSTR) {
        paramValueSTR = JSURL.stringify( {
            province:     DEFAULT_LOCATION_DATA,
            municipality: DEFAULT_LOCATION_DATA,
        } );
    }

    let value = React.useMemo( () => JSURL.parse( paramValueSTR ), [ paramValueSTR ] );
    let setValue = React.useCallback(
        ( newValue, options ) => {
            let newSearchParams = new URLSearchParams( searchParams );
            newSearchParams.set( key, JSURL.stringify( newValue ) );
            setSearchParams( newSearchParams, options );
        },
        [ key, searchParams, setSearchParams ],
    );

    return [ value, setValue ];
};

export default useQueryParam;
