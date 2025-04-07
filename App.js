import React, { useState } from 'react';
import './App.css';

// Tipo de cambio aproximado (1 USD = 18 MXN)
const EXCHANGE_RATE = 18;

// Función para convertir precios a MXN
const convertToMXN = (usdPrice) => usdPrice * EXCHANGE_RATE;

// Datos de productos con precios en MXN
const PRODUCTS = [
  {
    id: 1,
    title: "Air Max 90",
    brand: "Nike",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwdYUd43KQppP7anV-yPzH2dnHN94BGwQemw&s",
    description: "Zapatillas clásicas con amortiguación visible.",
    price: convertToMXN(100),
    colors: ["Blanco", "Negro", "Rojo", "Azul"],
    sizes: ["22", "23", "24", "25", "26", "27", "28"]
  },
  {
    id: 2,
    title: "Ultraboost",
    brand: "Adidas",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR50a62TAN0uLzUFo0E7DopKOKsZkXuWdplhQ&s",
    description: "Amortiguación responsive para máxima energía.",
    price: convertToMXN(145),
    colors: ["Negro", "Blanco", "Gris", "Rojo"],
    sizes: ["23", "24", "25", "26", "27", "28"]
  },
  {
    id: 3,
    title: "Classic Leather",
    brand: "Reebok",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCh_uY8TQlfCyUlMPlGtRdpBW-T9MgQJUkNA&s",
    description: "Icono de estilo con comodidad duradera.",
    price: convertToMXN(85),
    colors: ["Blanco", "Negro", "Azul Marino"],
    sizes: ["24", "25", "26", "27", "28"]
  },
  {
    id: 4,
    title: "Chuck Taylor All Star",
    brand: "Converse",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxFhoYU5IqjnRFJHXNDOb8WKKMp1VgCrF3mA&s",
    description: "Clásico atemporal con suela de goma.",
    price: convertToMXN(60),
    colors: ["Rojo", "Negro", "Blanco", "Azul", "Amarillo"],
    sizes: ["22", "23", "24", "25", "26", "27"]
  },
  {
    id: 5,
    title: "Gel-Kayano 28",
    brand: "Asics",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8lTiwaCIdcgYecGqLHjhgobvgrg7OoufC6A&s",
    description: "Estabilidad y amortiguación para corredores.",
    price: convertToMXN(100),
    colors: ["Plateado", "Azul", "Negro"],
    sizes: ["25", "26", "27", "28", "29"]
  },
  {
    id: 6,
    title: "990v5",
    brand: "New Balance",
    image: "https://i.ebayimg.com/00/s/NjM0WDEyODk=/z/NucAAOSwmBtmeCRz/$_57.JPG",
    description: "Hecho en USA con materiales premium.",
    price: convertToMXN(89),
    colors: ["Gris", "Azul Marino", "Blanco"],
    sizes: ["24", "25", "26", "27", "28"]
  },
  {
    id: 7,
    title: "Sk8-Hi",
    brand: "Vans",
    image: "https://vansmx.vtexassets.com/arquivos/ids/1959000-1600-auto?v=638680693517730000&width=1600&height=auto&aspect=true",
    description: "Zapatilla alta original para skaters.",
    price: convertToMXN(80),
    colors: ["Negro", "Blanco", "Rojo", "Azul"],
    sizes: ["23", "24", "25", "26", "27"]
  },
  {
    id: 8,
    title: "Wave Rider 25",
    brand: "Mizuno",
    image: "https://m.media-amazon.com/images/I/71Sr5JSNCHL._AC_SX500_.jpg",
    description: "Tecnología Wave para una pisada suave.",
    price: convertToMXN(104),
    colors: ["Azul", "Blanco", "Negro"],
    sizes: ["25", "26", "27", "28"]
  },
  {
    id: 9,
    title: "One8 x Virat Kohli",
    brand: "Puma",
    image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/shoe/h/p/f/-original-imahfhnncgbhjy9c.jpeg?q=90&crop=false",
    description: "Edición especial colaboración Virat Kohli.",
    price: convertToMXN(110),
    colors: ["Negro/Rojo", "Blanco/Azul", "Oro"],
    sizes: ["24", "25", "26", "27", "28"]
  },
  {
    id: 10,
    title: "Cloudswift",
    brand: "On",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNiXIT8BomjA4rRfPngj60uIdwYQpoV3ZqGQ&s",
    description: "Tecnología Cloud para corredores urbanos.",
    price: convertToMXN(300),
    colors: ["Blanco", "Negro", "Verde"],
    sizes: ["26", "27", "28", "29"]
  }
];

const PAYMENT_LOGOS = {
  'credit-card': '💳',
  'paypal': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQavlq_ly8-hQP9DjKyA3SqpjkwMqS6kotWhQ&s',
  'bitcoin': '₿',
  'apple-pay': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyayRBdL1FKBWMHbGuQYvxLQQec104TE0j8w&s',
  'google-pay': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOFW-Itek5N5FK7WwM3m3l0ro81DJxktCJJA&s'
};

// Componente de Producto con selector de color y talla
const ProductCard = ({ product, onAddToCart }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-info">
        <h3>{product.title}</h3>
        <p className="product-brand">{product.brand}</p>
        <p className="product-description">{product.description}</p>
        
        <div className="selectors-container">
          <div className="color-selector">
            <label>Color:</label>
            <select 
              value={selectedColor} 
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              {product.colors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>
          
          <div className="size-selector">
            <label>Talla:</label>
            <select 
              value={selectedSize} 
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {product.sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        </div>
        
        <p className="product-price">${product.price.toFixed(2)} MXN</p>
        <button 
          className="add-to-cart-btn" 
          onClick={() => onAddToCart({
            ...product, 
            selectedColor,
            selectedSize,
            cartId: Date.now() + product.id // ID único para el carrito
          })}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

// Componente de Ítem del Carrito con color y talla seleccionada
const CartItem = ({ item, onRemove }) => (
  <li className="cart-item">
    <img src={item.image} alt={item.title} className="cart-item-image" />
    <div className="cart-item-details">
      <span>{item.title} ({item.selectedColor}) - Talla: {item.selectedSize}</span>
      <span>${item.price.toFixed(2)} MXN</span>
    </div>
    <button 
      className="remove-item-btn" 
      onClick={() => onRemove(item.cartId)}
    >
      ×
    </button>
  </li>
);

// Componente de Método de Pago
const PaymentMethod = ({ method, logo, title, description, onSelect, isSelected }) => (
  <div 
    className={`payment-method ${isSelected ? 'selected' : ''}`} 
    onClick={() => onSelect(method)}
  >
    {typeof logo === 'string' && logo.startsWith('http') ? (
      <img src={logo} alt={title} className="payment-logo" />
    ) : (
      <div className="payment-icon">{logo}</div>
    )}
    <div className="payment-method-info">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
    <div className="payment-method-check">
      {isSelected ? '✓' : ''}
    </div>
  </div>
);

function App() {
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    email: '',
    bitcoinAddress: '',
    phone: ''
  });
  const [step, setStep] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Filtrado de productos
  const filteredProducts = PRODUCTS.filter(product =>
    `${product.brand} ${product.title}`.toLowerCase().includes(search.toLowerCase())
  );

  // Manejo del carrito
  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const calculateTotal = () => cart.reduce((total, item) => total + item.price, 0).toFixed(2);

  // Manejo del pago
  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
  };

  const handlePaymentInfoChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    setStep(4);
  };

  const resetCart = () => {
    setCart([]);
    setPaymentMethod('');
    setPaymentInfo({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      email: '',
      bitcoinAddress: '',
      phone: ''
    });
    setStep(1);
    setIsCartOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="logo-container">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL7s-1aSbYOEkgrz-dkgFhFFtleUHGRyY2Tg&s" alt="Sneaker e" className="store-logo" />
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar por marca o modelo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <button className="cart-icon" onClick={toggleCart}>
            🛒 {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
          </button>
        </div>
      </header>

      <main>
        {step === 1 && (
          <div className="product-list">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="payment-method-container">
            <h2>Selecciona método de pago</h2>
            <div className="payment-methods">
              <PaymentMethod
                method="credit-card"
                logo="💳"
                title="Tarjeta de crédito/débito"
                description="Paga con tu tarjeta Visa, Mastercard o Amex"
                onSelect={handlePaymentMethodSelect}
                isSelected={paymentMethod === 'credit-card'}
              />
              <PaymentMethod
                method="paypal"
                logo="https://via.placeholder.com/40x25?text=PayPal"
                title="PayPal"
                description="Paga rápida y segura con tu cuenta PayPal"
                onSelect={handlePaymentMethodSelect}
                isSelected={paymentMethod === 'paypal'}
              />
              <PaymentMethod
                method="bitcoin"
                logo="₿"
                title="Bitcoin"
                description="Paga con criptomonedas"
                onSelect={handlePaymentMethodSelect}
                isSelected={paymentMethod === 'bitcoin'}
              />
            </div>
            
            {paymentMethod && (
              <button 
                className="continue-payment-btn" 
                onClick={() => setStep(3)}
              >
                Continuar con {getPaymentMethodName(paymentMethod)}
              </button>
            )}
            
            <button className="back-btn" onClick={() => setStep(1)}>
              Volver al carrito
            </button>
          </div>
        )}

        {step === 3 && (
          <PaymentForm 
            method={paymentMethod}
            info={paymentInfo}
            cart={cart}
            total={calculateTotal()}
            onChange={handlePaymentInfoChange}
            onSubmit={handleSubmitPayment}
            onBack={() => setStep(2)}
          />
        )}

        {step === 4 && (
          <OrderConfirmation 
            order={{
              id: Math.floor(Math.random() * 1000000),
              date: new Date(),
              method: paymentMethod,
              total: calculateTotal(),
              deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
              items: cart
            }}
            onContinue={resetCart}
          />
        )}

        {/* Carrito lateral */}
        <div className={`cart-sidebar ${isCartOpen ? 'active' : ''}`}>
          <h2>Tu Carrito</h2>
          {cart.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
            <>
              <ul className="cart-items">
                {cart.map(item => (
                  <CartItem 
                    key={item.cartId} 
                    item={item} 
                    onRemove={handleRemoveFromCart}
                  />
                ))}
              </ul>
              <div className="cart-total">
                <span>Total:</span>
                <span>${calculateTotal()} MXN</span>
              </div>
              <button className="checkout-btn" onClick={() => {
                setStep(2);
                setIsCartOpen(false);
              }}>
                Proceder al pago
              </button>
            </>
          )}
          <button className="close-cart-btn" onClick={() => setIsCartOpen(false)}>
            ×
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Componente de formulario de pago
const PaymentForm = ({ method, info, cart, total, onChange, onSubmit, onBack }) => {
  const renderPaymentFields = () => {
    switch(method) {
      case 'credit-card':
        return (
          <>
            <div className="form-group">
              <label>Número de tarjeta</label>
              <input
                type="text"
                name="cardNumber"
                value={info.cardNumber}
                onChange={onChange}
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Fecha de expiración</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={info.expiryDate}
                  onChange={onChange}
                  placeholder="MM/AA"
                  required
                />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={info.cvv}
                  onChange={onChange}
                  placeholder="123"
                  required
                />
              </div>
            </div>
          </>
        );
      case 'paypal':
        return (
          <div className="form-group">
            <label>Email de PayPal</label>
            <input
              type="email"
              name="email"
              value={info.email}
              onChange={onChange}
              placeholder="tucorreo@example.com"
              required
            />
          </div>
        );
      case 'bitcoin':
        return (
          <div className="form-group">
            <label>Dirección de Bitcoin</label>
            <input
              type="text"
              name="bitcoinAddress"
              value={info.bitcoinAddress}
              onChange={onChange}
              placeholder="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
              required
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="payment-info-container">
      <h2>Información de pago</h2>
      <form onSubmit={onSubmit} className="payment-form">
        <div className="payment-method-display">
          <span>Método seleccionado:</span>
          <strong>{getPaymentMethodName(method)}</strong>
        </div>
        
        {renderPaymentFields()}
        
        <OrderSummary cart={cart} total={total} />
        
        <div className="form-actions">
          <button type="button" className="back-btn" onClick={onBack}>
            Volver
          </button>
          <button type="submit" className="submit-payment-btn">
            Confirmar pago de ${total} MXN
          </button>
        </div>
      </form>
    </div>
  );
};

const OrderSummary = ({ cart, total }) => (
  <div className="order-summary">
    <h3>Resumen del pedido</h3>
    <ul>
      {cart.map(item => (
        <li key={item.cartId}>
          <span>{item.title} ({item.selectedColor}) - Talla: {item.selectedSize}</span>
          <span>${item.price.toFixed(2)} MXN</span>
        </li>
      ))}
    </ul>
    <div className="order-total">
      <span>Total:</span>
      <span>${total} MXN</span>
    </div>
  </div>
);

const OrderConfirmation = ({ order, onContinue }) => (
  <div className="confirmation-container">
    <div className="confirmation-card">
      <div className="confirmation-icon">✓</div>
      <h2>¡Pago completado con éxito!</h2>
      <p>Gracias por tu compra. Hemos enviado un correo con los detalles de tu pedido.</p>
      
      <div className="order-details">
        <h3>Detalles del pedido</h3>
        <p><strong>Número de pedido:</strong> #{order.id}</p>
        <p><strong>Fecha:</strong> {order.date.toLocaleDateString()}</p>
        <p><strong>Método de pago:</strong> {getPaymentMethodName(order.method)}</p>
        <p><strong>Total:</strong> ${order.total} MXN</p>
        <p><strong>Fecha estimada de entrega:</strong> {order.deliveryDate.toLocaleDateString()}</p>
        
        <h4>Productos:</h4>
        <ul className="order-items">
          {order.items.map(item => (
            <li key={item.cartId}>
              {item.brand} {item.title} ({item.selectedColor}) - Talla: {item.selectedSize} - ${item.price.toFixed(2)} MXN
            </li>
          ))}
        </ul>
      </div>
      
      <button className="continue-shopping-btn" onClick={onContinue}>
        Continuar comprando
      </button>
    </div>
  </div>
);

const Footer = () => {
  const handleFooterLinkClick = (link) => {
    console.log(`Navegando a: ${link}`);
  };

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="https://via.placeholder.com/150x50?text=Sneaker+Store" alt="Sneaker Store" />
        </div>
        <div className="footer-info">
          <p>© {new Date().getFullYear()} Sneaker Store - Todos los derechos reservados</p>
          <div className="footer-links">
            {['Términos y condiciones', 'Política de privacidad', 'Contacto', 'Sobre nosotros', 'Envíos y devoluciones'].map(link => (
              <button 
                key={link} 
                className="footer-link-btn"
                onClick={() => handleFooterLinkClick(link)}
              >
                {link}
              </button>
            ))}
          </div>
        </div>
        <PaymentMethodsFooter />
      </div>
    </footer>
  );
};

const PaymentMethodsFooter = () => (
  <div className="payment-methods-footer">
    <p>Métodos de pago aceptados:</p>
    <div className="payment-icons">
      {Object.entries(PAYMENT_LOGOS).map(([method, logo]) => (
        <div key={method} className="payment-icon-small">
          {typeof logo === 'string' && logo.startsWith('http') ? (
            <img src={logo} alt={method} />
          ) : (
            <div>{logo}</div>
          )}
        </div>
      ))}
    </div>
  </div>
);

// Helper functions
const getPaymentMethodName = (method) => {
  const names = {
    'credit-card': 'Tarjeta de crédito/débito',
    'paypal': 'PayPal',
    'bitcoin': 'Bitcoin'
  };
  return names[method] || method;
};

export default App;