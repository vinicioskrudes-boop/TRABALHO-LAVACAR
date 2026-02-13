import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import './App.css';

export default function LavaCarApp() {
  const [currentPage, setCurrentPage] = useState('login');
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  const LoginPage = () => {
    const [error, setError] = React.useState('');

    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="logo-container">
              <div style={{ position: 'absolute', top: '-8px', right: '-8px' }}></div>
            </div>
          </div>
          <div>
            {error && <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{error}</div>}
            <input id="email" type="email" placeholder="E-mail" className="input" />
            <input id="senha" type="password" placeholder="Senha" className="input" />
            <button
              onClick={() => {
                const email = document.getElementById('email').value;
                const senha = document.getElementById('senha').value;
                if (!email || !senha) {
                  setError('Preencha todos os campos');
                  return;
                }
                setUser({ email });
                setCurrentPage('produtos');
              }}
              className="login-button"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ProdutosPage = () => (
    <div className="produtos-container">
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}></div>
        <button onClick={() => setCurrentPage('carrinho')} className="cart-button">
          <ShoppingCart size={24} color="white" />
          {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </button>
      </header>

      <div style={{ padding: '30px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '30px' }}>
          Nossos Serviços
        </h2>
      </div>

      <div className="produtos-grid">
        {produtos.map(produto => (
          <div key={produto.id} className="produto-card">
            <div className="produto-imagem">
              <img src={produto.imagem} alt={produto.nome} />
            </div>
            <div className="produto-info">
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: '#1f2937' }}>
                {produto.nome}
              </h3>
              <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>
                {produto.descricao}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#16a34a' }}>
                  R$ {produto.preco.toFixed(2)}
                </span>
                <button onClick={() => adicionarAoCarrinho(produto)} className="add-button">
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CarrinhoPage = () => (
    <div className="carrinho-container">
      <header className="header">
        <button onClick={() => setCurrentPage('produtos')} className="back-button">
          ← Voltar
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShoppingCart size={24} />
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Carrinho</span>
        </div>
      </header>

      <div className="carrinho-content">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <ShoppingCart size={96} color="#d1d5db" style={{ margin: '0 auto 20px' }} />
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#374151', marginBottom: '10px' }}>
              Carrinho Vazio
            </h3>
            <button onClick={() => setCurrentPage('produtos')} className="add-button" style={{ padding: '12px 40px' }}>
              Ver Serviços
            </button>
          </div>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} className="carrinho-item">
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '5px' }}>
                    {item.nome}
                  </h3>
                  <p style={{ color: '#6b7280' }}>R$ {item.preco.toFixed(2)} cada</p>
                </div>

                <div className="quantity-controls">
                  <button onClick={() => removerDoCarrinho(item.id)} className="quantity-button-minus">
                    -
                  </button>
                  <span style={{ fontSize: '20px', fontWeight: 'bold', minWidth: '24px', textAlign: 'center' }}>
                    {item.quantidade}
                  </span>
                  <button onClick={() => adicionarAoCarrinho(item)} className="quantity-button-plus">
                    +
                  </button>
                  <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#16a34a', marginLeft: '10px' }}>
                    R$ {(item.preco * item.quantidade).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}

            <div className="total-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>Total:</span>
                <span style={{ fontSize: '36px', fontWeight: 'bold', color: '#16a34a' }}>
                  R$ {calcularTotal().toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => {
                  alert('Pedido confirmado! Entraremos em contato em breve via WhatsApp: (41)91234-5678');
                  setCart([]);
                  setCurrentPage('produtos');
                }}
                className="finalizar-button"
              >
                Confirmar Pedido
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const produtos = [
    { id: 1, nome: 'Lavagem Simples', preco: 60.00, imagem: '/simples.png', descricao: 'Lavagem externa básica' },
    { id: 2, nome: 'Lavagem Completa', preco: 110.00, imagem: '/completa.png', descricao: 'Lavagem externa e interna' },
    { id: 3, nome: 'Lavagem Técnica/Detalhamento Externo', preco: 200.00, imagem: '/detalhada.png', descricao: 'Polimento e detalhamento completo' },
    { id: 4, nome: 'Higienização Interna', preco: 280.00, imagem: '/interna.png', descricao: 'Limpeza profunda do interior' }
  ];

  const adicionarAoCarrinho = (produto) => {
    const itemExistente = cart.find(item => item.id === produto.id);
    if (itemExistente) {
      setCart(cart.map(item =>
        item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
      ));
    } else {
      setCart([...cart, { ...produto, quantidade: 1 }]);
    }
  };

  const removerDoCarrinho = (id) => {
    const itemExistente = cart.find(item => item.id === id);
    if (itemExistente.quantidade === 1) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item
      ));
    }
  };

  const calcularTotal = () => {
    return cart.reduce((total, item) => total + item.preco * item.quantidade, 0);
  };

  return (
    <>
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'produtos' && <ProdutosPage />}
      {currentPage === 'carrinho' && <CarrinhoPage />}
    </>
  );
}