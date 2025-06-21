import { Typography, CardContent } from '@mui/material';
import styles from '../CardMainContent.module.css';

export default function CardMainContent() {
    return (
        <CardContent className={styles.cardMainContent}>
            <Typography variant="body2" color="text.secondary">
                {'No description displayed (yet).'}
            </Typography>
        </CardContent>
    );
}