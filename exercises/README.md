# Algorithm exercises — Javadio × Klutch Kantent

Maps to [`notes/algorithms.rtf`](../notes/algorithms.rtf).

**Week 1 is fully worked.** Weeks 2–6 are stubs: implement the function bodies until `run.php` passes.

## Run

```bash
# Week 1 (reference solutions)
php exercises/week01_hash_maps/run.php

# Weeks 2–6 (stubs — expect failures until you implement)
php exercises/week02_sliding_window/run.php
php exercises/week03_recursion_trees/run.php
php exercises/week04_graphs/run.php
php exercises/week05_sorting_search/run.php
php exercises/week06_synthesis/run.php
```

## Rules (from the study plan)

1. No copy-paste for Weeks 2–6 — type solutions from scratch.
2. After each solve: *What is the Big O?* and *Where does this live in my codebase?*
3. PHP first, then Python if you want to collaborate with Money Mike.
4. Draw the data structure on paper when stuck.

## Decision tree

| Need… | Pattern |
| --- | --- |
| Fast lookup / dedup / counts | Hash map (Week 1) |
| Contiguous sequence / stream window | Sliding window (Week 2) |
| Nested folders / XML / taxonomy | Recursion + trees (Week 3) |
| Connections / N hops | BFS / DFS (Week 4) |
| Sorted search / ranking | Binary search + sort (Week 5) |
| End-to-end pipeline | Synthesis (Week 6) |
