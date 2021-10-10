import React, { useEffect, useState } from 'react';
import { Paper, Typography, Divider, Box, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Link } from 'react-router-dom';
import Moment from 'moment';

// importing actions
import { getSinglePost, getPostsBySearch } from '../../../actions/posts';
// importing styles
import useStyles from './styles';
// importing components
import CommentSection from './comment/CommentSection';
import ModalComponent from '../../utilities/Modal';

const PostDetail = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const { value, isLoading, detail, message, status } = useSelector((state) => state.posts);
    const [progress, setProgress] = useState(10);

    // mencari recommended posts berdasarkan tags detail post
    const recommendedPosts = value.filter(({ _id }) => _id !== detail?._id);

    useEffect(() => {
        dispatch(getSinglePost(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (detail) {
            dispatch(getPostsBySearch({ search: 'none', tags: detail?.tags.join(',') }));
        };

        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);

        return () => {
            clearInterval(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detail]);

    const CircularProgressWithLabel = (props) => {
        return (
            <Box position="relative" display="inline-flex">
                <CircularProgress variant="determinate" {...props} />
                <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
                        props.value,
                    )}%`}</Typography>
                </Box>
            </Box>
        )
    };

    const openPost = (_id) => {
        history.push(`/post/${_id}`);
    }

    if (!detail) return null;

    if (isLoading) {
        return (
            <Paper elevation={5} className={classes.loadingPaper}>
                <CircularProgressWithLabel size='5em' value={progress} />
            </Paper>
        )
    };

    if (status === false) {
        return (
            <ModalComponent status={status} message={message} isOpen={true} />
        )
    };

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={5}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{detail?.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{detail.tags.map((tag, i) => (
                        <Link key={i} to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                            {` #${tag} `}
                        </Link>
                    ))}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{detail?.message}</Typography>
                    <Typography variant="h6">Created by:
                        <Link to={`/creators/${detail?.creator}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                            {` ${detail?.creator}`}
                        </Link>
                    </Typography>
                    <Typography variant="body1">{Moment(detail.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <CommentSection detail={detail} />
                    <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={detail?.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={detail?.title} />
                </div>
            </div>
            {!!recommendedPosts.length && (
                <div className={classes.section}>
                    <Typography gutterBottom variant="h5">You might also like:</Typography>
                    <Divider />
                    <div className={classes.recommendedPosts}>
                        {recommendedPosts.map(({ title, creator, message, likes, selectedFile, _id, tags }) => (
                            <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                                <Typography gutterBottom variant="h6">{title}</Typography>
                                <Typography gutterBottom variant="subtitle2">{creator}</Typography>
                                <Typography gutterBottom variant="subtitle2">{tags.map((tag) => ` #${tag}`)}</Typography>
                                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                                <Typography gutterBottom variant="subtitle1">Likes: {likes?.length}</Typography>
                                <img src={selectedFile} width="200px" alt={title} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Paper>
    )
};

export default PostDetail;