import { Box, Typography } from "@mui/material";
import PokemonStdButton from "../../Components/PokemonStdButton";


interface PaginatorProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Paginator(props: PaginatorProps) {
    return (
        <Box display="flex" justifyContent="center" mt={3} gap={2}>
            <PokemonStdButton
                onClick={() => props.onPageChange(props.currentPage - 1)}
                disabled={props.currentPage === 1}
            >
                Previous
            </PokemonStdButton>
            <Typography>
                Page {props.currentPage} of {props.totalPages}
            </Typography>
            <PokemonStdButton
                onClick={() => props.onPageChange(props.currentPage + 1)}
                disabled={props.currentPage === props.totalPages}
            >
                Next
            </PokemonStdButton>
        </Box>
    );
}   