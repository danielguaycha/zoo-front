import React from 'react';
import Grow from '@material-ui/core/Grow';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import {Clear, Search} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import {CircularProgress} from "@material-ui/core";

const defaultSearchStyles = theme => ({
    main: {
        display: 'flex',
        flex: '1 0 auto',
        paddingTop: 5,
    },
    searchText: {
        flex: '0.8 0',
    },
    clearIcon: {
        '&:hover': {
            color: theme.palette.error.main,
        },
    },
});

class CustomSearchRender extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: props.searchText
        };
    }

    handleTextChange = event => {
        this.setState({searchText: event.target.value});
    };

    componentDidMount() {
        document.addEventListener('keydown', this.onKeyDown, false);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyDown, false);
    }

    onKeyDown = event => {
        if (event.keyCode === 27) {
            this.props.onHide();
        }

        if (event.keyCode === 13) {
            this.onHandleSearch();
        }
    };

    onHandleSearch = () => {
        if(!this.state.searchText) return;
        this.props.onSearch(this.state.searchText);
    };

    render() {
        const { classes, options, onHide, loader, placeholder } = this.props;

        return (
            <Grow appear in={true} timeout={300}>
                <div className={classes.main} ref={el => (this.rootRef = el)}>
                    <TextField
                        placeholder={placeholder}
                        className={classes.searchText}
                        InputProps={{
                            'aria-label': options.textLabels.toolbar.search,
                        }}
                        autoFocus={true}
                        disabled={loader}
                        value={this.state.searchText || ''}
                        onChange={this.handleTextChange}
                        fullWidth={true}
                        inputRef={el => (this.searchField = el)}
                    />

                    <IconButton onClick={this.onHandleSearch} color={'primary'}>
                        <Search />
                    </IconButton>


                    {
                        !loader &&
                        <IconButton className={classes.clearIcon} onClick={onHide}>
                            <Clear />
                        </IconButton>
                    }
                    {
                        loader &&
                        <IconButton className={classes.clearIcon}>
                            <CircularProgress size={24} style={{marginLeft: 15, position: 'relative', top: 4}} />
                        </IconButton>
                    }

                </div>
            </Grow>
        );
    }
}

CustomSearchRender.defaultProps = {
    placeholder: 'Buscar'
};

export default withStyles(defaultSearchStyles, { name: 'CustomSearchRender' })(CustomSearchRender);
