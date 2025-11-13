const STORAGE_KEY = 'react-todo-app';

export const saveTodos = (todos) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    console.log('Saved todos:', todos);
};

export const loadTodos = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        console.log('Loaded todos from storage');
        return JSON.parse(stored);
    }
    console.log('No saved todos found');
    return [];
};