import React, { useState, useRef, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';

// importing actions
import { commentPost } from '../../../../actions/posts';
// importing styles
import useStyles from './styles';

const CommentSection = ({ detail }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const commentsRef = useRef();
    const user = JSON.parse(localStorage.getItem('profile'));

    // membuat state
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(detail?.comments);

    // membuat komentar dan menampilkan komentar
    const handleComment = async () => {
        const newComments = await dispatch(commentPost(detail?._id, `${user?.data?.name || user?.data?.username}: ${comment}`));

        setComments(newComments);
        setComment('');
    }

    useEffect(() => {
        setComments(detail?.comments);
    }, [detail]);

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments?.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            <strong>{c?.split(': ')[0]}</strong>
                            {c?.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {user?.token ? (
                    <div style={{ width: '70%' }}>
                        <Typography gutterBottom variant="h6">Write a comment</Typography>
                        <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(event) => setComment(event.target.value)} />
                        <br />
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
                            Comment
                        </Button>
                    </div>
                ) : (
                    <Paper elevation={5} className={classes.loadingPaper}>
                        <Typography variant='h6' align='center'>Please Sign In To Post A Comment</Typography>
                    </Paper>
                )}
            </div>
        </div>
    )
};

export default CommentSection;