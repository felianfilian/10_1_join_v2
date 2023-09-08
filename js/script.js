/**
 * initial load of index html
 */
function indexLoad() {
  // setTimeout(() => {
  //   document.getElementById(
  //     "index-content"
  //   ).innerHTML = `<div w3-include-html="./login.html"></div>`;
  // }, 1000);
}

/**
 * show and hide the header menu
 */
function toggleAvatarMenu() {
  if (document.getElementById("avatar-menu").classList.contains("d-none")) {
    document.getElementById("avatar-menu").classList.remove("d-none");
  } else {
    document.getElementById("avatar-menu").classList.add("d-none");
  }
}
