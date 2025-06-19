// utils/mergeStyles.ts
import type { SxProps, Theme } from '@mui/material';

export function mergeStyles(...styles: (SxProps<Theme> | undefined)[]): SxProps<Theme> {
  return styles
    .filter((style): style is SxProps<Theme> => Boolean(style))
    .reduce((merged, style) => ({ ...merged, ...style }), {} as SxProps<Theme>);
}