export function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadFromStorage(key, fallback = []) {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : fallback;
}
