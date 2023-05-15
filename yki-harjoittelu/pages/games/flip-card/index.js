import React from 'react';
import Head from 'next/head';
import { useWords } from '../../../hooks';
import { ProgressBar } from 'react-bootstrap';
import { Col, Container, Row } from 'react-bootstrap';
import { LocalizationTitleCount } from '../../../styles';
import FlipCard from '../../../components/flip-card.component';

function GamePage() {
  const {
    getColor,
    initialRate,
    onGoingRate,
    successRate,
    shuffleWords,
    progressRate,
    studyShuffledWords
  } = useWords();
  return (
    <div>
      <Head>
        <title>Flip Card Game</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container style={{ paddingTop: '5rem' }}>
        <LocalizationTitleCount>
          {shuffleWords.length}{' '}
          {shuffleWords.length > 1 ? 'translations' : 'translation'} found
        </LocalizationTitleCount>
        <br />
        <div style={{ opacity: '0.8' }} className='d-flex flex-wrap'>
          <span style={{ fontSize: '1rem' }} className='text-dark me-2 ms-2'>
            {' '}
            **{' '}
          </span>
          <span style={{ fontSize: '1rem' }} className='text-success'>
            {successRate.length} {successRate.length > 1 ? 'words' : 'word'} are
            memorized
          </span>
          <span style={{ fontSize: '1rem' }} className='text-dark me-2 ms-2'>
            {' '}
            **{' '}
          </span>
          <span style={{ fontSize: '1rem' }} className='text-warning'>
            {onGoingRate.length} {onGoingRate.length > 1 ? 'words' : 'word'} on
            progress
          </span>
          <span style={{ fontSize: '1rem' }} className='text-dark me-2 ms-2'>
            {' '}
            **{' '}
          </span>
          <span style={{ fontSize: '1rem' }} className='text-info'>
            {progressRate.length} {progressRate.length > 1 ? 'words' : 'word'}{' '}
            almost leanred
          </span>
          <span style={{ fontSize: '1rem' }} className='text-dark me-2 ms-2'>
            {' '}
            **{' '}
          </span>
          <span style={{ fontSize: '1rem' }} className='text-danger'>
            {initialRate.length} {initialRate.length > 1 ? 'words' : 'word'} to
            be leanred
          </span>
          <span style={{ fontSize: '1rem' }} className='text-dark me-2 ms-2'>
            {' '}
            **{' '}
          </span>
        </div>
        <ProgressBar>
          <ProgressBar
            animated
            striped
            variant='success'
            now={successRate.value}
            key={1}
          />
          <ProgressBar
            animated
            variant='warning'
            now={onGoingRate.value}
            key={2}
          />
          <ProgressBar
            animated
            striped
            variant='info'
            now={progressRate.value}
            key={3}
          />
          <ProgressBar
            animated
            striped
            variant='danger'
            now={initialRate.value}
            key={4}
          />
        </ProgressBar>
        <Row className='mt-2'>
          {studyShuffledWords.map((studyWord, index) => (
            <Col
              xs={12}
              sm={12}
              md={6}
              lg={3}
              xl={3}
              key={index}
              className='mt-2 mb-2'>
              <FlipCard color={getColor(index)} studyWord={studyWord.wordId} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default GamePage;
