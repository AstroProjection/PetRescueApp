import React from 'react';
import { getPost } from '../../store/slices/postSlice';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';

import Comments from './Comments';
const PostPage = ({ post: { post, loading }, getPost }) => {
  const { postId } = useParams();

  React.useEffect(() => {
    getPost(postId);
  }, [getPost, postId]);

  const position =
    post && post.locationState.center.length > 0
      ? [post.locationState.center[0], post.locationState.center[1]]
      : null;

  return (
    post && (
      <React.Fragment>
        <section className='postpage'>
          <div className='postpage-assets'>
            {post && post.image && (
              <div className='postpage-img'>
                <img src={post.image} alt='Post' />
              </div>
            )}

            <div className='-map'>
              {post && position && (
                <MapContainer
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
                </MapContainer>
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
            <b>{moment(post.createdAt).format('YYYY/MM/DD @ HH:mm')}</b>
          </div>
        </section>
        <hr />
        <section className='comments-section'>
          {!loading && post && <Comments post={post} />}
        </section>
      </React.Fragment>
    )
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(PostPage);
