"""Generate public information HTML and schema from reviewed official facts.

Usage: python3 tools/build_public_info.py [--root-site ../busanthebox-coder.github.io]
"""
import argparse
import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = "https://busanthebox-coder.github.io"
SITE = ORIGIN + "/thebox"
INFO = json.loads((ROOT / "content/public-info.json").read_text())
e = html.escape


def business_nodes():
    address = {"@type": "PostalAddress", "streetAddress": "동천로 71 6층", "addressLocality": "부산진구", "addressRegion": "부산광역시", "addressCountry": "KR"}
    result = []
    for kind, typ, path in [("study", "LocalBusiness", "/first/study.html"), ("academy", "EducationalOrganization", "/first/academy.html")]:
        item = INFO[kind]
        node = {"@type": typ, "@id": ORIGIN + "/#" + kind + "-business", "name": item["name"], "alternateName": item["name"] + " 부산 서면", "url": SITE + path, "telephone": item["phone"], "taxID": item["tax_id"], "address": address}
        if kind == "study":
            node["sameAs"] = ["https://www.instagram.com/thebox_busan/"]
        result.append(node)
    return result


def schema(url, title):
    nodes = business_nodes()
    nodes += [{"@type": "WebSite", "@id": ORIGIN + "/#website", "url": ORIGIN + "/", "name": "더박스 부산 서면", "inLanguage": "ko-KR"},
              {"@type": "WebPage", "@id": url + "#webpage", "url": url, "name": title, "inLanguage": "ko-KR", "isPartOf": {"@id": ORIGIN + "/#website"}, "about": [{"@id": n["@id"]} for n in business_nodes()]}]
    return '<script type="application/ld+json" id="thebox-structured-data">' + json.dumps({"@context": "https://schema.org", "@graph": nodes}, ensure_ascii=False).replace("</", "<\\/") + '</script>'


def footer():
    rows = []
    for kind in ["study", "academy"]:
        item = INFO[kind]
        rows.append(f'<p><strong>{e(item["name"])}</strong> · {e(INFO["address"])} · <a href="tel:{e(item["phone"])}">{e(item["phone"])}</a> · 사업자등록번호 {e(item["tax_id"])}</p>')
    return '<div class="tb-business">' + ''.join(rows) + '<p>더박스와 더박스 어학원(아카데미)은 별도 사업자입니다.</p><p><a href="/thebox/guide/">수강료·시간표·오시는 길</a> · <a href="https://www.instagram.com/thebox_busan/" target="_blank" rel="noopener">부산점 인스타그램</a></p></div>'


def head(title, description, path):
    url = ORIGIN + path
    return f'''<!doctype html><html lang="ko"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{e(title)}</title><meta name="description" content="{e(description)}">
<link rel="canonical" href="{url}"><link rel="icon" href="/thebox/favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website"><meta property="og:title" content="{e(title)}"><meta property="og:description" content="{e(description)}"><meta property="og:url" content="{url}"><meta property="og:image" content="{SITE}/intro/og-image.jpg"><meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/thebox/assets/guide.css">
<script defer src="/thebox/assets/measurement-config.js"></script><script defer src="/thebox/assets/measurement.js"></script>
{schema(url, title)}
</head><body class="tb-page"><a class="tb-skip" href="#main">본문으로 이동</a>
<header><div class="tb-page-nav"><a href="/" aria-label="더박스 부산 공식 안내"><strong>THE<span>BOX</span> 부산</strong></a><nav aria-label="주요 메뉴"><a href="/thebox/intro/">홈페이지</a><a href="/thebox/first/programs.html">프로그램 비교</a><a href="/thebox/guide/">이용 안내</a></nav></div></header>'''


def links():
    return '<div class="tb-info-links"><a class="tb-primary" href="/consultation/">상담지 작성하기</a><a href="https://m.booking.naver.com/booking/13/bizes/839473" target="_blank" rel="noopener">네이버 상담 예약</a></div>'


def table(caption, headers, rows):
    return '<div class="tb-table" tabindex="0" role="region" aria-label="' + e(caption) + '"><table><caption>' + e(caption) + '</caption><thead><tr>' + ''.join('<th scope="col">' + e(x) + '</th>' for x in headers) + '</tr></thead><tbody>' + ''.join('<tr>' + ''.join(('<th scope="row">' if i == 0 else '<td>') + e(str(cell)) + ('</th>' if i == 0 else '</td>') for i, cell in enumerate(row)) + '</tr>' for row in rows) + '</tbody></table></div>'


def won(value):
    return f"{value:,}원"


def guide():
    intro = '''<main id="main" class="tb-info"><div class="tb-info-wrap"><p class="tb-breadcrumb"><a href="/">더박스 부산</a> / 이용 안내</p>
<p class="tb-info-kicker">BUSAN · SEOMYEON</p><h1>부산 서면 더박스<br>수강료·시간표·오시는 길</h1>
<p>아카데미 회화 수업과 원어민 스터디의 비용·참여 조건을 비교하고, 내 일정에 맞는 프로그램을 확인하세요.</p>
<div class="tb-info-links"><a href="#prices">수강료·이용료</a><a href="#schedule">시간표</a><a href="#visit">오시는 길</a><a href="#faq">자주 묻는 질문</a></div>
<section id="programs"><h2>아카데미와 원어민 스터디, 무엇이 다른가요?</h2><p>기초부터 말하는 연습과 피드백이 필요하면 아카데미를, 배운 영어로 실제 대화를 이어가고 싶다면 원어민 스터디를 비교해 보세요. 참여 과정과 레벨은 상담을 통해 안내합니다.</p>'''
    intro += table("프로그램 비교", ["구분", "아카데미", "원어민 스터디"], [
        ["진행", "선생님과 회화 수업·훈련", "원어민과 소규모 주제 대화"],
        ["시작점", "기초부터 말하기 연습이 필요한 분", "현재 수준에 맞춰 실전 대화를 하고 싶은 분"],
        ["안내", "수업 레벨·담당 교사·반 편성 상담", "참여 레벨·팀·이용 일정 상담"],
        ["운영 사업자", INFO["academy"]["name"], INFO["study"]["name"]]])
    intro += '<div class="tb-info-links"><a href="/thebox/first/academy.html">아카데미 자세히 보기</a><a href="/thebox/first/study.html">원어민 스터디 자세히 보기</a></div></section>'
    intro += '<section id="prices"><h2>더박스 부산 수강료와 이용료는 얼마인가요?</h2><p>아카데미와 스터디는 결제 기준이 다릅니다. 아카데미는 기간별 수강료, 스터디는 횟수와 최대 이용 기간을 함께 확인하세요.</p>'
    intro += table("아카데미 수강료 · 주 2회, 회당 90분", ["기간", "횟수", "신규", "재수강·연장"], [[r["period"], str(r["sessions"]) + "회", won(r["new_price"]), won(r["renewal_price"])] for r in INFO["academy_prices"]])
    intro += '<p class="tb-info-note">아카데미 추가 할인과 적용 조건은 상담 시 확인해 주세요.</p>'
    intro += table("원어민 스터디 이용권", ["횟수", "이용료", "최대 이용 기간", "조건"], [[str(r["sessions"]) + "회", won(r["price"]), r["validity"], r["condition"]] for r in INFO["study_prices"]])
    r = INFO["study_limited"]
    intro += f'<p class="tb-info-note"><strong>8회권 {won(r["price"])}:</strong> {e(r["condition"])}. 신규 등록용 이용권과 구분해 주세요.</p><p class="tb-info-note">스터디의 실제 일정과 홀딩·할인 적용은 상담 시 확인해 주세요. 아카데미 수강료와 스터디 이용료를 동일한 월 요금으로 환산하지 않습니다.</p></section>'
    intro += '<section id="schedule"><h2>직장인 저녁반이나 주말반이 있나요?</h2><p>아카데미 공개 안내에는 평일 오전·저녁과 주말 시간대가 있습니다. 주 2회, 회당 90분이며 레벨·요일에 따라 실제 반 편성과 모집 여부가 달라질 수 있습니다.</p>'
    intro += table("아카데미 안내 시간대", ["구분", "요일", "시간"], [[r["name"], r["days"], r["times"]] for r in INFO["academy_schedule"]])
    intro += '<p class="tb-info-note">위 시간대는 공개된 아카데미 안내를 정리한 것입니다. 현재 수강생의 월별 배정은 담당 선생님 공지로 안내되며, 신규 반과 스터디 일정은 상담 후 확정합니다.</p></section>'
    intro += f'''<section id="visit"><h2>더박스 부산은 어디에 있나요?</h2><p><strong>{e(INFO["address"])}</strong>에 있습니다. 지도에서 도로명 주소와 건물 6층을 확인하고 방문해 주세요.</p>
<div class="tb-info-grid"><div class="tb-info-card"><h3>원어민 스터디 문의</h3><p>{e(INFO["study"]["name"])} · <a href="tel:{INFO["study"]["phone"]}">{INFO["study"]["phone"]}</a></p></div><div class="tb-info-card"><h3>아카데미 문의</h3><p>{e(INFO["academy"]["name"])} · <a href="tel:{INFO["academy"]["phone"]}">{INFO["academy"]["phone"]}</a></p></div></div>
<div class="tb-info-links"><a href="https://map.naver.com/p/search/%EB%B6%80%EC%82%B0%EC%A7%84%EA%B5%AC%20%EB%8F%99%EC%B2%9C%EB%A1%9C%2071" target="_blank" rel="noopener">네이버 지도로 주소 확인</a><a href="https://m.booking.naver.com/booking/13/bizes/839473" target="_blank" rel="noopener">방문 상담 예약</a></div>
<p class="tb-info-note">주차와 방문 가능 시간은 예약 시 확인해 주세요.</p></section>'''
    intro += '''<section id="faq"><h2>자주 묻는 질문</h2>
<details><summary>영어회화 초보도 시작할 수 있나요?</summary><p>아카데미는 기초부터 회화 연습을 시작하는 프로그램을 안내합니다. 현재 말하기 수준과 목표를 상담한 뒤 시작 과정을 선택하세요.</p></details>
<details><summary>원어민 스터디 8회권으로 신규 등록할 수 있나요?</summary><p>공개 안내상 8회권은 기존 멤버의 불가피한 재연장 시에만 이용 가능합니다. 신규 참여는 16회·32회·48회 이용권과 참여 조건을 상담해 주세요.</p></details>
<details><summary>상담지 작성과 네이버 예약은 같은가요?</summary><p>상담지는 상담에 필요한 내용을 전달하는 신청서입니다. 방문 상담 시간은 네이버 예약에서 별도로 선택해 주세요.</p></details>
<details><summary>아카데미와 스터디는 같은 사업자인가요?</summary><p>더박스와 더박스 어학원(아카데미)은 별도 사업자입니다. 프로그램별 비용과 문의처를 구분해 안내합니다.</p></details></section>'''
    intro += '<section><h2>나에게 맞는 시작점을 상담해 보세요</h2><p>현재 영어 수준, 참여 목적, 가능한 시간을 알려주시면 프로그램을 안내합니다.</p>' + links() + '</section>'
    intro += f'<p class="tb-info-note">공개 안내 확인일: {INFO["checked_on"]}. 요금·시간대와 운영 조건은 변경될 수 있습니다. 상세 조건과 현재 반 편성은 상담에서 확인해 주세요.</p><p class="tb-info-note">확인 자료: ' + ' · '.join(f'<a href="{r["url"]}">{e(r["name"])}</a>' for r in INFO["sources"]) + '</p></div></main>'
    return head("부산 서면 영어회화 수강료·시간표·위치 | 더박스", "더박스 부산 서면 아카데미 수강료와 원어민 스터디 이용료, 저녁·주말 시간대, 동천로 71 6층 위치와 프로그램별 상담 방법을 확인하세요.", "/thebox/guide/") + intro + footer() + '</body></html>\n'


def root_home():
    return head("더박스 부산 서면 | 영어회화 공식 안내", "부산 서면 더박스의 아카데미 회화 수업과 원어민 스터디를 비교하고, 수강료·시간표·오시는 길과 상담 방법을 확인하세요.", "/") + '''<main id="main" class="tb-info"><div class="tb-info-wrap"><p class="tb-info-kicker">THEBOX BUSAN · SEOMYEON</p><h1>부산 서면 영어회화,<br>더박스의 시작점을 찾아보세요.</h1><p>더박스 부산점의 공식 안내입니다. 아카데미 회화 수업과 원어민 스터디를 비교하고, 가격·시간표·방문 정보를 확인하세요.</p><div class="tb-info-links"><a class="tb-primary" href="/thebox/intro/">부산점 홈페이지 보기</a><a href="/thebox/guide/">수강료·시간표·오시는 길</a></div><section><div class="tb-info-grid"><div class="tb-info-card"><h2>아카데미 회화 수업</h2><p>기초부터 말하는 연습이 필요한 분을 위한 회화 수업. 담당 선생님과 레벨별 수업을 상담하세요.</p><div class="tb-info-links"><a href="/thebox/first/academy.html">아카데미 알아보기</a></div></div><div class="tb-info-card"><h2>원어민 회화 스터디</h2><p>원어민과 소규모로 주제를 나누며 배운 영어를 사용합니다. 참여 레벨과 이용 일정을 상담하세요.</p><div class="tb-info-links"><a href="/thebox/first/study.html">스터디 알아보기</a></div></div></div></section><section><h2>방문 전, 필요한 정보부터</h2><div class="tb-info-links"><a href="/thebox/first/programs.html">프로그램 비교</a><a href="/thebox/guide/#prices">수강료·이용료</a><a href="/thebox/guide/#schedule">시간표</a><a href="/thebox/guide/#visit">오시는 길</a></div>''' + links() + '</section></div></main>' + footer() + '</body></html>\n'


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--root-site", type=Path)
    args = parser.parse_args()
    (ROOT / "guide").mkdir(exist_ok=True)
    (ROOT / "guide/index.html").write_text(guide())
    if args.root_site:
        args.root_site.mkdir(exist_ok=True, parents=True)
        (args.root_site / "index.html").write_text(root_home())
        (args.root_site / ".nojekyll").touch()
        (args.root_site / "robots.txt").write_text("User-agent: *\nAllow: /\n\nSitemap: " + ORIGIN + "/sitemap.xml\n")
        (args.root_site / "sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>' + SITE + '/sitemap.xml</loc></sitemap><sitemap><loc>' + ORIGIN + '/root-sitemap.xml</loc></sitemap></sitemapindex>\n')
        (args.root_site / "root-sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>' + ORIGIN + '/</loc><lastmod>' + INFO["checked_on"] + '</lastmod></url></urlset>\n')
        (args.root_site / "llms.txt").write_text('# 더박스 부산 서면\n\n> 부산점의 아카데미 회화 수업과 원어민 스터디 공식 안내. 두 프로그램은 별도 사업자가 운영합니다.\n\n## 공식 안내\n- [부산점 홈페이지](' + SITE + '/intro/)\n- [프로그램 비교](' + SITE + '/first/programs.html)\n- [아카데미](' + SITE + '/first/academy.html)\n- [원어민 스터디](' + SITE + '/first/study.html)\n- [수강료·시간표·오시는 길](' + SITE + '/guide/)\n\n## 정보 관리\n공개 안내 확인일: ' + INFO["checked_on"] + '. 가격과 일정은 프로그램별 공개 안내 및 상담에서 확인합니다.\n')
    print("Generated public guide" + (" and host root" if args.root_site else ""))
