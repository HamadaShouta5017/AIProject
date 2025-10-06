/* global window */
(function () {
    "use strict";

    // グローバル名前空間
    window.APP = window.APP || {};

    // 設定・定数
    window.APP.config = {
        apiEndpoint: "/chat",
        systemPrompt: "You are a helpful Japanese assistant.",
        avatarPaths: [
            "../../IMG/hina_ai.png",
            "../../IMG/hina_do.png",
            "../../IMG/hina_ki.png",
            "../../IMG/hina_raku.png"
        ],
        dom: {
            avatarImgId: "avatarImg",
            overlayScrollId: "overlayScroll",
            historyTextId: "historyText",
            replyInputId: "reply",
            sendBtnId: "sendBtn",
            toggleUserBtnId: "toggleUser",
            toggleAssistantBtnId: "toggleAssistant",
            openLogBtnId: "openLog",
            logModalId: "logModal"
        }
    };
})();
