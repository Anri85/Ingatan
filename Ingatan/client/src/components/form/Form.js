import React, { useState, useEffect } from 'react';
import { TextField, Paper, Button, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FileBase from 'react-file-base64';
import ChipInput from 'material-ui-chip-input';

// importing actions
import { createPost, updatePost } from '../../actions/posts';
// importing styles
import useStyles from './styles';

const Form = ({ currentID, setCurrentID }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    const post = useSelector((state) => (currentID ? state.posts.value.find((data) => data._id === currentID) : null));

    const [postData, setPostData] = useState({ title: '', message: '', selectedFile: '' });
    const [tags, setTags] = useState([]);
    const [error, setError] = useState(false);

    // menghapus semua value didalam state
    const clear = () => {
        setCurrentID(0);
        setPostData({ title: '', message: '', selectedFile: '' });
    };

    useEffect(() => {
        if (post) {
            setPostData(post);
        };
    }, [post]);

    const handleAddTags = (addTag) => {
        setTags([...tags, addTag.trim().toLowerCase()]);
    }

    const handleDeleteTags = (deleteTag) => {
        setTags([...tags, deleteTag.trim().toLowerCase()]);
    }

    // melakukan create data atau update data
    const handleSubmit = async (event) => {
        event.preventDefault();

        // apabila currentID = 0 maka lakukan createPost
        if (currentID === 0) {
            if (postData.title !== '' && postData.message !== '' && tags.length > 0) {
                dispatch(createPost({ ...postData, tags }, history));
                setError(false);
                clear();
            } else {
                setError(true);
                return;
            };
        } else {
            // lakukan updatePost
            if (postData?.title !== '' && postData?.message !== '' && tags.length > 0) {
                dispatch(updatePost(currentID, { ...postData, tags }));
                setError(false);
                clear();
            } else {
                setError(true);
                return;
            };
        };
    };

    // menghilangkan tampilan form apabila user belum login
    if (!user?.data) {
        return (
            <Paper className={classes.paper} elevation={6}>
                <Typography variant="h6" align="center">
                    Please sign in to create your own memories and like other's memories.
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper} elevation={5}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h5'>Post A Memory</Typography>
                <TextField
                    name='title'
                    variant='outlined'
                    label='Title'
                    size="small"
                    fullWidth
                    required
                    value={postData.title}
                    onChange={(event) => setPostData({ ...postData, title: event.target.value })}
                    error={error}
                    helperText={error && 'This field required'}
                />
                <TextField
                    name='message'
                    variant='outlined'
                    label='Message'
                    multiline
                    rows={6}
                    fullWidth
                    required={true}
                    value={postData.message}
                    onChange={(event) => setPostData({ ...postData, message: event.target.value })}
                    error={error}
                    helperText={error && 'This field required'}
                />
                <ChipInput
                    value={tags}
                    style={{ marginTop: '10px' }}
                    fullWidth
                    label='Tags'
                    required
                    size='small'
                    onAdd={(tag) => handleAddTags(tag)}
                    onDelete={(tag) => handleDeleteTags(tag)}
                    variant='outlined'
                    helperText={error && 'This field required'}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type='file'
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='medium' type='submit' fullWidth>Submit</Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
};

export default Form;