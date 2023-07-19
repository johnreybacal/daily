# daily

A daily to do app

> We are what we repeatedly do… therefore excellence is not an act, but a habit
>
> -- <cite>Aristotle</cite>


## Deploying to `gh-pages`
In case I forget, which is very likely
1. Stage `dist` directory
    ```
    git add dist -f
    ```
2. Commit
    ```
    git commit -m <message>
    ```
3. Push to `gh-pages` subtree
    ```
    git subtree push --prefix dist origin gh-pages
    ```
### Or run the script
```
. deploy.sh
```
