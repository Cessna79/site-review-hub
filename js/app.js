fetch("projects.json")
.then(response => response.json())
.then(data => {

    function loadProjects(projects, container) {

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
        document.getElementById("ownProjects")
    );


    loadProjects(
        data.client,
        document.getElementById("clientProjects")
    );

});
