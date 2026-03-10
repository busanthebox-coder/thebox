import re

filepath = '/Users/hannam/Desktop/홈피사진/부산 간단 홈페/intro_busan.html'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix academy detail images
content = content.replace(
    '아카데미 — 왜 필요한가요/아카데미 수업 사진00007.jpg',
    '아카데미 — 왜 필요한가요/수업 현장 .jpg'
)
content = content.replace(
    '아카데미 — 왜 필요한가요/아카데미 수업 사진00006.jpg',
    '아카데미 — 왜 필요한가요/피드백 장면.jpg'
)

# Fix program card object-position to show people better (center 60%)
content = content.replace(
    '나에게 맞는 시작점/아카데미 수업 사진.JPG" alt="아카데미 수업 사진"\n                            style="width: 100%; height: 100%; object-fit: cover; object-position: center 60%;">',
    '나에게 맞는 시작점/아카데미 수업 사진.JPG" alt="아카데미 수업 사진"\n                            style="width: 100%; height: 100%; object-fit: cover; object-position: center 65%;">'
)
content = content.replace(
    '나에게 맞는 시작점/원어민 스터디 현장 사진.JPG" alt="원어민 스터디 현장 사진"\n                            style="width: 100%; height: 100%; object-fit: cover; object-position: center 60%;">',
    '나에게 맞는 시작점/원어민 스터디 현장 사진.JPG" alt="원어민 스터디 현장 사진"\n                            style="width: 100%; height: 100%; object-fit: cover; object-position: center 65%;">'
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

# Verify changes
with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()
for i, line in enumerate(lines[1428:1442], start=1429):
    print(f'{i}: {line.rstrip()}')
