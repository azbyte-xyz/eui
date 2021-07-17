1. Switch to new branch: `git checkout -b customizations`
2. Reset `master` branch: `git checkout master && git reset --hard HEAD~1`
3. Pull the latest changes: `git pull upstream-eui master`
4. Switch back to `customizations`: `git checkout customizations`
5. Rebase on `master` and resolve conflicts
6. Switch back to `master` and merge `customizations`: `git checkout master && git merge customizations`
7. Run `yarn`
8. Run `npm run release`
9. Upload the tar file to github release (manually)
10. Push changes to origin `git push -f origin master`
