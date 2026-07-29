// ==========================
// Heart Strings Business Manager
// ==========================
let orders = JSON.parse(localStorage.getItem("orders")) || [];
let editIndex = -1;
// ==========================
// Generate Order ID
// ==========================
function generateOrderId() {
    return "HS" + Date.now();
}

// ==========================
// Calculate Material Cost
// ==========================
function calculateMaterialCost() {
    const yarn = Number(document.getElementById("yarnCost").value) || 0;
    const buttons = Number(document.getElementById("buttonCost").value) || 0;
    const ribbon = Number(document.getElementById("ribbonCost").value) || 0;
    const packing = Number(document.getElementById("packingCost").value) || 0;
    const courier = Number(document.getElementById("courierCost").value) || 0;
    const other = Number(document.getElementById("otherCost").value) || 0;
    const total = yarn + buttons + ribbon + packing + courier + other;
    document.getElementById("materialCost").value = total;
    calculateProfit();
}

// ==========================
// Calculate Profit
// ==========================
function calculateProfit() {
    const sellingPrice =
        Number(document.getElementById("sellingPrice").value) || 0;
    const materialCost =
        Number(document.getElementById("materialCost").value) || 0;
    const profit = sellingPrice - materialCost;
    document.getElementById("profit").value = profit;
}
function generateOrderId(){
    return "HS-"+String(orders.length+1).padStart(4,"0");
}
// ==========================
// Save Order
// ==========================
function saveOrder() {
const orderId=document.getElementById("orderId").value||generateOrderId();
    const order = {
        orderId:orderId,
        id: generateOrderId(),
        customerName: document.getElementById("customerName").value,
        customerPhone: document.getElementById("customerPhone").value,
        customerAddress: document.getElementById("customerAddress").value,
        productName: document.getElementById("productName").value,
        category: document.getElementById("category").value,
        colour: document.getElementById("colour").value,
        size: document.getElementById("size").value,
        quantity: document.getElementById("quantity").value,
        status: document.getElementById("status").value,
        orderDate: document.getElementById("orderDate").value,
        deliveryDate: document.getElementById("deliveryDate").value,
        sellingPrice: Number(document.getElementById("sellingPrice").value),
        advanceReceived: Number(document.getElementById("advanceReceived").value),
        balanceAmount: Number(document.getElementById("balanceAmount").value),
        yarnCost: Number(document.getElementById("yarnCost").value),
        buttonCost: Number(document.getElementById("buttonCost").value),
        ribbonCost: Number(document.getElementById("ribbonCost").value),
        packingCost: Number(document.getElementById("packingCost").value),
        courierCost: Number(document.getElementById("courierCost").value),
        otherCost: Number(document.getElementById("otherCost").value),
        materialCost: Number(document.getElementById("materialCost").value),
        profit: Number(document.getElementById("profit").value),
        notes: document.getElementById("notes").value
    };
    if(editIndex==-1){
        orders.push(order);
    }else{
        order.id=orders[editIndex].id;
        orders[editIndex]=order;
        editIndex=-1;
    }
    saveLocalStorage();
    displayOrders();
    updateDashboard();
    clearForm();
    alert("Order Saved Successfully ❤️");
}

// ==========================
// Clear Form
// ==========================
function clearForm() {
    document.querySelectorAll("input").forEach(input => {
        if (
            input.type !== "button" &&
            input.type !== "submit"
        ) {
            input.value = "";
        }
    });
    document.querySelectorAll("textarea").forEach(area => {
        area.value = "";
    });
    document.querySelectorAll("select").forEach(select => {
        select.selectedIndex = 0;
    });
    document.getElementById("quantity").value = 1;
    document.getElementById("materialCost").value = "";
    document.getElementById("profit").value = "";
}
function displayOrders(){
    const tbody=document.getElementById("ordersBody");
    tbody.innerHTML="";
    orders.forEach((order,index)=>{
        tbody.innerHTML+=`
        <tr>
            <td>${order.customerName}</td>
            <td>${order.customerPhone}</td>
            <td>${order.productName}</td>
            <td>${order.category}</td>
            <td>${order.status}</td>
            <td>₹${order.sellingPrice}</td>
            <td>₹${order.materialCost}</td>
            <td>₹${order.profit}</td>
            <td>
                <button onclick="editOrder(${index})">✏️</button>
                <button onclick="deleteOrder(${index})">🗑️</button>
            </td>
        </tr>`;
    });
}

function updateDashboard(){
    let revenue=0;
    let expense=0;
    let profit=0;
    orders.forEach(order=>{
        revenue+=Number(order.sellingPrice);
        expense+=Number(order.materialCost);
        profit+=Number(order.profit);
    });
    document.getElementById("totalOrders").textContent=orders.length;
    document.getElementById("totalRevenue").textContent="₹"+revenue;
    document.getElementById("totalExpense").textContent="₹"+expense;
    document.getElementById("totalProfit").textContent="₹"+profit;
    document.getElementById("summaryRevenue").textContent="₹"+revenue;
    document.getElementById("summaryExpense").textContent="₹"+expense;
    document.getElementById("summaryProfit").textContent="₹"+profit;
}

function deleteOrder(index){
    if(!confirm("Delete this order?")) return;
    orders.splice(index,1);
    localStorage.setItem("orders",JSON.stringify(orders));
    displayOrders();
    updateDashboard();
}

function editOrder(index){
    const order=orders[index];
    editIndex=index;
    document.getElementById("customerName").value=order.customerName;
    document.getElementById("customerPhone").value=order.customerPhone;
    document.getElementById("customerAddress").value=order.customerAddress;
    document.getElementById("productName").value=order.productName;
    document.getElementById("category").value=order.category;
    document.getElementById("colour").value=order.colour;
    document.getElementById("size").value=order.size;
    document.getElementById("quantity").value=order.quantity;
    document.getElementById("status").value=order.status;
    document.getElementById("orderDate").value=order.orderDate;
    document.getElementById("deliveryDate").value=order.deliveryDate;
    document.getElementById("sellingPrice").value=order.sellingPrice;
    document.getElementById("advanceReceived").value=order.advanceReceived;
    document.getElementById("balanceAmount").value=order.balanceAmount;
    document.getElementById("yarnCost").value=order.yarnCost;
    document.getElementById("buttonCost").value=order.buttonCost;
    document.getElementById("ribbonCost").value=order.ribbonCost;
    document.getElementById("packingCost").value=order.packingCost;
    document.getElementById("courierCost").value=order.courierCost;
    document.getElementById("otherCost").value=order.otherCost;
    document.getElementById("materialCost").value=order.materialCost;
    document.getElementById("profit").value=order.profit;
    document.getElementById("notes").value=order.notes;
}

function updateOrder(){
    if(editIndex===-1){
        saveOrder();
        return;
    }
    orders[editIndex]={
        ...orders[editIndex],
        customerName:document.getElementById("customerName").value,
        customerPhone:document.getElementById("customerPhone").value,
        customerAddress:document.getElementById("customerAddress").value,
        productName:document.getElementById("productName").value,
        category:document.getElementById("category").value,
        colour:document.getElementById("colour").value,
        size:document.getElementById("size").value,
        quantity:document.getElementById("quantity").value,
        status:document.getElementById("status").value,
        orderDate:document.getElementById("orderDate").value,
        deliveryDate:document.getElementById("deliveryDate").value,
        sellingPrice:Number(document.getElementById("sellingPrice").value),
        advanceReceived:Number(document.getElementById("advanceReceived").value),
        balanceAmount:Number(document.getElementById("balanceAmount").value),
        yarnCost:Number(document.getElementById("yarnCost").value),
        buttonCost:Number(document.getElementById("buttonCost").value),
        ribbonCost:Number(document.getElementById("ribbonCost").value),
        packingCost:Number(document.getElementById("packingCost").value),
        courierCost:Number(document.getElementById("courierCost").value),
        otherCost:Number(document.getElementById("otherCost").value),
        materialCost:Number(document.getElementById("materialCost").value),
        profit:Number(document.getElementById("profit").value),
        notes:document.getElementById("notes").value
    };
    localStorage.setItem("orders",JSON.stringify(orders));
    editIndex=-1;
    clearForm();
    displayOrders();
    updateDashboard();
    alert("Order updated successfully ❤️");
}
function searchOrders(){
    const search=document.getElementById("searchOrder").value.toLowerCase();
    const rows=document.querySelectorAll("#ordersBody tr");
    rows.forEach(row=>{
        const text=row.textContent.toLowerCase();
        row.style.display=text.includes(search)?"":"none";
    });
}

function calculateBalance(){
    const selling=Number(document.getElementById("sellingPrice").value)||0;
    const advance=Number(document.getElementById("advanceReceived").value)||0;
    document.getElementById("balanceAmount").value=selling-advance;
    calculateProfit();
}

function saveLocalStorage(){
    localStorage.setItem("orders",JSON.stringify(orders));
}

function loadOrders(){
    const data=localStorage.getItem("orders");
    if(data){
        orders=JSON.parse(data);
    }else{
        orders=[];
    }
    displayOrders();
    updateDashboard();
}

document.getElementById("sellingPrice").addEventListener("input",calculateBalance);
document.getElementById("advanceReceived").addEventListener("input",calculateBalance);

document.getElementById("yarnCost").addEventListener("input",calculateMaterialCost);
document.getElementById("buttonCost").addEventListener("input",calculateMaterialCost);
document.getElementById("ribbonCost").addEventListener("input",calculateMaterialCost);
document.getElementById("packingCost").addEventListener("input",calculateMaterialCost);
document.getElementById("courierCost").addEventListener("input",calculateMaterialCost);
document.getElementById("otherCost").addEventListener("input",calculateMaterialCost);

window.onload=function(){
    loadOrders();
    document.getElementById("orderId").value=generateOrderId();
};

const imageInput=document.getElementById("productImage");
if(imageInput){
    imageInput.addEventListener("change",function(e){
        const file=e.target.files[0];
        if(!file)return;
        const reader=new FileReader();
        reader.onload=function(event){
            const img=document.getElementById("imagePreview");
            img.src=event.target.result;
            img.style.display="block";
        };
        reader.readAsDataURL(file);
    });
}