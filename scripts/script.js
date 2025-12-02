// Основной скрипт для всего сайта

document.addEventListener('DOMContentLoaded', function() {
    // Анимация прогресс-баров при загрузке страницы
    const progressBars = document.querySelectorAll('.skill-level, .progress');

    function animateProgressBars() {
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }

    // Запуск анимации при загрузке страницы
    animateProgressBars();

    // Фильтрация проектов
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Убираем активный класс у всех кнопок
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Добавляем активный класс текущей кнопке
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ===== Универсальные функции для модалок =====

    let previousActiveElement = null;

    function openModal(modalElement) {
        if (!modalElement) return;

        previousActiveElement = document.activeElement;

        modalElement.style.display = 'block';
        modalElement.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        const modalContent = modalElement.querySelector('.modal-content');
        if (modalContent) {
            modalContent.focus();
        }

        // Esc для закрытия
        function handleEscape(event) {
            if (event.key === 'Escape') {
                closeModal(modalElement);
            }
        }

        modalElement._handleEscape = handleEscape;
        document.addEventListener('keydown', handleEscape);

        // Фокус-трап внутри модалки
        modalElement.addEventListener('keydown', function(event) {
            if (event.key !== 'Tab') return;

            const focusableElements = modalElement.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (!focusableElements.length) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey) {
                if (document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }

    function closeModal(modalElement) {
        if (!modalElement) return;

        modalElement.style.display = 'none';
        modalElement.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';

        if (modalElement._handleEscape) {
            document.removeEventListener('keydown', modalElement._handleEscape);
            modalElement._handleEscape = null;
        }

        if (previousActiveElement) {
            previousActiveElement.focus();
            previousActiveElement = null;
        }
    }

    // Модальные окна для проектов (клик по карточке)
    const clickableCards = document.querySelectorAll('.project-card.clickable');
    const projectModal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');

    if (clickableCards.length > 0 && projectModal) {
        clickableCards.forEach(card => {
            card.addEventListener('click', function() {
                const projectId = this.getAttribute('data-project');
                loadProjectDetails(projectId);
                openModal(projectModal);
            });
        });

        // Закрытие модального окна по кнопке
        const closeBtn = projectModal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                closeModal(projectModal);
            });
        }

        // Закрытие при клике по фону
        projectModal.addEventListener('click', function(event) {
            if (event.target === projectModal) {
                closeModal(projectModal);
            }
        });
    }

    // Функция загрузки деталей проекта
    function loadProjectDetails(projectId) {
        const projectDetails = {
            '1': {
                title: 'Личный сайт',
                description: 'Полностью адаптивный личный сайт-портфолио, созданный с использованием HTML5 и CSS3. Включает анимации, адаптивную верстку и современный дизайн.',
                technologies: ['HTML5', 'CSS3', 'JavaScript'],
                screenshot: '../images/icons/pr_pic1.jpg',
                liveLink: '#',
                codeLink: '#'
            },
            '2': {
                title: 'Todo-приложение',
                description: 'Интерактивное приложение для управления задачами с возможностью добавления, редактирования, удаления и отметки выполненных задач.',
                technologies: ['JavaScript', 'LocalStorage', 'CSS3'],
                screenshot: '../images/icons/pr_pic2.jpg',
                liveLink: '#',
                codeLink: '#'
            },
            '3': {
                title: 'Интернет-магазин',
                description: 'Полнофункциональный интернет-магазин с корзиной покупок, системой фильтрации товаров и адаптивным дизайном.',
                technologies: ['React', 'Node.js', 'MongoDB'],
                screenshot: '../images/icons/pr_pic3.jpg',
                liveLink: '#',
                codeLink: '#'
            },
            '4': {
                title: 'Портфолио на Bootstrap',
                description: 'Адаптивное портфолио, созданное с использованием фреймворка Bootstrap 5. Включает сетку проектов, модальные окна и responsive навигацию.',
                technologies: ['Bootstrap 5', 'HTML5', 'JavaScript'],
                screenshot: '../images/icons/pr_pic1.jpg',
                liveLink: '#',
                codeLink: '#'
            }
        };

        const project = projectDetails[projectId];
        if (project) {
            modalBody.innerHTML = `
                <div class="project-details">
                    <div class="project-image-container">
                        <img src="${project.screenshot}" alt="${project.title}" class="project-image" width="400" height="300" loading="lazy">
                    </div>
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-technologies">
                            <h4>Технологии:</h4>
                            <ul>
                                ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="project-links">
                            <a href="${project.liveLink}" class="btn" target="_blank" rel="noopener">Живая версия</a>
                            <a href="${project.codeLink}" class="btn" target="_blank" rel="noopener">Исходный код</a>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    // Модальное окно для формы контактов
    const contactBtn = document.getElementById('contact-btn');
    const contactModal = document.getElementById('contact-modal');

    if (contactBtn && contactModal) {
        contactBtn.addEventListener('click', function() {
            openModal(contactModal);
        });

        const closeBtn = contactModal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                closeModal(contactModal);
            });
        }

        contactModal.addEventListener('click', function(event) {
            if (event.target === contactModal) {
                closeModal(contactModal);
            }
        });
    }

    // Добавление записей в дневник
    const addEntryBtn = document.getElementById('add-entry-btn');
    const addEntryModal = document.getElementById('add-entry-modal');
    const addEntryForm = document.getElementById('add-entry-form');

    if (addEntryBtn && addEntryModal) {
        // aria-expanded для кнопки
        addEntryBtn.setAttribute('aria-expanded', 'false');

        addEntryBtn.addEventListener('click', function() {
            openModal(addEntryModal);
            addEntryModal.setAttribute('aria-hidden', 'false');
            addEntryBtn.setAttribute('aria-expanded', 'true');
        });

        const closeBtn = addEntryModal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                closeModal(addEntryModal);
                addEntryBtn.setAttribute('aria-expanded', 'false');
            });
        }

        addEntryModal.addEventListener('click', function(event) {
            if (event.target === addEntryModal) {
                closeModal(addEntryModal);
                addEntryBtn.setAttribute('aria-expanded', 'false');
            }
        });

        if (addEntryForm) {
            addEntryForm.addEventListener('submit', function(e) {
                e.preventDefault();

                const date = document.getElementById('entry-date').value;
                const task = document.getElementById('entry-task').value;
                const status = document.getElementById('entry-status').value;

                // Форматирование даты
                const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'short'
                });

                // Создание новой записи
                const timeline = document.querySelector('.progress-timeline');
                const newEntry = document.createElement('div');
                newEntry.className = `timeline-item ${status === 'completed' ? 'completed' : 'in-progress'}`;
                newEntry.innerHTML = `
                    <span class="date">${formattedDate}</span>
                    <span class="task">${task}</span>
                    <span class="status">${status === 'completed' ? '✓' : 'in progress'}</span>
                `;

                timeline.appendChild(newEntry);
                closeModal(addEntryModal);
                addEntryBtn.setAttribute('aria-expanded', 'false');
                addEntryForm.reset();

                alert('Запись успешно добавлена!');
            });
        }
    }

    // Валидация формы контактов
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            let isValid = true;

            // Валидация имени
            const name = document.getElementById('name');
            const nameError = document.getElementById('name-error');
            if (name.value.trim() === '') {
                nameError.textContent = 'Пожалуйста, введите ваше имя';
                name.setAttribute('aria-invalid', 'true');
                isValid = false;
            } else {
                nameError.textContent = '';
                name.setAttribute('aria-invalid', 'false');
            }

            // Валидация email
            const email = document.getElementById('email');
            const emailError = document.getElementById('email-error');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                emailError.textContent = 'Пожалуйста, введите корректный email';
                email.setAttribute('aria-invalid', 'true');
                isValid = false;
            } else {
                emailError.textContent = '';
                email.setAttribute('aria-invalid', 'false');
            }

            // Валидация сообщения
            const message = document.getElementById('message');
            const messageError = document.getElementById('message-error');
            if (message.value.trim() === '') {
                messageError.textContent = 'Пожалуйста, введите ваше сообщение';
                message.setAttribute('aria-invalid', 'true');
                isValid = false;
            } else {
                messageError.textContent = '';
                message.setAttribute('aria-invalid', 'false');
            }

            if (isValid) {
                alert('Сообщение успешно отправлено!');
                contactForm.reset();

                const contactModal = document.getElementById('contact-modal');
                if (contactModal) {
                    closeModal(contactModal);
                }
            }
        });
    }
});
