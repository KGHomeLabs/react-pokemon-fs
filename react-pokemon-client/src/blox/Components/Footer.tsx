import { Box, Typography } from '@mui/material';
import type { Theme } from '@mui/material';
import type { SxProps } from '@mui/system';

interface FooterProps {
    textAlign: any;
    marginTop: any;
    sx?: SxProps<Theme>;
};

export default function Footer({ sx, marginTop, textAlign }: FooterProps) {
    return (
        <Box textAlign={textAlign} marginTop={marginTop} sx={sx}>
            <Typography variant="body2" color="textSecondary">
                "My super fancy footer... but its a component and not just text"
            </Typography>
        </Box>
    );
};

