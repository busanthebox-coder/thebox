with open('intro_busan.html', 'r', encoding='utf-8') as f:
    html = f.read()

replacements = {
    './더박스 부산 메인 이미지.jpg': './main_image.jpg',
    './나에게 맞는 시작점/아카데미 수업 사진.JPG': './program/academy_class.JPG',
    './나에게 맞는 시작점/원어민 스터디 현장 사진.JPG': './program/native_study.JPG',
    './아카데미 — 왜 필요한가요/수업 현장 .jpg': './academy/class_scene.jpg',
    './아카데미 — 왜 필요한가요/피드백 장면.jpg': './academy/feedback.jpg',
    './원어민 스터디 — 이렇게 달라요/대화 현장.jpg': './native_study/conversation.jpg',
    './원어민 스터디 — 이렇게 달라요/파티_아웃팅.jpg': './native_study/party_outing.jpg',
    './파티 · 아웃팅 · 이벤트/파티 &amp; 네트워킹.jpeg': './events/party_networking.jpeg',
    './파티 · 아웃팅 · 이벤트/아웃팅 &amp; 이벤트.jpeg': './events/outing_event.jpeg',
    './파티 · 아웃팅 · 이벤트/글로벌 커뮤니티.JPG': './events/global_community.JPG',
    './파티 · 아웃팅 · 이벤트/스터디.jpg': './events/study.jpg',
    './파티 · 아웃팅 · 이벤트/뮤직 &amp; 컬쳐.JPG': './events/music_culture.JPG',
    './파티 · 아웃팅 · 이벤트/프렌즈 &amp; 네트워크.jpeg': './events/friends_network.jpeg',
}

for old, new in replacements.items():
    html = html.replace(old, new)

with open('intro_busan.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("완료!")
