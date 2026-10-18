const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../assets/measurement.js'), 'utf8');
let checks = 0;
function run(options = {}) {
  const listeners = {}, dispatched = [], storage = new Map(options.storage || []), scripts = [];
  const location = new URL(options.url || 'https://busanthebox-coder.github.io/thebox/intro/');
  const document = {
    referrer: options.referrer || '', title: 'THEBOX',
    addEventListener(name, fn) { listeners[name] = fn; },
    dispatchEvent(event) { dispatched.push(event.detail); },
    createElement() { return {}; }, head: {appendChild(node) { scripts.push(node); }}
  };
  const window = {THEBOX_MEASUREMENT_CONFIG: {measurementId: options.id || null, allowedCampaigns: ['busan-home']}};
  const context = {window, document, location, URL, URLSearchParams, Date, Number,
    sessionStorage: {getItem(k) {if(options.noStorage) throw Error();return storage.get(k) || null;}, setItem(k,v) {if(options.noStorage) throw Error();storage.set(k,v);}},
    CustomEvent: class {constructor(name, opts) {this.detail = opts.detail;}}};
  vm.runInNewContext(source, context);
  return {api: window.THEBOXMeasurement, window, listeners, storage, dispatched, scripts};
}
function test(name, fn) {fn(); checks++; console.log('PASS ' + name);}
test('search referrer becomes organic source', () => {
  const r=run({referrer:'https://search.naver.com/search.naver?query=private-name'});
  assert.equal(r.api.attribution().tb_source,'naver');
  assert.equal(r.api.attribution().tb_medium,'organic');
  assert.ok(!JSON.stringify(r.api.attribution()).includes('private-name'));
});
test('attribution survives same-origin consultation navigation', () => {
  const a=run({url:'https://busanthebox-coder.github.io/thebox/intro/?utm_source=instagram&utm_medium=social&utm_campaign=busan-home'});
  const b=run({url:'https://busanthebox-coder.github.io/consultation/',storage:[...a.storage],referrer:'https://busanthebox-coder.github.io/thebox/intro/'});
  assert.equal(b.api.attribution().tb_source,'instagram');assert.equal(b.api.attribution().landing_path,'/thebox/intro/');
});
test('arbitrary UTM and query values never enter analytics', () => {
  const r=run({url:'https://busanthebox-coder.github.io/consultation/?utm_source=01012345678&utm_medium=person&utm_campaign=secret-name&utm_term=private-email&name=private-name'});
  r.api.track('consultation_start',{email:'private-email',error:'private-name'});
  assert.equal(r.dispatched[0].tb_source,'other');assert.ok(!JSON.stringify(r.dispatched).includes('private'));
});
test('storage disabled still permits form and event use', () => {
  const r=run({noStorage:true});r.api.track('consultation_submit');assert.equal(r.dispatched.length,1);
});
test('expired attribution becomes direct', () => {
  const r=run({storage:[['thebox_attribution_v1',JSON.stringify({source:'google',medium:'organic',created_at:Date.now()-31*60*1000})]]});
  assert.equal(r.api.attribution().tb_source,'direct');
});
test('no analytics collector without a verified GA ID', () => {
  const r=run();assert.equal(r.scripts.length,0);assert.equal(r.api.collectorEnabled,false);
});
test('configured GA sends sanitized page view', () => {
  const r=run({id:'G-TEST123',url:'https://busanthebox-coder.github.io/consultation/?name=private'});
  assert.equal(r.scripts.length,1);assert.ok(!JSON.stringify(r.window.dataLayer).includes('?name'));
});
test('reservation clicks are distinct from consultation success', () => {
  const r=run();r.listeners.click({target:{closest(){return {href:'https://m.booking.naver.com/booking/13/bizes/839473'};}}});
  assert.equal(r.dispatched[0].event,'booking_click');assert.equal(r.dispatched.length,1);
});
test('form start counts once without capturing input values', () => {
  const r=run();const ev={target:{id:'s1-name',value:'private-name',closest(){return {};}}};r.listeners.input(ev);r.listeners.input(ev);
  assert.equal(r.dispatched.length,1);assert.equal(r.dispatched[0].event,'consultation_start');assert.ok(!JSON.stringify(r.dispatched).includes('private-name'));
});
test('honeypot input does not count as form start', () => {
  const r=run();r.listeners.input({target:{id:'hp-website',closest(){return {};}}});assert.equal(r.dispatched.length,0);
});
test('server response needs explicit acknowledgement', () => {
  const r=run();assert.equal(r.api.responseStatus('{"status":"success"}'),'success');
  assert.equal(r.api.responseStatus('{"success":false}'),'error');
  assert.equal(r.api.responseStatus('{"status":"error","success":true}'),'error');
  assert.equal(r.api.responseStatus('<html>login</html>'),'unverified');
  assert.equal(r.api.responseStatus('{"ok":true}'),'unverified');
});
test('unsupported events are rejected', () => {
  const r=run();r.api.track('private-form-data',{name:'private-name'});assert.equal(r.dispatched.length,0);
});
console.log(checks + ' meaningful scenarios passed');
