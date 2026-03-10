// Level Test - 단계별 오픈 기능
// 각 레벨을 순서대로 진행하고, 점수에 따라 다음 레벨 진행 여부 결정

(function() {
  "use strict";

  const PASS_THRESHOLD = 60; // 60점 이상이면 다음 레벨 진행 가능

  // Lv.1 채점 후 다음 단계
  const nextLv1Btn = document.getElementById('nextLv1');
  if (nextLv1Btn) {
    nextLv1Btn.addEventListener('click', function() {
      const score = gradeLv1();
      showLv1Result(score);
    });
  }

  // Lv.2 채점 후 다음 단계
  const nextLv2Btn = document.getElementById('nextLv2');
  if (nextLv2Btn) {
    nextLv2Btn.addEventListener('click', function() {
      const score = gradeLv2();
      showLv2Result(score);
    });
  }

  // Lv.3 채점 후 다음 단계
  const nextLv3Btn = document.getElementById('nextLv3');
  if (nextLv3Btn) {
    nextLv3Btn.addEventListener('click', function() {
      const score = gradeLv3();
      showLv3Result(score);
    });
  }

  // Lv.4 최종 채점
  const completeLv4Btn = document.getElementById('completeLv4');
  if (completeLv4Btn) {
    completeLv4Btn.addEventListener('click', function() {
      const score = gradeLv4();
      showLv4Result(score);
    });
  }

  // Lv.1 채점
  function gradeLv1() {
    const cards = document.querySelectorAll('#lv1Cards .question-card');
    let correct = 0;
    
    cards.forEach(card => {
      const input = card.querySelector('.answer-input');
      const radio = card.querySelector('input[type="radio"]:checked');
      
      if (input && input.value.trim() !== '') {
        // Input 타입은 일단 정답 여부를 확인하기 위해 correct class 확인
        if (card.classList.contains('correct')) correct++;
      } else if (radio) {
        if (card.classList.contains('correct')) correct++;
      }
    });

    const percentage = Math.round((correct / cards.length) * 100);
    return percentage;
  }

  // Lv.2 채점
  function gradeLv2() {
    const cards = document.querySelectorAll('#lv2Cards .question-card');
    let correct = 0;
    
    cards.forEach(card => {
      if (card.classList.contains('correct')) correct++;
    });

    const percentage = Math.round((correct / cards.length) * 100);
    return percentage;
  }

  // Lv.3 채점
  function gradeLv3() {
    const cards = document.querySelectorAll('#lv3Cards .question-card');
    let correct = 0;
    
    cards.forEach(card => {
      if (card.classList.contains('correct')) correct++;
    });

    const percentage = Math.round((correct / cards.length) * 100);
    return percentage;
  }

  // Lv.4 채점
  function gradeLv4() {
    const cards = document.querySelectorAll('#lv4Cards .question-card');
    let correct = 0;
    
    cards.forEach(card => {
      if (card.classList.contains('correct')) correct++;
    });

    const percentage = Math.round((correct / cards.length) * 100);
    return percentage;
  }

  // Lv.1 결과 표시
  function showLv1Result(score) {
    // 스크롤
    const section = document.getElementById('lv1Section');
    section.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // 점수별 메시지
    let recommendation = "";
    let levelRecommend = "";
    
    if (score >= 80) {
      recommendation = "✨ 탁월합니다! 기초가 정말 탄탄하시네요.";
      levelRecommend = "Lv.2 기초 단계로 자신감 있게 진행하세요!";
    } else if (score >= 60) {
      recommendation = "👍 좋습니다! 기초 문법이 잘 잡혀있어요.";
      levelRecommend = "Lv.2로 진행해도 충분합니다. 도전해보시겠어요?";
    } else if (score >= 40) {
      recommendation = "🎯 중간 정도네요. 기초를 더 다지면 좋겠어요.";
      levelRecommend = "**아카데미 왕기초반** 병행을 추천합니다. 더 풀어보시겠어요?";
    } else {
      recommendation = "💪 기초 부분에 집중이 필요해요.";
      levelRecommend = "**아카데미 왕기초반 상담**을 받으시면 더 체계적으로 배울 수 있습니다.";
    }

    // 결과 메시지 표시
    const resultHtml = `
      <div style="background: linear-gradient(135deg, #F0F5FF 0%, #F9FAFE 100%); border-left: 4px solid #2D5BFF; padding: 30px; border-radius: 12px;">
        <h3 style="color: #2D5BFF; margin: 0 0 12px 0; font-size: 1.2rem;">Lv.1 완료!</h3>
        <p style="font-size: 2rem; font-weight: 800; color: #2D5BFF; margin: 20px 0;">${score}점</p>
        <p style="font-size: 1.05rem; color: #333; margin: 16px 0; line-height: 1.6;">${recommendation}</p>
        <p style="font-size: 0.95rem; color: #666; margin: 12px 0; line-height: 1.6;">${levelRecommend}</p>
        <div style="margin-top: 24px; display: flex; gap: 12px; flex-wrap: wrap;">
          <button id="continueBtn" style="padding: 12px 24px; background: #2D5BFF; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.95rem;">다음 문제 풀어보기 →</button>
          ${score < 60 ? `<a href="https://m.booking.naver.com/booking/13/bizes/839473" target="_blank" style="padding: 12px 24px; background: white; color: #2D5BFF; border: 2px solid #2D5BFF; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">📞 상담 예약하기</a>` : ''}
        </div>
      </div>
    `;

    // resultBanner에 표시
    const resultBanner = document.getElementById('resultBanner');
    if (resultBanner) {
      resultBanner.innerHTML = resultHtml;
      resultBanner.style.display = 'block';
      resultBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // "다음 문제 풀어보기" 버튼 클릭 이벤트
    setTimeout(() => {
      const continueBtn = document.getElementById('continueBtn');
      if (continueBtn) {
        continueBtn.addEventListener('click', () => {
          document.getElementById('lv2Section').style.display = 'block';
          document.getElementById('currentLevel').textContent = 'Lv.1 ✅ → Lv.2';
          document.getElementById('lv2Section').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    }, 100);
  }

  // Lv.2 결과 표시
  function showLv2Result(score) {
    let recommendation = "";
    let levelRecommend = "";
    
    if (score >= 80) {
      recommendation = "✨ 훌륭합니다! 기초 문법이 정말 잘 다져져 있네요.";
      levelRecommend = "Lv.3 중급 단계에 충분히 준비가 되셨어요. 계속 진행하세요!";
    } else if (score >= 60) {
      recommendation = "👍 좋습니다! 기초가 어느 정도 정착되었어요.";
      levelRecommend = "Lv.3으로 진행해도 괜찮습니다. 도전해보시겠어요?";
    } else if (score >= 40) {
      recommendation = "🎯 기초 부분을 더 보강하면 좋겠어요.";
      levelRecommend = "**아카데미 기초반**을 병행하면서 계속 풀어보실래요?";
    } else {
      recommendation = "💪 Lv.2에 더 집중이 필요해요.";
      levelRecommend = "**아카데미 상담**을 받고 체계적으로 다시 배워보는 것을 추천합니다.";
    }

    const resultHtml = `
      <div style="background: linear-gradient(135deg, #F0FDF4 0%, #FAFFFE 100%); border-left: 4px solid #10B981; padding: 30px; border-radius: 12px;">
        <h3 style="color: #059669; margin: 0 0 12px 0; font-size: 1.2rem;">Lv.2 완료!</h3>
        <p style="font-size: 2rem; font-weight: 800; color: #10B981; margin: 20px 0;">${score}점</p>
        <p style="font-size: 1.05rem; color: #333; margin: 16px 0; line-height: 1.6;">${recommendation}</p>
        <p style="font-size: 0.95rem; color: #666; margin: 12px 0; line-height: 1.6;">${levelRecommend}</p>
        <div style="margin-top: 24px; display: flex; gap: 12px; flex-wrap: wrap;">
          <button id="continueBtn2" style="padding: 12px 24px; background: #10B981; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.95rem;">다음 문제 풀어보기 →</button>
          ${score < 60 ? `<a href="https://m.booking.naver.com/booking/13/bizes/839473" target="_blank" style="padding: 12px 24px; background: white; color: #10B981; border: 2px solid #10B981; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">📞 상담 예약하기</a>` : ''}
        </div>
      </div>
    `;

    const resultBanner = document.getElementById('resultBanner');
    if (resultBanner) {
      resultBanner.innerHTML = resultHtml;
      resultBanner.style.display = 'block';
      resultBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    setTimeout(() => {
      const continueBtn = document.getElementById('continueBtn2');
      if (continueBtn) {
        continueBtn.addEventListener('click', () => {
          document.getElementById('lv3Section').style.display = 'block';
          document.getElementById('currentLevel').textContent = 'Lv.2 ✅ → Lv.3';
          document.getElementById('lv3Section').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    }, 100);
  }

  // Lv.3 결과 표시
  function showLv3Result(score) {
    let recommendation = "";
    let levelRecommend = "";
    
    if (score >= 80) {
      recommendation = "✨ 완벽합니다! 중급 문법을 정말 잘 이해하고 계세요.";
      levelRecommend = "Lv.4 중상급으로 진행하셔도 충분합니다. 도전해보세요!";
    } else if (score >= 60) {
      recommendation = "👍 좋습니다! 중급 문법이 많이 정착되었어요.";
      levelRecommend = "Lv.4로 진행해도 괜찮습니다. 계속 풀어보시겠어요?";
    } else if (score >= 40) {
      recommendation = "🎯 중급 문법을 더 연습하면 더 좋을 것 같아요.";
      levelRecommend = "**아카데미 중급반**을 병행하면서 계속 진행하셔도 괜찮습니다.";
    } else {
      recommendation = "💪 중급 부분에 더 집중이 필요해요.";
      levelRecommend = "현재 레벨을 다시 한 번 복습하신 후 진행하시길 추천합니다.";
    }

    const resultHtml = `
      <div style="background: linear-gradient(135deg, #FFFBF0 0%, #FFFFFE 100%); border-left: 4px solid #F59E0B; padding: 30px; border-radius: 12px;">
        <h3 style="color: #D97706; margin: 0 0 12px 0; font-size: 1.2rem;">Lv.3 완료!</h3>
        <p style="font-size: 2rem; font-weight: 800; color: #F59E0B; margin: 20px 0;">${score}점</p>
        <p style="font-size: 1.05rem; color: #333; margin: 16px 0; line-height: 1.6;">${recommendation}</p>
        <p style="font-size: 0.95rem; color: #666; margin: 12px 0; line-height: 1.6;">${levelRecommend}</p>
        <div style="margin-top: 24px; display: flex; gap: 12px; flex-wrap: wrap;">
          <button id="continueBtn3" style="padding: 12px 24px; background: #F59E0B; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.95rem;">다음 문제 풀어보기 →</button>
          ${score < 60 ? `<a href="https://m.booking.naver.com/booking/13/bizes/839473" target="_blank" style="padding: 12px 24px; background: white; color: #F59E0B; border: 2px solid #F59E0B; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">📞 상담 예약하기</a>` : ''}
        </div>
      </div>
    `;

    const resultBanner = document.getElementById('resultBanner');
    if (resultBanner) {
      resultBanner.innerHTML = resultHtml;
      resultBanner.style.display = 'block';
      resultBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    setTimeout(() => {
      const continueBtn = document.getElementById('continueBtn3');
      if (continueBtn) {
        continueBtn.addEventListener('click', () => {
          document.getElementById('lv4Section').style.display = 'block';
          document.getElementById('currentLevel').textContent = 'Lv.3 ✅ → Lv.4';
          document.getElementById('lv4Section').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    }, 100);
  }

  // Lv.4 결과 표시 (최종)
  function showLv4Result(score) {
    let message = "";
    if (score >= 80) {
      message = "🌟 완벽합니다! 중상급 영어를 자유롭게 구사할 수 있겠네요.<br>원어민 스터디에서 실전 경험을 쌓으세요!";
    } else if (score >= PASS_THRESHOLD) {
      message = "✨ 좋은 수준입니다! 아카데미와 스터디를 병행하면 더 빠른 성장을 기대할 수 있어요.";
    } else {
      message = "현재 실력에 맞는 레벨부터 시작하시는 것을 추천합니다.";
    }

    const resultHtml = `
      <div style="background: linear-gradient(135deg, #2D5BFF 0%, #4F7FFF 100%); color: white; padding: 40px; border-radius: 16px; text-align: center;">
        <h3 style="font-size: 1.5rem; margin-bottom: 20px;">🎉 최종 진단 완료!</h3>
        <p style="font-size: 1.8rem; font-weight: 800; margin-bottom: 30px;">Lv.4: ${score}점</p>
        <p style="font-size: 1.1rem; line-height: 1.7; margin-bottom: 30px;">${message}</p>
        <a href="https://m.booking.naver.com/booking/13/bizes/839473" target="_blank" class="btn btn--primary" style="background: white; color: #2D5BFF; font-weight: 800;">📞 무료 상담 예약하기</a>
      </div>
    `;

    const resultBanner = document.getElementById('resultBanner');
    if (resultBanner) {
      resultBanner.innerHTML = resultHtml;
      resultBanner.style.display = 'block';
      resultBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    document.getElementById('currentLevel').textContent = '완료! 🎉';
    document.getElementById('completeLv4Btn').disabled = true;
  }

  // 결과 HTML 생성
  function createResultHtml(level, score, messages, isLow) {
    const message = isLow ? messages.low : messages.high;
    const bgColor = isLow ? '#FEF2F2' : '#F0FDF4';
    const borderColor = isLow ? '#2D5BFF' : '#10B981';
    const textColor = isLow ? '#DC2626' : '#059669';

    return `
      <div style="background: ${bgColor}; border-left: 4px solid ${borderColor}; padding: 24px; border-radius: 12px;">
        <h3 style="color: ${textColor}; margin: 0 0 12px 0; font-size: 1.1rem;">${level} 채점 완료</h3>
        <p style="font-size: 1.6rem; font-weight: 800; color: #2D5BFF; margin: 16px 0;">${score}점</p>
        <p style="color: #555; line-height: 1.6; margin: 16px 0;">${message}</p>
        ${isLow ? `<a href="https://m.booking.naver.com/booking/13/bizes/839473" target="_blank" class="btn btn--primary" style="margin-top: 16px;">📞 상담 예약하기</a>` : ''}
      </div>
    `;
  }

  // 초기화 버튼
  const resetBtn = document.getElementById('resetAll');
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      // 모든 섹션 초기화
      document.getElementById('lv2Section').style.display = 'none';
      document.getElementById('lv3Section').style.display = 'none';
      document.getElementById('lv4Section').style.display = 'none';
      document.getElementById('currentLevel').textContent = 'Lv.1';
      
      // 결과 숨기기
      const resultBanner = document.getElementById('resultBanner');
      if (resultBanner) {
        resultBanner.style.display = 'none';
      }

      // 모든 카드 초기화
      document.querySelectorAll('.question-card').forEach(card => {
        card.classList.remove('correct', 'wrong');
        const inputs = card.querySelectorAll('input[type="text"], input[type="radio"]');
        inputs.forEach(input => {
          if (input.type === 'text') input.value = '';
          if (input.type === 'radio') input.checked = false;
        });
      });

      // 스크롤 최상단
      document.getElementById('lv1Section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
})();
