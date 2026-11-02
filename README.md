# Weekly Budget Planner

An offline budget planner that installs to an iPhone Home Screen.

- Weeks run Friday to Thursday, starting on payday
- Regular bills, savings, spending budgets and debts, with a tick-off list each week
- Month, Year, Debt and Savings pages
- **Monzo**: connect once and new transactions come in for you to check and add; bills and savings tick themselves off
- **Statements**: import a Nationwide or credit card statement (CSV or PDF). Transfers between your accounts and card repayments aren't counted as spending
- Weekly balance check across Nationwide and Monzo
- Works with no signal once installed; data is stored on the device only (nothing in this repository)

## Install on iPhone
1. Open the GitHub Pages address for this repository in Safari.
2. Tap Share → Add to Home Screen.

## Connect Monzo
1. On a computer, sign in at developers.monzo.com and create an OAuth client: Confidential = True, Redirect URL = `https://callumtricker.github.io/budget-planner/`.
2. In the app: Accounts → paste the Client ID and secret → Connect Monzo → approve in the Monzo app.
Monzo's developer API is for your own account only. Your Monzo details stay on the phone and aren't included in backups.

## Updating
Edit the files and push to `main`. Bump `VERSION` in `sw.js` so installed copies pick up the change the next time they open with a connection.

PDF statements are read with [pdf.js](https://mozilla.github.io/pdf.js/) (Apache 2.0, in `lib/`).

Live at https://callumtricker.github.io/budget-planner/
