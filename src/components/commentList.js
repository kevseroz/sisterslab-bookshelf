import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
export default function AlignItemsList({body , id}) {

    const handleRemove = async () =>{
               try{
                await  axios.delete(`http://localhost:3001/comments/${id}`)
                alert("delete success")
               }
               catch(error){
                    console.log(error)
               }
    }
    return (
        <List sx={{ width: '100%'}}>
            <ListItem alignItems="flex-start">
                <ListItemText
                    primary={body}
                />
                <button onClick={handleRemove}> Delete </button>
            </ListItem>
            <Divider component="li" />
        </List>
    );
    }
