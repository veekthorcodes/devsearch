let login = document.getElementById('login');
let logout = document.getElementById('logout');
let token = localStorage.getItem('token');

if (token) {
  login.remove();
} else {
  logout.remove();
}

logout.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.removeItem('token');
  window.location =
    'file:///home/veekthorcodes/Desktop/devsearch/frontend/login.html';
});

let projectsWrapper = document.getElementById('projects--wrapper');
let projectsUrl = 'http://127.0.0.1:8000/api/projects';

let getProjects = () => {
  fetch(projectsUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      buildProjects(data);
    });
};

let buildProjects = (projects) => {
  projectsWrapper.innerHTML = '';
  for (let i = 0; projects.length > i; i++) {
    project = projects[i];

    projectsWrapper.innerHTML += `
      <div class="project--card">
        <img src="http://127.0.0.1:8000${project.featured_image}" />
        
        <div class="project--header">
          <div>
            <h2>${project.title}</h2>
            <p>${project.description.substring(0, 150)}</p>
            <i>${project.vote_ratio}% positive votes</i>
          </div>

          <div>
            <strong class="project--vote" data-vote="up" data-project=${
              project.id
            }>&#43;</strong>
            <strong class="project--vote" data-vote="down" data-project=${
              project.id
            }>&#8722;</strong>
          </div>

          
        </div>
      </div>
    `;
  }

  eventTrigger();
};

let eventTrigger = () => {
  voteBtns = document.getElementsByClassName('project--vote');

  for (let i = 0; voteBtns.length > i; i++) {
    voteBtns[i].addEventListener('click', (e) => {
      let vote = e.target.dataset.vote;
      let project = e.target.dataset.project;
      let token = localStorage.getItem('token');

      fetch(`http://127.0.0.1:8000/api/project/${project}/vote/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ value: vote }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          getProjects();
        });
    });
  }
};

getProjects();
