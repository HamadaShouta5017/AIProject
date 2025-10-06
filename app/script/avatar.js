/* global window, Image, document, APP */
(function () {
    "use strict";

    const { avatarPaths, dom } = window.APP.config;

    // プリロード
    function preloadAvatars() {
        const cache = [];
        avatarPaths.forEach((p) => {
            const im = new Image();
            im.src = p;
            cache.push(im);
        });
        return cache;
    }

    // ランダム切替（同じ連続回避）
    let lastIdx = -1;
    function changeAvatarRandom() {
        const img = document.getElementById(dom.avatarImgId);
        if (!img || avatarPaths.length === 0) return;
        let idx;
        do {
            idx = Math.floor(Math.random() * avatarPaths.length);
        } while (avatarPaths.length > 1 && idx === lastIdx);
        lastIdx = idx;
        img.src = avatarPaths[idx];
    }

    // 公開
    window.APP.avatar = {
        preloadAvatars,
        changeAvatarRandom
    };
})();
