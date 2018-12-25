_getJobs = (desc, location, fullTime) => {

    const url=`https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${desc}&full_time=${fullTime}&location=${location}`;
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

renderJSON = (response) => {

    var body = document.getElementById("body");
    var divToReplace = document.createElement("div");

    response.map((data) => {

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

        var description = document.createElement("div");
        description.className = "description";
        cleanText = data.description.replace(/(\r\n\t|\n|\r\t)/gm,"");
        description.innerHTML = cleanText;

        // create card with nodes
        container.appendChild(companyLogo);
        container.appendChild(positionTitle);
        container.appendChild(company);
        container.appendChild(location);
        container.appendChild(description);

        card.appendChild(container);

        divToReplace.appendChild(card);

        window.scrollTo(0, 500);
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