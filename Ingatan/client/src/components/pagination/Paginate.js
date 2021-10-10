import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

// importing actions
import { getAllPosts } from '../../actions/posts';
// importing styles
import useStyles from './styles';

const Paginate = ({ page }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { totalPages } = useSelector((state) => state.posts);

    useEffect(() => {
        if (page) {
            dispatch(getAllPosts(page));
        };
    }, [dispatch, page]);

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={totalPages}
            page={Number(page)}
            variant='outlined'
            color='secondary'
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
    )
};

export default Paginate;