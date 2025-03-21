import React, { useState } from "react";
import "./JioMartApp.css";
import JioMartCartPage from "./JioMartCartPage";
import JioMartProductList from "./JioMartProductList";

const JioMartApp = () => {
  const [currentPage, setCurrentPage] = useState("productList");
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [products, setProducts] = useState([
    {
      id: "493857048",
      name: "Maggi",
      mrp: 12.0,
      jioMartPrice: 10.59,
      quantity: 0,
      category: "Noodles & Pasta",
    },
    {
      id: "491062929",
      name: "Fair & Lovely",
      mrp: 30.0,
      jioMartPrice: 25.55,
      quantity: 0,
      category: "Skin Care",
    },
    {
      id: "490985424",
      name: "Aashirvad",
      mrp: 17.0,
      jioMartPrice: 15.2,
      quantity: 0,
      category: "Soups Sweets Ready To Cook & Eat",
    },
    {
      id: "491458246",
      name: "Parle",
      mrp: 145.0,
      jioMartPrice: 127.3,
      quantity: 0,
      category: "Biscuits Cakes Rusks & Cookies",
    },
    {
      id: "491227606",
      name: "Hide & Seek",
      mrp: 50.0,
      jioMartPrice: 43.9,
      quantity: 0,
      category: "Biscuits Cakes Rusks & Cookies",
    },
  ]);

  const handleViewOrder = () => {
    // Filter products that have quantity > 0
    const productsToOrder = products.filter((product) => product.quantity > 0);
    setSelectedProducts(productsToOrder);
    setCurrentPage("cartPage");
    window.postMessage(
      {
        type: "view_order",
      },
      "*"
    );
  };

  console.log("products: 1", products, "selectedProducts: ", selectedProducts);

  return (
    <div className="jiomart-app">
      {currentPage === "productList" ? (
        <JioMartProductList
          products={products}
          onViewOrder={handleViewOrder}
          setProducts={setProducts}
        />
      ) : (
        <JioMartCartPage
          cartItems={selectedProducts}
          onBackToProducts={() => setCurrentPage("productList")}
        />
      )}
    </div>
  );
};

export default JioMartApp;
