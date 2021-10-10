import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress, Box, Typography, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';

// import styles
import useStyles from './styles';
// importing components
import Post from './post/Post';

const Posts = ({ setCurrentID }) => {
    const classes = useStyles();
    const { value, isLoading, status, message } = useSelector((state) => state.posts);

    const [loading, setLoading] = useState(10);

    // use effect untuk membuat tampilan loading
    useEffect(() => {
        const timer = setInterval(() => {
            setLoading((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    const CircularProgressWithLabel = (loading) => {
        return (
            <Box position="relative" display="inline-flex">
                <CircularProgress variant="determinate" {...loading} />
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
                        loading.value,
                    )}%`}</Typography>
                </Box>
            </Box>
        )
    }

    if (isLoading) {
        return (
            <Paper elevation={5} className={classes.loadingPaper}>
                <CircularProgressWithLabel value={loading} size='5em' />
            </Paper>
        )
    } else if (!value.length && !isLoading) {
        return (
            <Paper elevation={5} className={classes.loadingPaper}>
                <Typography variant='h5' style={{ justifyContent: 'center' }}>No Post Yet!</Typography>
            </Paper>
        )
    } else if (status === false) {
        return (
            <Paper elevation={5} className={classes.loadingPaper}>
                <Typography variant='h5' style={{ justifyContent: 'center' }}>{message}</Typography>
            </Paper>
        )
    } else {
        return (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {value.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                        <Post post={post} setCurrentID={setCurrentID} />
                    </Grid>
                ))}
            </Grid>
        )
    };
};

export default Posts;