# Build
npm run build

# Stage
git add dist -f

# Commit
git commit -m "Deploy build"

# Push
git subtree push --prefix dist origin deploy
git push origin main