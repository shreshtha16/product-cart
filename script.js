const Products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 },
  ];
  
  function ProductList({ products, addToCart, removeFromCart, quantities }) {
    return (
      <div className="box">
        <h2>Products</h2>
        {products.map((product) => (
          <div key={product.id} className="product">
            <span className="product-name">{product.name} - ₹{product.price}</span>
            <div className="buttons">
              <button onClick={() => removeFromCart(product.id)} disabled={!quantities[product.id]}>-</button>
              <span>{quantities[product.id] || 0}</span>
              <button onClick={() => addToCart(product.id)}>+</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  function Cart({ cartItems }) {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
    return (
      <div className="box">
        <h2>Cart</h2>
        {cartItems.length === 0 ? (
          <p>No Product added to the cart</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <span className="cart-item-name">{item.name} x {item.quantity}</span>
                <span>{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="total">Total: ₹{total}</div>
          </>
        )}
      </div>
    );
  }
  
  function App() {
    const [cart, setCart] = React.useState({});
  
    const addToCart = (productId) => {
      setCart((prevCart) => ({
        ...prevCart,
        [productId]: (prevCart[productId] || 0) + 1,
      }));
    };
  
    const removeFromCart = (productId) => {
      setCart((prevCart) => {
        const newCart = { ...prevCart };
        if (newCart[productId] > 1) {
          newCart[productId] -= 1;
        } else {
          delete newCart[productId];
        }
        return newCart;
      });
    };
  
    const cartItems = Products.filter((product) => cart[product.id])
      .map((product) => ({
        ...product,
        quantity: cart[product.id],
      }));
  
    return (
      <div id="app">
        <ProductList
          products={Products}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          quantities={cart}
        />
        <Cart cartItems={cartItems} />
      </div>
    );
  }
  
  ReactDOM.render(<App />, document.getElementById('app'));
  