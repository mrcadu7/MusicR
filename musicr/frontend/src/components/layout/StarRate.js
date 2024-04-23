import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';


function StarRate ( {value, onChange} ) {

    return (
        <div>
            <Box sx={{ '& > legend': { mt: 2 } }}>
                <Typography component="legend">Rating</Typography>
                <Rating name="simple-controlled" value={value} precision={0.5} onChange={(event, newValue) => {
                    onChange(newValue);
                    console.log(newValue)
                }}
                />
            </Box>
        </div>
    )

}

export default StarRate