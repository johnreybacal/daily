# Build
npm run build

# Stage
git add dist -f

# Commit
git commit -m "Deploy build"

# Push
git subtree push --prefix dist origin gh-pages

# Undo commit on working branch
git reset HEAD~

# Revert dist/ folder
git restore dist/