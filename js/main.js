const form = document.querySelector("#form");
const task_input = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

if (localStorage.getItem('tasksHTML')) {
  tasksList.innerHTML = localStorage.getItem('tasksHTML')
}

form.addEventListener("submit", addTask);

function addTask(e) {
  e.preventDefault();
  const taskText = task_input.value;
  const taskHTML = `
            <li class="list-group-item d-flex justify-content-between task-item">
                <span class="task-title">${taskText}</span>
                <div class="task-item__buttons">
                    <button type="button" data-action="done" class="btn-action">
                    <img src="./img/tick.svg" alt="Done" width="18" height="18" />
                    </button>
                    <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/cross.svg" alt="Done" width="18" height="18" />
                    </button>
                </div>
            </li>
`;

  tasksList.insertAdjacentHTML("beforeend", taskHTML);

  task_input.value = "";
  task_input.focus();

  if (tasksList.children.length > 0) {
    emptyList.classList.add("none");
  }

  saveHTMLtoLS();
}

tasksList.addEventListener("click", deleteTask);

function deleteTask(event) {
  if (event.target.dataset.action == "delete") {
    const parenNode = event.target.closest("li");
    parenNode.remove();

    if (tasksList.children.length < 2) {
      emptyList.classList.remove("none");
    }
  }

  saveHTMLtoLS()
}

tasksList.addEventListener("click", completeTask);

function completeTask(event) {
  clickDone = event.target;
  if (clickDone.dataset.action == "done") {
    const parenNode = event.target.closest("li");
    parenNode.classList.add("green");
    clickDone.remove();
    console.log(parenNode);
  }

  saveHTMLtoLS()
}

function saveHTMLtoLS() {
  localStorage.setItem("tasksHTML", tasksList.innerHTML);
}
