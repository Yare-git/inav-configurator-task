'use strict';

import GUI from '../js/gui';
import i18n from '../js/localization';

console.log('🔵 [mynew.js] Файл загружен!');

const mynewTab = {};

mynewTab.initialize = function (callback) {
    console.log('🟢 [mynewTab.initialize] ВЫЗВАН!');
    console.log('📋 [mynewTab.initialize] callback:', callback);
    
    if (GUI.active_tab !== this) {
        GUI.active_tab = this;
        console.log('📌 [mynewTab.initialize] GUI.active_tab установлен:', GUI.active_tab);
    }

    console.log('🔧 [mynewTab.initialize] Устанавливаем requiresConnection = false, requiresFirmware = false');
    this.requiresConnection = false;
    this.requiresFirmware = false;

    console.log('📂 [mynewTab.initialize] Загружаем mynew.html...');
    import('./mynew.html?raw')
        .then(({default: html}) => {
            console.log('✅ [mynewTab.initialize] HTML загружен! Длина:', html.length);
            console.log('📄 [mynewTab.initialize] HTML начало:', html.substring(0, 200));
            
            GUI.load(html, function() {
                console.log('🟢 [mynewTab.initialize] GUI.load callback ВЫЗВАН!');
                process_html();
            });
        })
        .catch(err => {
            console.error('❌ [mynewTab.initialize] Ошибка загрузки HTML:', err);
        });

    function process_html() {
        console.log('🟢 [process_html] ВЫЗВАН!');

        console.log('🔍 [process_html] Ищем .mynew_sidebar_button...');
        const sidebarButtons = document.querySelectorAll('.mynew_sidebar_button');
        console.log('📊 [process_html] Найдено кнопок:', sidebarButtons.length);
        
        console.log('🔍 [process_html] Ищем #osd-content...');
        const osdContent = document.getElementById('osd-content');
        console.log('📊 [process_html] osdContent:', osdContent);
        
        console.log('🔍 [process_html] Ищем #sensors-content...');
        const sensorsContent = document.getElementById('sensors-content');
        console.log('📊 [process_html] sensorsContent:', sensorsContent);

        if (sidebarButtons.length && osdContent && sensorsContent) {
            console.log('✅ [process_html] Все элементы найдены! Навешиваем обработчики...');
            
            sidebarButtons.forEach((btn, index) => {
                console.log(`🔘 [process_html] Кнопка ${index}: data-tab="${btn.dataset.tab}"`);
                
                btn.addEventListener('click', function() {
                    const tab = this.dataset.tab;
                    console.log(`🖱️ [CLICK] Нажата кнопка: ${tab}`);
                    
                    console.log('🔘 [CLICK] Убираем active у всех кнопок...');
                    sidebarButtons.forEach(b => b.classList.remove('active'));
                    
                    console.log(`🔘 [CLICK] Добавляем active кнопке: ${tab}`);
                    this.classList.add('active');

                    if (tab === 'osd') {
                        console.log('📺 [CLICK] Показываем OSD, скрываем SENSORS');
                        osdContent.style.display = 'block';
                        sensorsContent.style.display = 'none';
                    } else if (tab === 'sensors') {
                        console.log('📊 [CLICK] Показываем SENSORS, скрываем OSD');
                        osdContent.style.display = 'none';
                        sensorsContent.style.display = 'block';
                    } else {
                        console.warn(`⚠️ [CLICK] Неизвестная вкладка: ${tab}`);
                    }
                });
            });
            
            console.log('✅ [process_html] Обработчики навешены!');
        } else {
            console.warn('❌ [process_html] Элементы НЕ найдены!');
            console.warn('❌ sidebarButtons:', sidebarButtons);
            console.warn('❌ osdContent:', osdContent);
            console.warn('❌ sensorsContent:', sensorsContent);
        }

        console.log('🌐 [process_html] Вызываем i18n.localize()...');
        i18n.localize();
        console.log('✅ [process_html] i18n.localize() выполнен');

        console.log('✅ [process_html] Вызываем GUI.content_ready(callback)...');
        GUI.content_ready(callback);
        console.log('✅ [process_html] GUI.content_ready(callback) выполнен');
    }
};

mynewTab.cleanup = function (callback) {
    console.log('🟡 [mynewTab.cleanup] ВЫЗВАН!');
    if (callback) {
        console.log('🟡 [mynewTab.cleanup] Вызываем callback...');
        callback();
    }
    console.log('🟡 [mynewTab.cleanup] Завершён');
};

export default mynewTab;