(function () {
    "use strict";

    // 1. Smooth Scroll
    document.addEventListener("click", (e) => {
        const a = e.target.closest("a[href^='#']");
        if (!a) return;
        const id = a.getAttribute("href");
        if (!id || id === "#") return;
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    // 2. Scroll Reveal
    const revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        revealEls.forEach((el) => revealObserver.observe(el));
    }

    // 3. Enhanced Quiz Logic (8 questions)
    const quizQs = Array.from(document.querySelectorAll(".quiz__q"));
    const resultEl = document.getElementById("quizResult");
    const progressBar = document.getElementById("quizProgress");
    if (!resultEl || !progressBar) return;

    const answers = new Map();

    function computeRoute() {
        let academyScore = 0;
        let studyScore = 0;
        let mixSignal = 0;
        let level = "intermediate";

        answers.forEach((v) => {
            const w = parseInt(v.weight) || 1;
            if (v.map === "A" && v.ans === "yes") academyScore += w;
            if (v.map === "S" && v.ans === "yes") studyScore += w;
            if (v.map === "S" && v.ans === "no") academyScore += 1;
            if (v.map === "L") level = v.ans;
            if (v.map === "M") {
                if (v.ans === "both") mixSignal += 2;
                else if (v.ans === "grammar") academyScore += 2;
                else if (v.ans === "speaking") studyScore += 2;
            }
        });

        let title, desc, route, detail, link, levelAdvice;

        // Level-based override first
        levelAdvice = "";
        if (level === "beginner") {
            // 초급자는 아카데미만 추천 (스터디 참여 불가)
            title = "📚 추천: 아카데미 시스템";
            desc = "기초 문법부터 탄탄하게! 영어 회로를 만들면 영어가 말로 나오기 시작합니다.";
            route = "아카데미";
            detail = "왕기초·기초 단계에서는 스터디 참여가 어렵습니다. 기본 문법이 안 되면 대화 자체가 불가능하기 때문에, 아카데미에서 시제·전치사·영어 회로 등을 먼저 체계적으로 잡으세요!";
            link = "academy.html";
            levelAdvice = "⚠️ 왕기초·기초 레벨은 스터디 참여가 어렵습니다. 아카데미에서 기초를 잡은 뒤 스터디로 넘어가세요!";
        } else if (academyScore > studyScore + 1) {
            title = "📚 추천: 아카데미 시스템";
            desc = "영어 회로 만들기와 피드백으로 '말할 때 멈추는 시간'을 먼저 줄이세요.";
            route = "아카데미";
            detail = "시제, 전치사, 영어 회로 등 기초 문법을 체계적으로 교정합니다. 숙제→피드백→복습 루프로 자동 반복 학습!";
            link = "academy.html";
        } else if (studyScore > academyScore + 1) {
            title = "💬 추천: 원어민 스터디 시스템";
            desc = "실전 대화량이 깡패입니다. 많이 말하고 많이 틀리며 체득하세요.";
            route = "스터디";
            detail = "원어민 3~6명과 소그룹으로 실전 대화! 대화 중 어색한 표현은 자연스럽게 교정, 자신감과 유창성을 동시에!";
            link = "study.html";
        } else if (mixSignal >= 2 && level !== "beginner") {
            title = "🚀 혼합 시스템도 가능합니다";
            desc = "아카데미에서 정확도를 잡고, 스터디에서 바로 써먹는 조합입니다.";
            route = "혼합";
            detail = "중급 이상이시라면, 아카데미에서 배운 문법을 스터디에서 실전 적용하는 동시 진행도 가능합니다.";
            link = "";
            levelAdvice = "💡 혼합 시스템는 중급 이상일 때 가장 효과적입니다.";
        } else if (academyScore >= studyScore) {
            title = "📚 추천: 아카데미 시스템";
            desc = "영어 회로 만들기와 피드백으로 '말할 때 멈추는 시간'을 먼저 줄이세요.";
            route = "아카데미";
            detail = "시제, 전치사, 영어 회로 등 기초 문법을 체계적으로 교정합니다. 숙제→피드백→복습 루프로 자동 반복 학습!";
            link = "academy.html";
        } else {
            title = "💬 추천: 원어민 스터디 시스템";
            desc = "실전 대화량이 깡패입니다. 많이 말하고 많이 틀리며 체득하세요.";
            route = "스터디";
            detail = "원어민 3~6명과 소그룹으로 실전 대화! 대화 중 어색한 표현은 자연스럽게 교정, 자신감과 유창성을 동시에!";
            link = "study.html";
        }

        if (level === "advanced" && !levelAdvice) {
            levelAdvice = "💡 중상급 이상이시라면 스터디에서 다양한 원어민과 실전 경험을 쌓으세요!";
        }

        return { title, desc, route, detail, levelAdvice, link };
    }

    function renderResult() {
        const pct = (answers.size / quizQs.length) * 100;
        progressBar.style.width = pct + "%";

        if (answers.size === quizQs.length) {
            const r = computeRoute();
            resultEl.querySelector(".result__title").textContent = r.title;
            resultEl.querySelector(".result__desc").textContent = r.desc;

            const detailEl = resultEl.querySelector(".result__detail");
            if (detailEl) {
                let html = `<p style="margin:15px 0 0;font-size:0.95rem;color:var(--text-sub)">${r.detail}</p>`;
                if (r.levelAdvice) {
                    html += `<p style="margin:10px 0 0;font-size:0.9rem;color:var(--primary);font-weight:600">${r.levelAdvice}</p>`;
                }
                if (r.link) {
                    html += `<a href="${r.link}" style="display:inline-block;margin-top:10px;color:var(--primary);font-weight:600;text-decoration:underline">${r.route} 자세히 보기 →</a>`;
                }
                html += `<p style="margin:15px 0 0;font-size:0.85rem;color:var(--text-sub)">💡 이 결과는 간이 진단입니다. 더 정확한 레벨 분석을 원하시면 <a href="level-test.html" style="color:var(--primary);font-weight:600">50문항 레벨테스트</a>를 받아보세요!</p>`;
                html += `<p style="margin:5px 0 0;font-size:0.8rem;color:var(--text-sub)">※ 자가 진단과 레벨테스트 결과가 다를 수 있습니다.</p>`;
                html += `<a href="programs.html" style="display:inline-block;margin-top:8px;font-size:0.9rem;color:var(--primary);font-weight:600;text-decoration:underline">📶 레벨별 시스템 안내 보기 →</a>`;
                detailEl.innerHTML = html;
            }

            resultEl.querySelector("button").textContent = `${r.route} 시스템 상담 예약하기`;
            resultEl.classList.add("is-complete");
        }
    }

    quizQs.forEach((qEl, idx) => {
        const map = qEl.getAttribute("data-map");
        const weight = qEl.getAttribute("data-weight") || "1";
        const btns = Array.from(qEl.querySelectorAll(".toggle__btn"));
        btns.forEach((btn) => {
            btn.addEventListener("click", () => {
                btns.forEach((b) => b.removeAttribute("data-selected"));
                btn.setAttribute("data-selected", "true");
                const ans = btn.getAttribute("data-answer");
                answers.set(idx, { map, ans, weight });
                renderResult();
            });
        });
    });
})();
