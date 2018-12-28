let firebaseUserID;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        firebaseUserID = user.uid;

        document.getElementById("user_div").style.display = "block";
        document.getElementById("search_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";
        document.getElementById("sign_up_div").style.display = "none";

        var user = firebase.auth().currentUser;

        if (user != null) {

            var email_id = user.email;
            document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

        }

    } else {
        // No user is signed in.

        document.getElementById("search_div").style.display = "none";
        document.getElementById("user_div").style.display = "none";
        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";

    }
});

function goSignUp() {
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
            firebaseUserID = chart.user.uid;
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


/* login part on the upp */


let jobsObject;
let bookMarks;


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((location) => {
                document.getElementById("lat").value = location.coords.latitude;
                document.getElementById("long").value = location.coords.longitude;
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

_getJobs = (desc, location, fullTime, lat, long) => {

    const url = `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${desc}&full_time=${fullTime}&location=${location}&lat=${lat}&long=${long}`;
    return fetch(url)
        .then(response => response.json())
        .then(responseJson => {
            console.log(fullTime);
            renderJSON(responseJson);
        })
        .catch(error => {
            console.error(error);
        });
};


function seeBookmarks() {

    // remove previous bookmarks before every render
    var myNode = document.getElementById("bookmark");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    firebase.firestore().collection('user').doc(firebaseUserID).collection('bookmarks').get()
        .then((data) => {
            data.forEach((doc) => {
                jobInfo = doc.data().data;

                var card = document.createElement("div");
                card.className = "job-card";

                // container
                var container = document.createElement("div");
                container.className = "container";

                // company logo
                var companyLogo = document.createElement("img");
                companyLogo.className = "company-logo";
                jobInfo.company_logo ? companyLogo.src = jobInfo.company_logo : companyLogo.src = "https://upload.wikimedia.org/wikipedia/commons/9/93/No-logo.svg";

                // position title
                var positionTitle = document.createElement("p");
                positionTitle.className = "title";
                positionTitle.innerHTML = `<a href="${jobInfo.url}">${jobInfo.title}</a>`;

                // organization name
                var company = document.createElement("p");
                company.className = "company";
                company.innerHTML = `Company: <a href="${jobInfo.company_url}">${jobInfo.company}</a>`;

                // location info
                var location = document.createElement("p");
                location.className = "location";
                location.innerText = `Location: ${jobInfo.location}`;

                //description
                var description = document.createElement("div");
                description.className = "description";
                cleanText = jobInfo.description.replace(/(\r\n\t|\n|\r\t)/gm, "");
                description.innerHTML = cleanText;

                container.appendChild(companyLogo);
                container.appendChild(positionTitle);
                container.appendChild(company);
                container.appendChild(location);
                container.appendChild(description);

                card.appendChild(container);

                document.getElementById("bookmark").appendChild(card);

            })
        });
}


renderJSON = (response) => {

    jobsObject = [];
    // remove content before every render
    var myNode = document.getElementById("content");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    response.map((data, index) => {
        jobsObject.push(data.id);
        console.log(JSON.stringify(jobsObject));
        // card
        var card = document.createElement("div");
        card.className = "job-card";

        // container
        var container = document.createElement("div");
        container.className = "container";

        // company logo
        var companyLogo = document.createElement("img");
        companyLogo.className = "company-logo";
        data.company_logo ? companyLogo.src = data.company_logo : companyLogo.src = "https://upload.wikimedia.org/wikipedia/commons/9/93/No-logo.svg";

        // position title
        var positionTitle = document.createElement("p");
        positionTitle.className = "title";
        positionTitle.innerHTML = `<a href="${data.url}">${data.title}</a>`;

        // organization name
        var company = document.createElement("p");
        company.className = "company";
        company.innerHTML = `Company: <a href="${data.company_url}">${data.company}</a>`;

        // location info
        var location = document.createElement("p");
        location.className = "location";
        location.innerText = `Location: ${data.location}`;

        //description
        var description = document.createElement("div");
        description.className = "description";
        cleanText = data.description.replace(/(\r\n\t|\n|\r\t)/gm, "");
        description.innerHTML = cleanText;

        //bookmark button
        var bookmarkButton = document.createElement("button");
        bookmarkButton.onclick = function () {
            console.log(data.id);
            console.log(firebaseUserID);
            console.log('hereee');
            firebase.firestore().collection('user').doc(firebaseUserID).collection('bookmarks').doc().set({
                data
            }, {merge: true});
            console.log("hello");
        };

        // create card with nodes
        container.appendChild(companyLogo);
        container.appendChild(positionTitle);
        container.appendChild(company);
        container.appendChild(location);
        container.appendChild(description);
        container.appendChild(bookmarkButton);

        card.appendChild(container);

        document.getElementById("content").appendChild(card);


        window.scrollTo(0, 800);
    });


};


/*
function actionFunc() {
    var body = document.getElementById("body");

    let desc = document.getElementById("desc").value;
    // var replaced = query.split(' ').join('+');

    let response = _getJobs(desc);

    var divToReplace = document.createElement("div");


};

    document.getElementById("div-to-replace").innerHTML = divToReplace.innerHTML;

}
*/