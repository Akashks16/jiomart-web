import React, { useEffect, useState } from "react";
import "./JioMartProductList.css";

const JioMartProductList = ({ products, onViewOrder, setProducts }) => {
  // const [products, setProducts] = useState(initialProducts);

  const [searchParams, setSearchParams] = useState();
  const [filterProduct, setFilterProduct] = useState(products ?? []);

  // Function to handle quantity changes
  const updateQuantity = (id, change) => {
    setProducts(
      products.map((product) => {
        if (product.id === id) {
          const newQuantity = Math.max(0, product.quantity + change);
          return { ...product, quantity: newQuantity };
        }
        return product;
      })
    );
  };

  useEffect(() => {
    const handleMessage = (event) => {
      console.log("Received search request:1", event.data.payload);
      if (event.data?.type === "SEARCH_PRODUCT") {
        console.log("Received search request:", event.data.payload);
        // setSearchParams(event?.data?.payload);
        let prodList = [];
        if (
          event?.data?.payload &&
          Array.isArray(event?.data?.payload?.product) &&
          event?.data?.payload?.product.length > 0
        ) {
          event?.data?.payload?.product.map((_prod) => {
            const findProd = prodList.find(
              (_product) => _product?.name === _prod
            );
            if (!findProd)
              prodList = [
                ...prodList,
                {
                  id: "493857048",
                  name: _prod,
                  mrp: 12.0,
                  jioMartPrice: 10.59,
                  quantity: 0,
                  category: "",
                },
              ];
            return true;
          });
          // Handle the search logic here
          setFilterProduct(prodList);
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  // let filterProduct
  // if (searchParams && Array.isArray(searchParams?.product) && searchParams?.product.length > 0) {
  //   searchParams?.product.map(_prod => {
  //     filterProduct = [
  //       {
  //         id: "493857048",
  //         name: _prod,
  //         mrp: 12.0,
  //         jioMartPrice: 10.59,
  //         quantity: 0,
  //         category: "",
  //       },
  //     ]
  //   })
  // }

  // console.log("products: ", initialProducts);

  return (
    <div className="jiomart-container">
      <div className="jiomart-header">
        <div className="jiomart-logo">
          <div className="logo-icon"></div>
          <h1>JioMart</h1>
        </div>
        <div className="header-links">
          <span>Order History</span>
          <span className="separator">|</span>
          <span>Special Rates</span>
        </div>
      </div>

      <div className="jiomart-content">
        <div className="form-row">
          <div className="form-group">
            <label>State</label>
            <input type="text" value="UTTAR PRADESH" readOnly />
          </div>
          <div className="form-group">
            <label>City</label>
            <input type="text" value="PRAYAGRAJ" readOnly />
          </div>
        </div>

        <div className="mobile-order-section">
          <div className="mobile-number">
            <span>Mobile:</span>
            <span className="mobile-value">7406734555</span>
          </div>
          <button className="view-order-btn" onClick={onViewOrder}>
            View Order
          </button>
        </div>

        <div className="top-deals-header">
          <div className="discount-badge">30%</div>
          <h2>Top Deals</h2>
        </div>

        <div className="product-list">
          {filterProduct &&
            filterProduct.map((product) => (
              <div key={product.id} className="product-item">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-details">
                  <div className="price-details">
                    <div className="price-row">
                      <span className="mrp">
                        MRP Rs. {product.mrp.toFixed(2)}
                      </span>
                      <span className="jiomart-price">
                        JioMart Bhav Rs. {product.jioMartPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="product-code">
                      <span>Code: {product.id}</span>
                    </div>
                  </div>
                  <div className="quantity-controls">
                    <span>Qty</span>
                    <button
                      onClick={() => updateQuantity(product.id, -1)}
                      className="quantity-btn decrease"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={product.quantity}
                      className="quantity-input"
                      readOnly
                    />
                    <button
                      onClick={() => updateQuantity(product.id, 1)}
                      className="quantity-btn increase"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default JioMartProductList;
