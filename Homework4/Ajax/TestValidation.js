function allValidation() {
    var user = document.getElementById("input_user").value;
    var email = document.getElementById("input_email").value;
    var addr = document.getElementById("input_address").value;
    ValidateEmail(email);
    ValidationUsername(user);
    ValidationAddress(addr);
}

function ValidationUsername(username) {
    if(username === "")
        alert("لطفا نام کاربری را وارد کنید");
}
function ValidationAddress(username) {
    if(username === "")
        alert("لطفا آدرس را وارد کنید");
}

function ValidateEmail(mail)
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {

        return (true);
    }
    alert("ایمیل وارد شده صحیح نمی باشد");
    return (false)
}
