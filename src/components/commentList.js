import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';

export default function AlignItemsList({body}) {
    return (
        <List sx={{ width: '100%'}}>
            <ListItem alignItems="flex-start">
                <ListItemText
                    primary={body}
                />
            </ListItem>
            <Divider component="li" />
        </List>
    );
}
