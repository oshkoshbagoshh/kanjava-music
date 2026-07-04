<?php
declare(strict_types=1);

/**
 * Pattern 4 — DFS (STUB)
 *
 * Return true if two tracks share any tag (genre/mood/BPM bucket).
 * Model: $tagGraph maps tag => list of track ids (or track => list of tags).
 * Pick one model and document it in a comment.
 *
 * @param array<string, list<string>> $trackToTags trackId => tags
 */
function tracks_share_tag(array $trackToTags, string $trackA, string $trackB): bool
{
    // TODO: DFS or set intersection — O(min(tagsA, tagsB)) with a hash set is fine
    return false;
}
