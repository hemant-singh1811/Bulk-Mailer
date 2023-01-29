let submitbtn = document.getElementById('login-btn')
var email = document.getElementById('email')
var password = document.getElementById('password')
var body = document.getElementsByTagName('body')[0]
var warn = document.getElementById('warn')

submitbtn.onclick = function() {
    console.log('clikc');
    console.log(email.value);
    // console.log(password.value);
    warn.innerHTML = 'waiting....';
    warn.style.color = 'black'
    submitbtn.disabled = true;
    submitbtn.style.backgroundColor = '#333a568c';
    body.style.opacity = 0.7;
    $.ajax('/auth', {
            type: "post",
            data: {
                email: email.value.trim(),
                pass: password.value.trim()
            }
        })
        .done(function(res) {
            submitbtn.disabled = false;
            submitbtn.style.backgroundColor = '#333a56';
            body.style.opacity = 1;
            if (res == 'success') {
                console.log('auth sucess');
                warn.innerHTML = 'successfully authenticated';
                warn.style.color = 'green'
                var url = 'http://localhost:8989/message';
                window.location.href = url
            } else {
                submitbtn.disabled = false;
                warn.innerHTML = 'either your email ,password is wrong or not authenticate';
                warn.style.color = 'red'
                    // document.getElementById('popup1').style.visibility = 'visible';
                console.log('fail auth');
            }
        })
}