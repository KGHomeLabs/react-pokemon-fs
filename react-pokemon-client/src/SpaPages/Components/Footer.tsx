import { Box, Typography } from '@mui/material';
import type { Theme } from '@mui/material';
import type { SxProps } from '@mui/system';

interface FooterProps {
  sx?: SxProps<Theme>;
};

export default function Footer({sx}:FooterProps)
{
    return (
        <Box sx={sx}> 
            <Typography variant="body2" color="textSecondary">
                "My super fancy footer... but its a component and not just text"
            </Typography>
        </Box>
    );
};

