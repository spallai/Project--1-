# Project Git Workflow

## Starting a New Task:

* on master, **git pull** so you have the latest changes as your starting point

* **git checkout -b myBranch** to create and switch to a new branch named "myBranch"

  * _branches should be named after the task you are working on. don't just name your branch "monday" or "john."_

* once on your branch, work as normal and save often:

  * **git add -A**

  * **git commit -m "message"**

  * **git push origin myBranch** to save branch changes on github

## Finishing a Task:

* **git checkout master** to switch back to master branch

  * _note that your changes will "disappear," because they are still on your branch at this point._

* **git pull** to download any new changes from github

  * _if the vim editor pops up in the terminal, asking you to provide a merge message, just type `:q` to exit out._

* **git merge myBranch** to merge your branch changes into master

  * _if the terminal says CONFLICT, check the affected files and fix the conflicts. because you edited these files, that means you need to add and commit them again. otherwise, you are still in a "merging" state._

  * _whether there were merge conflicts or not, run and test the app to verify that nothing broke!_

* **git push origin master** to save the merged version on github

  * _if the push was "rejected," it probably means you need to **git pull** again, because there are new changes on github that you don't have locally._

* when you are ready to start a new task, create a new branch. do not reuse your old branch.

## Other Helpful Commands:

  * **git status**: see which files have been modified and if there are any commits that haven't been pushed yet

  * **git branch**: see all of the branches you've made locally and which one you are currently on (it will have a * next to the name)

  * **git reset --hard**: discard all changes to existing files. only do this if you are absolutely sure you don't need to keep your work and want to reset the branch back to its previous state.
