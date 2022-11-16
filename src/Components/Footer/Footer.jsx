import React from "react";
import { useSelector } from "react-redux";

const Footer = (props) => {
  const info = useSelector((state) => state.info.info);

  return (
    <>
      {info && (
        <div className="bg-main">
          <div className="max-w-7xl mx-auto pt-12 px-4 overflow-hidden sm:px-6 lg:px-8">
            <p className="text-center font-medium text-white ">
              {" "}
              Estamos en las redes
            </p>

            <div className="mt-1 flex justify-center space-x-6 ">
              {info.facebook && (
                <a
                  target="_blank"
                  href={info.facebook}
                  className="text-white hover:text-gray-500"
                >
                  <span className="sr-only">Facebook</span>
                  <img className="w-6 h-6" src="/assets/img/facebook.svg" />
                </a>
              )}

              {info.telegram && (
                <a
                  target="_blank"
                  href={info.telegram}
                  className="text-white hover:text-gray-500"
                >
                  <span className="sr-only">telegram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="27"
                    height="27"
                    viewBox="0 0 226 226"
                  >
                    <g
                      fill="none"
                      fillRule="nonzero"
                      stroke="none"
                      strokeWidth="1"
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      strokeMiterlimit="10"
                      strokeDasharray=""
                      strokeDashoffset="0"
                      fontFamily="none"
                      fontWeight="none"
                      fontSize="none"
                      textAnchor="none"
                    >
                      <path d="M0,226v-226h226v226z" fill="none"></path>
                      <g fill="#ffffff">
                        <path d="M199.19561,31.03638c-1.91713,0.08266 -3.82694,0.5944 -5.57827,1.27456h-0.00552c-1.70661,0.66613 -12.67075,5.20853 -28.65278,11.84072c-15.98203,6.6322 -36.7546,15.2663 -57.34971,23.83042c-41.19021,17.12825 -81.66567,33.97725 -81.66567,33.97725l0.18208,-0.06621c0,0 -2.25867,0.73999 -4.5189,2.26773c-1.13012,0.76387 -2.31661,1.7398 -3.25537,3.09536c-0.93876,1.35556 -1.59948,3.21206 -1.34629,5.20308c0.45692,3.59307 2.906,5.94333 4.9272,7.35493c2.0212,1.41161 3.96162,2.08013 3.96162,2.08013l0.02207,0.01103l39.58862,13.08769c0.65144,2.26721 11.23316,39.11468 13.72773,46.8939c1.30483,4.07349 2.51156,6.33475 3.6416,7.75771c0.56502,0.71148 1.123,1.21668 1.68286,1.56148c0.24069,0.14823 0.47921,0.24849 0.71177,0.33657c0.03791,0.01441 0.07841,0.04238 0.11587,0.05518c0.07979,0.02724 0.1224,0.02696 0.2207,0.04966c3.72981,1.37961 6.88042,-1.02627 6.88042,-1.02627l0.08828,-0.06621l27.14097,-23.88008l40.14038,32.18955l0.35313,0.15449c6.44155,2.77487 11.76569,1.25044 14.85884,-1.1918c3.09315,-2.44224 4.34785,-5.63897 4.34785,-5.63897l0.09932,-0.24829l28.95625,-146.46411c0.70963,-3.13314 0.78103,-5.76311 0.16553,-8.02256c-0.61549,-2.25945 -2.04714,-4.09659 -3.82368,-5.12583c-1.77654,-1.02924 -3.69977,-1.37378 -5.61689,-1.29111zM199.3501,36.78569c1.12445,-0.04838 2.07215,0.10609 2.63189,0.43037c0.55973,0.32428 0.9235,0.69607 1.20283,1.72148c0.27934,1.02541 0.34671,2.75627 -0.22622,5.28584l-0.01103,0.03862l-28.84038,145.8958c-0.0424,0.09766 -0.7854,1.84508 -2.5436,3.2333c-1.77277,1.39971 -4.18561,2.43399 -8.90537,0.48003l-64.52256,-51.74385c-0.54265,-0.5702 -1.29857,-0.88817 -2.08564,-0.8773c-1.5454,-0.01845 -2.81882,1.20826 -2.85811,2.75327l-7.35493,39.40654c-0.37604,-0.86597 -0.78126,-1.88207 -1.21939,-3.24985c-2.27685,-7.10024 -12.51538,-42.6522 -13.52358,-46.15454l101.26963,-65.56538c0.30058,1.2922 1.45978,2.20119 2.78638,2.18496c0.86273,0.01031 1.68289,-0.37415 2.22684,-1.04388c0.54395,-0.66973 0.75206,-1.55129 0.56505,-2.39358c0.07505,-0.8645 0.00267,-1.71467 -0.37519,-2.56016c-0.60969,-1.36418 -2.05306,-2.19474 -3.07881,-2.38911c-2.0515,-0.38874 -3.38779,0.35864 -3.38779,0.35864l-0.2814,0.10483l-103.42148,66.96685l-39.63828,-13.10425l-0.01104,-0.00552c-0.01049,-0.00363 -1.25574,-0.45298 -2.58223,-1.3794c-1.33207,-0.93032 -2.39006,-2.13775 -2.55464,-3.43193c-0.05756,-0.45261 0.02938,-0.75927 0.38623,-1.27456c0.35685,-0.51529 1.0184,-1.12441 1.77114,-1.6332c1.50549,-1.01759 3.16709,-1.59458 3.16709,-1.59458l0.08828,-0.03311l0.0938,-0.03862c0,0 40.47125,-16.84954 81.66016,-33.97725c20.59445,-8.56385 41.37013,-17.19372 57.34971,-23.8249c15.97958,-6.63118 27.39182,-11.34966 28.53692,-11.79658c1.26011,-0.48939 2.5613,-0.74063 3.68574,-0.78901zM167.23779,72.60029l-2.26221,1.13662l-0.44693,2.49395l1.73252,1.84839l0.97661,0.17105l2.26221,-1.1311l0.44692,-2.49394l-1.727,-1.84839zM159.3311,80.2311l-2.26221,1.1311l-0.44692,2.49395l1.727,1.84839l0.98213,0.17656l2.26221,-1.13662l0.44692,-2.48843l-1.73252,-1.84839zM151.4189,87.8564l-2.26221,1.13662l-0.44692,2.48843l1.727,1.84839l0.98213,0.17656l2.26221,-1.1311l0.44692,-2.49395l-1.727,-1.84839zM143.51221,95.48721l-2.26772,1.1311l-0.44141,2.49394l1.727,1.84839l0.98213,0.17656l2.26221,-1.13662l0.44693,-2.48843l-1.73252,-1.85391zM135.6,103.1125l-2.26221,1.13662l-0.44692,2.48843l1.727,1.84839l0.98213,0.17656l2.26221,-1.1311l0.44692,-2.49394l-1.727,-1.84839zM127.68779,110.73779l-2.26221,1.13662l-0.44693,2.49395l1.73252,1.84839l0.97661,0.17105l2.26772,-1.1311l0.44141,-2.49394l-1.727,-1.84839zM119.7811,118.3686l-2.26221,1.1311l-0.44692,2.49395l1.727,1.84839l0.98213,0.17656l2.26221,-1.13662l0.44692,-2.48843l-1.73252,-1.84839zM111.8689,125.9939l-2.26221,1.13662l-0.44692,2.48843l1.73252,1.84839l0.97661,0.17656l2.26221,-1.1311l0.44692,-2.49395l-1.727,-1.84839zM103.96221,133.62471l-2.26772,1.1311l-0.44141,2.49394l1.727,1.84839l0.98213,0.17656l2.26221,-1.13662l0.44693,-2.49395l-1.73252,-1.84839zM97.95908,149.22842l17.28657,13.86016l-23.77525,20.91162z"></path>
                      </g>
                    </g>
                  </svg>
                </a>
              )}
              {info.instagram && (
                <a
                  target="_blank"
                  href={info.instagram}
                  className="text-white hover:text-gray-500"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              )}
              {info.twitter && (
                <a
                  target="_blank"
                  href={info.twitter}
                  className="text-white hover:text-gray-500"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              )}
            </div>
            <div className="max-w-7xl mt-7 mx-auto pb-12 t-7 px-4 overflow-hidden sm:px-6 lg:px-8">
              <p className="text-center font-medium text-white">
                ¿Necesitas ayuda?
              </p>

              <div className="mt-1 flex justify-center space-x-6 ">
                {info.wa && (
                  <a
                    target="_blank"
                    href={info.wa}
                    className="text-white hover:text-gray-500"
                  >
                    <span className="sr-only">WA</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 3h5m0 0v5m0-5l-6 6M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z"
                      />
                    </svg>
                  </a>
                )}

                {info.mail && (
                  <a
                    target="_blank"
                    href={info.mail}
                    className="text-white hover:text-gray-500"
                  >
                    <span className="sr-only">Mail</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </a>
                )}
              </div>

              <br></br>

              <div className="flex flex-col text-center">
                <div className="flex text-white space-x-3 justify-center">
                  <a
                    className=" text-center text-base text-white"
                    href="https://app.yavoycuba.com/nuevacasa"
                  >
                    Añade tu alojamiento
                  </a>
                  {/* <span>|</span>
                  <a
                    className=" text-center text-base text-white"
                    href="https://app.yavoycuba.com/register"
                  >
                    Añade tu restaurante
                  </a> */}
                </div>
              </div>

              {/* <div className="flex mx-auto text-white my-3 text-center ">
                    <div className="mx-auto">
                        <a className="mx-1 text-white" href="{{ route('terms') }}">Registra tu restaurante</a>
                        <a className="mx-1 text-white" href="{{ route('new_house') }}">Registra tu casa</a>
                    </div>
                </div> */}

              {/* 
                <div className="flex mx-auto text-white my-3 text-center ">
                    <div className="mx-auto">
                        <a className="mx-1" href="{{ route('terms') }}">Terms and Conditions</a>
                        <a className="mx-1" href="{{ route('policy') }}">Privacy Policy</a>
                    </div>
                </div> */}
              <p className="mt-8 text-center text-base text-white">
                ©Ya Voy Cuba MarketPlace LLC 2021
              </p>
              <p className=" text-center text-base text-white">
                Desarrollado por{" "}
                <a href="https://crecexdiez.com/e/yavoy">CluzStudio</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
