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


let jobsObject = [];

function jobs(param) {
    console.log(jobsObject.length);
    console.log('id : ', param);
}

renderJSON = (response) => {

    var divToReplace = document.createElement("div");

    jobsObject = [];

    response.map((data) => {
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

        //add bookmark
        var addBookMark = document.createElement("button");
        addBookMark.innerText = "Add to Bookmark";
        addBookMark.addEventListener('click', function () {
            alert('OnClick');
            alert(data.id);
        }, false);// fix hereee

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

        var description = document.createElement("div");
        description.className = "description";
        cleanText = data.description.replace(/(\r\n\t|\n|\r\t)/gm, "");
        description.innerHTML = cleanText;

        // create card with nodes
        container.appendChild(companyLogo);
        container.appendChild(addBookMark);
        container.appendChild(positionTitle);
        container.appendChild(company);
        container.appendChild(location);
        container.appendChild(description);

        card.appendChild(container);

        divToReplace.appendChild(card);

        window.scrollTo(0, 800);
    });

    document.getElementById("div-to-replace").innerHTML = divToReplace.innerHTML;
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