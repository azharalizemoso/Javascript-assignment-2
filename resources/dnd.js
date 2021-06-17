
  var menuItems = {
    item1 : {
      name : 'French Fries',
      cost : 80.00
    },
    item2 :{
      name : 'Maccaroni with Cheese Sauce',
      cost : 180.00
    },
    item3 :{
      name : 'Chocolate Hazelnut Cheesecake',
      cost : 225.00
    }
  }



var tableContent = {
    table1 : {
      items : [

      ],
      cost : 0
    },
    table2 : {
      items : [
        
      ],
      cost : 0
    },
    table3 : {
      items : [
        
      ],
      cost : 0
    }
};



function onDragStart(event){
    event.currentTarget.style.backgroundColor = '#FAEBEFFF';
    event.dataTransfer.setData('text/plain', event.currentTarget.id);
};


function onDragOver(event) {
    event.preventDefault();
    event.currentTarget.style.backgroundColor = '#333D79FF';
};


function onDrop(event){
    event.preventDefault();

    event.currentTarget.style.backgroundColor = '';

    let droppedTable = event.currentTarget.id;
    let draggedItem = event.dataTransfer.getData('text');
    let flag = 0;
    for (let i = 0; i < tableContent[droppedTable].items.length; i++) {
      
      if (tableContent[droppedTable].items[i].item.name == menuItems[draggedItem].name) {
        tableContent[droppedTable].items[i].count++;
        flag=1;
      }
    }
    if(flag==0){
      tableContent[droppedTable].items.push(
        {
          item :menuItems[draggedItem],
          count :1
        });
    }
    for (let i = 0; i < tableContent[droppedTable].items.length; i++) {
      
      tableContent[droppedTable].cost += tableContent[droppedTable].items[i].cost
                                                * tableContent[droppedTable].items[i].count;
      
    }
    
    updateTableContect(event.currentTarget.id);

};

function onDragLeave(event) {
    event.currentTarget.style.backgroundColor = '';
}

function onDragEnd(event) {
    event.currentTarget.style.backgroundColor = '';
}

function updateTableContect(tableId){
  
    let table = document.getElementById(tableId);
    let tableCost = table.childNodes[3].innerHTML.split(' : ');
    let total = 0;
    for (let i = 0; i < tableContent[tableId].items.length; i++) {
      total += tableContent[tableId].items[i].item.cost * tableContent[tableId].items[i].count; 
    }
    tableCost[1] = Number(total);
    table.childNodes[3].innerHTML = tableCost[0] + ' : ' + tableCost[1];
    
    let tableItems = table.childNodes[5].innerHTML.split(' : ');
    let totalCount = 0;
    for (let i = 0; i < tableContent[tableId].items.length; i++) {
      totalCount += Number(tableContent[tableId].items[i].count); 
    }
    tableItems[1] = Number(totalCount);
    table.childNodes[5].innerHTML = tableItems[0] + ' : ' + tableItems[1];


}

function bill(event,ele) {

  while(ele && ele !== document){

    if(tableContent[ele.getAttribute('id')] != undefined){
      table = ele.getAttribute('id');
      ele.getElementsByTagName('h4')[0].innerHTML = 'Cost : 0';
      ele.getElementsByTagName('h4')[1].innerHTML = 'Total Items : 0';
      tableContent[table] = {items : [],cost : 0};
      ele.getElementsByClassName("modal")[0].style.display = "none";
      return;
    }
    
    ele = ele.parentNode;
  }
}

// Get the modal
var modal;
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close-btn")[0];

// When the user clicks on the button, open the modal
 function showModal(tableDiv) {
   modal = tableDiv.getElementsByClassName('modal')[0];
  modal.style.display = "block";
  let currentTable = tableDiv.getAttribute('id');

  modal.getElementsByClassName('maindiv')[0].remove();

  let maindiv = document.createElement('div');
  maindiv.setAttribute('class','maindiv');
  let div = document.createElement('div');
      div.setAttribute('class','row');
    let sno = document.createElement('h3');
        sno.setAttribute('class','col-sm-1');
        sno.textContent = 'S.no';
    let item = document.createElement('h3');
        item.setAttribute('class','col-sm-4');
        item.textContent = 'Item';
    let cost = document.createElement('h3');
        cost.setAttribute('class','col-sm-2');
        cost.textContent = 'Cost';
    div.appendChild(sno);
    div.appendChild(item);
    div.appendChild(cost);
    maindiv.appendChild(div);

    let total = 0;
  for (let i = 0; i < tableContent[currentTable].items.length; i++) {

    if (tableContent[currentTable].items[i].count == 0) {
      continue;
    }

    let div = document.createElement('div');
      div.setAttribute('class','row');
    let sno = document.createElement('h4');
        sno.setAttribute('class','col-sm-1');
        sno.textContent = i+1 + '.';
    let item = document.createElement('h4');
        item.setAttribute('class','col-sm-4');
        item.textContent = tableContent[currentTable].items[i].item.name;
    let cost = document.createElement('h4');
        cost.setAttribute('class','col-sm-2');
        cost.textContent = tableContent[currentTable].items[i].item.cost;
    let countinput = document.createElement('input');
        countinput.setAttribute('class','col-sm-4');
        countinput.setAttribute('type','number');
        countinput.setAttribute('min','0');
        countinput.setAttribute('step','1');
        countinput.setAttribute('onchange','inputChange(this,this.value,' + i + ')');
        countinput.value = tableContent[currentTable].items[i].count;
      
    total += tableContent[currentTable].items[i].item.cost * tableContent[currentTable].items[i].count;

    div.appendChild(sno);
    div.appendChild(item);
    div.appendChild(cost);
    div.appendChild(countinput);
    let lastDiv = maindiv.getElementsByClassName('row')[maindiv.getElementsByClassName('row').length-1];
    lastDiv.after(div);
  }
  modal.getElementsByClassName('head')[0].after(maindiv);
  document.getElementById('totalCost').innerHTML = 'Total Cost : ' + total;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 

function inputChange(ele,val,index){
  let maindiv = ele;
  while(maindiv && maindiv !== document){

    if(tableContent[maindiv.getAttribute('id')] != undefined){
      table = maindiv.getAttribute('id');
      tableContent[table].items[index].count = val;

    let tableCost = document.getElementById('totalCost').innerHTML.split(' : ');
    let total = 0;
    for (let i = 0; i < tableContent[table].items.length; i++) {
      total += tableContent[table].items[i].item.cost * tableContent[table].items[i].count; 
    }
    tableCost[1] = Number(total);
    document.getElementById('totalCost').innerHTML = tableCost[0] + ' : ' + tableCost[1];
  
    updateTableContect(table);
    return;
    }
    
    maindiv = maindiv.parentNode;
  }
}