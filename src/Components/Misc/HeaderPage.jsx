import React from "react";

const HeaderPage = (props) => {


  const newShop = props.function;

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex justify-between max-w-7xl py-4    ">
        <h1 className="text-lg font-semibold leading-6 text-gray-900">
          {props.page}
        </h1>
        {props.function != null && (
          <div>
            <button onClick={newShop} className="bg-main hover:bg-gray-900 rounded-md px-5 py-1.5 text-white">
              {props.functionName}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderPage;
