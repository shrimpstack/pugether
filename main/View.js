let root = null;
let win_center = null;
let win_left = null;
let win_right = null;

export function create() {
  root = $('<div id="pugether_window">').appendTo('#layout_content');
  let css_url = "https://shrimpstack.github.io/pugether/main/css/main.css?time=" + new Date().getTime();
  root.append(`<link rel="stylesheet" href="${css_url}">`);
  win_center = $('<div class="win_center">').appendTo(root);
  win_left = $('<div class="win_left">').appendTo(root);
  win_right = $('<div class="win_right">').appendTo(root);
}

export function remove() {
  root.remove();
}