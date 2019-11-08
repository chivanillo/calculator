#!/bin/bash
directory=_site
branch=gh-pages
build_command() {
  jekyll build
}

echo -e "\033[0;32mCreating $directory directory...\033[0m"
mkdir $directory

echo -e "\033[0;32mCreating $branch branch...\033[0m"
git branch $branch

echo -e "\033[0;32mUsing orphan branch to initialize $branch branch in a clean way...\033[0m"
git checkout --orphan gh-pages
git reset --hard
git commit --allow-empty -m "Init"
git checkout master

echo -e "\033[0;32mDeleting old content...\033[0m"
rm -rf $directory

echo -e "\033[0;32mChecking out $branch....\033[0m"
git worktree add $directory $branch

#echo -e "\033[0;32mAdding $directory directory to .gitignore....\033[0m"
#echo "_site" >> .gitignore

echo -e "\033[0;32mGenerating site...\033[0m"
build_command

echo -e "\033[0;32mDeploying $branch branch...\033[0m"
cd $directory &&
  git add --all &&
  git commit -m "Deploy updates" &&
  git push origin $branch

echo -e "\033[0;32mCleaning up...\033[0m"
git worktree remove $directory
