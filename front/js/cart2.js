/*
** cart
*/

let cart = JSON.parse(localStorage.getItem('scart')) || [];
//turn into workable data
console.log('cart:', cart);
//loop through the data to get access to it
for (let i = 0; i < cart.length; i++) {
    populateCartInfo(cart[i]);
    var loopResult = (cart[i]);
    console.log('loopResult', loopResult);
    //call functions, in an on load function async??
}

//need to call functions here instead of above -
//or else they repeat

deleteCartItem();
updateQuantityCartItem ();
updateCartTotal ();
captureFormData ();

/*
** use looped cart above to push data into DOM node
*/

function populateCartInfo(cart) {
    //get access
    let section = document.getElementById('cart__items');
    //create dom elements in order
    //parent
    let article = document.createElement('div');
    article.setAttribute('class', 'cart__item');
    article.setAttribute('data-id', `${cart._id}`)
    article.setAttribute('data-color', `${cart.color}`)
    section.appendChild(article);
    //image
    let cartItemImgP = document.createElement('div');
    cartItemImgP.setAttribute('class', 'cart__item__img');
    article.appendChild(cartItemImgP);

    let img = document.createElement('img');
    img.setAttribute('class','img' );
    cartItemImgP.appendChild(img);
    //contentParent
    let contentP = document.createElement('div');
    contentP.setAttribute('class', 'cart__item__content');
    article.appendChild(contentP);
    //description Parent
    let contentDescriptionP  = document.createElement('div');
    contentDescriptionP .setAttribute("class", "cart__item__content__description");
    contentP.appendChild(contentDescriptionP);
    //productName
    let nameOfProduct = document.createElement('h2');
    nameOfProduct.setAttribute('class', 'product__name');
    contentDescriptionP.appendChild(nameOfProduct);
    //color
    let color = document.createElement('p');
    color.setAttribute('class', 'item__color');
    contentDescriptionP.appendChild(color);
    //price
    let price = document.createElement('p');
    price.setAttribute('class', 'item__price');
    contentDescriptionP.appendChild(price);
    //settingsParent
    let contentSettingsP = document.createElement('div');
    contentSettingsP.setAttribute('class', 'cart__item__content__settings');
    contentP.appendChild(contentSettingsP);
    //quantity Parent
    let contentSettingsQuantityP  = document.createElement('div');
    contentSettingsQuantityP.setAttribute('class', 'cart__item__content__settings__quantity');
    contentSettingsP.appendChild(contentSettingsQuantityP);
    //quantity
    let chosenQ = document.createElement('p');
    chosenQ.setAttribute('class', 'chosenQ');
    contentSettingsQuantityP.appendChild(chosenQ);
    //quantity Input
    let itemQuantity = document.createElement('input');
    itemQuantity.setAttribute('type', 'number');
    itemQuantity.setAttribute('class', 'itemQuantity');
    itemQuantity.setAttribute('id', 'itemQuantity');
    //itemQuantity.setAttribute('name', 'itemQuantity');
    itemQuantity.setAttribute('min', '1');
    itemQuantity.setAttribute('max', '100');
    itemQuantity.setAttribute('value', '');
    contentSettingsQuantityP.appendChild(itemQuantity);
    //deleteParent
    let contentSettingsDeleteP  = document.createElement('div');
    contentSettingsDeleteP.setAttribute('class', 'cart__item__content__settings__delete');
    contentSettingsP.appendChild( contentSettingsDeleteP);
    //delete
    let deleteItem = document.createElement('p');
    deleteItem.setAttribute('class', 'deleteItem');
    contentSettingsDeleteP.appendChild(deleteItem);
    
    //populate 
    img.src= cart.image;
    nameOfProduct.innerText = cart.name;
    color.innerText = cart.color;
    price.innerText = '€' + cart.price;
    chosenQ.innerText = 'quantity :' 
    itemQuantity.value = cart.quantity; 
    deleteItem.innerText = 'Delete';
   
    return populateCartInfo;
}

/*
** updata cart quantity (specific item)
*/

function updateCartTotal () {
    //totals
    //only need 1, class returns an array of hmtl so, [0]
    let cartPrice = document.getElementsByClassName('cart__price')[0];
    //access + populate dynamically using result  
    //updateCartTotal
    let totalQuantity = document.getElementById('totalQuantity'); //span, inner html
    let totalPrice = document.getElementById('totalPrice');
    //empty arrays
    let priceResultStorage = [];
    let totalItemPriceStorage = [];
    let quantityResultStorage = [];
    
    let initialPriceResult = 0;
    let initialQuantity = 0;
    //need to loop over cart  prices 
    for(var i = 0; i < cart.length; i++) {
        //itemPrice
        let itemPrice = cart[i].price;
        priceResultStorage.push(itemPrice);

        //totalItemPrice
        let totalItemPrice = cart[i].quantity * itemPrice;
        totalItemPriceStorage.push(totalItemPrice);
        //is this result an error??
        //console.log(totalItemPriceStorage);

        //quantity
        let quantityResult = cart[i].quantity;
        //console.log(quantityResult);

        quantityResultStorage.push(quantityResult);
        //console.log(quantityResultStorage);
    }
    //total price
    for(var i = 0; i < totalItemPriceStorage.length; i++) {
        let result = initialPriceResult += parseInt(totalItemPriceStorage[i]);
        //console.log(result);
        totalPrice.innerText = ' ' + result;
    }
    //quantity
    for(var i = 0; i < quantityResultStorage.length; i++) {
        let quantityResultLoop = initialQuantity += quantityResultStorage[i];
        totalQuantity.innerText = quantityResultLoop;
        //console.log(quantityResultLoop);
    }
    localStorage.setItem('scart', JSON.stringify(cart));  
}

/*
** delete functionality
*/

// !! not deleting from localstroage correctly !!
// !! problem with findIndex? !!
//!! specififcity of the click !!

function deleteCartItem () {
//access dom elements,
    let removeCartItemButtons = document.getElementsByClassName('deleteItem');
    console.log(removeCartItemButtons);
    for ( var i = 0; i <  removeCartItemButtons.length; i ++) {
        var deleteItem = removeCartItemButtons[i];
        //add event listener on click, (delete)
        deleteItem.addEventListener('click', function (event) {
            deleteItemClicked = event.target;
            //remove parent
            deleteItemClicked.parentElement.parentElement.parentElement.parentElement.remove();
            //target product // index returns the index first element satisfies 
            //provided test function
            let index = cart.findIndex(startCart => startCart._id == loopResult._id && startCart.color == loopResult.color);
            console.log(index);
            //remove, -1 == false. so != -1 == true
            if (index !== -1) {
                //splice the first index result off the cart
                cart.splice(index);
                //store new array 
                localStorage.setItem('scart', JSON.stringify (cart));
                console.log('cart after delete', cart);
            }
            updateCartTotal ()
        })
    }
    localStorage.setItem('scart', JSON.stringify(cart));
    return deleteCartItem;
}

/*
** quantity functionality
*/

//!! problem with the specificity of updated QTY's !!
//!! test !!

function updateQuantityCartItem () {
    //get access to dom elements
    let input = document.getElementsByClassName('itemQuantity');
    console.log('input.length:', input.length);
    //interate through html collection result -
    // and add event listener to each
    for(var i = 0; i < input.length; i++) { 
    input[i].addEventListener('input', updateValue); //working
    //attach value function to the lister
    function updateValue(event) {
        console.log(event.target.value); //working
            loopResult.quantity = parseInt(event.target.value); 
            console.log('cart:', cart);
             //run
            updateCartTotal ()
        }
    }
    //storage
    return updateQuantityCartItem;
}

/*
** capture form data and call post request function
*/

function captureFormData () {
    //access dom
    let firstName = document.getElementById('firstName');
    let lastName = document.getElementById('lastName');
    let address = document.getElementById('address');
    let city = document.getElementById('city');
    let email  = document.getElementById('email');
    //button
    let order = document.getElementById('order');
    order.addEventListener('click', ($event) => {
        //prevent page refreshing
        $event.preventDefault();
        //regex for email
        const regexEmail = /\S+@\S+\.\S+/g;
        let regexEmailResult = regexEmail.test(email.value);
        console.log(regexEmailResult);
        //rejex for product strings - check if lenght > 0
        if (regexEmailResult) {
            //const searchParams = new URLSearchParams();
            var contact = { firstName: firstName.value, lastName: lastName.value, address: address.value, city: city.value, email: email.value};
            //loop through cart, as this is its final selection
            //extract ids + store in array
            //console.log(cart);
            let products = [];
            for (let i = 0; i < cart.length; i++) {
               products.push(cart[i]._id);
            }
            //console.log ('final cart', finalCart); // working
            allOrderData = { contact: contact, products: products };
            //allOrderData.push ( finalCart );
            console.log ( allOrderData );
            postRequest ( allOrderData );
        }
    })
}



//const queryString = window.location.search;
//console.log(queryString);
//const urlParams = new URLSearchParams(queryString);
//console.log(urlParams);

let localhost = 'http://localhost:3000/api/products/order';
//pageLink.href = `${singleProductLink} ${object._id}`;

//for post req


const postRequest = () => {
    
    //const orderId = urlParams.get(queryString);
    //send data
    let options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(allOrderData)
    };

    fetch(localhost, options)

    .then(data => {
    console.log(data);
    
    if (!data.ok) {
        throw Error(data.status);
    }
    return data.json();
    }).then(response => {
    console.log(response);

    //push order id into url
    sessionStorage.clear();
    if (sessionStorage.length === 0) {
        console.log('emptied!');
    }
    window.location.href = './confirmation.html?=' + response.orderId;
    
    }).catch(e => {
    console.log(e);
    })
}




//order page, retrieve from backend,loop through - 
//the data and use it to populate 
//clear local storage

