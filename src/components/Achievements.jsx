/* eslint-disable */
import React, { useEffect, useState } from 'react';
import '../css/achievement.css'; // Import the CSS file
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import ReactMarkdown from "react-markdown";
import {Container} from "react-bootstrap";


const MyComponent = (props) => {
  const { header } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoints.achievement);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result || []); // Safeguard if 'experiences' is missing
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, []);

  const parseIntro = (text) => (
      <ReactMarkdown
          children={text}
      />
  );

  return (
      <>
        <Header title={header} />

        <div className="section-content-container2">
          {data.length > 0 ? (
              data.map((item, index) => (
                  <a href={item.href} key={index} className="achievement-item">
                    <div className="item-title">{item.title}</div>
                    <div className="item-story">{parseIntro(item.story)}</div>
                  </a>
              ))
          ) : (
              <div className="fallback-spinner">
                <FallbackSpinner />
              </div>
          )}
        </div>
      </>
  );
};

export default MyComponent;
