import React, { useState } from 'react';
import { Grid, Container, AppBar, TextField, Button, Grow, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

// importing actions
import { getPostsBySearch } from '../../actions/posts';
// importing styles
import useStyles from './styles';
// importing components
import Posts from '../posts/Posts';
import Form from '../form/Form';
import Paginate from '../pagination/Paginate';

// fungsi untuk mengambil hasil url query
function useQuery() {
    return new URLSearchParams(useLocation().search);
};

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const [currentID, setCurrentID] = useState(0);

    // untuk melakukan pencarian saat tombol Enter ditekan
    const handleKeyPress = (event) => {
        if (event.keyCode === 13) {
            searchPost();
        };
    };

    // fungsi untuk melakukan pencarian
    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            history.push('/');
        };
    };

    // handle add tags input
    const handleAddTags = (addTag, event) => {
        setTags([...tags, addTag.trim().toLowerCase()]);
    };

    // handle delete tags input
    const handleDeleteTags = (deleteTag) => {
        setTags(tags.filter((tag) => tag !== deleteTag.trim().toLowerCase()));
    };

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentID={setCurrentID} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField onKeyDown={handleKeyPress} size='small' name="search" variant="outlined" label="Search Memories" autoComplete='off' fullWidth value={search} onChange={(event) => setSearch(event.target.value)} />
                            <ChipInput
                                value={tags}
                                style={{ marginTop: '10px' }}
                                onAdd={(tag) => handleAddTags(tag)}
                                onDelete={(tag) => handleDeleteTags(tag)}
                                label='Search Post By Tags'
                                variant='outlined'
                            />
                            <Button className={classes.searchButton} variant="contained" size='small' color="primary" onClick={searchPost}>Search</Button>
                        </AppBar>
                        <Form currentID={currentID} setCurrentID={setCurrentID} />
                        {(!searchQuery) && (
                            <Paper className={classes.pagination} elevation={5}>
                                <Paginate page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
};

export default Home;