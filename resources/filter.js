function tableFilter() {
    
    let input = document.getElementById('tablefilter');
    let filter = input.value.toUpperCase();
    let ul = document.getElementById("tableList");
    let li = ul.getElementsByTagName('li');
  
    for (i = 0; i < li.length; i++) {
      h2 = li[i].getElementsByTagName("h2")[0];
      txtValue = h2.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

function menuFilter() {
    
    let input = document.getElementById('menufilter');
    let filter = input.value.toUpperCase();
    let ul = document.getElementById("menuList");
    let li = ul.getElementsByTagName('li');
  
    for (i = 0; i < li.length; i++) {
      h1 = li[i].getElementsByTagName("h1")[0];
      span = li[i].getElementsByTagName("span")[0];
      h1TxtValue = h1.innerText;
      spanTxtValue = span.innerText;
      if (h1TxtValue.toUpperCase().indexOf(filter) > -1 || spanTxtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
}

