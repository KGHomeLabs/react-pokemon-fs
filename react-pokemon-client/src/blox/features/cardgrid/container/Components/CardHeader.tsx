import { Box, Typography, CardMedia } from '@mui/material';
import styles from '../CardHeader.module.css';

interface ICardHeaderProps {
    name: string;
    pokeTypes: string | undefined;
    imageUrl: string | undefined | null;
}

export function CardHeader({ name, pokeTypes, imageUrl }: ICardHeaderProps) {
    return (
        <Box className={styles.cardHeaderContainer}>
            <Box className={styles.cardText}>
                <Typography variant="subtitle1" className={styles.cardName} gutterBottom={false}>
                    {name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {pokeTypes}
                </Typography>
            </Box>

            <Box className={styles.cardImageWrapper}>
                {imageUrl && (
                    <CardMedia
                        component="img"
                        image={imageUrl}
                        alt={name}
                        className={styles.cardImage}
                    />
                )}
            </Box>
        </Box>
    );
}