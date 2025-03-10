import React, { useState, useEffect } from "react";
import "./Homepage.scss";
import BG1 from "../../../Assets/Images/Background/background-one.jpg";
import BG2 from "../../../Assets/Images/Background/background-two.jpg";
import BG3 from "../../../Assets/Images/Background/background-three.jpg";
import BG4 from "../../../Assets/Images/Background/background-four.jpg";
import BG5 from "../../../Assets/Images/Background/background-five.jpg";
import QRCodeClientIcon from "../../../Assets/Icons/qr-code-client.png";
import CustomIcon from "../../../Assets/Icons/custom-client.png";
import StorageIcon from "../../../Assets/Icons/storage-client.png";
import MemoriesIcon from "../../../Assets/Icons/memories-client.png";
import Utils from "../../../Utils/utils";
import { getProducts } from "../../../Actions/ProductActions";
import ProductTeaser from "../../../Components/General/ProductTeaser/ProductTeaser";

const Homepage = () => {
  const [style, setStyle] = useState({});
  const [products, setProducts] = useState([]);

  const setBackground = () => {
    let images = [BG1, BG2, BG3, BG4, BG5];
    const randomBG = Utils.setBackground(images);
    setStyle(randomBG);
  };

  const handleGetProducts = async () => {
    const result = await getProducts();
    setProducts(result.data);
  };

  const iconStyle = {
    width: "100px",
    height: "100px",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  useEffect(() => {
    setBackground();
    handleGetProducts();
  }, []);

  return (
    <div className="w-full">
      <div className="homepage__introduction" style={style}>
        <div className="absolute w-full h-screen top-0 left-0 homepage__overlay"></div>
        <div className="absolute top-3/4 left-2/4 translate-x-[-50%] translate-y-[-50%]">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
            Capture the Moment
          </h1>
          <p className="text-lg md:text-2xl font-light max-w-3xl mx-auto">
            Fiecare eveniment merită să fie păstrat pentru totdeauna.
            <br /> Alege produsele noastre pentru amintiri autentice.
          </p>
        </div>
      </div>
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">Ce oferim?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
            {/* <!-- QR Code --> */}
            <div className="bg-white p-6 rounded-lg shadow-md max-w-[360px] m-auto sm:max-w-none">
              <div
                className="mb-4 mx-auto"
                style={{
                  ...iconStyle,
                  backgroundImage: `url(${QRCodeClientIcon})`,
                  borderRadius: "50%",
                }}
              ></div>
              <h3 className="text-xl font-medium text-gray-800">QR Code</h3>
              <p className="text-gray-600 mt-2">
                Fiecare eveniment beneficiază de un cod QR personalizat, ce
                adaugă un plus de interactivitate și amintiri accesibile&nbsp;oricând.
              </p>
            </div>
            {/* <!-- Diversitate între Pachete --> */}
            <div className="bg-white p-6 rounded-lg shadow-md max-w-[360px] m-auto sm:max-w-none">
              <div
                className="mb-4 mx-auto"
                style={{
                  ...iconStyle,
                  backgroundImage: `url(${CustomIcon})`,
                  borderRadius: "50%",
                }}
              ></div>
              <h3 className="text-xl font-medium text-gray-800">Diversitate</h3>
              <p className="text-gray-600 mt-2">
                Oferim pachete personalizate care se potrivesc perfect
                cerințelor fiecărui client, de la durata evenimentului până la
                opțiunile foto&nbsp;și&nbsp;video.
              </p>
            </div>
            {/* <!-- Storage pentru Evenimente --> */}
            <div className="bg-white p-6 rounded-lg shadow-md max-w-[360px] m-auto sm:max-w-none">
              <div
                className="mb-4 mx-auto"
                style={{
                  ...iconStyle,
                  backgroundImage: `url(${StorageIcon})`,
                  borderRadius: "50%",
                }}
              ></div>
              <h3 className="text-xl font-medium text-gray-800">Storage</h3>
              <p className="text-gray-600 mt-2">
                Toate fotografiile și videoclipurile vor fi stocate digital
                pentru a fi pentru 120 zile, păstrând amintirile&nbsp;intacte.
              </p>
            </div>
            {/* <!-- Amintiri Digitale și Fizice --> */}
            <div className="bg-white p-6 rounded-lg shadow-md max-w-[360px] m-auto sm:max-w-none">
              <div
                className="mb-4 mx-auto"
                style={{
                  ...iconStyle,
                  backgroundImage: `url(${MemoriesIcon})`,
                  borderRadius: "50%",
                }}
              ></div>
              <h3 className="text-xl font-medium text-gray-800">Amintiri</h3>
              <p className="text-gray-600 mt-2">
                Oferim atât poze tipărite, cât și fișiere digitale, astfel încât
                amintirile tale să fie păstrate într-un mod tangibil și accesibil&nbsp;online.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 text-center mt-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Despre Noi</h2>
        <p className="text-lg text-gray-700 mb-6">
          La MemCo, transformăm fiecare eveniment într-o amintire de neuitat.
          Oferim pachete personalizate pentru nunți, botezuri și alte evenimente
          speciale, cu opțiuni foto și video adaptabile nevoilor tale. Fiecare
          detaliu contează și suntem aici&nbsp;pentru&nbsp;a-l&nbsp;face&nbsp;perfect.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Cu ajutorul tehnologiei inovative, inclusiv a codurilor QR
          personalizate, creăm experiențe interactive pentru invitați, iar
          amintirile sunt accesibile oricând. Ne adaptăm fiecărui client, iar
          scopul nostru este să aducem magie și să facem ca fiecare eveniment&nbsp;să
          rămână&nbsp;în&nbsp;inimile&nbsp;tuturor.
        </p>
        <p className="text-lg text-gray-700">
          Vrem ca evenimentele tale să fie memorabile și să îți aduci aminte cu
          drag de noi. Ne bucurăm să te avem alături și să putem transforma
          momentele speciale&nbsp;în&nbsp;amintiri&nbsp;de&nbsp;neuitat.
        </p>
      </div>
      <div className="my-12 w-3/4 mx-auto h-[1px] bg-gray-300 rounded-lg"></div>
      <div className="max-w-6xl mx-auto px-4 text-center mt-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Descoperă Produsele Noastre
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Fiecare dintre produsele noastre este gândit să aducă un plus de
          distracție și amintiri de neuitat la evenimentul tău. Alege ce ți se
          potrivește și fă-ți evenimentul special cu
          ajutorul&nbsp;pachetelor&nbsp;noastre&nbsp;personalizate.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          Explorează opțiunile noastre și găsește pachetul perfect! Pentru mai
          multe detalii, alege produsul dorit și citește mai
          multe&nbsp;despre&nbsp;fiecare&nbsp;opțiune.
        </p>
      </div>
      <div className="flex justify-between items-center flex-wrap xl:w-[80%] w-full mx-auto mb-8">
        {products && products.map((item) => {
          return <ProductTeaser productData={item} key={item.id} />;
        })}
      </div>
    </div>
  );
};

export default Homepage;
