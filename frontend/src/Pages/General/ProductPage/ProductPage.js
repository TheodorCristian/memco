import React, { useEffect, useState } from "react";
import {useParams} from 'react-router';
import {getProductBySlug} from '../../../Actions/ProductActions';


const ProductPage = () => {
  const [product, setProduct] = useState({});
  let {productSlug} = useParams();
  

  const handleGetProductBySlug = async () => {
      const result = await getProductBySlug(productSlug);
      setProduct(result.data)
}
  useEffect(() => {
    handleGetProductBySlug();
  }, [])


  return <div className="mt-28"><p>{product.productName}</p></div>;
};

export default ProductPage;
