 let cart = [];
 let modalQt = 1;
 let modalkey = 0;
 
 //criando variaveis para facilitar o acesso aos documents
const c = (el)=> document.querySelector(el);  
const cs = (el)=> document.querySelectorAll(el);

//mapeando o PizzaJson / Listagem das Pizzas
pizzaJson.map((item, index)=>{
    //esse comando ".cloneNode" simplesmente copia alguma o elemento com tudo que estiver dentro.
    let pizzaItem = c('.models .pizza-item').cloneNode(true); 
        // puxando os ids do array
    pizzaItem.setAttribute('data-key', index);

    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
        //processo para tirar o evento click da tag <a> do html
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{   
        e.preventDefault();
        //colocando ids nas pizzas
        let key = e.target.closest('.pizza-item').getAttribute('data-key'); 
        modalQt = 1;
        modalkey = key;

        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

            //des-selecionando os tamanhos e colocando o tamanho grande como selecionado ao abrir o modal
        c('.pizzaInfo--size.selected').classList.remove('selected');
        cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{               
            if(sizeIndex == 2) {
                size.classList.add('selected');
            }
            //Colocando os tamanhos no modal
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];

        })

        c('.pizzaInfo--qt').innerHTML = modalQt;
        //fazendo o modal aparecer 
        c('.pizzaWindowArea').style.opacity =  0;           
        c('.pizzaWindowArea').style.display =  'flex';    
        //criando uma animação no modal
        setTimeout(()=>{                                        
            c('.pizzaWindowArea').style.opacity =  1;   
        }, 200);
    })

    //esse comando ".append" simplesmente adiciona oq for mandado sem substituir oq ja estiver.
    c('.pizza-area').append( pizzaItem); 

});

//Eventos do modal
//fechando modal com animação
function closeModal() {
    c('.pizzaWindowArea').style.opacity =  0;
    setTimeout(()=>{                                        
        c('.pizzaWindowArea').style.display = 'none';   
    }, 500);
}
//criando o evento nos botoes de fechar o modal
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal)
})
//botoes de - e + do modal
c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if (modalQt > 1) {
        modalQt--;
        c('.pizzaInfo--qt').innerHTML = modalQt;
    }
})

c('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt;
})
//botoes de tamanho das pizzas do modal
cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{               
    size.addEventListener('click', (e)=>{
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    })

})

//Criando o evento de clicar no add carrinho
c('.pizzaInfo--addButton').addEventListener('click', ()=>{
    //pegando o tamanho das pizzas
    let size =  parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));
    
    let identifier = pizzaJson[modalkey].id+'@'+size;

    let key = cart.findIndex((item)=>item.identifier == identifier);

    if(key > -1){
        cart[key].qt +=modalQt;
    }else {
        cart.push({
            identifier,
            id:pizzaJson[modalkey].id,
            size,
            qt:modalQt,
        });
    }
    updateCart();
    closeModal();
});

c('.menu-openner').addEventListener('click', ()=> {
    if(cart.length > 0) {
        c('aside').style.left = '0';
    }
});
c('.menu-closer').addEventListener('click', ()=> {
    c('aside').style.left = '100vw';
});

function updateCart(){
    c('.menu-openner span').innerHTML = cart.length;

    if(cart.length > 0){
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart) {
            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id);
            subtotal += pizzaItem.price * cart[i].qt;



            let cartItem = c('.models .cart--item').cloneNode(true);
            
            let pizzaSizeName;
            switch (cart[i].size) {
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break;
            }
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(cart[i].qt > 1) {
                    cart[i].qt--;
                }else {
                    cart.splice(i, 1);
                }
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++;
                updateCart();
            });


            c('.cart').append(cartItem);

        }

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    }else {
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';
    }
}
