# Deploy to your OAC-FieldOps repository

Target: https://github.com/oacalderin-ship-it/OAC-FieldOps

Do not use your separate Pentest-Safebox repository. This package has not been pushed to GitHub and assumes no account write access.

## 1. Back up the current version

1. Open your existing OAC FieldOps application and export its workspace using its current backup feature. Store it in a private folder outside your Git repository.
2. Open the exact GitHub repository above. Use **Code → Download ZIP** and retain the ZIP with the date. This backs up source; it does not back up your browser-local evidence.
3. Record the current commit ID from the repository history. If comfortable with GitHub releases/tags, create a rollback tag before replacement.
4. This rebuild uses a separate v11 browser database. It does **not** automatically import v10 encrypted workspaces; the previous encryption/schema is not available or verified here. Keep the old app/source and backups until you have exported/reimported the required raw evidence.

## 2. Extract and test the new source

1. Download `OAC-FieldOps-v11.0.0-rc.1.zip` and extract it.
2. Open the extracted `OAC-FieldOps` folder. You should see `index.html`, `style.css`, `assets-mark.svg`, `js`, `docs`, `tests`, `fixtures`, `package.json`, `.nojekyll`, and `.gitignore`.
3. Read `docs/LIMITATIONS.md`. This is a release candidate pending browser/device acceptance.
4. If you have Node.js 22+, open a terminal in this folder and run `npm test`.
5. For a local UI check, run `python -m http.server 8000` on your computer, then open `http://localhost:8000`. On Kali, use `python3`. This serves the folder to your local browser; do not use a private evidence folder as the server root. Stop it with Ctrl+C when finished.
6. Follow `docs/ACCEPTANCE.md`, including browser backup/restore and one real Windows/Shark Jack transfer, before depending on the app for client work.

## 3. Replace only the application source

The cleanest replacement is a clean working copy of the **OAC-FieldOps** repository using GitHub Desktop. Avoid layering this rebuild over old files: old service workers, old entry points and obsolete scripts can cause cached behavior.

1. In GitHub Desktop, select or clone **oacalderin-ship-it/OAC-FieldOps**. Verify the repository name at the top before changing anything.
2. Show the repository folder in Explorer. Keep the hidden `.git` directory intact.
3. After confirming the source backup exists, remove the old application files from this working copy. Preserve any repository-specific license or ownership files you need. Review existing `.github/workflows` before removing or replacing them; an old workflow may expect a framework build this project does not need.
4. Copy the **contents** of the new `OAC-FieldOps` folder into the repository root. Do not add an extra nested OAC-FieldOps folder above `index.html`.
5. Include `.nojekyll` and `.gitignore`. Do not copy node_modules, test-artifacts, reports, encrypted backups or real evidence.
6. In GitHub Desktop, inspect the changed file list. The only content should be application source, documentation and clearly fictional fixtures/tests.
7. Commit with a message such as `Rebuild FieldOps v11 release candidate` and push to origin.

The GitHub web upload interface can upload the source files too, but deleting obsolete files is less convenient. Do not delete the entire repository merely to deploy this version.

## 4. Configure GitHub Pages

1. Open **Settings → Pages** in the same repository.
2. For this buildless project, select **Deploy from a branch**.
3. Choose your actual default branch, typically **main**, and the **/ (root)** folder. Save.
4. Open **Actions** and wait for the Pages deployment for the new commit to succeed. A queued or failed job is not a completed deployment.
5. Use the URL GitHub displays in Pages settings. The expected project-path form is `https://oacalderin-ship-it.github.io/OAC-FieldOps/`, subject to your actual repository Pages configuration.
6. Open the site and check the sidebar version: **v11.0.0-rc.1**.

## 5. If the old version appears

1. Confirm the deployed commit matches the new source; do not rerun an obsolete workflow commit.
2. Hard-refresh with Ctrl+Shift+R.
3. If an old service worker exists, first back up all old browser data, then use browser Developer Tools → Application → Service Workers to unregister the old worker for this site. This rebuild installs no service worker.
4. Avoid **Clear site data** until you have a verified backup. It deletes local databases, not just cached JavaScript.
5. Open a private browser window only as a source-version check; its local vault will be separate and may be discarded when closed.

## 6. First-time setup

1. Create your new passphrase and record it privately.
2. Create a personal-lab or owned-network engagement with your real scope. Do not copy fictional fixture scope into a client assessment.
3. Check the start/end window and permitted intensity.
4. Import raw evidence from your privately retained previous assessments as needed. Imported history may be stale and will not prove current state.
5. Export an encrypted v11 backup and perform a restore test in a separate browser profile.

## 7. Rollback

1. Export your current v11 encrypted backup before changing source.
2. Revert the rebuild commit in GitHub Desktop or restore the backed-up previous source, preserving `.git`.
3. Commit and push the rollback. Wait for the corresponding successful Pages deployment.
4. Hard-refresh and remove an obsolete worker only after backing up data.
5. The v11 database and old database are separate. Rolling back source does not migrate either data format. Keep both versions’ backups and original passphrases.
