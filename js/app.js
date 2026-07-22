let allProjects = [];


// Load projects

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


    // Initial render

    renderProjects(allProjects);


    // Project counts

    document.getElementById("ownCount").textContent =
        data.own.length;


    document.getElementById("clientCount").textContent =
        data.client.length;


});





// Display project cards

function renderProjects(projects) {


    const ownContainer =
        document.getElementById("ownProjects");


    const clientContainer =
        document.getElementById("clientProjects");


    ownContainer.innerHTML = "";

    clientContainer.innerHTML = "";



    let ownFound = false;

    let clientFound = false;



    projects.forEach(project => {



        const card = `

        <a class="card" href="${project.url}">

            <b>${project.title}</b>

            <span>${project.subtitle}</span>

        </a>

        `;



        if(project.category === "own") {


            ownContainer.innerHTML += card;

            ownFound = true;


        } else {


            clientContainer.innerHTML += card;

            clientFound = true;


        }


    });





    if(!ownFound) {


        ownContainer.innerHTML =
        `<div class="empty">No projects found</div>`;


    }




    if(!clientFound) {


        clientContainer.innerHTML =
        `<div class="empty">No projects found</div>`;


    }


}







// Search

document
.getElementById("searchBox")
.addEventListener("input", function(){



    const search =
    this.value.toLowerCase().trim();



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




    const groups =
    document.querySelectorAll(".group");




    if(search.length > 0) {



        const ownHasResults =
        filtered.some(
            project => project.category === "own"
        );



        const clientHasResults =
        filtered.some(
            project => project.category === "client"
        );



        groups[0].open = ownHasResults;

        groups[1].open = clientHasResults;



    } else {



        // Collapse everything when search is cleared

        groups.forEach(group => {

            group.open = false;

        });


    }



});
