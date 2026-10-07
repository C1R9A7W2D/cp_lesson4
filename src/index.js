import { MiniMaple } from './miniMaple.js';

document.addEventListener('DOMContentLoaded', setup);

function setup() {
    document.getElementById('demoButton').onclick = addSomething;
    document.getElementById('inputExpression').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addSomething();
        }
    });
}

function addSomething() {
    const inputExpression = document.getElementById('inputExpression');
    const input = inputExpression.value.trim();

    if (!input) {
        showError('Пожалуйста, введите выражение и переменную');
        return;
    }

    const parts = input.split(',');
    if (parts.length !== 2) {
        showError('Формат: выражение, переменная (например: x^2 + 3*x, x)');
        return;
    }

    const expression = parts[0].trim();
    const variable = parts[1].trim();

    if (!expression || !variable) {
        showError('Выражение и переменная не должны быть пусты');
        return;
    }

    try {
        const maple = new MiniMaple();
        const result = maple.diff(expression, variable);

        const someDummyDiv = document.createElement('div');
        someDummyDiv.classList.add('generated');
        const count = document.getElementsByClassName('generated').length;

        someDummyDiv.innerHTML = `
            <strong>Результат ${count + 1}:</strong><br/>
            <span>Выражение: <code>${escapeHtml(expression)}</code></span><br/>
            <span>Переменная: <code>${escapeHtml(variable)}</code></span><br/>
            <span>Производная: <code>${escapeHtml(result)}</code></span>
        `;

        const container = document.getElementById('container');
        container.insertBefore(someDummyDiv, container.firstChild);

        inputExpression.value = '';
    } catch (error) {
        showError(`Ошибка: ${error.message}`);
        console.error('Ошибка при вычислении производной:', error);
    }
}

function showError(message) {
    const someDummyDiv = document.createElement('div');
    someDummyDiv.classList.add('generated', 'error');
    const count = document.getElementsByClassName('generated').length;

    someDummyDiv.innerHTML = `<strong>Ошибка ${count + 1}:</strong> ${escapeHtml(message)}`;

    const container = document.getElementById('container');
    container.insertBefore(someDummyDiv, container.firstChild);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
