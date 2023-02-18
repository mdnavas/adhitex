
'use strict';

// ------------ Functions for Product list page ------------ //
function openProductList(productList) {
    window.location = 'list.html?productList=' + productList;
  }
  
  function constructCard(id, title, subTitle, imgSrc, price) {
  
    // Card Header
    const cardImg = document.createElement("img");
    cardImg.classList.add('card-img');
    cardImg.classList.add('rounded-0');
    cardImg.classList.add('img-fluid');
    cardImg.src = 'assets/img/prd/' + imgSrc;
  
    const eyeImg = document.createElement("i");
    eyeImg.classList.add('far');
    eyeImg.classList.add('fa-eye');
  
    const eyeA = document.createElement("a");
    eyeA.classList.add('btn');
    eyeA.classList.add('btn-success');
    eyeA.classList.add('text-white');
    eyeA.classList.add('mt-2');
    eyeA.href = 'javascript:openDetails('+id+');';
    eyeA.appendChild(eyeImg);
  
    const overlay = document.createElement("div");
    overlay.classList.add('card-img-overlay');
    overlay.classList.add('rounded-0');
    overlay.classList.add('product-overlay');
    overlay.classList.add('d-flex');
    overlay.classList.add('align-items-center');
    overlay.classList.add('justify-content-center');
    overlay.appendChild(eyeA);
  
    const cardH = document.createElement("div");
    cardH.classList.add('card');
    cardH.classList.add('rounded-0');
    cardH.appendChild(cardImg);
    cardH.appendChild(overlay);
  
    // Card Body
    const titleA = document.createElement("a");
    titleA.href = 'javascript:openDetails('+id+');';
    titleA.classList.add('h3');
    titleA.classList.add('text-decoration-none');
    titleA.innerText = title;
  
    const subTitleP = document.createElement('p');
    subTitleP.className = 'text-left';
    subTitleP.innerText = subTitle;
  
    const priceP = document.createElement('p');
    priceP.classList.add('text-center');
    priceP.classList.add('mb-0');
    priceP.innerText = '₹ ' + price;
  
    const cardB = document.createElement("div");
    cardB.className = 'card-body';
    cardB.appendChild(titleA);
    cardB.appendChild(subTitleP);
    cardB.appendChild(priceP);
  
    // Card
    const card = document.createElement("div");
    card.classList.add('card');
    card.classList.add('mb-4');
    card.classList.add('product-wap');
    card.classList.add('rounded-0');
    card.appendChild(cardH);
    card.appendChild(cardB);
  
    const col = document.createElement("div");
    col.className = 'col-md-4';
    col.appendChild(card);
  
    document.getElementById('product-list').appendChild(col);
  
  }
  
  function constructList() {
  
    const urlParams = new URLSearchParams(window.location.search);
    const productList = urlParams.get('productList');
    console.log('productList from URL:' + productList);
  
    if(productList === 'hotelLinen') {
      document.getElementById('listHeading').innerText = 'Hotel Linen Products';
      hotel_linen_products.forEach(function (product) {
        constructCard(product.id, product.title, product.subTitle, product.mainImg, product.price);
      });
    } else if(productList === 'hospitalLinen') {
      document.getElementById('listHeading').innerText = 'Hospital Linen Products';
      hosptial_linen_products.forEach(function (product) {
        constructCard(product.id, product.title, product.subTitle, product.mainImg, product.price);
      });
    } else if(productList === 'hotelAmenities') {
      document.getElementById('listHeading').innerText = 'Hotel Amenities';
      hotel_amenities.forEach(function (product) {
        constructCard(product.id, product.title, product.subTitle, product.mainImg, product.price);
      });
    } else if(productList === 'houseKeepingMat') {
      document.getElementById('listHeading').innerText = 'Housekeeping Material';
      house_keeping_mat.forEach(function (product) {
        constructCard(product.id, product.title, product.subTitle, product.mainImg, product.price);
      });
    } else if(productList === 'spaKit') {
      document.getElementById('listHeading').innerText = 'Hotel Linen Products';
      spa_kit.forEach(function (product) {
        constructCard(product.id, product.title, product.subTitle, product.mainImg, product.price);
      });
    } else {
      document.getElementById('listHeading').innerText = 'No Products';
      alert('No products are configured for this product list : ' + productList);
    }
  }
  
  // ------------ Functions for Product details page ------------ //
  function openDetails (productId) {
    window.location = 'product-description.html?productId=' + productId;
  }
  
  function filterProductDetails(productId) {
    var filteredProduct = hotel_linen_products.find(function (product) {
      return product.id == productId;
    });
    if(!filteredProduct) {
      filteredProduct = hosptial_linen_products.find(function (product) {
        return product.id == productId;
      });
    }
    if(!filteredProduct) {
      filteredProduct = hotel_amenities.find(function (product) {
        return product.id == productId;
      });
    }
    if(!filteredProduct) {
      filteredProduct = house_keeping_mat.find(function (product) {
        return product.id == productId;
      });
    }
    if(!filteredProduct) {
      filteredProduct = spa_kit.find(function (product) {
        return product.id == productId;
      });
    }
    return filteredProduct;
  }
  
  function createKeyValue(key, value) {
    const leftH6 = document.createElement("h6");
    leftH6.innerText = key;
  
    const leftLi = document.createElement("li");
    leftLi.className = 'list-inline-item';
    leftLi.appendChild(leftH6);
  
    const rightP = document.createElement("p");
    //rightP.className = 'text-muted';
    rightP.innerText = value;
  
    const rightLi = document.createElement("li");
    rightLi.className = 'list-inline-item';
    rightLi.appendChild(rightP);
  
    const brandUl = document.createElement("ul");
    brandUl.className = 'list-inline';
    brandUl.appendChild(leftLi);
    brandUl.appendChild(rightLi);
  
    return brandUl;
  }
  
  function constructDetailsPage(filteredProduct) {
  
    // Title
    const h11 = document.createElement("h1");
    h11.className = 'h2';
    h11.innerText = filteredProduct.title;
    document.getElementById('product_details_div').appendChild(h11);
  
    // Price
    if(filteredProduct.price) {
      const priceP = document.createElement('p');
      priceP.classList.add('h3');
      priceP.classList.add('py-2');
      priceP.innerText = '₹ ' + filteredProduct.price;
      document.getElementById('product_details_div').appendChild(priceP);
    }
  
    // Brand
    if(filteredProduct.brand) {
      const brandUl = createKeyValue('Brand:', filteredProduct.brand);
      document.getElementById('product_details_div').appendChild(brandUl);
    }
  
    // Description
    if(filteredProduct.desc) {
      const descH6 = document.createElement("h6");
      descH6.innerText = 'Description:';
      const descP = document.createElement('p');
      descP.innerText = filteredProduct.desc;
      document.getElementById('product_details_div').appendChild(descH6);
      document.getElementById('product_details_div').appendChild(descP);
    }
    
    // Specification
    if(filteredProduct.spec) {
        const specH6 = document.createElement("h6");
        specH6.innerText = 'Specification:';
        const specUl = document.createElement("ul");
        specUl.className = 'list-unstyled pb-3';
        filteredProduct.spec.forEach(function (arrayItem) {
        const rightLi = document.createElement("li");
        rightLi.innerText = arrayItem;
        specUl.appendChild(rightLi);
        });
        document.getElementById('product_details_div').appendChild(specH6);
        document.getElementById('product_details_div').appendChild(specUl);
    }
    
    // Size
    if(filteredProduct.size){
      const sizeUl = createKeyValue('Available Size:', filteredProduct.size);
      document.getElementById('product_details_div').appendChild(sizeUl);
    }
  
    // Colour
    if(filteredProduct.colour) {
      const colourUl = createKeyValue('Available Colour:', filteredProduct.colour);
      document.getElementById('product_details_div').appendChild(colourUl);
    }
  
  }
  
  function loadDetails() {
      
    //const urlParams = new URL(window.location).searchParams;
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    console.log('productId from URL:' + productId);
  
    var filteredProduct = filterProductDetails(productId);
    console.log('filteredProduct:' + JSON.stringify(filteredProduct));
  
    if(!filteredProduct) {
        alert('Product ID not found...');
        window.location = "index.html";
    } else {
  
      constructDetailsPage(filteredProduct);
      $('#product-main-img').attr('src', 'assets/img/prd/' + filteredProduct.mainImg);
      $('#product-img-1').attr('src', 'assets/img/prd/' + filteredProduct.otherImages[0]);
      $('#product-img-2').attr('src', 'assets/img/prd/' + filteredProduct.otherImages[1]);
      $('#product-img-3').attr('src', 'assets/img/prd/' + filteredProduct.otherImages[2]);
        
    }
    
  }
