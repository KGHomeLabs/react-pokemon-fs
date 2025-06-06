import { Button } from '@mui/material';
import type { SxProps } from '@mui/system';
import type { ReactNode } from 'react';
import type {ButtonProps,Theme} from '@mui/material';

type StdButtonProps = {
  sx?: SxProps<Theme>;
  children?: ReactNode; // 👈 allow children
} & ButtonProps;

export default function Footer({ sx, children, ...rest }: StdButtonProps) {
  return (
    <Button variant="contained" color="error" sx={sx} {...rest}>
      {children}{/* 👈 this renders the inner content */}
    </Button>
  );
}