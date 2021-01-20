import React, { useEffect, useContext } from 'react';
import Spinner from '../Layout/Spinner';
import Repos from '../Repos/Repos';
import { Link } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

const User = ({ match }) => {
    const githubContext = useContext(GithubContext);

    const { getUser, loading, user, getUserRepos, repos } = githubContext;

    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login);
        // eslint-disable-next-line
    }, []);

    const {
        name,
        avatar_url,
        location,
        bio,
        blog,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable
    } = user;

    return (
        loading ? <Spinner /> : (
            <div style={fromTop}>
                <Link to='/' className='btn btn-light'>Back to search</Link>
                    Hireable: {' '}
                {hireable ? <i className='fas fa-check text-success' /> : <i className='fas fa-times-circle text-danger' />}
                <div className="card grid-2">
                    <div className="all-center">
                        <img src={avatar_url} className='round-img' alt="avatar" style={{ width: '150px' }} />
                        <h2>{name}</h2>
                        <p>Location: {location ? location : '--'}</p>
                    </div>
                    <div>
                        {
                            bio && <>
                                <h3>Bio</h3>
                                <p>{bio}</p>
                            </>
                        }
                        <a href={html_url} className='btn btn-dark my-1'>Visit Github Profile</a>
                        <ul>
                            <li>{login && <><strong>Username:</strong> {login}</>}</li>
                            <li>{blog && <><strong>Website:</strong> {blog}</>}</li>
                        </ul>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="badge badge-primary">Followers: {followers}</div>
                    <div className="badge badge-success">Following: {following}</div>
                    <div className="badge badge-light">Public Repos: {public_repos}</div>
                    <div className="badge badge-dark">Public Gists: {public_gists}</div>
                </div>
                <Repos repos={repos} />
            </div>
        )
    );
}

const fromTop = {
    marginTop: '4rem',
    textAlign: 'center'
}

export default User
