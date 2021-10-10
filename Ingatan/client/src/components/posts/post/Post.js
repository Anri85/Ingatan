import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, ButtonBase } from '@material-ui/core';
import { Favorite, Delete, MoreVert } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Moment from 'moment';

// importing actions
import { likePost, deletePost } from '../../../actions/posts';
// importing styles
import useStyles from './styles';

const Post = ({ post, setCurrentID }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));

    const LikedPost = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.data?.googleId || user?.data?.Id))
                ? (
                    <><Favorite fontSize='small' color='secondary' /> &nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><Favorite fontSize='small' color='secondary' /> &nbsp;{post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}</>
                )
        };
        return <><Favorite fontSize='small' />&nbsp;like</>
    };

    const openDetail = () => {
        history.push(`/post/${post._id}`);
    };

    return (
        <Card className={classes.card} elevation={5}>
            <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.creator}</Typography>
                <Typography variant='body2'>{Moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                {(user?.data?.googleId === post?.userId || user?.data?.Id === post?.userId) ? (
                    <>
                        <Button style={{ color: 'white' }} size='small' onClick={() => setCurrentID(post._id)}>
                            <MoreVert fontSize='medium' />
                        </Button>
                    </>
                ) : (
                    <Button style={{ color: 'white' }} size='small' disabled>
                        <MoreVert fontSize='medium' />
                    </Button>
                )}

            </div>
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `# ${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant='h6' gutterBottom>{post.title}</Typography>
            <CardContent>
                <ButtonBase className={classes.cardActions} component='span' onClick={openDetail}>
                    <Typography variant='body2' color='textSecondary' component='p'>
                        {post.message.split(' ').splice(0, 20).join(' ')}...
                    </Typography>
                </ButtonBase>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' disabled={!user?.data} onClick={() => dispatch(likePost(post._id))}>
                    <LikedPost />
                </Button>
                {(user?.data?.googleId === post?.userId || user?.data?.Id === post?.userId) ? (
                    <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
                        <Delete fontSize='small' />
                        Delete
                    </Button>
                ) : (
                    <Button size='small' color='primary' disabled>
                        <Delete fontSize='small' />
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    )
};

export default Post;