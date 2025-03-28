import React, { useState } from "react";
import "./JioMartApp.css";
import JioMartCartPage from "./JioMartCartPage";
import JioMartProductList from "./JioMartProductList";
import { brandsList } from "./ProductJson";

const JioMartApp = () => {
  const [currentPage, setCurrentPage] = useState("productList");
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [products, setProducts] = useState(brandsList);

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
