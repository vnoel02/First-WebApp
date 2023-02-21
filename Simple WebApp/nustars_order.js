"use strict";
// On load


window.addEventListener("load", 
   function() {

      var orderForm = document.forms.orderForm;
      orderForm.elements.orderDate.value = new Date().toDateString();

      orderForm.elements.model.focus();

      calcOrder();

      orderForm.elements.model.onchange = calcOrder;
      orderForm.elements.qty.onchange = calcOrder;
      var planOptions = document.querySelectorAll('input[name="protection"]');

      for (var i=0; i<planOptions.length; i++) {
         planOptions[i].onclick = calcOrder;
      }

   });

function calcOrder() {

   var orderForm = document.forms.orderForm;

   //Calculate the initial cos

   var mIndex = orderForm.elements.model.selectedIndex;
   var mCost = orderForm.elements.model.options[mIndex].value;

   var qIndex = orderForm.elements.qty.selectedIndex;
   var quantity = orderForm.elements.qty[qIndex].value;

   //Initial cost

   var initialCost = mCost * quantity;
   orderForm.elements.initialCost.value = formatUSCurrency(initialCost);

   //Retrieve the cost of user protection

   var pCost = document.querySelector("input[name='protection']:checked").value;
   orderForm.elements.protectionCost.value = formatNumber(pCost,2);

   //Calculate the subtotal

   orderForm.elements.subtotal.value = formatNumber((initialCost + pCost*1),2); //Chrome turns string to int by multiplying with int

   //Calculate the sale tax

   orderForm.elements.salesTax.value = formatNumber((0.05 * (initialCost + pCost*1)),2);

   //Calculate the total

   var total = (initialCost + pCost*1) +  0.05 * (initialCost + pCost*1)
   orderForm.elements.totalCost.value = formatUSCurrency(total);

   orderForm.elements.modelName.value = orderForm.elements.model.options[mIndex].text;
   orderForm.elements.protectionName.value = document.querySelector("input[name='protection']:checked").nextSibling.nodeValue;


}

function formatNumber (val, decimals) {



   return val.toLocaleString(undefined,{
      minimumFractionDigits:decimals,
      maximumFractionDigits:decimals
   });
}


function formatUSCurrency (val) {



   return val.toLocaleString('en-Us',{

      style:"currency", currency:"USD"
   });
}