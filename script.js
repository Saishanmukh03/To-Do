document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('newTask');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const filterButtons = document.querySelectorAll('.filter-btn');

    let tasks = [];
    let currentFilter = 'all';

    const renderTasks = () => {
        taskList.innerHTML = '';

        tasks.forEach((task, index) => {
            if (currentFilter === 'all' || 
                (currentFilter === 'completed' && task.completed) || 
                (currentFilter === 'pending' && !task.completed)) {
                
                const li = document.createElement('li');
                li.className = `task-item ${task.completed ? 'completed' : ''}`;
                
                li.innerHTML = `
                    <span>${task.text}</span>
                    <div class="task-actions">
                        <button class="complete">${task.completed ? 'Undo' : 'Complete'}</button>
                        <button class="edit">Edit</button>
                        <button class="delete">Delete</button>
                    </div>
                `;

                const completeButton = li.querySelector('.complete');
                const editButton = li.querySelector('.edit');
                const deleteButton = li.querySelector('.delete');

                completeButton.addEventListener('click', () => toggleComplete(index));
                editButton.addEventListener('click', () => editTask(index));
                deleteButton.addEventListener('click', () => deleteTask(index));

                taskList.appendChild(li);
            }
        });
    };

    const addTask = () => {
        const text = newTaskInput.value.trim();
        if (text) {
            tasks.push({ text, completed: false });
            newTaskInput.value = '';
            renderTasks();
        }
    };

    const toggleComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    };

    const editTask = (index) => {
        const newText = prompt('Edit task:', tasks[index].text);
        if (newText !== null) {
            tasks[index].text = newText.trim();
            renderTasks();
        }
    };

    const deleteTask = (index) => {
        tasks.splice(index, 1);
        renderTasks();
    };

    addTaskButton.addEventListener('click', addTask);
    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.getAttribute('data-filter');
            renderTasks();
        });
    });

    renderTasks();
});
