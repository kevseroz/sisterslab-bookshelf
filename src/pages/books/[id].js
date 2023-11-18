import {Button, Container, TextField, Typography} from '@mui/material';
import axios from 'axios';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import AlignItemsList from "@/components/commentList";
import {useFormik} from "formik";
import * as Yup from 'yup';

const BookDetail = () => {
    const router = useRouter();
    const {id} = router.query;
    const [book, setBooks] = useState(null);
    const [comments, setComments] = useState(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const CommentSchema = Yup.object({
        body: Yup.string().required('Comment is required').min(5, 'Too short!')
    });

    const formik = useFormik({
        initialValues: {
            body: '',
            bookId: id
        },
        validationSchema: CommentSchema,
        onSubmit: (values) => {
            axios.post('http://localhost:3001/comments', values).then(() => {
                setSuccess(true)
            }).catch((error) => {
                setError(error)
            })
        }
    })

    useEffect(() => {
        if (id) {
            axios
                .get(`http://localhost:3001/books/${id}`)
                .then((response) => {
                    setBooks(response.data);
                })
                .catch((error) => console.log(error));
        }
    }, [id])

    useEffect(() => {
        axios.get(`http://localhost:3001/comments?bookId=${id}`)
            .then((response) => {
                setComments(response.data)
            }).catch((error) => console.log(error))
    }, [id, success])

    if (!book) return <div>Loading...</div>;

    return (
        <Container>
            <img
                src={book.imageUrl ?? 'https://picsum.photos/200/300'}
                alt={book.title}
                loading="lazy"
            />
            <Typography variant="h4">{book.title}</Typography>
            <Typography variant="h5">{book.author}</Typography>
            <Typography variant="h6">
                {book.currency} {book.price}
            </Typography>
            <Typography variant="body">{book.description}</Typography>
            {comments && (<>
                <Typography marginTop={5} variant="h4">Comments</Typography>
                {comments.map((comment) => <AlignItemsList key={comment.id} body={comment.body} id={comment.id}  />)}
            </>)}
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="body"
                        name="body"
                        label="Comment"
                        value={formik.values.body}
                        onChange={formik.handleChange}
                        margin="normal"
                        error={formik.touched.body && Boolean(formik.errors.body)}
                        helperText={formik.touched.body && formik.errors.body}
                        onBlur={formik.handleBlur}
                    />
                    <Button color="success" variant="contained" fullWidth type="submit">
                        Add Comment
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default BookDetail;
