
import { Card, Typography } from '@mui/material';
import styles from '../CardIsLoading.module.css'; // Assuming you have a CSS module for styles

interface ICardIsLoadingProps {
    className?: string;
}

export default function CardIsLoading({ className }: ICardIsLoadingProps) {
    return (
        <Card className={`${styles.cardLoading} ${className || ''}`}>
            <div className={styles.loadingBorderSpinner}></div>
            <div className={styles.pikachuWrapper} >
                <img src="/assets/pikachu-spinner.png" className={styles.pikachuSpinner} alt="loading pikachu" />
                <Typography variant="body2" className={styles.loadingText}>Loading . . .</Typography>
            </div>
        </Card>
    )
}