export const BREAKPOINTS = {
	tabletMin: 550,
	laptopMin: 1100,
	desktopMin: 1500
} as const;

export type BreakpointKey = keyof typeof BREAKPOINTS;

export const QUERIES = {
	tabletAndUp: `(min-width: ${BREAKPOINTS.tabletMin / 16}rem)`,
	laptopAndUp: `(min-width: ${BREAKPOINTS.laptopMin / 16}rem)`,
	desktopAndUp: `(min-width: ${BREAKPOINTS.desktopMin / 16}rem)`,
	tabletOnly: `(min-width: ${BREAKPOINTS.tabletMin / 16}rem) and (max-width: ${(BREAKPOINTS.laptopMin - 1) / 16}rem)`
} as const;
