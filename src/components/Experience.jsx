import React, { useEffect, useState, useContext } from 'react';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import { Container, Badge, Card } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/experience.css';

const styles = {
  ulStyle: {
    listStylePosition: 'outside',
    paddingLeft: 20,
  },
  badgeStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 5,
  },
  subtitleContainerStyle: {
    marginTop: 10,
    marginBottom: 10,
  },
  aHref: {
    pointerEvents: 'auto',
  },
  subtitleStyle: {
    display: 'inline-block',
  },
  inlineChild: {
    display: 'inline-block',
  },
  itemStyle: {
    marginBottom: 10,
  },
};

function Experience(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(endpoints.experiences, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result.experiences);
    };

    fetchData();
  }, []);

  return (
    <>
      <Header title={header} />
      {data
        ? (
          <div className="section-content-container">
            <Container>
              <Timeline
                lineColor={theme.timelineLineColor}
                animate
              >
                {data.map((item) => (
                  <Fade key={item.title + item.dateText}>
                    <TimelineItem
                      dateText={item.dateText}
                      dateInnerStyle={{ background: theme.accentColor }}
                      style={styles.itemStyle}
                      bodyContainerStyle={{ color: theme.color }}
                    >
                      <h2 className="item-title">
                        {item.title}
                      </h2>
                      <div style={styles.subtitleContainerStyle}>
                        <h4 style={{ ...styles.subtitleStyle, color: theme.accentColor }}>
                          {item.subtitle}
                        </h4>
                        {item.workType && (
                        <h5 style={styles.inlineChild}>
                                      &nbsp;·
                          {' '}
                          {item.workType}
                        </h5>
                        )}
                      </div>
                      <ul style={styles.ulStyle}>
                        {item.workDescription.map((point) => (
                          <div key={point}>
                            <li>
                              <ReactMarkdown
                                children={point}
                                components={{ p: 'span' }}
                              />
                            </li>
                            <br />
                          </div>
                        ))}
                      </ul>
                      <Card.Footer style={{ backgroundColor: theme.cardFooterBackground }}>
                        {item.tags.map((tag) => (
                          <Badge
                            key={tag}
                            pill
                            bg={theme.bsSecondaryVariant}
                            text={theme.bsPrimaryVariant}
                            style={styles.badgeStyle}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </Card.Footer>
                    </TimelineItem>
                  </Fade>
                ))}
              </Timeline>
            </Container>
          </div>
        ) : <FallbackSpinner />}
    </>
  );
}

Experience.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Experience;
