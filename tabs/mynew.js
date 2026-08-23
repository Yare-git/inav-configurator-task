'use strict';

import GUI from './../js/gui';
import i18n from './../js/localization';

const mynewTab = {};

mynewTab.initialize = function (callback) {
    console.log('mynewTab: initialize вызван!');
    
    GUI.active_tab_ref = this;
    GUI.active_tab = 'mynew';
    this.requiresConnection = false;
    this.requiresFirmware = false;

    import('./mynew.html?raw').then(({default: html}) => {
        GUI.load(html, process_html);
    }).catch(err => {
        console.error('mynewTab: Ошибка загрузки HTML:', err);
    });

    function process_html() {
        console.log('mynewTab: HTML загружен!');

        const sidebarButtons = document.querySelectorAll('.mynew_sidebar_button');
        const osdContent = document.getElementById('osd-content');
        const sensorsContent = document.getElementById('sensors-content');

        if (sidebarButtons.length && osdContent && sensorsContent) {
            sidebarButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    sidebarButtons.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');

                    if (this.dataset.tab === 'osd') {
                        osdContent.style.display = 'block';
                        sensorsContent.style.display = 'none';
                    } else {
                        osdContent.style.display = 'none';
                        sensorsContent.style.display = 'block';
                    }
                });
            });
        }

        i18n.localize();
        GUI.content_ready(callback);
    }
};

mynewTab.cleanup = function (callback) {
    console.log('mynewTab: cleanup вызван!');
    if (callback) callback();
};

export default mynewTab;