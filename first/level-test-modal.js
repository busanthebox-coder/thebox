// 레벨테스트 결과 모달 및 구글 시트 연동
// 일괄 채점 버튼 클릭 시 모달 표시

// 구글 시트 연동 설정
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';

// ────────────────────────────────────────────────
// ✅ 초기화
// ────────────────────────────────────────────────
function initLevelTestModal() {
    const gradeButton = document.getElementById('gradeAll');
    if (!gradeButton) return;

    // 기존 버튼을 복제해 이벤트 중복 방지
    const newButton = gradeButton.cloneNode(true);
    gradeButton.parentNode.replaceChild(newButton, gradeButton);

    newButton.addEventListener('click', function () {

        // ── BUG FIX 1: window.gradeAll 의존성 제거 ──────────
        // 기존 코드는 window.gradeAll 이 존재할 때만 실행했으나,
        // level-test.js 가 IIFE 안에 있으면 전역으로 노출되지 않아
        // 조건이 항상 false → 버튼을 눌러도 아무 반응이 없었음.
        //
        // 수정: level-test.js 의 gradeAll 함수를 먼저 실행시킨 뒤,
        //       DOM 에서 채점 결과를 읽어 모달을 표시한다.
        // ─────────────────────────────────────────────────────

        // step 1: 실제 채점 실행 (level-test.js 에서 전역으로 노출한 경우)
        if (typeof window.gradeAll === 'function') {
            window.gradeAll();
        } else {
            // window.gradeAll 이 없으면 수동으로 채점 트리거
            // level-test.js 내부의 채점 로직이 data 속성을 사용하므로 직접 평가
            triggerManualGrading();
        }

        // step 2: 채점 결과 수집
        const results = collectResults();
        window.savedTestResults = results;

        // step 3: 모달 표시
        showResultModal();
    });
}

// ────────────────────────────────────────────────
// ✅ BUG FIX 2: 수동 채점 트리거
// (level-test.js 가 gradeAll 을 전역으로 내보내지 않을 때 사용)
// ────────────────────────────────────────────────
function triggerManualGrading() {
    const sections = ['lv1', 'lv2', 'lv3', 'lv4'];

    sections.forEach(sectionId => {
        const cards = document.querySelectorAll(`#${sectionId}Cards .question-card`);

        cards.forEach(card => {
            const correctAnswer = card.dataset.correctAnswer || '';

            // 주관식 (input[type="text"])
            const textInput = card.querySelector('input[type="text"]');
            if (textInput) {
                const userVal = textInput.value.trim().toLowerCase();
                const correctVal = correctAnswer.trim().toLowerCase();
                if (userVal === correctVal) {
                    card.classList.add('correct');
                    card.classList.remove('incorrect');
                } else {
                    card.classList.add('incorrect');
                    card.classList.remove('correct');
                }
                return;
            }

            // 객관식 (input[type="radio"])
            const selectedRadio = card.querySelector('input[type="radio"]:checked');
            if (selectedRadio) {
                const selectedValue = selectedRadio.value || selectedRadio.id;
                if (selectedValue === correctAnswer) {
                    card.classList.add('correct');
                    card.classList.remove('incorrect');
                } else {
                    card.classList.add('incorrect');
                    card.classList.remove('correct');
                }
            }
        });
    });
}

// ────────────────────────────────────────────────
// ✅ BUG FIX 3: 채점 결과 수집 (DOM 에서 .correct 클래스 읽기)
// ────────────────────────────────────────────────
function collectResults() {
    const sections = ['lv1', 'lv2', 'lv3', 'lv4'];
    const results = {};

    sections.forEach(sectionId => {
        const cards = document.querySelectorAll(`#${sectionId}Cards .question-card`);
        let correct = 0;
        const total = cards.length;
        const wrongQuestions = [];

        cards.forEach((card, index) => {
            if (card.classList.contains('correct')) {
                correct++;
            } else {
                wrongQuestions.push({
                    level: sectionId,
                    questionNumber: index + 1,
                    question: card.querySelector('.q-text')?.textContent?.trim() || '',
                    userAnswer: getUserAnswer(card),
                    correctAnswer: card.dataset.correctAnswer || ''
                });
            }
        });

        results[sectionId] = {
            correct,
            total,
            percentage: total > 0 ? Math.round((correct / total) * 100) : 0,
            wrongQuestions
        };
    });

    return results;
}

function getUserAnswer(card) {
    const input = card.querySelector('input[type="text"]');
    if (input) return input.value.trim();

    const selected = card.querySelector('input[type="radio"]:checked');
    if (selected) {
        const label = card.querySelector(`label[for="${selected.id}"]`);
        return label ? label.textContent.trim() : selected.value;
    }

    return '(미응답)';
}

// ────────────────────────────────────────────────
// ✅ 모달 표시
// ────────────────────────────────────────────────
function showResultModal() {
    // 이미 모달이 있으면 제거 후 재생성
    const existing = document.getElementById('resultModal');
    if (existing) existing.remove();

    const modalHTML = `
        <div id="resultModal" class="modal-overlay" style="
            position:fixed;inset:0;background:rgba(0,0,0,0.6);
            display:flex;align-items:center;justify-content:center;
            z-index:9999;padding:16px;">
            <div class="modal-container" style="
                background:#fff;border-radius:16px;max-width:480px;width:100%;
                padding:36px 32px;box-shadow:0 20px 60px rgba(0,0,0,0.2);
                max-height:90vh;overflow-y:auto;">
                <div class="modal-header" style="text-align:center;margin-bottom:24px">
                    <h2 style="font-size:1.5rem;font-weight:700">🎉 수고하셨습니다!</h2>
                    <p style="margin-top:8px;color:#666">정밀 분석 결과가 준비되었습니다</p>
                </div>
                <div class="modal-body">
                    <p style="font-size:1rem;line-height:1.7;margin-bottom:24px;color:#333">
                        <strong>오답 분석</strong>과 <strong>맞춤형 시스템 안내</strong>를 위해<br/>
                        아래 정보를 입력해 주세요.
                    </p>
                    <div id="contactForm" class="contact-form">
                        <div style="margin-bottom:16px">
                            <label for="userName" style="display:block;font-weight:600;margin-bottom:6px">
                                이름 <span style="color:#ef4444">*</span>
                            </label>
                            <input type="text" id="userName" placeholder="홍길동" style="
                                width:100%;padding:12px 14px;border:1.5px solid #e5e7eb;
                                border-radius:8px;font-size:1rem;box-sizing:border-box;">
                        </div>
                        <div style="margin-bottom:16px">
                            <label for="userPhone" style="display:block;font-weight:600;margin-bottom:6px">
                                연락처 <span style="color:#ef4444">*</span>
                            </label>
                            <input type="tel" id="userPhone" placeholder="010-1234-5678" style="
                                width:100%;padding:12px 14px;border:1.5px solid #e5e7eb;
                                border-radius:8px;font-size:1rem;box-sizing:border-box;">
                        </div>
                        <div style="margin-bottom:24px;display:flex;align-items:flex-start;gap:10px">
                            <input type="checkbox" id="privacyAgree" style="margin-top:3px;flex-shrink:0">
                            <label for="privacyAgree" style="font-size:0.875rem;color:#555;cursor:pointer">
                                수집된 정보는 레벨 진단 및 무료 상담 목적으로만 사용되며,
                                이후 안전하게 폐기됩니다. <strong>[동의함]</strong>
                            </label>
                        </div>
                        <button id="modalSubmitBtn" type="button" style="
                            width:100%;padding:14px;background:#3b82f6;color:#fff;
                            border:none;border-radius:10px;font-size:1rem;font-weight:700;
                            cursor:pointer;transition:background 0.2s">
                            ✅ 결과 보기
                        </button>
                    </div>
                    <p style="margin-top:16px;font-size:0.82rem;color:#999;text-align:center">
                        문의: THE BOX 부산영어커뮤니티
                    </p>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // ── BUG FIX: <form> 대신 button 의 click 이벤트 사용 (submit 이벤트 제거) ──
    document.getElementById('modalSubmitBtn').addEventListener('click', handleFormSubmit);
}

// ────────────────────────────────────────────────
// ✅ 폼 제출 처리
// ────────────────────────────────────────────────
async function handleFormSubmit() {
    const name = document.getElementById('userName').value.trim();
    const phone = document.getElementById('userPhone').value.trim();
    const agreed = document.getElementById('privacyAgree').checked;

    if (!name) { alert('이름을 입력해 주세요.'); return; }
    if (!phone) { alert('연락처를 입력해 주세요.'); return; }
    if (!agreed) { alert('개인정보 수집에 동의해 주세요.'); return; }

    const results = window.savedTestResults;
    const submitBtn = document.getElementById('modalSubmitBtn');
    submitBtn.textContent = '전송 중...';
    submitBtn.disabled = true;

    try {
        await sendToGoogleSheet(name, phone, results);
    } catch (error) {
        console.error('데이터 전송 실패:', error);
    } finally {
        // 성공/실패 관계없이 결과는 항상 표시
        const modal = document.getElementById('resultModal');
        if (modal) modal.remove();
        displayTestResults(results);
    }
}

// ────────────────────────────────────────────────
// ✅ 구글 시트 전송
// ────────────────────────────────────────────────
async function sendToGoogleSheet(name, phone, results) {
    if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
        console.warn('구글 시트 URL이 설정되지 않았습니다.');
        return;
    }

    const data = {
        name,
        phone,
        date: new Date().toLocaleString('ko-KR'),
        lv1: `${results.lv1.correct}/${results.lv1.total} (${results.lv1.percentage}%)`,
        lv2: `${results.lv2.correct}/${results.lv2.total} (${results.lv2.percentage}%)`,
        lv3: `${results.lv3.correct}/${results.lv3.total} (${results.lv3.percentage}%)`,
        lv4: `${results.lv4.correct}/${results.lv4.total} (${results.lv4.percentage}%)`,
        wrongQuestions: JSON.stringify(getAllWrongQuestions(results))
    };

    await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

function getAllWrongQuestions(results) {
    const allWrong = [];
    ['lv1', 'lv2', 'lv3', 'lv4'].forEach(level => {
        if (results[level].wrongQuestions) {
            allWrong.push(...results[level].wrongQuestions);
        }
    });
    return allWrong;
}

// ────────────────────────────────────────────────
// ✅ BUG FIX 3: 결과 표시 (resultBox 없어도 동작하도록 개선)
// ────────────────────────────────────────────────
function displayTestResults(results) {
    // resultBox 가 없으면 body 에 직접 생성
    let resultBox = document.getElementById('resultBox');
    if (!resultBox) {
        resultBox = document.createElement('div');
        resultBox.id = 'resultBox';
        resultBox.style.cssText = `
            max-width:640px;margin:40px auto;padding:32px;
            background:#fff;border-radius:16px;
            box-shadow:0 4px 24px rgba(0,0,0,0.1);`;
        document.body.appendChild(resultBox);
    }

    resultBox.style.display = 'block';

    const levelLabels = { lv1: 'LV1 왕기초', lv2: 'LV2 기초', lv3: 'LV3 중급', lv4: 'LV4 고급' };
    const colors = { lv1: '#10b981', lv2: '#3b82f6', lv3: '#8b5cf6', lv4: '#f59e0b' };

    let totalCorrect = 0, totalQuestions = 0;
    ['lv1', 'lv2', 'lv3', 'lv4'].forEach(lv => {
        totalCorrect += results[lv].correct;
        totalQuestions += results[lv].total;
    });
    const totalPct = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    let html = `
        <h3 style="font-size:1.4rem;font-weight:700;margin-bottom:8px;text-align:center">
            📊 레벨 테스트 결과
        </h3>
        <p style="text-align:center;color:#666;margin-bottom:24px">
            총 ${totalCorrect} / ${totalQuestions} 정답 (${totalPct}%)
        </p>`;

    ['lv1', 'lv2', 'lv3', 'lv4'].forEach(level => {
        const r = results[level];
        const color = colors[level];
        html += `
            <div style="margin-bottom:16px;padding:16px 20px;background:#f8f9fa;border-radius:12px;
                        border-left:4px solid ${color}">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                    <strong>${levelLabels[level]}</strong>
                    <span style="color:${color};font-weight:700">${r.correct}/${r.total} (${r.percentage}%)</span>
                </div>
                <div style="width:100%;height:8px;background:#e5e7eb;border-radius:4px;overflow:hidden">
                    <div style="width:${r.percentage}%;height:100%;background:${color};
                                transition:width 1s ease;border-radius:4px"></div>
                </div>
            </div>`;
    });

    // 오답 상세
    const allWrong = getAllWrongQuestions(results);
    if (allWrong.length > 0) {
        html += `<details style="margin-top:20px">
            <summary style="cursor:pointer;font-weight:600;color:#374151;padding:12px;
                            background:#f3f4f6;border-radius:8px">
                📝 오답 상세 보기 (${allWrong.length}문제)
            </summary>
            <div style="margin-top:12px">`;
        allWrong.forEach((q, i) => {
            html += `
                <div style="padding:12px;border-bottom:1px solid #e5e7eb;font-size:0.9rem">
                    <span style="color:#9ca3af;font-size:0.8rem">${q.level.toUpperCase()} Q${q.questionNumber}</span><br>
                    <span style="color:#374151">${q.question}</span><br>
                    <span style="color:#ef4444">내 답: ${q.userAnswer || '(미응답)'}</span>
                    ${q.correctAnswer ? `<span style="color:#10b981;margin-left:12px">정답: ${q.correctAnswer}</span>` : ''}
                </div>`;
        });
        html += `</div></details>`;
    }

    html += `
        <div style="margin-top:24px;padding:16px;background:#eff6ff;border-radius:10px;text-align:center">
            <p style="font-size:0.95rem;color:#1d4ed8;font-weight:600;margin-bottom:8px">
                📞 무료 레벨 상담 신청하기
            </p>
            <a href="https://open.kakao.com/o/your-link" target="_blank" style="
                display:inline-block;padding:10px 24px;background:#3b82f6;color:#fff;
                border-radius:8px;font-weight:700;text-decoration:none;font-size:0.95rem">
                카카오톡 상담 바로가기 →
            </a>
        </div>`;

    resultBox.innerHTML = html;
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ────────────────────────────────────────────────
// 초기화
// ────────────────────────────────────────────────
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLevelTestModal);
} else {
    initLevelTestModal();
}
