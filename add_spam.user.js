// ==UserScript==
// @name         인벤 스팸신고 버튼 추가 (제목 옆 배치 최적화)
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  제목 요소 내부에 신고 버튼을 삽입하여 한 줄로 깔끔하게 배치
// @author       Gemini
// @match        *://*.inven.co.kr/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 1. 제목 요소를 가져옵니다.
    const titleElement = document.querySelector('.articleTitle');

    // 2. 제목 요소가 존재하고, 특정 키워드를 포함하는지 확인합니다.
    const targetTitle = "권은비, 일본 공연 꼭노 영상";

    if (titleElement && titleElement.innerText.includes(targetTitle)) {

        // --- UI 최적화 핵심 부분 ---
        // 제목 요소를 Flexbox로 만들어서 한 줄에 배치되도록 강제합니다.
        titleElement.style.display = 'flex';
        titleElement.style.alignItems = 'center'; // 수직 중앙 정렬
        // ---------------------------

        // 3. 스팸신고 버튼 생성
        const spamBtn = document.createElement('a');

        spamBtn.href = "javascript:report_spam();";
        spamBtn.innerText = "[스팸신고]";
        spamBtn.style.cursor = "pointer";
        spamBtn.style.color = "#ff4d4f"; // 약간 부드러운 빨간색
        spamBtn.style.fontSize = "0.75em"; // 제목보다 작게
        spamBtn.style.marginLeft = "10px"; // 제목과 간격
        spamBtn.style.textDecoration = "none";
        spamBtn.style.fontWeight = "normal"; // 제목이 bold라도 버튼은 노멀하게
        spamBtn.style.whiteSpace = "nowrap"; // 줄바꿈 방지

        // 4. 제목 요소의 *내부* 맨 뒤에 삽입
        titleElement.appendChild(spamBtn);
    }
})();
