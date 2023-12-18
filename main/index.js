window.pugether_open = function pugether_open() {
  if(location.origin != "https://www.plurk.com") {
    alert("只能在噗浪開啟噗給樂");
    return;
  }
  if(!$('#filter_tab').length) {
    alert("只能在河道開啟噗給樂");
    return;
  }
  window.pugether_close = function () {
    $('#pugether').remove();
    delete window.pugether_close;
  }
}
