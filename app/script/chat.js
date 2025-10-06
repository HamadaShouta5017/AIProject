/* global window, fetch */
(function () {
    "use strict";

    const { apiEndpoint, systemPrompt } = window.APP.config;

    // 会話履歴
    const messages = [
        { role: "system", content: systemPrompt }
    ];

    // 履歴に追加＋オーバーレイにも反映
    function append(role, text) {
        messages.push({ role, content: text });
        window.APP.overlay.append(role, text);
    }

    // 送信
    async function send(text) {
        append("user", text);

        const res = await fetch(apiEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages })
        });

        if (!res.ok) {
            const t = await res.text().catch(() => "");
            append("assistant", "（エラーが発生しました。もう一度お試しください）");
            throw new Error(`Server ${res.status}: ${t || res.statusText}`);
        }

        const data = await res.json();
        const reply = data.reply || "(空の応答)";
        append("assistant", reply);
        return reply;
    }

    window.APP.chat = {
        append,
        send
    };
})();
