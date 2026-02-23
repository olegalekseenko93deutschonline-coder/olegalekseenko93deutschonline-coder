// Service Worker для фоновой работы
const CACHE_NAME = 'voicecall-cache-v1';

self.addEventListener('install', (event) => {
    console.log('Service Worker установлен');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker активирован');
    event.waitUntil(clients.claim());
});

// Обработка сообщений от основного приложения
self.addEventListener('message', (event) => {
    if (event.data.type === 'KEEP_ALIVE') {
        // Поддерживаем соединение
        console.log('Keep-alive сигнал получен');
    }
});

// Периодическое поддержание активности
setInterval(() => {
    clients.matchAll().then(clients => {
        clients.forEach(client => {
            client.postMessage({ type: 'PING' });
        });
    });
}, 20000);