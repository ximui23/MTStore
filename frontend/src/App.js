import React from 'react'
import data from './data'

function App() {
  return (
    <div class="grid-container">
      <header class="row">
          <div>
              <a class="brand" href="/">MTStore</a>
          </div>
          <div>
              <a href="/cart">Cart</a>
              <a href="/signin">Sign In</a>
          </div>
      </header>
      <main>
          <div class="row center">
            {
              data.products.map(product => (
                <div key={product._id} class="card">
                  <a href={`/product/${product._id}`}>
                      <img class="medium" src={product.image} alt={product.name} />
                  </a>
                  <div class="card-body">
                    <a href={`/product/${product._id}`}>
                        <h2>{product.name}</h2>
                    </a>
                    <div class="rating">
                      <span><i class="fa fa-star"></i></span>
                      <span><i class="fa fa-star"></i></span>
                      <span><i class="fa fa-star"></i></span>
                      <span><i class="fa fa-star"></i></span>
                      <span><i class="fa fa-star"></i></span>
                    </div>
                    <div class="price">${product.price}</div>
                  </div>
                </div>
              ))
            }
          </div>
      </main>
      <footer class="row center">All right reserved</footer>
    </div>
  );
}

export default App;
