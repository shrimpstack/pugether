import * as View from './View.js';

(() => {
  if(location.origin != "https://www.plurk.com") {
    alert("只能在噗浪開啟噗給樂");
    document.getElementById('pugether').remove();
    return;
  }
  if(!$('#filter_tab').length) {
    alert("只能在河道開啟噗給樂");
    document.getElementById('pugether').remove();
    return;
  }
  window.Pugether = { close: PGT_close };
  function PGT_close() {
    $('#pugether').remove();
    delete window.Pugether;
  }
  startup();
})()

function startup() {
  View.init();
}