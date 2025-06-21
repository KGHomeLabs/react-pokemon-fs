import AddIcon from '@mui/icons-material/AddCircleOutline';
import FilterIcon from '@mui/icons-material/FilterAltOutlined';
import { Box, IconButton } from '@mui/material';
import styles from '../FunctionRibbon.module.css';


interface IFunctionRibbonProps {
    name: string,
    filterCallback: (name: string) => void;
    hovered?: boolean;
}

export default function FunctionRibbon(FunctionProps: IFunctionRibbonProps) {
    return (
        <Box className={styles.container} sx={{ height: FunctionProps.hovered ? 29 : 0 }}>
            {FunctionProps.hovered && (
                <Box className={styles.ribbon}>
                    <IconButton
                        className={styles.iconButton}
                        title="Filter by Series"
                        size="small"
                        onClick={() => FunctionProps.filterCallback(FunctionProps.name)}>
                        <FilterIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        className={styles.iconButton}
                        title="Add to Deck"
                        size="small">
                        <AddIcon fontSize="small" />
                    </IconButton>
                </Box>
            )}
        </Box >
    )
}