/* global window, document */
(function () {
    "use strict";

    const { dom } = window.APP.config;

    let showUser = true;
    let showAssistant = true;

    function getEls() {
        return {
            scroll: document.getElementById(dom.overlayScrollId),
            historyText: document.getElementById(dom.historyTextId)
        };
    }

    function append(role, text) {
        const { scroll, historyText } = getEls();
        if (!scroll) return;
        const div = document.createElement("div");
        div.className = "msg " + (role === "user" ? "msg-user" : "msg-assistant");
        if ((role === "user" && !showUser) || (role === "assistant" && !showAssistant)) {
            div.style.display = "none";
        }
        div.textContent = text;
        scroll.appendChild(div);
        scroll.scrollTop = scroll.scrollHeight;

        if (historyText) {
            const who = role === "user" ? "あなた" : "AI";
            historyText.textContent += `\n${who}: ${text}`;
        }
    }

    function setShowUser(val) {
        showUser = !!val;
        const nodes = document.getElementsByClassName("msg-user");
        Array.from(nodes).forEach((el) => {
            el.style.display = showUser ? "" : "none";
        });
    }

    function setShowAssistant(val) {
        showAssistant = !!val;
        const nodes = document.getElementsByClassName("msg-assistant");
        Array.from(nodes).forEach((el) => {
            el.style.display = showAssistant ? "" : "none";
        });
    }

    function toggleUser(btn) {
        setShowUser(!showUser);
        if (btn) btn.textContent = `送信表示: ${showUser ? "ON" : "OFF"}`;
    }

    function toggleAssistant(btn) {
        setShowAssistant(!showAssistant);
        if (btn) btn.textContent = `応答表示: ${showAssistant ? "ON" : "OFF"}`;
    }

    window.APP.overlay = {
        append,
        setShowUser,
        setShowAssistant,
        toggleUser,
        toggleAssistant
    };
})();
