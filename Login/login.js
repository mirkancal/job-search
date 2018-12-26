firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.

        document.getElementById("find_job").style.display = "block";
        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";
        document.getElementById("sign_up_div").style.display = "none";

        var user = firebase.auth().currentUser;

        if (user != null) {

            var email_id = user.email;
            document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

        }

    } else {
        // No user is signed in.

        document.getElementById("find_job").style.display = "none";
        document.getElementById("user_div").style.display = "none";
        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";

    }
});

function goSignUp() {
    console.log('hihihiihihihi');
    document.getElementById("sign_up_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
}

function goLogin() {
    document.getElementById("sign_up_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
}

function signupFromFirebase() {
    var fname = document.getElementById("sign_up_fname").value;
    var lname = document.getElementById("sign_up_lname").value;
    var email = document.getElementById("sign_up_email_field").value;
    var password = document.getElementById("sign_up_password_field").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((chart) => {
            firebase.firestore().collection('user').doc(chart.user.uid).set({
                firstName: fname,
                lastName: lname,
                email: email,
                password: password
            });
            console.log('successs');
        }).catch(e => {
        window.alert('Error happen' + e);
    })
}

function loginFromFirebase() {
    var userEmail = document.getElementById("login_email_field").value;
    var userPass = document.getElementById("login_password_field").value;
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail)) {
        firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            window.alert("Error : " + errorMessage);
        });
    } else {
        window.alert("Your Email is not Valid");
    }
}

function logoutFromFirebase() {
    firebase.auth().signOut();
}