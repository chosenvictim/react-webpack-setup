import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchPosts from '../actions/redditPostActions';

import Posts from '../presentation/Posts';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.dispatch(fetchPosts('reactjs'));
    }

    render() {
        return (
            <div>
                <h2>ReactJs Reddit Post</h2>
                <Posts posts={this.props.redditPost.posts} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        redditPost: state.redditPost
    }
}

export default connect(mapStateToProps)(Home);
