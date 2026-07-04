import { describe, expect, it } from 'vitest';

/**
 * Player state machine logic (DOM-free).
 * Full AudioContext tests require a browser environment.
 */

type State = { playingId: string | null };

function reduce(
  state: State,
  action: { type: 'play' | 'stop' | 'toggle'; id: string },
): State {
  switch (action.type) {
    case 'play':
      return { playingId: action.id };
    case 'stop':
      return { playingId: null };
    case 'toggle':
      return state.playingId === action.id
        ? { playingId: null }
        : { playingId: action.id };
    default: {
      const _exhaustive: never = action.type;
      return _exhaustive;
    }
  }
}

describe('preview player state machine', () => {
  it('starts playback for a resource', () => {
    const next = reduce({ playingId: null }, { type: 'play', id: 'a' });
    expect(next.playingId).toBe('a');
  });

  it('stops playback', () => {
    const next = reduce({ playingId: 'a' }, { type: 'stop', id: 'a' });
    expect(next.playingId).toBeNull();
  });

  it('toggles off when same id is playing', () => {
    const next = reduce({ playingId: 'a' }, { type: 'toggle', id: 'a' });
    expect(next.playingId).toBeNull();
  });

  it('switches to a different resource', () => {
    const next = reduce({ playingId: 'a' }, { type: 'toggle', id: 'b' });
    expect(next.playingId).toBe('b');
  });
});
