$(document).ready(function(){
    $.ajax({
        url:"assets/data/menu.json",
        method:"GET",
        dataType:"json",
        success:function(menuData){
            //console.log(menuData)
            renderMenu(menuData);
            renderMenuFooter(menuData);
        },
        error:function(xhr){
            console.log(xhr);
        }
    })
});
$(document).ready(function(){
    $.ajax({
        url:"assets/data/category.json",
        method:"GET",
        dataType:"json",
        success:function(categoryData){
            //console.log(categoryData)
            renderCategory(categoryData);
        },
        error:function(xhr){
            console.log(xhr);
        }
    })
});
var productData = [];
$(document).ready(function(){
    $.ajax({
        url:"assets/data/products.json",
        method:"GET",
        dataType:"json",
        success:function(data){
            //console.log(data);
            productData = data;
            //console.log(productData);
            renderProducts(data);
            renderFeaturedProducts(productData);
            
        },
        error:function(xhr){
            console.log(xhr);
        }
    })
});
$(document).ready(function(){
    $.ajax({
        url:"assets/data/delivery.json",
        method:"GET",
        dataType:"json",
        success:function(deliveryData){
            //console.log(deliveryData)
            //renderDelivery(deliveryData);
        },
        error:function(xhr){
            console.log(xhr);
        }
    })
});
$(document).ready(function(){
    $.ajax({
        url:"assets/data/sort.json",
        method:"GET",
        dataType:"json",
        success:function(sortData){
            //console.log(sortData)
            renderSort(sortData);
        },
        error:function(xhr){
            console.log(xhr);
        }
    })
});

function renderMenu(menuData){
    var data = `<div class="flex-fill">
    <ul class="nav navbar-nav d-flex justify-content-between mx-lg-auto">`;
    for(var menu of menuData){
        data+=`<li class="nav-item">
        <a class="nav-link" href="${menu.href}">${menu.name}</a>
        </li>`
    }
    data+=`</ul></div>
    <div class="navbar align-self-center d-flex">
        <a class="nav-icon position-relative text-decoration-none me-3" href="#">
            <i class="fa fa-fw fa-cart-arrow-down text-dark"></i>
        </a>
    </div>`;
    document.getElementById("templatemo_main_nav").innerHTML = data; 
}

function renderCategory(categoryData){
    var data="";
    categoryData.forEach(c => {
        data+=`<div class="col-12 col-md-4 p-5 mt-3">
                <img src="./assets/img/${c.img}" width="500" class="rounded-circle img-fluid border" alt="${c.img}">
                <h5 class="text-center mt-3 mb-3">${c.name}</h5>
                <p class="text-center"><a class="btn btn-success" href="shop.html">Shop Now</a></p>
            </div>`
    });
    document.getElementById("category").innerHTML=data;
}

function renderMenuFooter(menuData){
    var data = `<h5 class="text-light mb-2">Links</h5>
            <ul class="list-unstyled text-light mb-0" style="line-height:1.6;">`;
    for(var menu of menuData){
        data+=`<li>
        <a class="text-light text-decoration-none" href="${menu.href}">${menu.name}</a>
        </li>`
    }
    data+=`</ul>`;
    document.getElementById("link").innerHTML = data; 
}

var year = document.querySelector("#year");
var currentYear = new Date().getFullYear();
year.innerHTML = currentYear;

function renderProducts(productData){
    var data = "";
    for(var product of productData){
        data+=`<div class="col-md-4">
                        <div class="card mb-4 product-wap rounded-0">
                            <div class="card rounded-0">
                                <img class="card-img rounded-0 img-fluid" src="assets/img/${product.src}">
                                <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                    <ul class="list-unstyled">
                                        <li><a class="btn btn-success text-white" href="shop-single.html"><i class="far fa-heart"></i></a></li>
                                        <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="far fa-eye"></i></a></li>
                                        <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="fas fa-cart-plus"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="card-body">
                                <a href="shop-single.html" class="h3 text-decoration-none">${product.name}</a>
                                <ul class="list-unstyled d-flex justify-content-center mb-1">
                                ${getStar(product)}
                                </ul>
                                ${getPrice(product.price,product.discount)}
                                <a href="shop-single.html" class="h3 text-decoration-none">${product.description}</a>
                            </div>
                            <p class="text-center"><a class="btn btn-success" href="card.html">Add to card</a></p>
                        </div>
                    </div>`
    }
    document.getElementById("products").innerHTML=data;
}

function getPrice(price,discount){
    if(discount == null){
        return `<p class="mb-1 price">$${price}</p>`;
    }

    const finalPrice = getFinalPrice(price,discount);
    return `
        <p class="mb-0 discount">-${discount}%</p>
        <div class="price-row">
            <span class="old-price">$${price}</span>
            <span class="new-price">$${finalPrice.toFixed(2)}</span>
        </div>`;
}

function getFinalPrice(price,discount){
    if(discount == null){
        return price;
    }
    return price-(price*discount/100);
}

function getStar(product){
    var data = "";
    for(let i=0;i<product.star;i++){
        data+=`<i class="text-warning fa fa-star"></i>`
    }
    return data;
}

function renderSort(sortData){
    var data = `<option value="0">Default</option>`;
    for(var s of sortData){
        data+=`<option value="${s.sortValue}">${s.sortName}</option>`
    }
    document.getElementById("sort").innerHTML=data;
}

function renderFeaturedProducts(productData){
    var featuredData = productData.filter(function(p){
        return p.star === 5;
    })
    var data = "";
    for(var f of featuredData){
        data+=`<div class="col-md-4">
                        <div class="card mb-4 product-wap rounded-0">
                            <div class="card rounded-0">
                                <img class="card-img rounded-0 img-fluid" src="assets/img/${f.src}">
                                <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                    <ul class="list-unstyled">
                                        <li><a class="btn btn-success text-white" href="shop-single.html"><i class="far fa-heart"></i></a></li>
                                        <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="far fa-eye"></i></a></li>
                                        <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="fas fa-cart-plus"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="card-body">
                                <a href="shop-single.html" class="h3 text-decoration-none">${f.name}</a>
                                <ul class="list-unstyled d-flex justify-content-center mb-1">
                                ${getStar(f)}
                                </ul>
                                ${getPrice(f.price,f.discount)}
                                <a href="shop-single.html" class="h3 text-decoration-none">${f.description}</a>
                            </div>
                            <p class="text-center"><a class="btn btn-success" href="card.html">Add to card</a></p>
                        </div>
                    </div>`
    }
    document.getElementById("featuredProducts").innerHTML = data;
    
}

// function renderDelivery(deliveryData){

//     const selectChoose = document.getElementById("selectChoose");
//     const select = document.createElement("select");
//     select.id = "choose";
//     select.innerHTML = "<option value='0'>Choose</option>";
//     const options = deliveryData;
//     options.forEach(o=>{
//     const option = document.createElement("option");
//     option.value = o.id;
//     option.textContent = o.name;
//     select.appendChild(option);
//     });
//     selectChoose.appendChild(select);

// }