/* global window, document, bootstrap */
(function () {
    "use strict";

    const { dom } = window.APP.config;

    // 初期化
    function init() {
        // 画像プリロード
        window.APP.avatar.preloadAvatars();

        // イベント紐づけ
        const sendBtn = document.getElementById(dom.sendBtnId);
        const replyEl = document.getElementById(dom.replyInputId);
        const toggleUserBtn = document.getElementById(dom.toggleUserBtnId);
        const toggleAssistantBtn = document.getElementById(dom.toggleAssistantBtnId);
        const openLogBtn = document.getElementById(dom.openLogBtnId);

        if (sendBtn) {
            sendBtn.addEventListener("click", onSend);
        }
        if (replyEl) {
            replyEl.addEventListener("keydown", (e) => {
                if (e.key === "Enter") onSend();
            });
        }
        if (toggleUserBtn) {
            toggleUserBtn.addEventListener("click", () => window.APP.overlay.toggleUser(toggleUserBtn));
        }
        if (toggleAssistantBtn) {
            toggleAssistantBtn.addEventListener("click", () => window.APP.overlay.toggleAssistant(toggleAssistantBtn));
        }
        if (openLogBtn) {
            openLogBtn.addEventListener("click", () => {
                const modalEl = document.getElementById(dom.logModalId);
                if (!modalEl) return;
                const modal = new bootstrap.Modal(modalEl);
                modal.show();
            });
        }
    }

    async function onSend() {
        const replyEl = document.getElementById(dom.replyInputId);
        const sendBtn = document.getElementById(dom.sendBtnId);
        if (!replyEl || !sendBtn) return;

        const text = replyEl.value.trim();
        if (!text) return;

        // 画像ランダム切替
        window.APP.avatar.changeAvatarRandom();

        // ボタン連打防止
        sendBtn.disabled = true;

        try {
            await window.APP.chat.send(text);
        } catch (e) {
            console.error(e);
        } finally {
            replyEl.value = "";
            sendBtn.disabled = false;
        }
    }

    // DOM読み込み後に初期化
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
