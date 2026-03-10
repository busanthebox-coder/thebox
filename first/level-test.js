// THE BOX Level Test - 최종 버전
// 제공된 50개 문항 가이드 기반으로 재구성

// ===== Helper Functions =====
function normalizeText(s) {
  return (s || "")
    .toLowerCase()
    .trim()
    .replace(/[""'']/g, "'")
    .replace(/[.,!?;:()"]/g, "")
    .replace(/\s+/g, " ");
}

function expandContractions(s) {
  return (s || "")
    .replace(/\bi'm\b/gi, "i am")
    .replace(/\bit's\b/gi, "it is")
    .replace(/\bthat's\b/gi, "that is")
    .replace(/\bcan't\b/gi, "cannot")
    .replace(/\bdon't\b/gi, "do not")
    .replace(/\bdoesn't\b/gi, "does not")
    .replace(/\bdidn't\b/gi, "did not")
    .replace(/\bwon't\b/gi, "will not")
    .replace(/\bi'll\b/gi, "i will")
    .replace(/\bwe'll\b/gi, "we will")
    .replace(/\byou'll\b/gi, "you will")
    .replace(/\bthey're\b/gi, "they are")
    .replace(/\bwe're\b/gi, "we are")
    .replace(/\byou're\b/gi, "you are")
    .replace(/\bi've\b/gi, "i have")
    .replace(/\bhe's\b/gi, "he is")
    .replace(/\bshe's\b/gi, "she is");
}

function canonicalize(s) {
  let t = normalizeText(expandContractions(s));
  return t;
}

function checkInputAnswer(userVal, validAnswers) {
  if (!userVal || !userVal.trim()) return { ok: false };
  const user = canonicalize(userVal);
  for (const ans of validAnswers) {
    if (canonicalize(ans) === user) return { ok: true };
  }
  return { ok: false };
}

// ===== Level 1: 왕기초 (10문항) =====
const lv1Questions = [
  { type:"mc", ko:"'메리와 마틴은 친구야.'를 영어로 하면?", options:[
    "Mary and Martin am friends.",
    "Mary and Martin is friends.",
    "Mary and Martin are friends.",
    "Mary and Martin be friends."
  ], answer:[2], note:"복수 주어(Mary and Martin)는 be동사 'are'를 써요." },

  { type:"mc", ko:"'그는 피자를 좋아하지 않아.'를 영어로 하면?", options:[
    "He not like pizza.",
    "He doesn't like pizza.",
    "He no like pizza.",
    "He isn't like pizza."
  ], answer:[1], note:"일반동사의 부정은 'do/does + not'을 써요. 3인칭 단수는 'doesn't'입니다." },

  { type:"mc", ko:"'나 지금 집에 갈 거야.'를 영어로 하면?", options:[
    "I will going home now.",
    "I will go home now.",
    "I will going to home now.",
    "I will going home now."
  ], answer:[1], note:"미래형은 'will + 동사원형'입니다. 'ing'가 붙으면 안 돼요." },

  { type:"mc", ko:"'해리포터는 J.K. 롤링이 썼다.'를 영어로 하면?", options:[
    "Harry Potter is written by J.K. Rowling.",
    "Harry Potter are writing by J.K. Rowling.",
    "Harry Potter were written by J.K. Rowling.",
    "Harry Potter was written by J.K. Rowling."
  ], answer:[3], note:"단수 주어(Harry Potter)의 과거 수동태는 'was + p.p.'를 써요. 'were'는 복수 주어일 때 씁니다." },

  { type:"mc", ko:"'나는 지금 영어를 공부하고 있어.'를 영어로 하면?", options:[
    "I am study English now.",
    "I am studying English now.",
    "I study English now.",
    "I will study English now."
  ], answer:[1], note:"현재 진행형은 'be + ~ing'입니다. '지금 하고 있다'는 진행형이에요." },

  { type:"mc", ko:"'나는 수영하고 싶어.'를 영어로 하면?", options:[
    "I want swimming.",
    "I want to swimming.",
    "I want to swim.",
    "I want swim."
  ], answer:[2], note:"'want'의 목적어는 to부정사예요. 'to + 동사원형'을 써야 합니다." },

  { type:"mc", ko:"'나 어제 일하러 갔어.'를 영어로 하면?", options:[
    "I go to work yesterday.",
    "I went to work yesterday.",
    "I have gone to work yesterday.",
    "I was gone to work yesterday."
  ], answer:[1], note:"어제는 과거이므로 과거형 'went'를 써요. 이미 끝난 일입니다." },

  { type:"mc", ko:"'나는 서울에 살아.'를 영어로 하면?", options:[
    "I living in Seoul.",
    "I am live in Seoul.",
    "I live in Seoul.",
    "I am living in Seoul."
  ], answer:[2], note:"현재의 상태나 습관은 단순현재형을 써요. '살다'는 상태이므로 'live'입니다." },

  { type:"mc", ko:"'지금 비가 오고 있어.'를 영어로 하면?", options:[
    "It rains now.",
    "It is raining now.",
    "It raining now.",
    "It rain now."
  ], answer:[1], note:"'지금 (현재 진행)'은 진행형 'be + ~ing'을 써요. 'is raining'이 정확합니다." },

  { type:"mc", ko:"'나는 너무 배고파.'를 영어로 하면?", options:[
    "I am so hunger.",
    "I am so hungry.",
    "I have so hungry.",
    "I very hungry."
  ], answer:[1], note:"상태를 나타내는 형용사 'hungry' 앞에는 be동사가 필요합니다." },
];

// ===== Level 2: 기초 (15문항 - 문제 순서 혼합) =====
const lv2Questions = [
  // Q16 - 관사 a/the (위치: 3번)
  { type:"mc", ko:"'나 어제 카페(한 곳)에 갔어.'를 영어로 하면?", options:[
    "I went to the cafe yesterday.",
    "I went to a cafe yesterday.",
    "I went to cafe yesterday.",
    "I went to cafes yesterday."
  ], answer:[1], note:"처음 언급하는 특정하지 않은 것은 'a'를 써요. 'the'는 이미 알고 있는 것입니다." },

  // Q15 - 빈도부사 위치 (위치: 1번)
  { type:"mc", ko:"'나는 보통 아침에 커피를 마셔.'를 영어로 하면?", options:[
    "I usually drink coffee in the morning.",
    "I drink usually coffee in the morning.",
    "I drink coffee usually in the morning.",
    "Usually I drink in the morning coffee."
  ], answer:[0], note:"빈도부사는 일반동사 바로 앞에 와요. 'usually drink'가 정답입니다." },

  // Q11 - 시간 전치사 (위치: 2번)
  { type:"mc", ko:"'3시에 만나자.'를 영어로 하면?", options:[
    "Let's meet on 3 o'clock.",
    "Let's meet in 3 o'clock.",
    "Let's meet at 3 o'clock.",
    "Let's meet to 3 o'clock."
  ], answer:[2], note:"정확한 시간은 'at'을 써요. (at 3, at 9:30)" },

  // Q19 - 제안하기 (위치: 4번)
  { type:"mc", ko:"'우리 산책 가는 거 어때?'를 영어로 하면?", options:[
    "How about go for a walk?",
    "How about to go for a walk?",
    "How about going for a walk?",
    "How about we go for a walk?"
  ], answer:[2], note:"'How about'의 목적어는 동명사(-ing)예요." },

  // Q13 - 동명사 목적어 (위치: 5번)
  { type:"mc", ko:"'나는 영화 보는 걸 즐겨.'를 영어로 하면?", options:[
    "I enjoy to watch movies.",
    "I enjoy watching movies.",
    "I enjoy watch movies.",
    "I enjoy for watching movies."
  ], answer:[1], note:"'enjoy'의 목적어는 동명사입니다. 'watching'이 정확해요." },

  // Q25 - 부정 의문문 (위치: 6번)
  { type:"mc", ko:"'너 배 안 고파?'를 영어로 하면?", options:[
    "Are you hungry?",
    "Aren't you hungry?",
    "You aren't hungry?",
    "Don't you hungry?"
  ], answer:[1], note:"부정 의문문은 'Aren't you ~?'의 형태예요." },

  // Q20 - 부사 형태 (위치: 7번)
  { type:"mc", ko:"'그는 영어를 아주 잘해.'를 영어로 하면?", options:[
    "He speaks English very good.",
    "He speaks English very well.",
    "He speaks English so good.",
    "He speaks good English very."
  ], answer:[1], note:"동사를 수식하는 부사는 'well'이에요. 'good'은 형용사입니다." },

  // Q12 - 요일 전치사 (위치: 8번)
  { type:"mc", ko:"'월요일에 봐.'를 영어로 하면?", options:[
    "See you at Monday.",
    "See you on Monday.",
    "See you in Monday.",
    "See you to Monday."
  ], answer:[1], note:"요일은 'on'을 써요. (on Monday, on Friday)" },

  // Q22 - 조동사 (위치: 9번)
  { type:"mc", ko:"'너는 여기 주차하면 안 돼.'를 영어로 하면?", options:[
    "You can park here.",
    "You must park here.",
    "You mustn't park here.",
    "You should park here."
  ], answer:[2], note:"금지는 'must not' 또는 'can't'를 써요. 여기서 'mustn't'가 정답입니다." },

  // Q23 - 비교급 (위치: 10번)
  { type:"mc", ko:"'서울은 부산보다 더 커.'를 영어로 하면?", options:[
    "Seoul is more bigger than Busan.",
    "Seoul is bigger than Busan.",
    "Seoul is big than Busan.",
    "Seoul is the biggest than Busan."
  ], answer:[1], note:"1음절 형용사(big)는 '-er'을 붙입니다. 'bigger than'이 정답이에요." },

  // Q14 - to부정사 목적어 (위치: 11번)
  { type:"mc", ko:"'나는 오늘 집에 일찍 가기로 결정했어.'를 영어로 하면?", options:[
    "I decided going home early today.",
    "I decided to go home early today.",
    "I decided go home early today.",
    "I decided for going home early today."
  ], answer:[1], note:"'decide'의 목적어는 to부정사예요. 'to + 동사원형'입니다." },

  // Q21 - 소유격 (위치: 12번)
  { type:"mc", ko:"'이건 내 친구의 차야.'를 영어로 하면?", options:[
    "This is my friend car.",
    "This is my friend's car.",
    "This is my friends car.",
    "This is my friends' car."
  ], answer:[1], note:"소유를 나타내려면 ''s'를 붙여요. 'friend's car'가 정답입니다." },

  // Q24 - 경험의 기초 (위치: 13번)
  { type:"mc", ko:"'나 제주도 가본 적 있어.'를 영어로 하면?", options:[
    "I went to Jeju.",
    "I have been to Jeju.",
    "I am being to Jeju.",
    "I had been to Jeju."
  ], answer:[1], note:"경험(~해본 적이 있다)은 현재완료 'have + p.p.'를 써요." },

  // Q17 - 감정 형용사 (boring) (위치: 14번)
  { type:"mc", ko:"'그 영화는 정말 지루했어.'를 영어로 하면?", options:[
    "The movie was really bored.",
    "The movie was really boring.",
    "The movie was really bore.",
    "The movie was really bores."
  ], answer:[1], note:"'지루한(재미없는)' 영화는 'boring'이에요. 'bored'는 '나(사람)가 지루하다'입니다." },

  // Q18 - 감정 형용사 (bored) (위치: 15번)
  { type:"mc", ko:"'나는 그 영화 때문에 지루했어.'를 영어로 하면?", options:[
    "I was boring with the movie.",
    "I was bored with the movie.",
    "I was bored by the movie.",
    "I was bored about the movie."
  ], answer:[1], note:"'나(사람)가 지루하다'는 'bored'예요. 'I was bored with ~'가 정답입니다." },
];

// ===== Level 3: 중급 (15문항 - 문제 순서 혼합) =====
const lv3Questions = [
  // Q27 - 현재완료 지속
  { type:"mc", ko:"'나는 3년 동안 영어를 공부해왔어.'를 영어로 하면?", options:[
    "I study English for 3 years.",
    "I have studied English for 3 years.",
    "I studied English for 3 years.",
    "I am studying English for 3 years."
  ], answer:[1], note:"과거부터 지금까지 계속되는 것은 현재완료 'have + p.p.'예요." },

  // Q30 - 과거 후회
  { type:"mc", ko:"'너한테 전화했어야 했는데.'를 영어로 하면?", options:[
    "I should call you.",
    "I should have called you.",
    "I should have call you.",
    "I should called you."
  ], answer:[1], note:"과거의 후회는 'should have + p.p.'입니다." },

  // Q35 - 뉘앙스 Funny vs Fun
  { type:"mc", ko:"'그 코미디언은 정말 웃겨.'를 영어로 하면?", options:[
    "That comedian is really fun.",
    "That comedian is really funny.",
    "That comedian is really boring.",
    "That comedian is really bored."
  ], answer:[1], note:"'웃긴(코미디한)' 것은 'funny'예요. 'fun = 즐거운'과는 다릅니다." },

  // Q28 - 조동사 뉘앙스 (계획된 미래)
  { type:"mc", ko:"'나 오늘 친구 만나기로 했어.'를 영어로 하면?", options:[
    "I will meet my friend today.",
    "I am going to meet my friend today.",
    "I meet my friend today.",
    "I have meet my friend today."
  ], answer:[1], note:"이미 계획된 미래는 'be going to'를 써요. 'will'보다 구체적인 계획입니다." },

  // Q36 - 수동태 심화
  { type:"mc", ko:"'내 지갑을 도둑맞았어.'를 영어로 하면?", options:[
    "My wallet stolen.",
    "My wallet was stolen.",
    "My wallet is stolen.",
    "My wallet stole."
  ], answer:[1], note:"과거에 일어난 일의 수동태는 'was/were + p.p.'입니다." },

  // Q33 - 구동사 ran into
  { type:"mc", ko:"'나 어제 우연히 그를 만났어.'를 영어로 하면?", options:[
    "I ran into him yesterday.",
    "I ran to him yesterday.",
    "I run into him yesterday.",
    "I ran with him yesterday."
  ], answer:[0], note:"'우연히 만나다'는 'run into'라는 구동사예요." },

  // Q31 - 구동사 ended up
  { type:"mc", ko:"'나는 결국 택시를 탔어.'를 영어로 하면?", options:[
    "I ended up to take a taxi.",
    "I ended up taking a taxi.",
    "I ending up taking a taxi.",
    "I ended to take a taxi."
  ], answer:[1], note:"'결국 ~하다'는 'end up + ~ing'입니다." },

  // Q40 - 현재완료 진행
  { type:"mc", ko:"'아침부터 계속 비가 오고 있어.'를 영어로 하면?", options:[
    "It has rained since morning.",
    "It has been raining since morning.",
    "It is raining since morning.",
    "It rains since morning."
  ], answer:[1], note:"과거부터 지금까지 계속 진행 중인 것은 'have been + ~ing'이에요." },

  // Q38 - 뉘앙스 Plans vs Promise
  { type:"mc", ko:"'나 오늘 저녁에 약속(일정)이 있어.'를 영어로 하면?", options:[
    "I have promise tonight.",
    "I have a promise tonight.",
    "I have plans tonight.",
    "I promised tonight."
  ], answer:[2], note:"'일정, 계획'은 'plans'이에요. 'promise'는 '약속(서약)'을 의미합니다." },

  // Q37 - 사역동사
  { type:"mc", ko:"'엄마가 나보고 방을 청소하라고 하셨어.'를 영어로 하면?", options:[
    "My mom let me clean my room.",
    "My mom asked me to clean my room.",
    "My mom made me clean my room.",
    "My mom told me clean my room."
  ], answer:[2], note:"'~하게 하다(강제)'는 'make + 목적어 + 동사원형'입니다." },

  // Q29 - 조동사 뉘앙스 (즉흥적 결정)
  { type:"mc", ko:"'아, 내가 피자 살게!'를 영어로 하면?", options:[
    "Oh, I am going to buy pizza!",
    "Oh, I will buy pizza!",
    "Oh, I buy pizza!",
    "Oh, I have bought pizza!"
  ], answer:[1], note:"즉흥적이고 갑작스러운 결정은 'will'을 써요." },

  // Q32 - 구동사 turned out
  { type:"mc", ko:"'알고 보니 그건 사실이었어.'를 영어로 하면?", options:[
    "It turned out being true.",
    "It turned out to be true.",
    "It turning out to be true.",
    "It turned to be true."
  ], answer:[1], note:"'알고 보니 ~하다'는 'turn out to be'라는 구동사예요." },

  // Q34 - 뉘앙스 Fun
  { type:"mc", ko:"'그 파티는 정말 즐거웠어.'를 영어로 하면?", options:[
    "The party was really funny.",
    "The party was really fun.",
    "The party was really boring.",
    "The party was really bored."
  ], answer:[1], note:"'즐거운, 재미있는 (경험)'은 'fun'이에요. 'funny'는 '웃긴'의 의미입니다." },

  // Q26 - 현재완료 완료
  { type:"mc", ko:"'나 방금 점심을 다 먹었어.'를 영어로 하면?", options:[
    "I just ate lunch.",
    "I have just eaten lunch.",
    "I just have eaten lunch.",
    "I have ate lunch."
  ], answer:[1], note:"최근에 완료된 일은 현재완료 'have + p.p.'를 써요." },

  // Q39 - 뉘앙스 Promise vs Plan
  { type:"mc", ko:"'그는 나에게 비밀을 지키겠다고 약속했어.'를 영어로 하면?", options:[
    "He made a plan to keep a secret.",
    "He made a promise to keep a secret.",
    "He promised plans to keep a secret.",
    "He planed to keep a secret."
  ], answer:[1], note:"'약속(서약)'은 'promise'예요. 'plan'은 '계획'의 의미입니다." },
];

// ===== Level 4: 중상급 (10문항 - 문제 순서 혼합) =====
const lv4Questions = [
  // Q42 - 가정법 과거완료
  { type:"mc", ko:"'내가 더 열심히 공부했더라면 시험에 합격했을 텐데.'를 영어로 하면?", options:[
    "If I studied harder, I would have passed the exam.",
    "If I had studied harder, I would have passed the exam.",
    "If I studied harder, I would pass the exam.",
    "If I have studied harder, I would have passed the exam."
  ], answer:[1], note:"과거 사실의 반대는 'If + had + p.p., would have + p.p.'예요." },

  // Q44 - 익숙함 (be used to)
  { type:"mc", ko:"'나는 매운 음식 먹는 것에 익숙해.'를 영어로 하면?", options:[
    "I used to eating spicy food.",
    "I am used to eating spicy food.",
    "I am using to eating spicy food.",
    "I have used to eating spicy food."
  ], answer:[1], note:"'익숙하다'는 'be used to + ~ing'입니다." },

  // Q45 - 구동사 came up with
  { type:"mc", ko:"'좋은 아이디어가 떠올랐어.'를 영어로 하면?", options:[
    "I came up with a good idea.",
    "I came to a good idea.",
    "I came for a good idea.",
    "I came by a good idea."
  ], answer:[0], note:"'~을 생각해내다'는 'come up with'라는 구동사예요." },

  // Q47 - 선호 표현
  { type:"mc", ko:"'차라리 집에 있는 게 낫겠어.'를 영어로 하면?", options:[
    "I prefer to stay home.",
    "I would rather stay home.",
    "I like to stay home.",
    "I want to stay home."
  ], answer:[1], note:"'차라리 ~하는 게 낫겠다'는 'would rather + 동사원형'입니다." },

  // Q48 - 조건절
  { type:"mc", ko:"'내일 비가 오면, 난 집에 있을 거야.'를 영어로 하면?", options:[
    "If it rains tomorrow, I will stay home.",
    "If it will rain tomorrow, I will stay home.",
    "If it would rain tomorrow, I will stay home.",
    "If it rained tomorrow, I will stay home."
  ], answer:[0], note:"미래 조건은 'If + 현재형, will + 동사원형'입니다." },

  // Q50 - 구동사 broke up
  { type:"mc", ko:"'그들은 결국 헤어졌어.'를 영어로 하면?", options:[
    "They finally broke up.",
    "They finally broke off.",
    "They finally broke down.",
    "They finally broke away."
  ], answer:[0], note:"'헤어지다(커플이)'는 'break up'이라는 구동사예요." },

  // Q41 - 가정법 과거
  { type:"mc", ko:"'내가 너라면 그거 안 살 텐데.'를 영어로 하면?", options:[
    "If I am you, I would not buy it.",
    "If I was you, I would not buy it.",
    "If I were you, I would not buy it.",
    "If I would be you, I would not buy it."
  ], answer:[2], note:"현재 사실의 반대는 'If + 과거형, would + 동사원형'이고, I는 'were'를 써요." },

  // Q49 - 희망/후회 Wish
  { type:"mc", ko:"'키가 좀 더 컸으면 좋았을 텐데.'를 영어로 하면?", options:[
    "I wish I was taller.",
    "I wish I were taller.",
    "I wish I am taller.",
    "I wish I would be taller."
  ], answer:[1], note:"현재의 가정은 'wish + 과거형'이고, I는 'were'를 써요." },

  // Q46 - 구동사 put off
  { type:"mc", ko:"'우리 그 미팅 미뤄야 해.'를 영어로 하면?", options:[
    "We have to put off the meeting.",
    "We have to put in the meeting.",
    "We have to put on the meeting.",
    "We have to put up the meeting."
  ], answer:[0], note:"'~을 미루다'는 'put off'라는 구동사예요." },

  // Q43 - 과거의 습관 (used to) - 고급
  { type:"mc", ko:"'그는 젊었을 때 매주 마라톤을 완주할 만큼 체력이 좋았는데, 이제는 5km도 힘들어한다.'를 영어로 가장 자연스럽게 표현하면?", options:[
    "He is used to running marathons every week when he was young, but now even 5km is difficult.",
    "He used to run marathons every week when he was young, but now even 5km is hard for him.",
    "He would have run marathons every week when he was young, but now even 5km is hard.",
    "He has used to run marathons every week when he was young, but now even 5km is difficult."
  ], answer:[1], note:"'예전엔 ~하곤 했다(지금은 아님)'는 'used to + 동사원형'이에요. 'is used to'는 '~에 익숙하다', 'would have p.p.'는 과거의 추측/가정입니다. 'has used to'는 존재하지 않는 표현입니다." },
];

// ===== 섹션 설정 =====
const sections = [
  {
    key: "lv1",
    containerId: "lv1Cards",
    prefix: "🧱 Lv.1",
    questions: lv1Questions
  },
  {
    key: "lv2",
    containerId: "lv2Cards",
    prefix: "🟢 Lv.2",
    questions: lv2Questions
  },
  {
    key: "lv3",
    containerId: "lv3Cards",
    prefix: "🟡 Lv.3",
    questions: lv3Questions
  },
  {
    key: "lv4",
    containerId: "lv4Cards",
    prefix: "🔵 Lv.4",
    questions: lv4Questions
  }
];

const TOTAL_QUESTIONS = sections.reduce((sum, s) => sum + s.questions.length, 0);

// ===== State & Elements =====
const state = {
  answers: new Map(),
  cards: new Map()
};

const els = {
  gradeAll: document.getElementById("gradeAll"),
  resetAll: document.getElementById("resetAll"),
  totalScore: document.getElementById("totalScore"),
  totalAnswered: document.getElementById("totalAnswered"),
  copyResult: document.getElementById("copyResult"),
  resultBanner: document.getElementById("resultBanner")
};

// ===== Helper Functions =====
function qid(sectionKey, idx) {
  return `${sectionKey}#${idx}`;
}

function setsEqual(a, b) {
  if (a.length !== b.length) return false;
  const sorted_a = [...a].sort((x, y) => x - y);
  const sorted_b = [...b].sort((x, y) => x - y);
  return sorted_a.every((val, idx) => val === sorted_b[idx]);
}

// ===== Rendering Functions =====
function renderInputCard(q, idx, prefix, id) {
  const card = document.createElement("div");
  card.className = "input-card";
  card.innerHTML = `
    <div class="input-card__header">
      <span class="q-num">${prefix} Q${idx + 1}</span>
    </div>
    <div class="q-ko">${q.ko}</div>
    <div class="input-card__input-wrap">
      <input type="text" class="answer-input" data-qid="${id}" placeholder="영어로 입력하세요..." autocomplete="off">
    </div>
    <div class="input-card__feedback" style="display:none"></div>
    ${q.note ? `<div class="q-note" style="display:none">${q.note}</div>` : ""}
  `;
  return card;
}

function renderMCSingle(q, idx, prefix, id) {
  const card = document.createElement("div");
  card.className = "input-card mc-card";
  const optionsHtml = q.options.map((opt, i) =>
    `<button type="button" class="mc-option" data-qid="${id}" data-idx="${i}">
      <span class="mc-no">${i + 1}</span>
      <span class="mc-text">${opt}</span>
    </button>`
  ).join("");
  card.innerHTML = `
    <div class="input-card__header">
      <span class="q-num">${prefix} Q${idx + 1}</span>
    </div>
    <div class="q-ko">${q.ko}</div>
    <div class="mc-options">${optionsHtml}</div>
    <div class="input-card__feedback" style="display:none"></div>
    ${q.note ? `<div class="q-note" style="display:none">${q.note}</div>` : ""}
  `;
  return card;
}

function renderMCMulti(q, idx, prefix, id) {
  const card = document.createElement("div");
  card.className = "input-card mc-card";
  const optionsHtml = q.options.map((opt, i) =>
    `<label class="mc-check" data-qid="${id}" data-idx="${i}">
        <input type="checkbox" class="mc-box" data-qid="${id}" data-idx="${i}">
        <span class="mc-no">${i + 1}</span>
        <span class="mc-text">${opt}</span>
     </label>`
  ).join("");
  card.innerHTML = `
    <div class="input-card__header">
      <span class="q-num">${prefix} Q${idx + 1}</span>
    </div>
    <div class="q-ko">${q.ko}</div>
    <div class="mc-multi-note">* 복수정답 - 모두 선택하세요</div>
    <div class="mc-checklist">${optionsHtml}</div>
    <div class="input-card__feedback" style="display:none"></div>
    ${q.note ? `<div class="q-note" style="display:none">${q.note}</div>` : ""}
  `;
  return card;
}

function renderSection(section) {
  const containerEl = document.getElementById(section.containerId);
  if (!containerEl) return;
  containerEl.innerHTML = "";

  section.questions.forEach((q, idx) => {
    const id = qid(section.key, idx);
    let card;
    if (q.type === "input") card = renderInputCard(q, idx, section.prefix, id);
    else if (q.type === "mc" && q.multi) card = renderMCMulti(q, idx, section.prefix, id);
    else card = renderMCSingle(q, idx, section.prefix, id);

    containerEl.appendChild(card);
    state.cards.set(id, { el: card, q, sectionKey: section.key });

    // Event listeners
    if (q.type === "input") {
      const input = card.querySelector(".answer-input");
      input.addEventListener("input", () => {
        state.answers.set(id, { kind: "input", value: input.value });
      });
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") e.preventDefault();
      });
    } else if (q.type === "mc" && q.multi) {
      const boxes = [...card.querySelectorAll(".mc-box")];
      boxes.forEach(b => {
        b.addEventListener("change", () => {
          const chosen = boxes.filter(x => x.checked).map(x => Number(x.dataset.idx));
          state.answers.set(id, { kind: "mc", value: chosen });
          boxes.forEach(x => {
            const wrap = x.closest(".mc-check");
            if (!wrap) return;
            wrap.classList.toggle("is-selected", x.checked);
          });
        });
      });
      const labels = [...card.querySelectorAll(".mc-check")];
      labels.forEach(lab => {
        lab.addEventListener("click", () => setTimeout(() => {
          boxes.forEach(x => {
            const wrap = x.closest(".mc-check");
            if (!wrap) return;
            wrap.classList.toggle("is-selected", x.checked);
          });
        }, 0));
      });
    } else {
      const opts = [...card.querySelectorAll(".mc-option")];
      opts.forEach(btn => {
        btn.addEventListener("click", () => {
          const sel = Number(btn.dataset.idx);
          state.answers.set(id, { kind: "mc", value: [sel] });
          opts.forEach(b => b.classList.toggle("is-selected", b === btn));
        });
      });
    }
  });
}

// ===== Feedback & Grading =====
function showFeedback(cardEl, ok, userText, correctText, extraNote) {
  const fb = cardEl.querySelector(".input-card__feedback");
  if (!fb) return;
  fb.style.display = "block";

  if (ok) {
    fb.innerHTML = `
      <div class="status-correct">✔ 정답</div>
      ${correctText ? `<div class="wrong-comparison">
        <div class="label">정답</div>
        <div class="correct-answer-row">${correctText}</div>
      </div>` : ""}
      ${extraNote ? `<div class="answer-detail"><div class="explain-row">${extraNote}</div></div>` : ""}
    `;
  } else {
    fb.innerHTML = `
      <div class="status-wrong">✘ 오답</div>
      <div class="wrong-comparison">
        <div class="label">내 답</div>
        <div class="user-answer">${userText || "(미입력)"}</div>
        <div class="label">정답</div>
        <div class="correct-answer-row">${correctText}</div>
      </div>
      ${extraNote ? `<div class="answer-detail"><div class="explain-row">${extraNote}</div></div>` : ""}
    `;
  }
}

// 레벨별 채점 함수
function gradeSection(sectionKey) {
  const section = sections.find(s => s.key === sectionKey);
  if (!section) return;

  let correct = 0;
  let total = section.questions.length;

  for (const [id, meta] of state.cards.entries()) {
    if (meta.sectionKey !== sectionKey) continue;

    const { el, q } = meta;
    const user = state.answers.get(id);
    let ok = false;

    if (q.type === "input") {
      const inputEl = el.querySelector(".answer-input");
      const userVal = (user && user.value != null) ? String(user.value) : (inputEl ? inputEl.value : "");
      const res = checkInputAnswer(userVal, q.en || []);
      ok = res.ok;

      if (ok) {
        correct += 1;
        el.classList.add("input-card--correct");
        el.classList.remove("input-card--wrong");
      } else {
        el.classList.add("input-card--wrong");
        el.classList.remove("input-card--correct");
      }

      const examples = (q.en || []).slice(0, 2).map(x => `✅ ${x}`).join("<br>");
      showFeedback(el, ok, userVal, examples, q.note || "");
    } else {
      const chosen = (user && Array.isArray(user.value)) ? user.value : [];
      const ans = q.answer || [];
      if (q.multi) {
        ok = setsEqual(chosen, ans);
      } else {
        ok = (chosen.length === 1 && chosen[0] === ans[0]);
      }

      if (ok) {
        correct += 1;
        el.classList.add("input-card--correct");
        el.classList.remove("input-card--wrong");
      } else {
        el.classList.add("input-card--wrong");
        el.classList.remove("input-card--correct");
      }

      const correctLabels = (ans || []).map(i => `${i + 1}. ${q.options[i]}`).join("<br>");
      const userLabels = (chosen && chosen.length)
        ? chosen.map(i => `${i + 1}. ${q.options[i]}`).join("<br>")
        : "(미선택)";
      showFeedback(el, ok, userLabels, correctLabels, q.note || "");
    }
  }

  const pct = Math.round((correct / total) * 100);
  return { correct, total, pct };
}

function gradeLv1() { return gradeSection("lv1"); }
function gradeLv2() { return gradeSection("lv2"); }
function gradeLv3() { return gradeSection("lv3"); }
function gradeLv4() { return gradeSection("lv4"); }

function gradeAll() {
  let correct = 0;
  let total = 0;

  const sectionStats = new Map();
  sections.forEach(s => sectionStats.set(s.key, { correct: 0, total: s.questions.length }));

  for (const [id, meta] of state.cards.entries()) {
    const { el, q, sectionKey } = meta;
    total += 1;

    const user = state.answers.get(id);
    let ok = false;

    if (q.type === "input") {
      const inputEl = el.querySelector(".answer-input");
      const userVal = (user && user.value != null) ? String(user.value) : (inputEl ? inputEl.value : "");
      const res = checkInputAnswer(userVal, q.en || []);
      ok = res.ok;

      if (ok) {
        correct += 1;
        sectionStats.get(sectionKey).correct += 1;
        el.classList.add("input-card--correct");
        el.classList.remove("input-card--wrong");
      } else {
        el.classList.add("input-card--wrong");
        el.classList.remove("input-card--correct");
      }

      const examples = (q.en || []).slice(0, 2).map(x => `✅ ${x}`).join("<br>");
      showFeedback(el, ok, userVal, examples, q.note || "");
    } else {
      const chosen = (user && Array.isArray(user.value)) ? user.value : [];
      const ans = q.answer || [];
      if (q.multi) {
        ok = setsEqual(chosen, ans);
      } else {
        ok = (chosen.length === 1 && chosen[0] === ans[0]);
      }

      if (ok) {
        correct += 1;
        sectionStats.get(sectionKey).correct += 1;
        el.classList.add("input-card--correct");
        el.classList.remove("input-card--wrong");
      } else {
        el.classList.add("input-card--wrong");
        el.classList.remove("input-card--correct");
      }

      const correctLabels = (ans || []).map(i => `${i + 1}. ${q.options[i]}`).join("<br>");
      const userLabels = (chosen && chosen.length)
        ? chosen.map(i => `${i + 1}. ${q.options[i]}`).join("<br>")
        : "(미선택)";
      showFeedback(el, ok, userLabels, correctLabels, q.note || "");
    }
  }

  if (els.totalScore) els.totalScore.textContent = String(correct);

  const pct = Math.round((correct / total) * 100);

  const getPct = (key) => {
    const st = sectionStats.get(key);
    return st ? Math.round((st.correct / st.total) * 100) : 0;
  };
  
  const p1 = getPct("lv1");
  const p2 = getPct("lv2");
  const p3 = getPct("lv3");
  const p4 = getPct("lv4");

  let recommendation = "";
  if (p1 < 70) {
    recommendation = "Lv.1부터 집중해서 복습하세요. 기초가 매우 중요합니다!";
  } else if (p2 < 70) {
    recommendation = "Lv.2 (기초)에서 약점이 있어요. 전치사, 관사, 시제를 다시 정리하세요.";
  } else if (p3 < 70) {
    recommendation = "Lv.3 (중급)에서 더 연습이 필요해요. 현재완료와 구동사를 집중하세요.";
  } else {
    recommendation = "모든 레벨에서 좋은 성적이네요! 실전 회화로 한 단계 올라가세요.";
  }

  if (els.resultBanner) {
    els.resultBanner.innerHTML = `
      <div style="background: linear-gradient(135deg, #F0F5FF 0%, #F9FAFE 100%); border-left: 4px solid #2D5BFF; padding: 30px; border-radius: 12px;">
        <h3 style="color: #2D5BFF; margin: 0 0 20px 0; font-size: 1.3rem;">📊 종합 진단 결과</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 20px; margin: 20px 0;">
          <div style="text-align: center;">
            <div style="font-size: 2rem; font-weight: 800; color: #2D5BFF;">${p1}%</div>
            <div style="font-size: 0.9rem; color: #666;">Lv.1 왕기초</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 2rem; font-weight: 800; color: #10B981;">${p2}%</div>
            <div style="font-size: 0.9rem; color: #666;">Lv.2 기초</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 2rem; font-weight: 800; color: #F59E0B;">${p3}%</div>
            <div style="font-size: 0.9rem; color: #666;">Lv.3 중급</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 2rem; font-weight: 800; color: #8B5CF6;">${p4}%</div>
            <div style="font-size: 0.9rem; color: #666;">Lv.4 중상급</div>
          </div>
        </div>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p style="font-size: 1rem; color: #555; line-height: 1.6;">💡 ${recommendation}</p>
        <p style="margin-top: 12px; font-size: 0.95rem; color: #444; line-height: 1.6; font-weight: 600;">📝 문법 점수와 실제 스피킹 실력은 달라요. 상담 시 간단한 스피킹 테스트로 최종 레벨을 확인해드립니다!</p>
        <div style="margin-top: 16px; background: #FFF9E6; border: 1.5px solid #F59E0B; border-radius: 10px; padding: 16px 20px;">
          <p style="margin: 0 0 8px; font-size: 1rem; font-weight: 700; color: #92400E;">📸 이 결과, 꼭 저장해 두세요!</p>
          <p style="margin: 0; font-size: 0.9rem; color: #78350F; line-height: 1.65;">스크린샷을 찍어두거나 <strong>네이버 예약 시 메모란</strong>에 레벨 결과를 남겨주시면,<br>상담 때 훨씬 정확하고 빠른 맞춤 안내가 가능합니다!</p>
        </div>
        <div style="margin-top: 24px; display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
          <a href="https://m.booking.naver.com/booking/13/bizes/839473" target="_blank"
            style="display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px;
                   background: #2D5BFF; color: white; border: none; border-radius: 10px;
                   text-decoration: none; font-weight: 700; font-size: 1.05rem;
                   box-shadow: 0 4px 14px rgba(45,91,255,0.35);
                   transition: transform 0.15s, box-shadow 0.15s;"
            onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(45,91,255,0.45)'"
            onmouseout="this.style.transform='';this.style.boxShadow='0 4px 14px rgba(45,91,255,0.35)'">
            📞 맞춤 상담 예약하기
          </a>
          <button id="saveResultImage"
            style="display: inline-flex; align-items: center; gap: 8px; padding: 14px 22px;
                   background: white; color: #2D5BFF; border: 2px solid #2D5BFF; border-radius: 10px;
                   font-weight: 600; font-size: 0.95rem; cursor: pointer;
                   transition: background 0.15s, color 0.15s;"
            onmouseover="this.style.background='#F0F5FF'"
            onmouseout="this.style.background='white'">
            📸 결과 이미지 저장
          </button>
        </div>
        <p style="margin-top: 12px; font-size: 0.8rem; color: #999;">💬 결과 카드를 저장해 인스타그램에 공유하면, 지인도 레벨 테스트를 받을 수 있어요!</p>
      </div>
    `;
    els.resultBanner.style.display = "block";

    // 이미지 카드 저장 기능 초기화
    const saveBtn = document.getElementById("saveResultImage");
    if (saveBtn) {
      saveBtn.addEventListener("click", () => generateResultImage({ p1, p2, p3, p4, pct, recommendation }));
    }
  }

  if (els.copyResult) els.copyResult.disabled = false;

  if (els.resultBanner) {
    els.resultBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function resetAll() {
  state.answers.clear();

  for (const [, meta] of state.cards.entries()) {
    const { el, q } = meta;

    const fb = el.querySelector(".input-card__feedback");
    if (fb) fb.style.display = "none";

    el.classList.remove("input-card--correct", "input-card--wrong");

    if (q.type === "input") {
      const input = el.querySelector(".answer-input");
      if (input) input.value = "";
    } else if (q.type === "mc" && q.multi) {
      const boxes = [...el.querySelectorAll(".mc-box")];
      boxes.forEach(b => b.checked = false);
      const wraps = [...el.querySelectorAll(".mc-check")];
      wraps.forEach(w => w.classList.remove("is-selected"));
    } else {
      const opts = [...el.querySelectorAll(".mc-option")];
      opts.forEach(o => o.classList.remove("is-selected"));
    }
  }

  if (els.totalScore) els.totalScore.textContent = "0";
  if (els.resultBanner) els.resultBanner.style.display = "none";
  if (els.copyResult) els.copyResult.disabled = true;
}

function buildCopyText() {
  const lines = [];
  lines.push("THE BOX Level Test 결과");
  const total = TOTAL_QUESTIONS;
  const correct = Number(els.totalScore ? els.totalScore.textContent : 0) || 0;
  const pct = Math.round((correct / total) * 100);
  lines.push(`- 점수: ${correct}/${total} (${pct}%)`);
  lines.push("");

  let wrongCount = 0;
  for (const [id, meta] of state.cards.entries()) {
    const { el, q } = meta;
    if (!el.classList.contains("input-card--wrong")) continue;
    wrongCount += 1;

    const header = el.querySelector(".q-num") ? el.querySelector(".q-num").textContent : id;
    lines.push(`[${header}] ${q.ko}`);

    const user = state.answers.get(id);
    if (q.type === "input") {
      const inputEl = el.querySelector(".answer-input");
      const userVal = (user && user.value != null) ? String(user.value) : (inputEl ? inputEl.value : "");
      lines.push(`- 내 답: ${userVal || "(미입력)"}`);
      lines.push(`- 정답 예시: ${(q.en || []).slice(0, 2).join(" / ")}`);
    } else {
      const chosen = (user && Array.isArray(user.value)) ? user.value : [];
      const userTxt = chosen.length ? chosen.map(i => `${i + 1}`).join(", ") : "(미선택)";
      lines.push(`- 내 선택: ${userTxt}`);
      lines.push(`- 정답: ${(q.answer || []).map(i => i + 1).join(", ")}`);
    }
    lines.push("");
    if (wrongCount >= 12) {
      lines.push("…(오답이 많으면, 상담 때 핵심만 추려서 바로 잡아드릴게요)");
      break;
    }
  }

  if (wrongCount === 0) lines.push("오답 없음 ✅");
  return lines.join("\n");
}


// ===== 결과 이미지 카드 생성 =====
function generateResultImage({ p1, p2, p3, p4, pct, recommendation }) {
  const W = 1080, H = 1080;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  // --- 배경 그라데이션 ---
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#0B1A4D");
  bg.addColorStop(0.5, "#0E2260");
  bg.addColorStop(1, "#0B1A4D");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // --- 배경 장식 원 ---
  const drawCircle = (x, y, r, color) => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  };
  drawCircle(W * 0.85, H * 0.12, 200, "rgba(45,91,255,0.12)");
  drawCircle(W * 0.1, H * 0.88, 160, "rgba(99,102,241,0.1)");
  drawCircle(W * 0.5, H * 0.5, 420, "rgba(255,255,255,0.02)");

  // --- 로고 영역 ---
  ctx.font = "bold 42px 'Pretendard', 'Noto Sans KR', sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.fillText("THE BOX", W / 2, 90);

  ctx.font = "500 26px 'Pretendard', 'Noto Sans KR', sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.fillText("Busan English Community — Level Test", W / 2, 130);

  // --- 메인 제목 ---
  ctx.font = "bold 64px 'Pretendard', 'Noto Sans KR', sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText("나의 영어 레벨 진단", W / 2, 225);

  // --- 총점 원형 배지 ---
  const cx = W / 2, cy = 370, cr = 118;
  const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, cr);
  grad.addColorStop(0, "#3D6DFF");
  grad.addColorStop(1, "#2D5BFF");
  ctx.beginPath();
  ctx.arc(cx, cy, cr, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.shadowColor = "rgba(45,91,255,0.5)";
  ctx.shadowBlur = 40;
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.font = "800 82px 'Pretendard', 'Noto Sans KR', sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.fillText(`${pct}%`, cx, cy + 28);

  ctx.font = "600 26px 'Pretendard', 'Noto Sans KR', sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.fillText("종합 정답률", cx, cy + 66);

  // --- 레벨별 점수 카드 4개 ---
  const levels = [
    { label: "Lv.1 왕기초", val: p1, color: "#EF4444" },
    { label: "Lv.2 기초",   val: p2, color: "#10B981" },
    { label: "Lv.3 중급",   val: p3, color: "#F59E0B" },
    { label: "Lv.4 중상급", val: p4, color: "#8B5CF6" },
  ];

  const cardW = 200, cardH = 140, gap = 30;
  const totalCardW = cardW * 4 + gap * 3;
  const startX = (W - totalCardW) / 2;
  const cardY = 540;

  levels.forEach((lv, i) => {
    const x = startX + i * (cardW + gap);
    // 카드 배경
    ctx.save();
    ctx.beginPath();
    roundRect(ctx, x, cardY, cardW, cardH, 18);
    ctx.fillStyle = "rgba(255,255,255,0.07)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    // 상단 색상 바
    ctx.save();
    ctx.beginPath();
    roundRect(ctx, x, cardY, cardW, 5, { tl: 18, tr: 18, bl: 0, br: 0 });
    ctx.fillStyle = lv.color;
    ctx.fill();
    ctx.restore();

    // 점수
    ctx.font = "800 44px 'Pretendard', 'Noto Sans KR', sans-serif";
    ctx.fillStyle = lv.color;
    ctx.textAlign = "center";
    ctx.fillText(`${lv.val}%`, x + cardW / 2, cardY + 78);

    // 레이블
    ctx.font = "500 22px 'Pretendard', 'Noto Sans KR', sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.65)";
    ctx.fillText(lv.label, x + cardW / 2, cardY + 115);
  });

  // --- 진행 바 ---
  const barY = 730, barW = 860, barH = 14, barX = (W - barW) / 2;
  ctx.beginPath();
  roundRect(ctx, barX, barY, barW, barH, 7);
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.fill();

  const barFill = ctx.createLinearGradient(barX, 0, barX + barW, 0);
  barFill.addColorStop(0, "#EF4444");
  barFill.addColorStop(0.33, "#F59E0B");
  barFill.addColorStop(0.66, "#10B981");
  barFill.addColorStop(1, "#2D5BFF");
  ctx.beginPath();
  roundRect(ctx, barX, barY, barW * (pct / 100), barH, 7);
  ctx.fillStyle = barFill;
  ctx.fill();

  // --- 추천 문구 ---
  ctx.font = "500 26px 'Pretendard', 'Noto Sans KR', sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.textAlign = "center";
  const rec = recommendation.length > 34 ? recommendation.substring(0, 33) + "…" : recommendation;
  ctx.fillText("💡 " + rec, W / 2, 810);

  // --- 구분선 ---
  ctx.beginPath();
  ctx.moveTo(110, 870); ctx.lineTo(W - 110, 870);
  ctx.strokeStyle = "rgba(255,255,255,0.1)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // --- 하단 CTA ---
  ctx.font = "bold 30px 'Pretendard', 'Noto Sans KR', sans-serif";
  ctx.fillStyle = "#2D5BFF";
  ctx.textAlign = "center";
  ctx.fillText("level-test.thebox-busan.com", W / 2, 930);

  ctx.font = "500 22px 'Pretendard', 'Noto Sans KR', sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.fillText("@thebox_busan | 부산 서면 | THE BOX 영어 커뮤니티", W / 2, 970);

  ctx.font = "600 22px 'Pretendard', 'Noto Sans KR', sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.fillText("무료 상담 → naver.me/thebox", W / 2, 1012);

  // --- 다운로드 ---
  const link = document.createElement("a");
  link.download = `TheBox_LevelTest_${pct}pct.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();

  // 성공 피드백
  const btn = document.getElementById("saveResultImage");
  if (btn) {
    const prev = btn.innerHTML;
    btn.innerHTML = "✅ 이미지 저장 완료!";
    btn.style.background = "#F0FDF4";
    btn.style.borderColor = "#10B981";
    btn.style.color = "#059669";
    setTimeout(() => {
      btn.innerHTML = prev;
      btn.style.background = "white";
      btn.style.borderColor = "#2D5BFF";
      btn.style.color = "#2D5BFF";
    }, 2000);
  }
}

// 라운드 렉트 헬퍼
function roundRect(ctx, x, y, w, h, r) {
  if (typeof r === "number") r = { tl: r, tr: r, bl: r, br: r };
  const { tl = 0, tr = 0, bl = 0, br = 0 } = r;
  ctx.beginPath();
  ctx.moveTo(x + tl, y);
  ctx.lineTo(x + w - tr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + tr);
  ctx.lineTo(x + w, y + h - br);
  ctx.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
  ctx.lineTo(x + bl, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - bl);
  ctx.lineTo(x, y + tl);
  ctx.quadraticCurveTo(x, y, x + tl, y);
  ctx.closePath();
}


async function copyResult() {
  try {
    const txt = buildCopyText();
    await navigator.clipboard.writeText(txt);
    const btn = els.copyResult;
    if (btn) {
      const prev = btn.textContent;
      btn.textContent = "복사 완료!";
      setTimeout(() => { btn.textContent = prev; }, 1200);
    }
  } catch (e) {
    alert("복사가 막혔어요. 브라우저에서 클립보드 권한을 확인해주세요.");
  }
}

// ===== Boot =====
function buildAll() {
  state.answers.clear();
  state.cards.clear();
  sections.forEach(renderSection);

  if (els.totalScore) els.totalScore.textContent = "0";
  if (els.totalAnswered) els.totalAnswered.textContent = `/ ${TOTAL_QUESTIONS}`;
  if (els.resultBanner) els.resultBanner.style.display = "none";
}

buildAll();

if (els.gradeAll) els.gradeAll.addEventListener("click", gradeAll);
if (els.resetAll) els.resetAll.addEventListener("click", resetAll);
if (els.copyResult) els.copyResult.addEventListener("click", copyResult);

// ===== 레벨별 점수 저장소 =====
const levelScores = { lv1: null, lv2: null, lv3: null, lv4: null };

// ===== 상단 점수 배지 업데이트 =====
function updateScoreBadges() {
  let badgeContainer = document.getElementById("scoreBadges");
  if (!badgeContainer) {
    badgeContainer = document.createElement("div");
    badgeContainer.id = "scoreBadges";
    badgeContainer.style.cssText = `
      display: flex; gap: 10px; flex-wrap: wrap; align-items: center;
      margin-top: 14px; padding: 14px 18px;
      background: white; border: 1.5px solid #e5e7eb;
      border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    `;
    const scoreBoard = document.querySelector(".score-board");
    if (scoreBoard) {
      scoreBoard.parentElement.insertBefore(badgeContainer, scoreBoard.nextSibling);
    }
  }

  const levels = [
    { key: "lv1", label: "🧱 Lv.1", color: "#2D5BFF", bg: "#EEF3FF" },
    { key: "lv2", label: "🟢 Lv.2", color: "#059669", bg: "#ECFDF5" },
    { key: "lv3", label: "🟡 Lv.3", color: "#D97706", bg: "#FFFBEB" },
    { key: "lv4", label: "🔵 Lv.4", color: "#7C3AED", bg: "#F5F3FF" },
  ];

  badgeContainer.innerHTML = `<span style="font-size:0.82rem;color:#888;font-weight:600;white-space:nowrap;">내 점수</span>`;

  levels.forEach(({ key, label, color, bg }) => {
    const score = levelScores[key];
    const badge = document.createElement("div");
    badge.style.cssText = `
      display: inline-flex; align-items: center; gap: 6px;
      padding: 6px 14px; border-radius: 99px;
      background: ${score !== null ? bg : "#f3f4f6"};
      border: 1.5px solid ${score !== null ? color : "#e5e7eb"};
      font-size: 0.88rem; font-weight: 700;
      color: ${score !== null ? color : "#aaa"};
      transition: all 0.3s;
    `;
    badge.innerHTML = score !== null
      ? `${label} <span style="font-size:1rem;">${score.pct}점</span> <span style="font-weight:400;font-size:0.78rem;">(${score.correct}/${score.total})</span>`
      : `${label} <span style="font-weight:400;color:#bbb;">미응시</span>`;
    badgeContainer.appendChild(badge);
  });
}

// ===== 채점 후 팝업 모달 표시 =====
function showLevelModal({ level, emoji, label, color, bgGrad, result, nextSectionId, nextLabel, isFinal }) {
  const { correct, total, pct } = result;

  // 점수 저장 & 배지 갱신
  levelScores[level] = { correct, total, pct };
  updateScoreBadges();

  // 이미지 배지 (점수 표시용)
  const scoreColor = pct >= 70 ? "#10B981" : pct >= 50 ? "#F59E0B" : "#EF4444";
  const scoreEmoji = pct >= 70 ? "✅" : pct >= 50 ? "👍" : "💪";
  const scoreMemo = pct >= 70
    ? "탄탄해요! 다음 레벨도 도전해보세요."
    : pct >= 50
    ? "어느 정도 잡혀 있어요. 계속 풀어봐요!"
    : "아카데미와 함께하면 빠르게 올라갑니다!";

  // 기존 모달 제거
  const existing = document.getElementById("lvCompleteModal");
  if (existing) existing.remove();

  // 모달 HTML
  const modal = document.createElement("div");
  modal.id = "lvCompleteModal";
  modal.style.cssText = `
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(0,0,0,0.55); backdrop-filter: blur(3px);
    display: flex; align-items: center; justify-content: center;
    padding: 20px; animation: fadeInModal 0.2s ease;
  `;

  modal.innerHTML = `
    <style>
      @keyframes fadeInModal { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
      @keyframes slideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
      #lvCompleteModal .modal-card { animation: slideUp 0.25s ease; }
      #lvCompleteModal .lv-btn {
        width: 100%; padding: 14px 18px; border-radius: 10px; box-sizing: border-box;
        font-size: 0.97rem; font-weight: 600; cursor: pointer;
        border: none; text-align: left; display: flex;
        align-items: center; gap: 12px; transition: all 0.15s;
      }
      #lvCompleteModal .lv-btn:hover { transform: translateX(4px); filter: brightness(0.95); }
    </style>

    <div class="modal-card" style="
      background: white; border-radius: 20px; max-width: 440px; width: 100%;
      padding: 32px 28px; box-shadow: 0 24px 64px rgba(0,0,0,0.22);
      max-height: 92vh; overflow-y: auto; box-sizing: border-box;
    ">
      <!-- 점수 배지 이미지 영역 -->
      <div style="
        background: ${bgGrad}; border-radius: 14px;
        padding: 24px 20px; text-align: center; margin-bottom: 24px;
      ">
        <div style="font-size: 0.85rem; color: ${color}; font-weight: 700; margin-bottom: 6px; letter-spacing: 0.05em;">
          ${emoji} ${label} 채점 완료
        </div>
        <div style="font-size: 3.2rem; font-weight: 900; color: ${color}; line-height: 1.1; margin-bottom: 4px;">
          ${pct}<span style="font-size: 1.4rem;">점</span>
        </div>
        <div style="font-size: 0.9rem; color: #777;">${correct} / ${total} 정답</div>

        <!-- 점수 바 -->
        <div style="
          margin: 14px auto 12px; height: 8px; width: 100%; max-width: 260px;
          background: rgba(0,0,0,0.08); border-radius: 99px; overflow: hidden;
        ">
          <div style="
            height: 100%; width: ${pct}%; background: ${scoreColor};
            border-radius: 99px; transition: width 1s ease;
          "></div>
        </div>

        <div style="font-size: 0.9rem; color: #555; margin-top: 2px;">
          ${scoreEmoji} ${scoreMemo}
        </div>
      </div>

      <!-- 선택 버튼들 -->
      <p style="font-size: 0.82rem; color: #999; font-weight: 600; margin: 0 0 12px; letter-spacing: 0.04em;">무엇을 하시겠어요?</p>

      <div style="display: flex; flex-direction: column; gap: 10px;">

        ${!isFinal ? `
        <button class="lv-btn" id="modalNextLv" style="background: ${color}; color: white;">
          <span style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;background:rgba(255,255,255,0.25);border-radius:8px;flex-shrink:0;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
          <div>
            <div>${nextLabel} 풀기</div>
            <div style="font-size:0.78rem;opacity:0.85;margin-top:2px;">현재 레벨은 접어두고 다음 단계로 이동해요</div>
          </div>
        </button>
        ` : `
        <a href="https://m.booking.naver.com/booking/13/bizes/839473" target="_blank" class="lv-btn" style="background: ${color}; color: white; text-decoration: none;">
          <span style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;background:rgba(255,255,255,0.25);border-radius:8px;flex-shrink:0;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
          </span>
          <div>
            <div>최종 결과 상담 예약하기</div>
            <div style="font-size:0.78rem;opacity:0.85;margin-top:2px;">전체 결과를 가지고 무료 상담 신청해요</div>
          </div>
        </a>
        `}

        <button class="lv-btn" id="modalReview" style="background: #F9FAFB; color: #374151; border: 1.5px solid #e5e7eb;">
          <span style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;background:#E5E7EB;border-radius:8px;flex-shrink:0;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </span>
          <div>
            <div>현재 레벨 틀린 문제 확인</div>
            <div style="font-size:0.78rem;color:#888;margin-top:2px;">팝업을 닫고 오답을 바로 확인해요</div>
          </div>
        </button>

        <a href="academy.html" class="lv-btn" style="background: #F0FDF4; color: #059669; border: 1.5px solid #A7F3D0; text-decoration: none;">
          <span style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;background:#D1FAE5;border-radius:8px;flex-shrink:0;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
          </span>
          <div>
            <div>수강 가능 과정 확인하기</div>
            <div style="font-size:0.78rem;color:#6EE7B7;margin-top:2px;">내 레벨에 맞는 아카데미 과정 보러가기</div>
          </div>
        </a>

      </div>

      <p style="text-align:center;margin-top:18px;font-size:0.78rem;color:#bbb;">
        📝 실제 스피킹 레벨은 상담 시 최종 확인해드립니다
      </p>
    </div>
  `;

  document.body.appendChild(modal);

  // 다음 레벨 버튼
  const nextBtn = document.getElementById("modalNextLv");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      modal.remove();
      // 현재 레벨 섹션 숨기기
      const currentSection = document.getElementById(`${level}Section`);
      if (currentSection) {
        currentSection.style.transition = "opacity 0.3s";
        currentSection.style.opacity = "0";
        setTimeout(() => { currentSection.style.display = "none"; }, 300);
      }
      // 다음 레벨 섹션 열기
      const nextSection = document.getElementById(nextSectionId);
      if (nextSection) {
        nextSection.style.display = "block";
        nextSection.style.opacity = "0";
        setTimeout(() => {
          nextSection.style.transition = "opacity 0.4s";
          nextSection.style.opacity = "1";
          nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 320);
      }
      // 상단 배지 레벨 텍스트 업데이트
      const lvEl = document.getElementById("currentLevel");
      if (lvEl) lvEl.textContent = `${label} ✅ → ${nextLabel}`;
    });
  }

  // 오답 확인 버튼
  const reviewBtn = document.getElementById("modalReview");
  if (reviewBtn) {
    reviewBtn.addEventListener("click", () => {
      modal.remove();
      const currentSection = document.getElementById(`${level}Section`);
      if (currentSection) {
        currentSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  // 바깥 클릭 시 닫기
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });
}

// ===== 단계별 채점 버튼 =====
const nextLv1Btn = document.getElementById("nextLv1");
if (nextLv1Btn) {
  nextLv1Btn.addEventListener("click", () => {
    const result = gradeLv1();
    if (!result) return;
    showLevelModal({
      level: "lv1", emoji: "🧱", label: "Lv.1", nextLabel: "Lv.2",
      color: "#2D5BFF",
      bgGrad: "linear-gradient(135deg, #EEF3FF 0%, #F5F8FF 100%)",
      result,
      nextSectionId: "lv2Section",
      isFinal: false,
    });
  });
}

const nextLv2Btn = document.getElementById("nextLv2");
if (nextLv2Btn) {
  nextLv2Btn.addEventListener("click", () => {
    const result = gradeLv2();
    if (!result) return;
    showLevelModal({
      level: "lv2", emoji: "🟢", label: "Lv.2", nextLabel: "Lv.3",
      color: "#059669",
      bgGrad: "linear-gradient(135deg, #ECFDF5 0%, #F0FDFB 100%)",
      result,
      nextSectionId: "lv3Section",
      isFinal: false,
    });
  });
}

const nextLv3Btn = document.getElementById("nextLv3");
if (nextLv3Btn) {
  nextLv3Btn.addEventListener("click", () => {
    const result = gradeLv3();
    if (!result) return;
    showLevelModal({
      level: "lv3", emoji: "🟡", label: "Lv.3", nextLabel: "Lv.4",
      color: "#D97706",
      bgGrad: "linear-gradient(135deg, #FFFBEB 0%, #FFFEF5 100%)",
      result,
      nextSectionId: "lv4Section",
      isFinal: false,
    });
  });
}

const completeLv4Btn = document.getElementById("completeLv4");
if (completeLv4Btn) {
  completeLv4Btn.addEventListener("click", () => {
    const result = gradeLv4();
    if (!result) return;
    showLevelModal({
      level: "lv4", emoji: "🔵", label: "Lv.4", nextLabel: "",
      color: "#7C3AED",
      bgGrad: "linear-gradient(135deg, #F5F3FF 0%, #FAF9FF 100%)",
      result,
      nextSectionId: "",
      isFinal: true,
    });
    // 완료 표시
    const lvEl = document.getElementById("currentLevel");
    if (lvEl) lvEl.textContent = "완료 🎉";
  });
}
