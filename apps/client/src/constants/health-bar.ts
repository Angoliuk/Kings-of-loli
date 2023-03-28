const HEALTH_BAR_COLOR_STATE: Record<number, { color: string }> = {
  0: { color: '#B22222' },
  1: { color: '#B22222' },
  2: { color: '#FF8825' },
  3: { color: '#228B22' },
} as const;
const INITIAL_USER_HEALTH: number = 3 as const;
const MINIMAL_USER_HEALTH: number = 0 as const;
const DAMAGE_USER_HEALTH: number = 1 as const;

export { DAMAGE_USER_HEALTH, HEALTH_BAR_COLOR_STATE, INITIAL_USER_HEALTH, MINIMAL_USER_HEALTH };
