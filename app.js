const linkList = document.getElementById('linkList');
const linkInput = document.getElementById('link');
const contextInput = document.getElementById('context');
const addLinkButton = document.getElementById('addLink');
const searchInput = document.getElementById('search');

// Завантаження посилань з localStorage після завантаження сторінки
window.addEventListener('load', () => {
    loadLinksFromLocalStorage();
});

// Функція для завантаження посилань з localStorage
function loadLinksFromLocalStorage() {
    const links = JSON.parse(localStorage.getItem('links')) || [];
    links.forEach(link => {
        addLinkToUI(link.link, link.context);
    });
}

// Додавання посилання на сторінку та в localStorage
addLinkButton.addEventListener('click', () => {
    const link = linkInput.value;
    const context = contextInput.value;
    addLinkToUI(link, context);
    linkInput.value = '';
    contextInput.value = '';
    saveLinkToLocalStorage(link, context);
});

// Додавання посилання до веб-сторінки
function addLinkToUI(link, context) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<a href="${link}">${context}</a>`;
    linkList.appendChild(listItem);
}

// Збереження посилань в localStorage
function saveLinkToLocalStorage(link, context) {
    const links = JSON.parse(localStorage.getItem('links')) || [];
    links.push({ link, context });
    localStorage.setItem('links', JSON.stringify(links));
}

// Пошук по контексту
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const linkItems = document.querySelectorAll('li');
    linkItems.forEach(item => {
        const linkText = item.querySelector('a').textContent.toLowerCase();
        if (linkText.includes(query)) {
            item.style.display = 'list-item';
        } else {
            item.style.display = 'none';
        }
    });
});