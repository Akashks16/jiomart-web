import React, { useEffect, useState } from "react";
import "./JioMartProductList.css";

const JioMartProductList = ({ products, onViewOrder, setProducts }) => {
  // const [products, setProducts] = useState(initialProducts);

  const [searchParams, setSearchParams] = useState();
  // const [products, setProducts] = useState([]); // Make sure products state is initialized
  const [filterProduct, setFilterProduct] = useState([]);

  // ✅ Update `products` only when `searchParams` change
  useEffect(() => {
    if (searchParams?.product?.length > 0) {
      setProducts((prevProducts) => {
        let prodData = [...prevProducts];

        searchParams.product.forEach((_prod) => {
          const existingProduct = prevProducts.find((p) => p.name === _prod);

          if (!existingProduct) {
            prodData.push({
              id: "493857048",
              name: _prod,
              mrp: 12.0,
              jioMartPrice: 10.59,
              quantity: 0,
              category: "",
            });
          }
        });

        return prodData;
      });
    }
  }, [searchParams]); // ✅ Depend only on `searchParams`

  // ✅ Keep filterProduct updated separately
  useEffect(() => {
    if (searchParams?.product?.length > 0) {
      setFilterProduct(
        products.filter((p) => searchParams.product.includes(p.name))
      );
    } else {
      setFilterProduct(products);
    }
  }, [products, searchParams]); // ✅ Depend on `products` so updates render correctly

  // ✅ Keep updateQuantity function unchanged
  const updateQuantity = (name, change) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.name === name
          ? { ...product, quantity: Math.max(0, product.quantity + change) }
          : product
      )
    );
  };

  // ✅ Listen for messages
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === "SEARCH_PRODUCT") {
        console.log("Received search request:", event.data.payload);
        setSearchParams(event?.data?.payload);
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
                      onClick={() => updateQuantity(product.name, -1)}
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
                      onClick={() => updateQuantity(product.name, 1)}
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
