window.addEventListener('load', () => {
	const parser = new DOMParser();

	let clearButton = document.getElementById("todoClear");

	let todoList = document.querySelectorAll(".form-todo");

	let saveTodoItem = document.getElementById("saveTodoItem");
	let todoInput = document.getElementById("todoInput");

	let doneContainer = document.getElementById("todo-done");
	let todoContainer = document.getElementById("todo-progress");

	// Initialize bootstrap tooltip
	let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
	  return new bootstrap.Tooltip(tooltipTriggerEl)
	})

	let addItem = (todoText, isDone) => {
		let length = localStorage.length;
		let value = {
			"text": todoText,
			"isDone": isDone,
		};
		localStorage.setItem(`${length}`, JSON.stringify(value));
	};

	let toggleTodo = (index) => {
		let data = JSON.parse(localStorage.getItem(index));

		if (data.isDone)
			data.isDone = false;
		else
			data.isDone = true;

		localStorage.setItem(index, JSON.stringify(data));

	};

	let toggleStyle = (elm) => {
		elm.classList.toggle("bg-white")
		elm.classList.toggle("shadow-sm")
		elm.classList.toggle("border")
		elm.classList.toggle("text-secondary")
	};

	let todoBox = (todoText, index) => {
		const elem = `
		<div class="todoBox d-flex justify-content-between align-items-center p-3 my-2 bg-white shadow-sm rounded w-100">
			<div class="form-check form-check-inline">
			  <input class="form-check-input form-todo" type="checkbox" id="checkDone-${index}">
			  <label class="form-check-label h5 m-0 title-font fw-normal" for="checkDone-${index}">
				  ${todoText}
			  </label>
			</div>
			<div>
			  <button id="deleteItem-${index}" type="button" class="btn deleteItemButton">&#10005;</button>
			</div>
		</div>
		`;
		let box = parser.parseFromString(elem, "text/html").documentElement.childNodes[1].childNodes[0];
		let delButton = box.childNodes[3].childNodes[1];
		delButton.addEventListener("click", () => {
			box.remove();
			localStorage.removeItem(delButton.id.split("-")[1])
		});
		box.childNodes[1].childNodes[1].addEventListener("click", () => {

			if (box.childNodes[1].childNodes[1].checked) {
				doneContainer.appendChild(box);
				toggleTodo(index);
			} 
			else {
				todoContainer.appendChild(box);
				toggleTodo(index);
			}

			// Changes some of it's style
			toggleStyle(box);
		});
		return box;
	};

	let doneBox = (todoText, index) => {
		const elem = `
		<div class="p-3 d-flex justify-content-between align-items-center my-2 bg-light text-secondary border rounded w-100">
			<div class="form-check form-check-inline">
			  <input checked class="form-check-input form-todo" type="checkbox" id="checkDone-${index}">
			  <label class="form-check-label h5 m-0 title-font fw-normal" for="checkDone-${index}">
				  ${todoText}
			  </label>
			</div>
			<div>
			  <button id="deleteItem-${index}" type="button" class="btn deleteItemButton">&#10005;</button>
			</div>
		</div>
		`;
		let box = parser.parseFromString(elem, "text/html").documentElement.childNodes[1].childNodes[0];
		let delButton = box.childNodes[3].childNodes[1];
		delButton.addEventListener("click", () => {
			box.remove();
			localStorage.removeItem(delButton.id.split("-")[1])
		});
		box.childNodes[1].childNodes[1].addEventListener("click", () => {

			if (box.childNodes[1].childNodes[1].checked) {
				doneContainer.appendChild(box);
				toggleTodo(index);
			} 
			else {
				todoContainer.appendChild(box);
				toggleTodo(index);
			}

			// Changes some of it's style
			toggleStyle(box);
		});
		return box;
	}

	let updateState = () => {
		for (let i = 0; i < todoList.length; i++) {
			let element = todoList[i]; 
			element.addEventListener("click", () => {
				let parentElement = element.parentElement.parentElement;

				if (element.checked) {
					doneContainer.appendChild(parentElement);
					toggleTodo(i);
				} 
				else {
					todoContainer.appendChild(parentElement);
					toggleTodo(i);
				} 

				// Changes some of it's style
				toggleStyle(parentElement);
			});

		}
	}

	for (let i = 0; i < localStorage.length; i++) {
		let elem = JSON.parse(localStorage.getItem(i));

		if (elem.isDone) {
			doneContainer.appendChild(doneBox(elem.text, i));
		}
		else {
			todoContainer.appendChild(todoBox(elem.text, i));
		}
			
	}

	saveTodoItem.addEventListener("click", () => {
		let value = todoInput.value; 

		if (value == "")
			return

		todoContainer.appendChild(todoBox(value, localStorage.length))
		addItem(value, false);
		value = "";
	});

	clearButton.addEventListener("click", () => {
		localStorage.clear();
		doneContainer.innerHTML = "";
		todoContainer.innerHTML = "";

		alert("Clear, Success!");
	});

	updateState();
}, false);
