// Фильтрация проектов
document.addEventListener('DOMContentLoaded', function() {
    initializeProjectFilters();
    initializeTaskForm();
    initializeContactForm();
});

// Инициализация фильтров проектов
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterButtons.length > 0 && projectItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                // Убираем активный класс со всех кнопок
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.classList.remove('btn-primary');
                    btn.classList.add('btn-outline-primary');
                });

                // Добавляем активный класс текущей кнопке
                this.classList.add('active');
                this.classList.remove('btn-outline-primary');
                this.classList.add('btn-primary');

                // Фильтрация проектов
                projectItems.forEach(item => {
                    const category = item.getAttribute('data-category');

                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        // Анимация появления
                        item.style.opacity = '0';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transition = 'opacity 0.3s ease';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        console.log('Фильтрация проектов инициализирована');
    }
}

// Инициализация формы добавления задач
function initializeTaskForm() {
    const taskForm = document.getElementById('taskForm');
    if (taskForm) {
        taskForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const dateInput = document.getElementById('taskDate');
            const descriptionInput = document.getElementById('taskDescription');

            const date = dateInput.value;
            const description = descriptionInput.value;

            if (date && description) {
                // Форматируем дату
                const formattedDate = formatDate(date);

                const taskList = document.querySelector('.list-group');
                const newTask = document.createElement('li');
                newTask.className = 'list-group-item d-flex align-items-center';
                newTask.innerHTML = `
                    <input class="form-check-input me-2" type="checkbox">
                    <span>${formattedDate} - ${description}</span>
                `;

                // Добавляем обработчик для checkbox
                const checkbox = newTask.querySelector('input[type="checkbox"]');
                checkbox.addEventListener('change', function() {
                    if (this.checked) {
                        newTask.querySelector('span').style.textDecoration = 'line-through';
                        newTask.querySelector('span').style.color = '#6c757d';
                    } else {
                        newTask.querySelector('span').style.textDecoration = 'none';
                        newTask.querySelector('span').style.color = 'inherit';
                    }
                });

                taskList.appendChild(newTask);

                // Закрываем модальное окно
                const modal = bootstrap.Modal.getInstance(document.getElementById('addTaskModal'));
                modal.hide();

                // Очищаем форму
                taskForm.reset();

                alert('Задача успешно добавлена!');
            }
        });
    }
}

// Инициализация формы контактов
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            if (!contactForm.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            } else {
                e.preventDefault();
                // Здесь можно добавить отправку формы на сервер
                alert('Сообщение отправлено! Спасибо за ваше сообщение.');
                contactForm.reset();
                contactForm.classList.remove('was-validated');
            }

            contactForm.classList.add('was-validated');
        });

        // Сброс валидации при изменении полей
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.checkValidity()) {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                } else {
                    this.classList.remove('is-valid');
                    this.classList.add('is-invalid');
                }
            });
        });
    }
}

// Функция для форматирования даты
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}.${month}`;
}

// Дополнительные функции для улучшения UX
document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Анимация карточек при загрузке
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});