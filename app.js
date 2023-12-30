document.addEventListener('DOMContentLoaded', function () {
  const cardContainer = document.getElementById('cardContainer');
  let products = [];
  let page = 1;

  const fetchInitialData = () => {
      fetch(`https://s3.amazonaws.com/open-to-cors/assignment.json?page=${page}`)
          .then(response => response.json())
          .then(data => {
              const productList = Object.values(data.products);
              const sortedProducts = productList.sort((a, b) => b.popularity - a.popularity);
              products = sortedProducts;
              renderProducts();
          })
          .catch(error => console.error('Error fetching data:', error));
  };

  const renderProducts = () => {
      cardContainer.innerHTML = '';
      products.forEach(product => {
          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `
              <h3>${product.title}</h3>
              <p class="price">Price: $${product.price}</p>
              <p class="popularity">Popularity: ${product.popularity}</p>
          `;
          cardContainer.appendChild(card);
      });
  };

  fetchInitialData();
});
