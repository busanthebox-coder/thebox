"""Validate the static SEO output, identities, sitemap and official price consistency."""
import json
from html.parser import HTMLParser
from pathlib import Path
import re
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'tools'))
from build_public_info import INFO, ORIGIN


class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.titles=[];self.canonical=[];self.h1=0;self.ld=[];self.in_title=False;self.in_ld=False;self.buf=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='title': self.in_title=True
        if tag=='h1': self.h1+=1
        if tag=='link' and a.get('rel')=='canonical': self.canonical.append(a['href'])
        if tag=='script' and a.get('type')=='application/ld+json': self.in_ld=True;self.buf=[]
    def handle_data(self,s):
        if self.in_title:self.titles.append(s)
        if self.in_ld:self.buf.append(s)
    def handle_endtag(self,tag):
        if tag=='title':self.in_title=False
        if tag=='script' and self.in_ld:self.ld.append(json.loads(''.join(self.buf)));self.in_ld=False


names=['intro/index.html','first/academy.html','first/study.html','first/programs.html','first/level-test.html','guide/index.html']
titles=[]
for name in names:
    s=(ROOT/name).read_text();p=Page();p.feed(s)
    assert p.h1==1,(name,'h1')
    assert len(p.canonical)==1,(name,'canonical')
    assert p.ld,(name,'structured data')
    assert '부산' in ''.join(p.titles),(name,'region')
    nodes=p.ld[0]['@graph'];ids=[n['@id'] for n in nodes]
    assert len(ids)==len(set(ids)),(name,'duplicate identities')
    for kind in ['study','academy']:
        n=next(n for n in nodes if n['@id']==ORIGIN+'/#'+kind+'-business')
        assert n['taxID']==INFO[kind]['tax_id'] and n['telephone'] in s,(name,'business identity')
    titles.append(''.join(p.titles))
assert len(set(titles))==len(titles),'duplicate titles'
academy=(ROOT/'first/academy.html').read_text();study=(ROOT/'first/study.html').read_text()
for row in INFO['academy_prices']:assert f"{row['new_price']:,}원" in academy
for row in INFO['study_prices']:assert f"{row['price']:,}원" in study
assert INFO['study_limited']['condition'].split(' · ')[0] in (ROOT/'guide/index.html').read_text()
ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
urls=[x.text for x in ET.parse(ROOT/'sitemap.xml').findall('s:url/s:loc',ns)]
assert len(urls)==6 and len(set(urls))==6
assert ORIGIN+'/thebox/guide/' in urls
assert not any('/consultation/' in x for x in urls)
for url in urls:
    rel=url.split('/thebox/')[1]
    assert (ROOT/(rel+'index.html' if rel.endswith('/') else rel)).is_file()
print('PASS 6 pages: distinct metadata, canonical, initial HTML, business identities, official price consistency and sitemap')
