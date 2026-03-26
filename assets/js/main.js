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
$(document).ready(function(){
    $.ajax({
        url:"assets/data/products.json",
        method:"GET",
        dataType:"json",
        success:function(productData){
            //console.log(productData)
            renderProducts(productData);
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
                                <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
                                    <li>M/L/X/XL</li>
                                    <li class="pt-2">
                                        <span class="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                        <span class="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                        <span class="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                        <span class="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                        <span class="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
                                    </li>
                                </ul>
                                <ul class="list-unstyled d-flex justify-content-center mb-1">
                                    <li>
                                        <i class="text-warning fa fa-star"></i>
                                        <i class="text-warning fa fa-star"></i>
                                        <i class="text-warning fa fa-star"></i>
                                        <i class="text-muted fa fa-star"></i>
                                        <i class="text-muted fa fa-star"></i>
                                    </li>
                                </ul>
                                <p class="text-center mb-0">$250.00</p>
                            </div>
                        </div>
                    </div>`
    }
    document.getElementById("products").innerHTML=data;
}