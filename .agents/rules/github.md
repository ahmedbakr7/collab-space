---
trigger: always_on
---

**Repository Workflow Context**

* The project is hosted on GitHub.
* There is one remote repository (`origin`) with a `main` branch.
* There are two separate local repositories.
* Each local repository works on its own branch:

  * Local Repo A → `dev_1`
  * Local Repo B → `dev_2`
* Both branches track their corresponding remote branches (`origin/dev_1`, `origin/dev_2`).
* Work is done independently on each branch.
* Integration happens by merging branches into `main` (typically via Pull Requests).
* Branches may periodically pull from `main` to stay up to date.
* Conflicts only occur during merge or rebase operations.

Assume this branching model when reasoning about synchronization, merges, rebases, and conflict resolution.
