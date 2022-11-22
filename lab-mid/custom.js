function setColor(btn, color) {
    var count = 1;
    var property = document.getElementById(btn);
    if (count == 0) {
      property.style.backgroundColor = "#FFFFFF";
      count = 1;
    } else {
      property.style.backgroundColor = "#767676";
      count = 0;
    }
  }