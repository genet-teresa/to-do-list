document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const activeCount = document.getElementById('active-count');
    const completedCount = document.getElementById('completed-count');
    const totalCount = document.getElementById('total-count');

    const tasks = [
        { text: 'Welcome to your to-do list!', completed: false },
        { text: 'Click the checkbox to mark as complete', completed: false },
        { text: 'Hover to delete items', completed: true }
    ];

    const updateCounts = () => {
        const completed = tasks.filter(task => task.completed).length;
        const total = tasks.length;
        const active = total - completed;

        activeCount.textContent = active;
        completedCount.textContent = completed;
        totalCount.textContent = total;
    };

    const renderTasks = () => {
        taskList.innerHTML = '';

        tasks.forEach((task, index) => {
            const item = document.createElement('li');
            item.className = 'task-item' + (task.completed ? ' completed' : '');

            const left = document.createElement('div');
            left.className = 'task-left';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'task-checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => {
                tasks[index].completed = checkbox.checked;
                renderTasks();
            });

            const label = document.createElement('p');
            label.className = 'task-text';
            label.textContent = task.text;

            left.append(checkbox, label);

            const editButton = document.createElement('button');
            editButton.className = 'task-button task-edit';
            editButton.type = 'button';
            editButton.innerHTML = '✏️';
            editButton.title = 'Edit task';
            editButton.addEventListener('click', () => {
                const newText = prompt('Edit task', task.text);
                if (newText !== null) {
                    tasks[index].text = newText.trim() || task.text;
                    renderTasks();
                }
            });

            const deleteButton = document.createElement('button');
            deleteButton.className = 'task-button task-delete';
            deleteButton.type = 'button';
            deleteButton.innerHTML = '🗑️';
            deleteButton.title = 'Delete task';
            deleteButton.addEventListener('click', () => {
                tasks.splice(index, 1);
                renderTasks();
            });

            item.append(left, editButton, deleteButton);
            taskList.appendChild(item);
        });

        updateCounts();
    };

    const addTask = () => {
        const text = taskInput.value.trim();
        if (!text) {
            taskInput.focus();
            return;
        }

        tasks.push({ text, completed: false });
        taskInput.value = '';
        renderTasks();
    };

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    renderTasks();
});
