window.onload = getData();

document.addEventListener('keyup',function(e){
	if (e.keyCode === 13) {
    	searchData();
  	}
});

var productlist = document.getElementById("productlist");

function getData() {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://webshop.wm3.se/api/v1/shop/products.json");

	xhttp.onload = function() {
		var productData = JSON.parse(xhttp.responseText);
		renderHTML(productData);
	};
	xhttp.send();
}

function searchData() {
	var inputValue = document.getElementById("search-input").value;

    while (productlist.firstChild) {
    	productlist.removeChild(productlist.firstChild);
	}

	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://webshop.wm3.se/api/v1/shop/products/search.json?q=" + inputValue);

	xhttp.onload = function() {
		var productData = JSON.parse(xhttp.responseText);
		renderHTML(productData);
	};
	xhttp.send();
}

function renderHTML(data) {
	var loopCount = 0;
	if (data.products.length < 6) {
		loopCount = data.products.length;
	}
	else {
		loopCount = 6;
	}

	for (i = 0; i < loopCount; i++) {
		var column = document.createElement("div");
		column.className = "col";
		column.id = "column";
		productlist.appendChild(column);

		var productImg = document.createElement("img");
		productImg.setAttribute("src", data.products[i].product_image.url);
		productImg.setAttribute("alt", data.products[i].name);
		productImg.className = "product-image";
		column.appendChild(productImg);

		var productName = document.createElement("h3");
		productName.className = "product-name";
		var productNameText = document.createTextNode(data.products[i].name);
		productName.appendChild(productNameText);
		column.appendChild(productName);


	}
}



