fetch("projects.json")
.then(response => response.json())
.then(data => {

    function loadProjects(projects, containerId) {

        const container = document.getElementById(containerId);

        projects.forEach(project => {

            container.innerHTML += `
                <a class="card" href="${project.url}">
                    <b>${project.title}</b>
                    <span>${project.subtitle}</span>
                </a>
            `;

        });
    }


    loadProjects(
        data.own,
        "ownProjects"
    );


    loadProjects(
        data.client,
        "clientProjects"
    );


    // Automatic project counts

    document.getElementById("ownCount").textContent =
        data.own.length;


    document.getElementById("clientCount").textContent =
        data.client.length;


});
