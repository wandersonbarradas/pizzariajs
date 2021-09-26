 let modalQt = 1;
 
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
        //processo para tirar o evento click da tag a do html
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{   
        e.preventDefault();
        //colocando ids nas pizzas
        let key = e.target.closest('.pizza-item').getAttribute('data-key'); 
        modalQt = 1;

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

