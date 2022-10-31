import React, { useState, useEffect } from "react";
import CardCategory from "../Misc/CardCategory";

const CategoryWidget = (props) => {
  const { categoryName, categorySlug } = props;

  const [productByCategory, setProductByCategory] = useState([]);

  async function getProductsByCategory() {
    await fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProductByCategory(json));
  }

  useEffect(() => {
    getProductsByCategory();
  }, []);

  return (
    <div className="flex px-3 mb-20 flex-col">
      <h2 className="title pb-6">{categoryName}</h2>
      <hr className="separator" />
      <div className="grid mt-3 grid-cols-12">
        <div className="col-span-12 lg:col-span-4">
           {categorySlug === 'electronica' ?
                 <img src="/assets/img/electronic.png" /> :
                 (categorySlug === 'ropa') ? <img src="/assets/img/ropa.png" /> : (categorySlug === 'comida') ? <img src="/assets/img/comida.jpg" />
                 : ""
                 } 
    
        </div>
        <div className="col-span-12 lg:col-span-8">
          <div className="grid grid-cols-12">
            {productByCategory.splice(0, 8).map((product) => {
              return (
                <div key={product.id} className="col-span-6 lg:col-span-3">
                  <CardCategory img={product.image} price={product.price} title={product.title}/>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryWidget;
