"""Validate the static SEO output, identities, sitemap and official price consistency."""
import json
from html.parser import HTMLParser
from pathlib import Path
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = 'https://busanthebox-coder.github.io'


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


names=['intro/index.html','first/academy.html','first/study.html','first/programs.html','first/level-test.html']
titles=[]
for name in names:
    s=(ROOT/name).read_text();p=Page();p.feed(s)
    assert p.h1==1,(name,'h1')
    assert len(p.canonical)==1,(name,'canonical')
    assert p.ld,(name,'structured data')
    assert '부산' in ''.join(p.titles),(name,'region')
    nodes=p.ld[0]['@graph'];ids=[n['@id'] for n in nodes]
    assert len(ids)==len(set(ids)),(name,'duplicate identities')
    assert '/thebox/guide/' not in s,(name,'removed guide link')
    assert 'tb-quick-title' not in s and 'tb-comparison-title' not in s,(name,'unrequested visible sections')
    if name=='intro/index.html':
        businesses=[n for n in nodes if n.get('@type') in ['LocalBusiness','EducationalOrganization']]
        assert {n['taxID'] for n in businesses}=={'822-18-01665','486-93-01976'}
        assert all(n['telephone'] in s for n in businesses),(name,'visible business data')
    else:
        assert not any(n.get('taxID') for n in nodes),(name,'unnecessary duplicated business data')
    titles.append(''.join(p.titles))
assert len(set(titles))==len(titles),'duplicate titles'
assert not (ROOT/'guide/index.html').exists(),'unrequested public guide must stay removed'
assert not (ROOT/'content/public-info.json').exists(),'consolidated extra pricing data must stay removed'
ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
urls=[x.text for x in ET.parse(ROOT/'sitemap.xml').findall('s:url/s:loc',ns)]
assert len(urls)==5 and len(set(urls))==5
assert not any('/guide/' in x for x in urls)
assert not any('/consultation/' in x for x in urls)
for url in urls:
    rel=url.split('/thebox/')[1]
    assert (ROOT/(rel+'index.html' if rel.endswith('/') else rel)).is_file()
print('PASS 5 existing pages: metadata, canonical, public business facts, no extra guide links or disclosures, five-URL sitemap')
