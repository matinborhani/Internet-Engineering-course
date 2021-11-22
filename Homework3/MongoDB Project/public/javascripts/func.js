function load() {
    var url = window.location.href;
    var number = url.slice(29);
    var element = document.getElementById("page"+number);
    element.classList.add("active")

}
