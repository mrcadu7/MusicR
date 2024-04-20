import { useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';


function StarRate () {
    const [value, setValue] = useState(0);

    return (
        <div>
            <Box sx={{ '& > legend': { mt: 2 } }}>
                <Typography component="legend">Rating</Typography>
                <Rating name="simple-controlled" value={value} precision={0.5} onChange={(event, newValue) => {
                    setValue(newValue);
                    console.log(newValue)
                }}
                />
            </Box>
        </div>
    )

}

export default StarRate