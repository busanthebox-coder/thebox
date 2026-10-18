(function () {
  'use strict';
  if (window.THEBOXMeasurement) return;
  var config = window.THEBOX_MEASUREMENT_CONFIG || {};
  var key = 'thebox_attribution_v1';
  var sources = ['naver', 'google', 'bing', 'instagram', 'facebook', 'kakao', 'newsletter', 'direct', 'other'];
  var mediums = ['organic', 'social', 'paid_social', 'cpc', 'referral', 'email', 'offline', 'none', 'other'];
  var paths = ['/', '/thebox/', '/thebox/intro/', '/thebox/first/academy.html', '/thebox/first/study.html', '/thebox/first/programs.html', '/thebox/first/level-test.html', '/thebox/guide/', '/consultation/'];
  var events = ['booking_click', 'consultation_click', 'consultation_start', 'consultation_submit', 'consultation_success', 'consultation_response_unverified', 'consultation_error'];
  var campaigns = config.allowedCampaigns || [];
  function listed(value, values, fallback) { return values.indexOf(value) >= 0 ? value : fallback; }
  function pagePath(value) { return listed(value.replace(/index\.html$/, ''), paths, 'other'); }
  function referrerSource() {
    try {
      var host = new URL(document.referrer).hostname;
      if (host === location.hostname) return null;
      if (/(^|\.)naver\.com$/.test(host)) return ['naver', 'organic'];
      if (/(^|\.)google\.(com|co\.kr)$/.test(host)) return ['google', 'organic'];
      if (/(^|\.)bing\.com$/.test(host)) return ['bing', 'organic'];
      if (/(^|\.)instagram\.com$/.test(host)) return ['instagram', 'social'];
      if (/(^|\.)facebook\.com$/.test(host)) return ['facebook', 'social'];
      return ['other', 'referral'];
    } catch (_) { return null; }
  }
  var previous = null;
  try {
    var saved = JSON.parse(sessionStorage.getItem(key));
    if (saved && Number.isFinite(saved.created_at) && Date.now() - saved.created_at >= 0 && Date.now() - saved.created_at < 30 * 60 * 1000) previous = saved;
  } catch (_) { /* Attribution also works in browsers that disable storage. */ }
  var query = new URLSearchParams(location.search);
  var referrer = referrerSource();
  var explicit = query.has('utm_source');
  var current = explicit ? {
    source: listed(query.get('utm_source'), sources, 'other'),
    medium: listed(query.get('utm_medium'), mediums, 'other'),
    campaign: listed(query.get('utm_campaign'), campaigns, 'other'),
    landing_path: pagePath(location.pathname), created_at: Date.now()
  } : previous || {
    source: referrer ? referrer[0] : 'direct', medium: referrer ? referrer[1] : 'none',
    campaign: 'none', landing_path: pagePath(location.pathname), created_at: Date.now()
  };
  // Revalidate stored values; never transmit arbitrary query strings, URLs, or form contents.
  current = {
    source: listed(current.source, sources, 'other'), medium: listed(current.medium, mediums, 'other'),
    campaign: listed(current.campaign, campaigns.concat(['none']), 'other'),
    landing_path: listed(current.landing_path, paths, 'other'), created_at: current.created_at
  };
  try { sessionStorage.setItem(key, JSON.stringify(current)); } catch (_) {}
  window.dataLayer = window.dataLayer || [];
  var gaReady = /^G-[A-Z0-9]+$/.test(config.measurementId || '');
  if (gaReady) {
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', config.measurementId, {
      send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false
    });
    window.gtag('event', 'page_view', {page_location: location.origin + location.pathname, page_referrer: '', page_title: document.title});
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(config.measurementId);
    document.head.appendChild(script);
  }
  function attribution() {
    return {tb_source: current.source, tb_medium: current.medium, tb_campaign: current.campaign, landing_path: current.landing_path};
  }
  function track(name, details) {
    if (events.indexOf(name) < 0) return;
    var payload = Object.assign(attribution(), {page_path: pagePath(location.pathname), business_region: 'busan'});
    if (details && ['booking', 'consultation'].indexOf(details.destination) >= 0) payload.destination = details.destination;
    if (gaReady) window.gtag('event', name, payload);
    else window.dataLayer.push(Object.assign({event: name}, payload));
    document.dispatchEvent(new CustomEvent('thebox:measurement', {detail: Object.assign({event: name}, payload)}));
  }
  function responseStatus(body) {
    try {
      var value = JSON.parse(body);
      if (!value || typeof value !== 'object') return 'unverified';
      if (value.success === false || value.ok === false || value.status === 'error' || value.result === 'error' || value.error) return 'error';
      if (value.success === true || value.status === 'success' || value.result === 'success') return 'success';
    } catch (_) {}
    return 'unverified';
  }
  window.THEBOXMeasurement = {track: track, attribution: attribution, responseStatus: responseStatus, collectorEnabled: gaReady};
  document.addEventListener('click', function (event) {
    var anchor = event.target.closest && event.target.closest('a[href]');
    if (!anchor) return;
    try {
      var destination = new URL(anchor.href, location.href);
      if (destination.hostname === 'm.booking.naver.com' || destination.hostname === 'booking.naver.com') track('booking_click', {destination: 'booking'});
      else if (destination.origin === location.origin && /^\/consultation\/(?:index\.html)?$/.test(destination.pathname)) track('consultation_click', {destination: 'consultation'});
    } catch (_) {}
  });
  var started = false;
  document.addEventListener('input', function (event) {
    if (started || !event.target.closest || !event.target.closest('.form-step') || event.target.id === 'hp-website') return;
    started = true;
    track('consultation_start');
  });
})();
