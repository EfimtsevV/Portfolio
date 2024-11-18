// Функция для скрытия и отображения дополнительной информации
document.getElementById('toggleInfo').addEventListener('click', function() {
    const extraInfo = document.getElementById('extraInfo');
    if (extraInfo.style.display === 'none') {
        extraInfo.style.display = 'block';
    } else {
        extraInfo.style.display = 'none';
    }
});

const colors = ['darkgrey']; // Массив цветов
let currentIndex = 0; // Индекс текущего цвета

// Сохранение изначальных цветов в localStorage
const initialColors = {
    body: 'rgb(138, 130, 182)',
    header: '#292554',
    footer: '#292554'
};

// Сохраняем цвета в localStorage
localStorage.setItem('colors', JSON.stringify(initialColors));

// Устанавливаем изначальные цвета при загрузке страницы
document.body.style.backgroundColor = localStorage.body;
document.querySelector('header').style.backgroundColor = localStorage.header;
document.querySelector('footer').style.backgroundColor = localStorage.footer;

document.getElementById('interestingButton').addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % colors.length; // Увеличиваем индекс и сбрасываем его при достижении конца массива
    const newColor = colors[currentIndex]; // Получаем новый цвет из массива
    document.body.style.backgroundColor = newColor; 
    document.querySelector('header').style.backgroundColor = newColor; 
    document.querySelector('footer').style.backgroundColor = newColor; 
});

// Функция для возврата к изначальным цветам
function revertToInitialColors() {
    const colors = JSON.parse(localStorage.getItem('colors')); // Получаем цвета из localStorage
    document.body.style.backgroundColor = colors.body; // Возвращаем цвет body
    document.querySelector('header').style.backgroundColor = colors.header; // Возвращаем цвет header
    document.querySelector('footer').style.backgroundColor = colors.footer; // Возвращаем цвет footer
}

// Обработчик для кнопки возврата к изначальным цветам
document.getElementById('revertButton').addEventListener('click', revertToInitialColors);
currentIndex = 0;

const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;

document.getElementById('next').addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
});

document.getElementById('prev').addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
});

function updateSlider() {
    const offset = -currentIndex * 100;
    slides.style.transform = `translateX(${offset}%)`;
}


const reposContainer = document.getElementById('repos');
const username = 'EfimtsevV'; 

fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(data => {
        data.forEach(repo => {
            const repoDiv = document.createElement('div');
            repoDiv.className = 'repo';
            repoDiv.innerHTML = `
                <h2>${repo.name}</h2>
                <p>${repo.description || 'Нет описания'}</p>
                <a href="${repo.html_url}" target="_blank">Перейти к репозиторию</a>
            `;
            reposContainer.appendChild(repoDiv);
        });
    })
    .catch(error => {
        console.error('Ошибка при получении репозиториев:', error);
    });


    function toggleTheme(isDark) {
        const body = document.body;
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
    
        if (isDark) {
            // Switch to dark theme
            body.classList.add('dark-theme');
            body.classList.remove('light-theme');
            header.classList.add('dark-theme');
            header.classList.remove('light-theme');
            footer.classList.add('dark-theme');
            footer.classList.remove('light-theme');
        } else {
            // Switch to light theme
            body.classList.add('light-theme');
            body.classList.remove('dark-theme');
            header.classList.add('light-theme');
            header.classList.remove('dark-theme');
            footer.classList.add('light-theme');
            footer.classList.remove('dark-theme');
        }
    }
    
    // Event listeners for theme buttons
    document.getElementById('interestingButton').addEventListener('click', function() {
        toggleTheme(true); // Switch to dark theme
    });
    
    document.getElementById('revertButton').addEventListener('click', function() {
        toggleTheme(false); // Switch to light theme
    });
    
    // Initial theme setup
    toggleTheme(false); // Start with light theme
    