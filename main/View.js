let root = null;
let win_center = null;
let win_left = null;
let win_right = null;

export function create() {
  root = $('<div id="pugether_window">').appendTo('#layout_content');
  root.append('<link>', {
    rel: "stylesheet",
    href: "https://shrimpstack.github.io/pugether/main/css/main.css?time=" + new Date().getTime(),
  });
  win_center = $('<div class="win_center">').appendTo(root);
  win_left = $('<div class="win_left">').appendTo(root);
  win_right = $('<div class="win_right">').appendTo(root);
}

export function remove() {
  root.remove();
}