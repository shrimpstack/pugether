let win_main = null;
let win_center = null;
let win_left = null;
let win_right = null;

export function init() {
  win_main = $('<div id="pugether_window">').appendTo('#layout_content');
  win_main.append('<link rel="stylesheet" href="https://shrimpstack.github.io/pugether/main/css/main.css">');
}