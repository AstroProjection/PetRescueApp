import React from 'react';
import { getPost } from '../../store/actions/post';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { Map, TileLayer, Marker, Tooltip, Popup, GeoJSON } from 'react-leaflet';

import Comments from './Comments';
const PostPage = ({ post: { post, loading }, match, getPost }) => {
  React.useEffect(() => {
    getPost(match.params.postId);
  }, [getPost]);

  const position =
    post && post.locationState.center.length > 0
      ? [post.locationState.center[0], post.locationState.center[1]]
      : null;

  console.log(post);
  return (
    post && (
      <React.Fragment>
        <section className='postpage'>
          <div className='postpage-assets'>
            {post && post.image && (
              <div className='postpage-img'>
                <img src={post.image} alt='No Image' />
              </div>
            )}

            <div className='-map'>
              {post && position && (
                <Map
                  className='postpage-map'
                  center={post.locationState.center}
                  zoom={post.locationState.zoom}
                  dragging={false}
                  keyboard={false}
                  scrollWheelZoom={false}
                  tap={false}
                  doubleClickZoom={false}
                  minZoom={post.locationState.zoom - 1}
                  maxZoom={post.locationState.zoom + 1}
                >
                  <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  />
                  <Marker position={position}></Marker>
                </Map>
              )}
            </div>
          </div>

          <div className='postpage-body'>
            <h1>
              <div>{post.title}</div>
            </h1>
            <h4>
              <p>{post.text}</p>
            </h4>
          </div>
          <div className='postpage-footer'>
            Created by - <b>{post.user.name}</b> from{' '}
            <b>{post.user.locality.locality}</b>
            <br />
            Posted on{' '}
            <b>
              {<Moment format='YYYY/MM/DD @ HH:MM'>{post.createdAt}</Moment>}
            </b>
          </div>
        </section>
        <hr />
        <section className='comments-section'>
          {!loading && post && <Comments post={post} />}
        </section>
        {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
      </React.Fragment>
    )
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(PostPage);
