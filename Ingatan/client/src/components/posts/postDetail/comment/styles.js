import { makeStyles } from "@material-ui/core"

export default makeStyles((theme) => ({
    commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    },
    commentsInnerContainer: {
        height: '200px',
        overflowY: 'auto',
        marginRight: '30px',
    },
    loadingPaper: {
        display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', borderRadius: '10px', height: '20vh',
    },
}))