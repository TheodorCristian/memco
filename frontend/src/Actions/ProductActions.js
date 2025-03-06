import appConfig from "../AppConfigurations/appConfig";

export const getProducts = async () => {
    return await fetch(`${appConfig.baseURL}/product/get-products`)
        .then(result => result.json())
        .then(data => data)

};

export const getProductBySlug = async (productSlug) => {
    return await fetch(`${appConfig.baseURL}/product/get-product-by-slug/${productSlug}`)
    .then(result => result.json())
    .then(data => data)
}