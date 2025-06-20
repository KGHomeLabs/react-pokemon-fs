import React from 'react';
import { Card, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';


interface ICardIsLoadingProps {
    sx?: SxProps<Theme>;
    className?: string;
    children?: React.ReactNode;
}

export default function CardIsLoading({ children, className, sx }: ICardIsLoadingProps) {
    return (
        <Card sx={sx} className={className}>
            <Typography>Loading . . .</Typography>
            {children}
        </Card>
    )
}