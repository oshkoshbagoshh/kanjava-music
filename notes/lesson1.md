

##  The Three Questions
Before reaching for any algorithm or data structure, ask these in order:
1  What shape is my data?  — Array, hash map, tree, graph, queue, stream, set
2  What do I need to do to it?  — Search, sort, transform, aggregate, traverse, deduplicate
3  What does it cost?  — Time complexity (speed) and space complexity (memory)
Everything else is pattern recognition on top of those three. The goal of this plan is to wire those patterns into your thinking so they become instinct.



Big O — The Vocabulary of Cost
Notation	Name	Intuition	Example
O(1)	Constant	Always same cost	Hash map lookup (your SHA-256 dedup check)
O(log n)	Logarithmic	Halves problem each step	Binary search on sorted track IDs
O(n)	Linear	Visit each item once	Scan all files in an ETL import
O(n log n)	Log-linear	Sort then scan	Mergesort — track ordering, playlist ranking
O(n²)	Quadratic	Nested loops — avoid at scale	Naive duplicate detection without hashing
O(2ⁿ)	Exponential	Explore all combinations	Brute-force recommendation permutations
 

 Pattern 1 — Hash Maps & Frequency Tables
CORE IDEA: Store once (O(1) write), look up instantly (O(1) read). Trade memory for speed.
The Pattern
// Problem: find duplicates in an array — naive = O(n²)
// Hash map approach = O(n)

$seen = [];
foreach ($items as $item) {
    if (isset($seen[$item])) {
        // duplicate found — O(1) lookup
    }
    $seen[$item] = true;  // O(1) write
}
Where This Lives in Your Code Right Now
Location	How hash maps are already at work
FileService::upload()	findByHash($sha256) — O(1) dedup check before writing to disk
ETL Taxonomy Loader	Normalize genre/mood/tag names: $map[$rawName] = $canonicalId
JUMANJI Shuffler	Track pool indexed by category for O(1) random pick by type
Klutch Kantent CMS	Config values in $config[] — global hash map lookup throughout
