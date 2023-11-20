import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import {useEffect, useState} from 'react';

const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:3001/books')
            .then((response) => {
                setBooks(response.data);
                console.log("deneme")
            })
            .catch((error) => console.error('error :>> ', error));
    }, []);

    return (
        <>
            <Grid
                container
                justifyContent="center"
                alignItems="flex-start"
                marginTop={5}
                >
                {books &&
                    books.map((book) => (
                        <Grid container
                              justifyContent="center"
                              key={book.id}  xs={12} sm={6} md={4}>
                            <Card sx={{width: 360, height: 500, marginBottom: 5}}>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={book.imageUrl ?? 'https://picsum.photos/200/300'}
                                        alt={book.title}
                                    />
                                    <CardContent>
                                        <Typography style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}} gutterBottom variant="h5" component="div">
                                            {book.title}
                                        </Typography>
                                        <Typography style={{height: 120, overflow: 'hidden', textOverflow: 'ellipsis'}}  variant="body2" color="text.secondary">
                                            {book.description}...
                                        </Typography>
                                    </CardContent>
                                    <CardActions  >
                                        <Link
                                            href={`/books/${book.id}`}
                                            style={{textDecoration: 'none'}}
                                        >
                                            <Button color="warning" variant="contained" size="small">
                                                Details
                                            </Button>
                                        </Link>
                                        <Link
                                            href={`/edit-books/${book.id}`}
                                            style={{textDecoration: 'none'}}
                                        >
                                            <Button color="warning" variant="outlined" size="small">
                                                Edit
                                            </Button>
                                        </Link>
                                    </CardActions>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
            <div style={{display: "flex", justifyContent: 'center'}}>
                <Link href="/add-book">
                    <Button variant="contained" color="success">
                        Add Book
                    </Button>
                </Link>
            </div>

        </>
    );
};

export default Home;
