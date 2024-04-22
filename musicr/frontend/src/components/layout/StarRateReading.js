
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';


function StarRateReading ( { value } ) {
    // Arredonda o valor para a precisão de 0.5 pra pegar a estrela certa
    const roundedValue = Math.floor(value * 2) / 2;

    return (
        <Box sx={{ '& > legend': { mt: 2 } }}>
            <Rating name="read-only" value={roundedValue} readOnly precision={0.5} />
        </Box>
    )
}

export default StarRateReading