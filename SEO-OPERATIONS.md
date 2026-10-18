# Search metadata and consultation measurement

The owner requested removal of the extra public information guide on 2026-10-18. Do not recreate a guide page, expose additional price or operating conditions, or add information menus without a specific request. Keep the scope of public information within the existing pages. The consolidated pricing data and guide generator were removed along with the public guide.

Validate the existing pages and consultation measurement:

```sh
python3 tools/check_public_info.py
node tests/measurement.test.cjs
node ../consultation/tests/submit.test.cjs
```

Keep the existing public price cards under the owner's control. Structured business data on the introduction page must match its already-visible business facts, with distinct IDs for the two businesses. Other pages reference these entities without repeating additional business disclosures. Update sitemap `lastmod` only for changed pages. Do not add unverified member counts or ratings to structured data.

The host root is deployed from the separate `busanthebox-coder.github.io` repository and provides a minimal introduction with links to existing programs and consultation. The main site remains in `thebox`; the application form remains in `consultation`. The root sitemap is an index covering the root and the five existing main pages. The application form keeps its `noindex` policy and is excluded from the sitemaps. The removed `/thebox/guide/` URL must return 404.

## Account setup required

1. Sign into Naver Search Advisor and register `https://busanthebox-coder.github.io`. Add the exact issued meta tag to the host root or upload the exact verification file. Never use a placeholder token. Verify ownership, then submit `https://busanthebox-coder.github.io/sitemap.xml`. Google Search Console and Bing Webmaster Tools also require the owner's account.
2. Confirm an existing GA4 property and put its `G-...` ID in `assets/measurement-config.js`. Until this is configured, the adapter only queues in-memory `dataLayer` events; no GA collector loads and no historical analytics are available. Do not install a second GTM/GA implementation on top of this adapter. Configure the site's privacy choices and GA enhanced measurement settings in the account before enabling collection.
3. Register event-scoped dimensions: `tb_source`, `tb_medium`, `tb_campaign`, `landing_path`, `business_region`. Mark only `consultation_success` as the consultation key event. `booking_click` is an outbound click, never a completed reservation. Obtain reservation completion counts separately from the Naver booking account.

## Event contract

| Event | Meaning |
|---|---|
| `booking_click` | Click to Naver booking |
| `consultation_click` | Click to the same-origin consultation page |
| `consultation_start` | First real form input on the current page |
| `consultation_submit` | Valid consent, non-honeypot submission attempt |
| `consultation_success` | HTTP success plus explicit application acknowledgement (`success: true`, `status: success`, or `result: success`) |
| `consultation_response_unverified` | HTTP success without the verified acknowledgement contract; excluded from conversions |
| `consultation_error` | HTTP/network failure or explicit application error; no error message or form contents enter analytics |

The existing Apps Script backend is not part of these repositories. Its live response contract and durable write must be confirmed by the owner before claiming end-to-end conversion measurement. No test leads are sent to production. Unknown successful response bodies preserve the existing success screen, while analytics records them separately as unverified.

Attribution uses same-origin sessionStorage for 30 minutes. Only allowlisted source, medium and campaign slugs and known page paths are retained. Unknown values become `other`; names, phone numbers, birthday, survey answers, free text, search terms, raw URLs and raw referrers are never passed to analytics. For example: `?utm_source=instagram&utm_medium=social&utm_campaign=busan-home`. Add reviewed campaign slugs to the config before use. A blocked storage or analytics script must not prevent form submission.

## Measurement baseline and follow-up

Deployment date: 2026-10-18 (KST). Export the 28 days before deployment from Search Console and Naver Search Advisor; these account metrics have not been accessed. Compare query/page impressions and clicks separately from consultation events. Record actual completed consultations and registrations from the operating records rather than inferring them from clicks.

Initial recheck: 2026-11-01. 28-day comparison: 2026-11-15. These are proposed check dates, not scheduled automations. Search ranks and AI citations remain unmeasured until the relevant engines are checked.

Further visible content changes require the owner's request. Improve search metadata and discoverability using existing public content; do not make additional operational information more public merely for SEO.
