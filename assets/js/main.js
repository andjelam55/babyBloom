const BASE_URL = "assets/data/";

var cartItems = [];
var productData = [];

$(document).ready(function() {
    function ajaxCallback(fileName, onSuccess) {
        $.ajax({
            url: BASE_URL + fileName,
            method: "GET",
            dataType: "json",
            success: onSuccess,
            error: function(xhr) {
                console.log("Error loading " + url, xhr);
            }
        });
    }

    ajaxCallback("menu.json", function(menuData){
        renderMenu(menuData);
        renderMenuFooter(menuData);
    });

    ajaxCallback("category.json", function(categoryData){
        renderCategory(categoryData);
        renderDropdown(categoryData, "cat", "All category");
    });

    ajaxCallback("products.json", function(productData){
        window.productData = productData;
        renderProducts(productData);
        renderFeaturedProducts(productData);
    });

    ajaxCallback("delivery.json", function(deliveryData){
        renderDelivery(deliveryData);
    });

    ajaxCallback("sort.json", function(sortData){
        renderDropdown(sortData, "sort", "Default");
    });

    ajaxCallback("size.json", function(sizeData){
        renderDropdown(sizeData, "size", "All size");
    });
});
// $(document).ready(function(){
//     $.ajax({
//         url:"assets/data/menu.json",
//         method:"GET",
//         dataType:"json",
//         success:function(menuData){
//             //console.log(menuData)
//             renderMenu(menuData);
//             renderMenuFooter(menuData);
//         },
//         error:function(xhr){
//             console.log(xhr);
//         }
//     })
// });
// $(document).ready(function(){
//     $.ajax({
//         url:"assets/data/category.json",
//         method:"GET",
//         dataType:"json",
//         success:function(categoryData){
//             //console.log(categoryData)
//             renderCategory(categoryData);
//             renderDropdown(categoryData, "cat", "All category");
//         },
//         error:function(xhr){
//             console.log(xhr);
//         }
//     })
// });
// $(document).ready(function(){
//     $.ajax({
//         url:"assets/data/products.json",
//         method:"GET",
//         dataType:"json",
//         success:function(data){
//             //console.log(data);
//             productData = data;
//             //console.log(productData);
//             renderProducts(data);
//             renderFeaturedProducts(productData);
            
//         },
//         error:function(xhr){
//             console.log(xhr);
//         }
//     })
// });
// $(document).ready(function(){
//     $.ajax({
//         url:"assets/data/delivery.json",
//         method:"GET",
//         dataType:"json",
//         success:function(deliveryData){
//             //console.log(deliveryData)
//             renderDelivery(deliveryData);
//         },
//         error:function(xhr){
//             console.log(xhr);
//         }
//     })
// });
// $(document).ready(function(){
//     $.ajax({
//         url:"assets/data/sort.json",
//         method:"GET",
//         dataType:"json",
//         success:function(sortData){
//             //console.log(sortData)
//             renderSort(sortData);
//         },
//         error:function(xhr){
//             console.log(xhr);
//         }
//     })
// });
// $(document).ready(function(){
//     $.ajax({
//         url:"assets/data/size.json",
//         method:"GET",
//         dataType:"json",
//         success:function(sizeData){
//             //console.log(sizeData)
//             renderDropdown(sizeData, "size", "All size");
//         },
//         error:function(xhr){
//             console.log(xhr);
//         }
//     })
// });

function renderMenu(menuData){
    var data = `<div class="flex-fill">
    <ul class="nav navbar-nav d-flex justify-content-between mx-lg-auto">`;
    for(var menu of menuData){
        data+=`<li class="nav-item">
        <a class="nav-link" href="${menu.href}">${menu.name}</a>
        </li>`
    }
    data+=`</ul></div>`;
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
    if(document.getElementById("category")){
        document.getElementById("category").innerHTML = data;
    }
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
                            </div>
                            <div class="card-body">
                                <a href="shop-single.html" class="h3 text-decoration-none">${product.name}</a>
                                <ul class="list-unstyled d-flex justify-content-center mb-1">
                                ${getStar(product)}
                                </ul>
                                ${getPrice(product.price,product.discount)}
                                <a href="shop-single.html" class="h3 text-decoration-none">${product.description}</a>
                            </div>
                            <p class="text-center"><button class="btn btn-success">Add to cart</button></p>
                        </div>
                    </div>`
    }
    if(document.getElementById("products")){
        document.getElementById("products").innerHTML = data;
    }
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
                            </div>
                            <div class="card-body">
                                <a href="shop-single.html" class="h3 text-decoration-none">${f.name}</a>
                                <ul class="list-unstyled d-flex justify-content-center mb-1">
                                ${getStar(f)}
                                </ul>
                                ${getPrice(f.price,f.discount)}
                                <a href="shop-single.html" class="h3 text-decoration-none">${f.description}</a>
                            </div>
                            <p class="text-center"><button class="btn btn-success">Add to cart</button></p>
                        </div>
                    </div>`
    }
    if(document.getElementById("featuredProducts")){
        document.getElementById("featuredProducts").innerHTML = data;
    }
    
}

function renderDropdown(dataArray, elementId, defaultText) {
    let data = `<option value="0">${defaultText}</option>`; 
    for (let item of dataArray) {
        data += `<option value="${item.id}">${item.name}</option>`;
    }
    const el = document.getElementById(elementId);
    if (el) {
        el.innerHTML = data;
    }
}

function filterAndSort(){
    var filSorData = [...productData];

    var category = document.getElementById("cat") 
    if(category.value != "0"){ 
        filSorData = filSorData.filter(function(el){ 
            return el.category == category.value 
        }); 
    } 
    var size = document.getElementById("size") 
    if(size.value != "0"){ 
        filSorData = filSorData.filter(function(el){ 
            return el.size.includes(parseInt(size.value)) 
        }); 
    }

    var search = document.getElementById("search")
    var searchVal = search.value;
    filSorData = filSorData.filter(function(el){
        return el.name.toLowerCase().includes(searchVal.toLowerCase());
    });

    var sorted = document.getElementById("sort");
    var sortValue = sorted.value;
    filSorData.sort(function(a,b){
        if(sortValue === "price-asc"){
            return getFinalPrice(a.price,a.discount) - getFinalPrice(b.price,b.discount);
        }
        if(sortValue === "price-desc"){
            return getFinalPrice(b.price,b.discount) - getFinalPrice(a.price,a.discount);
        }
        if(sortValue === "name-asc"){
            return a.name.localeCompare(b.name);
        }
        if(sortValue === "name-desc"){
            return b.name.localeCompare(a.name);
        }
    });

    renderProducts(filSorData);
}

document.getElementById("sort").addEventListener("change",filterAndSort);
document.getElementById("search").addEventListener("input",filterAndSort);
document.getElementById("cat").addEventListener("change",filterAndSort); 
document.getElementById("size").addEventListener("change",filterAndSort);

function renderDelivery(deliveryData){

    const selectChoose = document.getElementById("selectChoose");
    const select = document.createElement("select");
    select.id = "choose";
    select.classList.add("form-control");
    select.innerHTML = "<option value='0'>Choose</option>";
    const options = deliveryData;
    options.forEach(o=>{
    const option = document.createElement("option");
    option.value = o.id;
    option.textContent = o.name;
    select.appendChild(option);
    });
    selectChoose.appendChild(select);

    bindContactForm();
}

function bindContactForm(){
var form = document.getElementById('contactForm');
if(form){
form.addEventListener('submit',function(event) {
event.preventDefault();
 console.log("SUBMIT RADI");
const name = document.getElementById('full-name').value;
const email = document.getElementById('email').value;
const chooseSelect = document.getElementById('choose');
const choose = chooseSelect ? chooseSelect.value : "0";
const terms = document.getElementById('terms');
const message = document.getElementById('message').value;
var isValid = true;
var regFullName = /^[A-Z][a-z]{2,15}(\s[A-Z][a-z]{2,20})?$/;
if (!regFullName.test(name)) {
document.getElementById('fullNameError').textContent = "Name must start with a capital and have minimal 3 letters!";
isValid = false;
} else {
document.getElementById('fullNameError').textContent = "";
}
var SignUpReg = /^[a-z]{4,}[0-9]*@(gmail\.com|yahoo\.com|ict\.edu\.rs)$/;
if (!SignUpReg.test(email)) {
document.getElementById('emailError').textContent = "Use lowercase letters, without '.' and '@gmail.com' or @yahoo.com or'@ict.edu.rs' at the end.";
isValid = false;
} else {
document.getElementById('emailError').textContent = "";
}
if(choose === "0"){
document.getElementById('selectError').textContent = "Please select.";
isValid = false;
} else{
document.getElementById('selectError').textContent = "";
}
if(!terms.checked){
document.getElementById('termsError').textContent = "You must agree to the terms.";
isValid = false;
} else{
document.getElementById('termsError').textContent = "";
}
if (message.length < 10) {
document.getElementById('messageError').textContent = "Message should be at least 10 characters long.";
isValid = false;
} else {
document.getElementById('messageError').textContent = "";
}
if (isValid) {
document.getElementById('full-name').value = '';
document.getElementById('email').value = '';
document.getElementById('choose').value = '';
terms.checked = false;
document.getElementById('message').value = '';
document.getElementById('success-message2').textContent = "Form successfully submitted!";
}
});

}


}



