/* eslint-disable */
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import Education from './Education';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  introTextContainer: {
    margin: 10,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.2em',
    fontWeight: 500,
  },
  introImageContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => (
    <ReactMarkdown
      children={text}
    />
  );

  useEffect(() => {
    fetch(endpoints.achievement, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res.achievement))
      .catch((err) => err);
  }, []);

  console.log('data is: ', data);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
       
          {data ? (
            data.map((item) => (
                  <a href={item.href} style={{textDecoration: 'none', color: 'red'}}>
                    {parseIntro(item.story)}
                </a>
            ))
          ) : (
            <FallbackSpinner />
          )}
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
