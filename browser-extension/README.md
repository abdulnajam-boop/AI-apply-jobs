# Applisynai Browser Extension (MVP Plan)

This folder contains the initial **MVP extension structure** for Applisynai.

## What exists now
- `manifest.json` for a Manifest V3 extension scaffold
- `content-script.ts` to detect and extract visible job-related page text
- `background.ts` for future message/event orchestration
- `popup.html` and `popup.ts` for a simple extension popup UI with core action buttons

## Current MVP behavior
- No autofill implementation yet
- Content script reads page text and basic metadata (title + URL)
- Popup shows action buttons:
  - Save Job
  - Match This Job
  - Tailor Resume
  - Autofill Application (Coming Soon)

## How this will connect to Applisynai later
In future iterations, the extension will:
1. Detect job postings on supported sites.
2. Send normalized job data to the Applisynai web app/session.
3. Fetch selected resume and matching insights from Applisynai.
4. Trigger resume tailoring and eventually safe, user-approved autofill.

## Planned supported job sites
- LinkedIn
- Indeed
- Glassdoor
- ZipRecruiter
- Dice
- Wellfound
- Greenhouse
- Lever
- USAJOBS
- Remote OK
- Remotive
- We Work Remotely

## Notes
- This is intentionally lightweight and frontend-only for now.
- No production auth bridge, no backend calls, and no real autofill in this MVP scaffold.
