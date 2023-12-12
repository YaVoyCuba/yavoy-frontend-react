import React from 'react';

import apiManager from '../../api/apiManager';
import { Link, useSearchParams } from 'react-router-dom';

const RestaurantCard = ( props ) => {
    const [searchParams] = useSearchParams();
    const locationParamsSearch = searchParams.get('location');
    const restaurant = props.restaurant;
    const onClick = props.onClickFunction;
    return (
        <div>
            { onClick ? (
                <div
                    onClick={ () => onClick( restaurant.slug ) }
                    className="grid grid-cols-3 rounded-lgmy-3 lg:my-2   mx-0 lg:mx-2 bg-white shadow-lg cursor-pointer hover:opacity-80"
                >
                    <div
                        className="col-span-1 bg-contain aspect-4/3 h-full w-32  object-cover "
                        style={ {
                            backgroundImage:        `url(${ apiManager.UrlBase + restaurant.avatar })`,
                            backgroundPosition:     'center',
                            backgroundSize:         'contain',
                            backgroundRepeat:       'no-repeat',
                            borderTopLeftRadius:    '7px',
                            borderBottomLeftRadius: '7px',
                        } }
                    />
                    <div className="col-span-2  h-auto max-h-32 pb-1 ml-3 lg:ml-0">
                        <div className="flex justify-between p-3">
              <span className="inline-block   h-7 w-7 rounded-full overflow-hidden bg-gray-100">
                <img
                    className="h-full w-full text-gray-300 "
                    src={ `${ apiManager.UrlBase + restaurant.avatar }` }
                />
              </span>
                            { restaurant.valoration > 0 && (
                                <span className="text-lg px-3 flex color">
                  { restaurant.valoration }
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 pt-1"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                    <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
                            ) }
                        </div>
                        <div>
                            <div className="flex justify-between">
                <span className="text-md pl-3 pr-0.5 pb-0 color uppercase font-bold ">
                  { restaurant.name }
                </span>
                            </div>
                            { restaurant.products_count > 1 && (
                                <span className="text-md -mt-7 -pt-3 px-3 pb-5 color">
                  { restaurant.products_count } productos
                </span>
                            ) }
                            { restaurant.products_count === 1 && (
                                <span className="text-md -mt-7 -pt-3 px-3 pb-5 color">
                  { restaurant.products_count } productos
                </span>
                            ) }
                        </div>
                    </div>
                </div>
            ) : (
                <Link className="cursor-pointer"
                      to={{ pathname: '/restaurants/' + restaurant.slug, search: 'location=' + locationParamsSearch }}
                >
                    <div
                        className="grid grid-cols-3 rounded-lgmy-3 lg:my-2   mx-0 lg:mx-2 bg-white shadow-lg cursor-pointer hover:opacity-80">
                        <div
                            className="col-span-1 bg-contain aspect-4/3 h-full w-32  object-cover "
                            style={ {
                                backgroundImage:        `url(${
                                    apiManager.UrlBase + restaurant.avatar
                                })`,
                                backgroundPosition:     'center',
                                backgroundSize:         'contain',
                                backgroundRepeat:       'no-repeat',
                                borderTopLeftRadius:    '7px',
                                borderBottomLeftRadius: '7px',
                            } }
                        />
                        <div className="col-span-2  h-auto max-h-32 pb-1 ml-3 lg:ml-0">
                            <div className="flex justify-between p-3">
                <span className="inline-block   h-7 w-7 rounded-full overflow-hidden bg-gray-100">
                  <img
                      className="h-full w-full text-gray-300 "
                      src={ `${ apiManager.UrlBase + restaurant.avatar }` }
                  />
                </span>
                                { restaurant.valoration > 0 && (
                                    <span className="text-lg px-3 flex color">
                    { restaurant.valoration }
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 pt-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                      <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                                ) }
                            </div>
                            <div>
                                <div className="flex justify-between">
                  <span className="text-md pl-3 pr-0.5 pb-0 color uppercase font-bold ">
                    { restaurant.name }
                  </span>
                                </div>
                                { restaurant.products_count > 1 && (
                                    <span className="text-md -mt-7 -pt-3 px-3 pb-5 color">
                    { restaurant.products_count } productos
                  </span>
                                ) }
                                { restaurant.products_count === 1 && (
                                    <span className="text-md -mt-7 -pt-3 px-3 pb-5 color">
                    { restaurant.products_count } producto
                  </span>
                                ) }
                            </div>
                        </div>
                    </div>
                </Link>
            ) }
        </div>
    );
};

export default RestaurantCard;
