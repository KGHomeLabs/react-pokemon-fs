
import { Box, Typography, CardMedia } from '@mui/material';
import styles from '../CardHeader.module.css';

interface ICardHeaderProps {
    name: string;
    pokeTypes: string;
    imageUrl: string;
}

export function CardHeader(cardHeaderProps: ICardHeaderProps) {
    return (
        <Box sx={{
            display: 'flex',
            flex: '1 1 33%',
            px: 1,
            pt: '1px',
            alignItems: 'flex-start' // exact spacing after the button area
        }}
        >
            <Box sx={{ flex: 1 }} >
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom={false} sx={{ m: 0 }}>
                    {cardHeaderProps.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {cardHeaderProps.pokeTypes}
                </Typography>
            </Box>
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {cardHeaderProps.imageUrl && (
                    <CardMedia
                        component="img"
                        image={cardHeaderProps.imageUrl}
                        alt={cardHeaderProps.name}
                        sx={{
                            maxHeight: '100%',
                            maxWidth: '100%',
                            objectFit: 'contain',
                        }}
                    />
                )}
            </Box>
        </Box>
    )
}