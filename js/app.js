let allProjects = [];


fetch("projects.json")
.then(response => response.json())
.then(data => {


    allProjects = [
        ...data.own.map(project => ({
            ...project,
            category: "own"
        })),

        ...data.client.map(project => ({
            ...project,
            category: "client"
        }))
    ];


    renderProjects(allProjects);


    document.getElementById("ownCount").textContent =
        data.own.length;


    document.getElementById("clientCount").textContent =
        data.client.length;


});



function renderProjects(projects) {

    const ownContainer =
        document.getElementById("ownProjects");

    const clientContainer =
        document.getElementById("clientProjects");


    ownContainer.innerHTML = "";
    clientContainer.innerHTML = "";


    projects.forEach(project => {


        const card = `
        <a class="card" href="${project.url}">
            <b>${project.title}</b>
            <span>${project.subtitle}</span>
        </a>
        `;


        if(project.category === "own") {

            ownContainer.innerHTML += card;

        } else {

            clientContainer.innerHTML += card;

        }

    });

}




document
.getElementById("searchBox")
.addEventListener("input", function(){


    const search =
    this.value.toLowerCase();


    const filtered =
    allProjects.filter(project => {


        return (

            project.title
            .toLowerCase()
            .includes(search)

            ||

            project.subtitle
            .toLowerCase()
            .includes(search)

        );

    });


    renderProjects(filtered);


});
