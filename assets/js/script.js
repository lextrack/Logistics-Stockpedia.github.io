var itemsPerPage = 5;
var currentPage = 1;
var totalPages = 5;

function validateForm(){
    var product = document.getElementById("product").value;
    var incomings = document.getElementById("incomings").value;
    var outgoings = document.getElementById("outgoings").value;
    var price = document.getElementById("price").value;
    var supplier = document.getElementById("supplier").value;
    var date = document.getElementById("date").value;
    var total = document.getElementById("total").value;

    if(product == "")
{
    alert("Indicate at least the name of the product");
    return false;
}
return true;
}

function showData(){
    var productList;
    if(localStorage.getItem("productList") == null) {
        productList = [];
    } else {
        productList = JSON.parse(localStorage.getItem("productList"));
    }
    totalPages = Math.ceil(productList.length / itemsPerPage);

    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;
    var displayedProducts = productList.slice(startIndex, endIndex);

    var html = "";
    displayedProducts.forEach(function (element, crud){
        html += "<tr>";
        html += "<td>" + element.product + "</td>";
        html += "<td>" + element.incomings + "</td>";
        html += "<td>" + element.outgoings + "</td>";
        html += "<td>" + element.total + "</td>";
        html += "<td>" + element.price + "</td>";
        html += "<td>" + element.supplier + "</td>";
        html += "<td>" + element.date + "</td>";
        html += 
        '<td><button onclick="deleteData(' + 
        crud +
        ')"class="btn btn-outline-danger">Delete</button><button onclick="updateData(' + 
        crud +
        ')" class="btn btn-outline-warning m-1">Edit</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;

    let paginationHtml = '<button class="btn btn-outline-danger" onclick="changePage(' + (currentPage - 1) + ')" ' + (currentPage === 1 ? 'disabled' : '') + '>&lt;</button>';
    paginationHtml += '<button class="btn btn-outline-danger" onclick="changePage(1)">First</button>';
    if (totalPages > 5) {
        let startPage = currentPage - 2;
        let endPage = currentPage + 2;
        if (startPage < 1) {
            startPage = 1;
            endPage = 5;
        } else if (endPage > totalPages) {
            endPage = totalPages;
            startPage = totalPages - 4;
        }
        for (let i = startPage; i <= endPage; i++) {
            paginationHtml += '<button class="btn btn-outline-danger" onclick="changePage(' + i + ')" ' + (currentPage === i ? 'style="background-color: #7a2640"' : '') + '>' + i + '</button>';
        }
    } else {
        for (let i = 1; i <= totalPages; i++) {
            paginationHtml += '<button class="btn btn-outline-danger" onclick="changePage(' + i + ')" ' + (currentPage === i ? 'style="background-color: #7a2640"' : '') + '>' + i + '</button>';
        }
    }
    paginationHtml += '<button class="btn btn-outline-danger" onclick="changePage(' + totalPages + ')">Latest</button>';
    paginationHtml += '<button class="btn btn-outline-danger" onclick="changePage(' + (currentPage + 1) + ')" ' + (currentPage === totalPages ? 'disabled' : '') + '>&gt;</button>';

    document.querySelector("#pagination").innerHTML = paginationHtml;
}

document.onload = showData();

function changePage(newPage) {
    if (newPage < 1) {
        currentPage = 1;
    } else if (newPage > totalPages) {
        currentPage = totalPages;
    } else {
        currentPage = newPage;
    }
    showData();
}

function AddData(){
    if(validateForm() == true){
        var product = document.getElementById("product").value;
        var incomings = document.getElementById("incomings").value;
        var outgoings = document.getElementById("outgoings").value;
        var price = document.getElementById("price").value;
        var supplier = document.getElementById("supplier").value;
        var date = document.getElementById("date").value;
        var total = parseInt(incomings) - parseInt(outgoings);

        var productList;
        if(localStorage.getItem("productList") == null){
            productList = [];
        }
        else{
            productList = JSON.parse(localStorage.getItem("productList"));
        }
    
        productList.push({
            product : product,
            incomings: incomings,
            outgoings : outgoings,
            price : price,
            supplier : supplier,
            date : date,
            total: total,
        });

        localStorage.setItem("productList", JSON.stringify(productList));
        showData();
        document.getElementById("product").value = "";
        document.getElementById("incomings").value = "";
        document.getElementById("outgoings").value = "";
        document.getElementById("total").value = "";
        document.getElementById("price").value = "";
        document.getElementById("supplier").value = "";
        document.getElementById("date").value = "";
    }
}

function deleteData(crud){
    var productList;
    if(localStorage.getItem("productList") == null){
        productList = [];
    }
    else{
        productList = JSON.parse(localStorage.getItem("productList"));
    }

    productList.splice(crud, 1);
    localStorage.setItem("productList", JSON.stringify(productList));
    showData();
}

function updateData(crud){
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    document.getElementById("incomings").addEventListener("input", updateTotal);
    document.getElementById("outgoings").addEventListener("input", updateTotal);

    var productList;
    if(localStorage.getItem("productList") == null){
        productList = [];
    }
    else{
        productList = JSON.parse(localStorage.getItem("productList"));
    }
    
    document.getElementById("product").value = productList[crud].product;
    document.getElementById("incomings").value = productList[crud].incomings;
    document.getElementById("outgoings").value = productList[crud].outgoings;
    document.getElementById("total").value = productList[crud].total;
    document.getElementById("price").value = productList[crud].price;
    document.getElementById("supplier").value = productList[crud].supplier;
    document.getElementById("date").value = productList[crud].date;


    document.querySelector("#Update").onclick = function(){

        if(validateForm() == true){
            productList[crud].product = document.getElementById("product").value;
            productList[crud].incomings = document.getElementById("incomings").value;
            productList[crud].outgoings = document.getElementById("outgoings").value;
            productList[crud].total = document.getElementById("total").value;
            productList[crud].price = document.getElementById("price").value;
            productList[crud].supplier = document.getElementById("supplier").value;
            productList[crud].date = document.getElementById("date").value;

            localStorage.setItem("productList", JSON.stringify(productList));

            showData();

            document.getElementById("product").value = "";
            document.getElementById("incomings").value = "";
            document.getElementById("outgoings").value = "";
            document.getElementById("total").value = "";
            document.getElementById("price").value = "";
            document.getElementById("supplier").value = "";
            document.getElementById("date").value = "";

            document.getElementById("incomings").addEventListener("input", updateTotal);
            document.getElementById("outgoings").addEventListener("input", updateTotal);

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    }
}

function updateTotal(){
    var incomings = document.getElementById("incomings").value;
    var outgoings = document.getElementById("outgoings").value;
    document.getElementById("total").value = parseInt(incomings) - parseInt(outgoings);
}

function searchData(){
    var searchInput = document.getElementById("searchInput").value;
    var productList = JSON.parse(localStorage.getItem("productList"));
    var searchedProducts = productList.filter(function(product) {
      return (
        product.product.toLowerCase().crudOf(searchInput.toLowerCase()) != -1 ||
        product.incomings.toLowerCase().crudOf(searchInput.toLowerCase()) != -1 ||
        product.outgoings.toLowerCase().crudOf(searchInput.toLowerCase()) != -1 ||
        product.price.toLowerCase().crudOf(searchInput.toLowerCase()) != -1 ||
        product.supplier.toLowerCase().crudOf(searchInput.toLowerCase()) != -1 ||
        product.date.toLowerCase().crudOf(searchInput.toLowerCase()) != -1
      );
    });
    var html = "";
    searchedProducts.forEach(function(element, crud){
      html += "<tr>";
      html += "<td>" + element.product + "</td>";
      html += "<td>" + element.incomings + "</td>";
      html += "<td>" + element.outgoings + "</td>";
      html += "<td>" + element.total + "</td>";
      html += "<td>" + element.price + "</td>";
      html += "<td>" + element.supplier + "</td>";
      html += "<td>" + element.date + "</td>";
      html +=
        '<td><button onclick="deleteData(' +
        crud +
        ')"class="btn btn-danger">Delete</button><button onclick="updateData(' +
        crud +
        ')" class="btn btn-warning m-1">Edit</button></td>';
      html += "</tr>";
    });
    document.querySelector("#crudTable tbody").innerHTML = html;
  }
  
  