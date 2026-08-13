// ==========================
// Heart Strings Business Manager
// ==========================
let orders = JSON.parse(localStorage.getItem("orders")) || [];
let editIndex = -1;
// ==========================
// Calculate Material Cost
// ==========================
function calculateMaterialCost() {
    const yarn = Number(document.getElementById("yarnCost").value) || 0;
    const buttons = Number(document.getElementById("buttonCost").value) || 0;
    const ribbon = Number(document.getElementById("ribbonCost").value) || 0;
    const accessories = Number(document.getElementById("accessoriesCost").value) || 0;
    const packing = Number(document.getElementById("packingCost").value) || 0;
    const other = Number(document.getElementById("otherCost").value) || 0;
    const total = yarn + buttons + ribbon + accessories + packing + other;
    document.getElementById("totalMaterialCost").value = total;
    calculateProfit();
}

// ==========================
// Calculate Profit
// ==========================
function calculateProfit() {
    const sellingPrice =Number(document.getElementById("TotalSellingPrice").value) || 0;
    const discountApplied =Number(document.getElementById("discountApplied").value) || 0;
    const shippingCharge =Number(document.getElementById("shippingCharge").value) || 0;
    const yarn =Number(document.getElementById("yarnCost").value) || 0;
    const button =Number(document.getElementById("buttonCost").value) || 0;
    const ribbon =Number(document.getElementById("ribbonCost").value) || 0;
    const accessories =Number(document.getElementById("accessoriesCost").value) || 0;
    const packing =Number(document.getElementById("packingCost").value) || 0;
    const other =Number(document.getElementById("otherCost").value) || 0;
    // ==============================
    // TOTAL MATERIAL COST
    // ==============================
    const totalMaterialCost =yarn + button + ribbon + accessories + packing + other;
    document.getElementById("totalMaterialCost").value =totalMaterialCost;
    // ==============================
    // TOTAL SELLING PRICE
    // Selling Price + Shipping - Discount
    // ==============================
    const totalSellingPrice =sellingPrice +shippingCharge -discountApplied;
    // ==============================
    // PROFIT
    // Total Selling Price - Material Cost
    // ==============================
    const profit =totalSellingPrice -totalMaterialCost;
    // ==============================
    // DISPLAY
    // ==============================
    document.getElementById("displayTotalSellingPrice").innerText ="₹" + totalSellingPrice;
    document.getElementById("displayMaterialCost").innerText ="₹" + totalMaterialCost;
    document.getElementById("displayProfit").innerText ="₹" + profit;
    // Return calculated values
    return {
        totalSellingPrice: totalSellingPrice,
        totalMaterialCost: totalMaterialCost,
        profit: profit
    };
}
// ==========================
// Save Order
// ==========================

function saveOrder() {
    const requiredFields = [
        "customerName",
        "customerPhone",
        "productName",
        "TotalSellingPrice"
    ];
    const isEmpty = requiredFields.every(id =>
        document.getElementById(id).value.trim() === ""
    );
    if (isEmpty) {
        alert("⚠️ No details added. Please enter the order details before saving.");
        return;
    }
    // =====================================================
    // EDIT EXISTING ORDER
    // =====================================================
    if (editIndex !== -1) {
        // IMPORTANT:
        // Keep the existing Order ID.
        const existingOrderId = orders[editIndex].orderId;
        const updatedOrder = {
            ...orders[editIndex],
            orderId: existingOrderId,
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
        TotalSellingPrice: Number(document.getElementById("TotalSellingPrice").value),
        sellingPrice: Number(document.getElementById("sellingPrice").value),
        discountApplied:Number(document.getElementById("discountApplied").value),
        shippingCharge:Number(document.getElementById("shippingCharge").value),
        accessoriesCost:Number(document.getElementById("accessoriesCost").value),
        advanceReceived: Number(document.getElementById("advanceReceived").value),
        balanceAmount: Number(document.getElementById("balanceAmount").value),
        paymentStatus: document.getElementById("paymentStatus").value,
        yarnCost: Number(document.getElementById("yarnCost").value),
        buttonCost: Number(document.getElementById("buttonCost").value),
        ribbonCost: Number(document.getElementById("ribbonCost").value),
        packingCost: Number(document.getElementById("packingCost").value),
        otherCost: Number(document.getElementById("otherCost").value),
        materialCost: Number(document.getElementById("totalMaterialCost").value),
        profit: Number(document.getElementById("displayProfit").innerText.replace("₹", "")),
        notes: document.getElementById("orderNotes").value
    };
    orders[editIndex] = updatedOrder;
            editIndex = -1;
            saveLocalStorage();
            displayOrders();
            updateDashboard();
            clearForm();
            setNextOrderId();
            // Change Update button back to Save
            const saveButton =
                document.getElementById("saveOrderButton");
            if (saveButton) {
                saveButton.innerText = "💾 Save Order";
                saveButton.onclick = saveOrder;
            }
            alert("Order Details Updated Successfully ✨");
            return;
        }
        // =====================================================
        // CREATE NEW ORDER
        // =====================================================

        const orderId = generateOrderId();
        const order = {
            orderId: orderId,
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
            TotalSellingPrice:Number(document.getElementById("TotalSellingPrice").value) || 0,
            sellingPrice:Number(document.getElementById("sellingPrice").value) || 0,
            discountApplied:Number(document.getElementById("discountApplied").value) || 0,
            shippingCharge:Number(document.getElementById("shippingCharge").value) || 0,
            accessoriesCost:Number(document.getElementById("accessoriesCost").value) || 0,
            advanceReceived:Number(document.getElementById("advanceReceived").value) || 0,
            balanceAmount:Number(document.getElementById("balanceAmount").value) || 0,
            paymentStatus:document.getElementById("paymentStatus").value,
            yarnCost:Number(document.getElementById("yarnCost").value) || 0,
            buttonCost:Number(document.getElementById("buttonCost").value) || 0,
            ribbonCost:Number(document.getElementById("ribbonCost").value) || 0,
            packingCost:Number(document.getElementById("packingCost").value) || 0,
            otherCost:Number(document.getElementById("otherCost").value) || 0,
            materialCost:Number(document.getElementById("totalMaterialCost").value) || 0,
            profit:Number(document.getElementById("displayProfit").innerText.replace("₹", "")) || 0,
            notes:document.getElementById("orderNotes").value};
        orders.push(order);
        saveLocalStorage();
        displayOrders();
        updateDashboard();
        clearForm();
        setNextOrderId();
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
    document.getElementById("totalMaterialCost").value = "";
    document.getElementById("displayProfit").value = "";
    // Reset calculated fields
    document.getElementById("balanceAmount").value = 0;
    document.getElementById("totalMaterialCost").value = 0;

    // Reset profit display
    document.getElementById("displayTotalSellingPrice").innerText = "₹0";
    document.getElementById("displayMaterialCost").innerText = "₹0";
    document.getElementById("displayProfit").innerText = "₹0";
}
function displayOrders(){
    const tbody=document.getElementById("ordersBody");
    tbody.innerHTML="";
    orders.forEach((order,index)=>{
        tbody.innerHTML+=`
        <tr>
            <td>${order.orderId}</td>
            <td>${order.customerName}</td>
            <td>${order.customerPhone}</td>
            <td>${order.productName}</td>
            <td>${order.category}</td>
            <td>${order.status}</td>
            <td>₹${order.TotalSellingPrice}</td>
            <td>₹${order.materialCost}</td>
            <td>${order.paymentStatus}</td>
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
        revenue+=Number(order.TotalSellingPrice);
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

function editOrder(index) {
    const order = orders[index];
    editIndex = index;
    document.getElementById("customerName").value =order.customerName || "";
    document.getElementById("customerPhone").value =order.customerPhone || "";
    document.getElementById("customerAddress").value =order.customerAddress || "";
    document.getElementById("productName").value =order.productName || "";
    document.getElementById("category").value =order.category || "";
    document.getElementById("colour").value =order.colour || "";
    document.getElementById("size").value =order.size || "";
    document.getElementById("quantity").value =order.quantity || "";
    document.getElementById("status").value =order.status || "";
    document.getElementById("orderDate").value =order.orderDate || "";
    document.getElementById("deliveryDate").value =order.deliveryDate || "";
    // Selling price
    document.getElementById("TotalSellingPrice").value =order.TotalSellingPrice || 0;
    document.getElementById("sellingPrice").value =order.TotalSellingPrice || 0;
    // Discount
    document.getElementById("discountApplied").value =order.discountApplied || 0;
    // Shipping
    document.getElementById("shippingCharge").value =order.shippingCharge || 0;
    // Accessories
    document.getElementById("accessoriesCost").value =order.accessoriesCost || 0;
    document.getElementById("advanceReceived").value =order.advanceReceived || 0;
    document.getElementById("balanceAmount").value =order.balanceAmount || 0;
    document.getElementById("paymentStatus").value =order.paymentStatus || "";
    // Material costs
    document.getElementById("yarnCost").value =order.yarnCost || 0;
    document.getElementById("buttonCost").value =order.buttonCost || 0;
    document.getElementById("ribbonCost").value =order.ribbonCost || 0;
    document.getElementById("packingCost").value =order.packingCost || 0;
    document.getElementById("otherCost").value =order.otherCost || 0;
    document.getElementById("totalMaterialCost").value =order.materialCost || 0;
    // Notes
    document.getElementById("orderNotes").value =order.notes || "";
    // Recalculate everything after loading the values
    calculateProfit();
        // Change Save button to Update
     const saveButton =document.getElementById("saveOrderButton");
        saveButton.innerText = "Update";
        saveButton.onclick = updateOrder;
    // Scroll to form
    document.getElementById("addOrderSection").scrollIntoView({
        behavior: "smooth",
        block: "start"});
    document.getElementById("customerName").focus();
}

function updateOrder() {
    // If no order is being edited, save as a new order
    if (editIndex === -1) {
        saveOrder();
        return;
    }
    // Recalculate material cost and profit using the current form values
    const calculation = calculateProfit();
    // Update the existing order
    orders[editIndex] = {
        ...orders[editIndex],
        // Customer details
        customerName:document.getElementById("customerName").value,
        customerPhone:document.getElementById("customerPhone").value,
        customerAddress:document.getElementById("customerAddress").value,
        // Product details
        productName:document.getElementById("productName").value,
        category:document.getElementById("category").value,
        colour:document.getElementById("colour").value,
        size:document.getElementById("size").value,
        quantity:document.getElementById("quantity").value,
        // Order details
        status:document.getElementById("status").value,
        orderDate:document.getElementById("orderDate").value,
        deliveryDate:document.getElementById("deliveryDate").value,
        // Selling price
        TotalSellingPrice:Number(document.getElementById("TotalSellingPrice").value) || 0,
        TotalSellingPrice:Number(document.getElementById("sellingPrice").value) || 0,
        // Discount
        discountApplied:Number(document.getElementById("discountApplied").value) || 0,
        // Shipping is paid by customer.
        // Save it, but DO NOT subtract it from profit.
        shippingCharge:Number(document.getElementById("shippingCharge").value) || 0,
        // Material/accessories costs
        accessoriesCost:Number(document.getElementById("accessoriesCost").value) || 0,
        yarnCost:Number(document.getElementById("yarnCost").value) || 0,
        buttonCost:Number(document.getElementById("buttonCost").value) || 0,
        ribbonCost:Number(document.getElementById("ribbonCost").value) || 0,
        packingCost:Number(document.getElementById("packingCost").value) || 0,
        otherCost:Number(document.getElementById("otherCost").value) || 0,
        // Payment details
        advanceReceived:Number(document.getElementById("advanceReceived").value) || 0,
        balanceAmount:Number(document.getElementById("balanceAmount").value) || 0,
        paymentStatus:document.getElementById("paymentStatus").value,
        // Calculated values
        materialCost:calculation.totalMaterialCost,
        profit:calculation.profit,
        // Notes
        notes:document.getElementById("orderNotes").value
    };
    // Save updated orders to localStorage
    localStorage.setItem("orders", JSON.stringify(orders));
    // Reset edit mode and change Update button back to Save
    editIndex = -1;
    const saveButton = document.getElementById("saveOrderButton");
    saveButton.innerText = "💾 Save Order";
     saveButton.onclick = saveOrder;
     // Clear form
    clearForm();
    // Refresh order list and dashboard displayOrders();
    updateDashboard();
    alert("Order updated successfully ❤️");
}

function searchOrders() {
     const search = document.getElementById("searchOrder").value.toLowerCase().trim();
     const rows = document.querySelectorAll("#ordersBody tr");
     let found = false;
     rows.forEach(row => {
         // Skip the "No orders found" row
         if (row.id === "noDataRow") return;
         const text = row.textContent.toLowerCase();
         if (text.includes(search)) {
             row.style.display = "";
             found = true;
         } else {
             row.style.display = "none";
         }
     });
     const noDataRow = document.getElementById("noDataRow");
     if (noDataRow) {
         if (!found && search !== "") {
             noDataRow.style.display = "";
         } else {
             noDataRow.style.display = "none";
         }
     }
     if (found) {
         document.getElementById("ordersSection").scrollIntoView({
             behavior: "smooth",
             block: "start"
         });
     }
 }

function calculateBalance() {
    const selling = Number(document.getElementById("TotalSellingPrice").value) || 0;
    const advance = Number(document.getElementById("advanceReceived").value) || 0;
    const paymentStatus = document.getElementById("paymentStatus").value;

    if (paymentStatus === "Fully Paid") {
        document.getElementById("balanceAmount").value = 0;
    } else {
        document.getElementById("balanceAmount").value = selling - advance;
    }
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
document.getElementById("TotalSellingPrice").addEventListener("input",calculateBalance);
document.getElementById("advanceReceived").addEventListener("input",calculateBalance);
document.getElementById("yarnCost").addEventListener("input",calculateMaterialCost);
document.getElementById("buttonCost").addEventListener("input",calculateMaterialCost);
document.getElementById("ribbonCost").addEventListener("input",calculateMaterialCost);
document.getElementById("packingCost").addEventListener("input",calculateMaterialCost);
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
const saveBtn = document.getElementById("saveOrderBtn");
const popup = document.getElementById("successPopup");
saveBtn.addEventListener("click", function(e){
    e.preventDefault();
    popup.style.display = "flex";
});
document.getElementById("newOrderBtn").addEventListener("click", function(){
    popup.style.display = "none";
    document.querySelector(".order-form").reset();
});
document.getElementById("viewOrdersBtn").addEventListener("click", function(){
    window.location.href = "orders.html";
});

function handleSearch(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchOrders();
        document.getElementById("ordersSection").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

function exportToExcel() {
    const table = document.getElementById("ordersTable");
    const clonedTable = table.cloneNode(true);
    const rows = clonedTable.querySelectorAll("tr");
    rows.forEach(row => {
        if (row.cells.length > 0) {
            row.deleteCell(row.cells.length - 1);
        }
    });
    const workbook = XLSX.utils.table_to_book(clonedTable, {
        sheet: "Orders"
    });
    XLSX.writeFile(workbook, "Orders.xlsx");
}

function generateOrderId() {
    let maxNumber = 0;
    orders.forEach(order => {
        const existingId = order.orderId;
        if (!existingId) return;
        const match = String(existingId).match(/^HS-(\d+)$/);
        if (match) {
            const number = Number(match[1]);
            if (number > maxNumber) {
                maxNumber = number;
            }
        }
    });
    return "HS-" + String(maxNumber + 1).padStart(4, "0");
}

function calculateTotalSellingPrice() {
    const sellingPrice = parseFloat(document.getElementById('sellingPrice').value) || 0;
    const shippingCharge = parseFloat(document.getElementById('shippingCharge').value) || 0;
    const discountApplied = parseFloat(document.getElementById('discountApplied').value) || 0;

    const TotalSellingPrice = (sellingPrice + shippingCharge )- discountApplied;

    document.getElementById('TotalSellingPrice').value = TotalSellingPrice;

    // Keep your existing calculations updated
    calculateBalance();
    calculateProfit();
}
