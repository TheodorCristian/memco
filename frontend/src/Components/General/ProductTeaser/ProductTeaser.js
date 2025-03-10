import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../Contexts/AuthContext";
import { useCart } from "../../../Contexts/CartContext";
import { useLocation } from "react-router";
const ProductTeaser = ({ productData }) => {
  const {addToCart} = useCart();
  const currentUrl = useLocation();
  const navigate = useNavigate();

  const style = {
    backgroundImage: `url(${productData.data.productImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: "100%",
    minHeight: "240px",
  };
  

  const {verifyToken, loading, user} = useAuth();

  useEffect(() => {
    let pendingproduct = sessionStorage.getItem('pendingProduct')
  }, [])

  const handleAddToCart = async (product) => {
    //
    try {
      let isUserAuthenticated = await verifyToken();
      if (isUserAuthenticated) {
        const uid = user.tokenResult.uid;
        addToCart(product, uid);
      } else {
        sessionStorage.setItem('pendingProduct', JSON.stringify(product));
        sessionStorage.setItem('historicPage', currentUrl.pathname);

        alert('Trebuie sa fiti logat pentru a putea continua!');
        setTimeout(() => {
          navigate('/signin')
        }, 2000)
      }

    } catch (error) {

    }
  }


  return (
    // <div
    //   key={productData.id}
    //   className="flex justify-start items-center max-w-md flex-col mt-24 border-2 border-black min-h-[500px]"
    // >
    //   <div style={style}></div>
    //   <h3
    //     onClick={() => {
    //       navigate(`/product/${productData.data.productSlug}`);
    //     }}
    //   >
    //     {productData.data.productName}
    //   </h3>
    //   <p>{productData.data.productDescription[0]}</p>
    // </div>

    <div className="mx-auto bg-white rounded-lg shadow-lg my-5 mt-10">
      <div className="flex flex-col justify-start items-center max-w-md">
        <div className="w-full mb-4 rounded-t-lg cursor-pointer"  style={style} onClick={() => {
          navigate(`/product/${productData.data.productSlug}`);
        }}>
        </div>
        <div className="w-full px-10 min-h-[300px]">
          <h2 className="text-1xl md:text-2xl font-semibold text-gray-800 mb-4">
            {productData.data.productName}
          </h2>
          <p className="text-base md:text-lg text-gray-600 py-5">
          {productData.data.productShortDescription}
          </p>
          <button onClick={() => {handleAddToCart(productData)}}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductTeaser;
