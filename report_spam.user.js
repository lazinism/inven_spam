// ==UserScript==
// @name         Inven Auto Report (Core Only)
// @namespace    http://tampermonkey.net/
// @version      5.1
// @match        *://www.inven.co.kr/common/report/spam/*
// @grant        unsafeWindow
// @run-at       document-start
// @allFrames    true
// ==/UserScript==

(function() {
    'use strict';

    const TARGET_TEXT = "권은비, 일본 공연 꼭노 영상";

    // 1. 신고 확인창(confirm) 무조건 승인
    try {
        unsafeWindow.confirm = () => true;
    } catch (e) {
        window.confirm = () => true;
    }

    const runReport = () => {
        // ID 선택자(#reportsBody) 기반 제목 추출
        const target = document.querySelector('#reportsBody dl dd span');
        if (!target) return;

        // 2. 키워드 일치 여부 확인 및 제출
        if (target.textContent.includes(TARGET_TEXT)) {
            if (typeof unsafeWindow.submitReport === 'function') {
                unsafeWindow.submitReport();
            } else {
                const fm = document.getElementById("fmReport");
                if (fm) fm.submit();
            }
        }
    };

    // 3. 요소 렌더링 즉시 감지 및 실행
    const observer = new MutationObserver((mutations, obs) => {
        if (document.querySelector('#reportsBody')) {
            obs.disconnect();
            runReport();
        }
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
})();
