const addToCart = document.querySelectorAll('[data-btn-action="add-btn-cart"]');
const closeModal = document.querySelector('.jsModalClose');
const cartItems = [];


addToCart.forEach(btn => {
    btn.addEventListener('click', (event) => {
        const nameModal = event.target.getAttribute('data-modal');
        const modal = document.querySelector(nameModal);

        // Obtém as informações da fruta selecionada
        const productInfo = {
            image: event.target.parentNode.parentNode.querySelector('.product-grid__imagem img').src,
            name: event.target.parentNode.parentNode.querySelector('.product-grid__name').textContent,
            price: event.target.parentNode.parentNode.querySelector('.product-grid__prince').textContent
        };

        // Adiciona a fruta ao carrinho
        cartItems.push(productInfo);

        // Atualiza o conteúdo do carrinho
        updateCart();

        modal.classList.add('active');
    });
});

closeModal.addEventListener('click', (event) => {
    event.target.parentNode.parentNode.classList.remove('active');
});

window.onclick = (event) => {
    const modal = document.querySelector('.modal.active');

    if (event.target == modal) {
        modal.classList.remove('active');
    }
};
function updateCart() {
    const modalList = document.querySelector('.modal__list');

    // Limpa o conteúdo atual do carrinhos
    modalList.innerHTML = '';

    // Adiciona cada item do carrinho ao conteúdo
    cartItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('modal__item');
        itemElement.innerHTML = `
        <div class="modal-thumb">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="modal__text-product">
          <p>${item.name}</p>
          <p><strong>${item.price}</strong></p>
        </div>
        <button class="modal__remove-btn" onclick="removeCartItem(${index})">Remover</button>
      `;
        modalList.appendChild(itemElement);
    });

    // Calcula o subtotal e atualiza o total do carrinho
    const subtotal = cartItems.reduce(
        (total, item) =>
            total + parseFloat(item.price.replace('R$', '').replace(',', '.')),
        0
    );
    const discount = 0;
    const total = subtotal - discount;

    const modalListPrice = document.querySelector('.modal__list-prince ul');
    const modalTotal = document.querySelector('.modal__total-cart');

    modalListPrice.innerHTML = `
      <li> Subtotal <strong>R$${subtotal.toFixed(2)}</strong></li>
      <li> Desconto: <strong>R$${discount.toFixed(2)}</strong></li>
    `;
    modalTotal.textContent = `Total: R$${total.toFixed(2)}`;
}

function removeCartItem(index) {
    // Remove o item do carrinho com base no índice fornecido
    cartItems.splice(index, 1);

    // Atualiza o conteúdo do carrinho
    updateCart();
}