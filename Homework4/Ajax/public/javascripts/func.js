var rowCount ;

function clickA() {
    alert("matin");
}
function load() {
    var url = window.location.href;
    var number = url.slice(29);
    var element = document.getElementById("page"+number);
    element.classList.add("active")

}
function search() {
    var name = document.getElementById("name").value;
    $("#mytable").empty();
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var json = xhttp.responseText;
            var newJson = json.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
            newJson = newJson.replace(/'/g, '"');

            var data = JSON.parse(newJson);
            persons = data;
            putInRow(data)
            
        }
    };
    xhttp.open("GET", "http://localhost:8080/search?q="+name, true);
    xhttp.send();

}

function putInRow(data) {
    var tbl=$("<table />").attr("id","mytable")
        .attr("class","table");
    var thead=$("<thead>" +
        "<tr>" +
        "<th>Name</th>" +
        "<th>Email</th>" +
        "<th>Address</th>" +
        "</tr>");
    $("#mytable").append(thead);
    $("#tbody").append(tbl);
    for(var i=0;i<data.length;i++)
    {
        var tr="<tr>";
        var td1="<td>"+data[i]["name"]+"</td>";
        var td2="<td>"+data[i]["email"]+"</td>";
        var td3="<td>"+data[i]["addr"]+"</td></tr>";

        $("#mytable").append(tr+td1+td2+td3);

    }
}