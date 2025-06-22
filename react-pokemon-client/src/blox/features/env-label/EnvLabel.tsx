import Box from "@mui/material/Box";
import { isDev, isPreview } from "../../../../config/env-switch";
import styles from './EnvLabel.module.css'; // Assuming you have a CSS module for styles
interface EnvLabelProps {
    computedEnv: string;
}

export default function EnvLabel({ computedEnv }: EnvLabelProps) {
    return (
        (isPreview() || isDev()) && (
            <Box className={styles.envLabel}
                sx={{
                    backgroundColor: '#1976d2', // MUI blue
                    color: '#ffffff', // White text                    
                    fontSize: '1.1rem', // Small text for label
                }}
            >
                Environment: {computedEnv}
            </Box>
        )
    )
}