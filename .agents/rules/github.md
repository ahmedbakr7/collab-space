---
trigger: always_on
---

### Repository Workflow Context (No PR Model)

* The project uses a single remote on GitHub (`origin`).
* `main` is the integration branch.
* Two local repositories exist:

  * Local A works on `branch-a`
  * Local B works on `branch-b`
* No Pull Requests are used.
* All merges are performed locally via Git CLI.
* Workflow pattern:

  1. Each local works and pushes its own branch.
  2. When integration is needed:

     * Checkout `main`
     * Pull latest `origin/main`
     * Merge `branch-x` into `main`
     * Push `main`
  3. Other branches periodically merge or rebase from `main` to stay updated.
* Conflicts are resolved locally during merge/rebase.
* GitHub acts only as a synchronization hub, not a review tool.

Assume direct branch pushes and local merges when reasoning about synchronization.