import { useState } from 'react';
import { Toast } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import ReactCardFlip from 'react-card-flip';
import { compareTwoStrings } from 'string-similarity';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { removeShuffleWords, userWordUpdate } from '../redux/slices';

const FlipCard = ({ studyWord, color }) => {
  const delay = 3000;
  const dispatch = useDispatch();
  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [inputText, setInputField] = useState('');
  const [comapreResult, setCompareResult] = useState(0);

  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);

  const onCheck = async () => {
    const specialChars = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
    const comaprableWord = studyWord?.locale_values[1]?.name?.toLowerCase();
    const removedCharCompare = comaprableWord.replace(specialChars, '');
    const removeCharInput = inputText.toLowerCase().replace(specialChars, '');
    setCompareResult(
      (
        Math.round(
          compareTwoStrings(removedCharCompare, removeCharInput) * 100
        ) / 100
      ).toFixed(2)
    );
    if (compareTwoStrings(removedCharCompare, removeCharInput) > 0.8) {
      await dispatch(
        userWordUpdate({
          data: { id: studyWord._id },
          token: localStorage.token,
          operation: 'increment'
        })
      );
      setShowA(true);
    } else {
      await dispatch(
        userWordUpdate({
          data: { id: studyWord._id },
          token: localStorage.token,
          operation: 'decrement'
        })
      );
      setShowB(true);
    }
    setInputField('');
    setTimeout(() => {
      setFlipped((state) => !state);
      // dispatch(removeShuffleWords(studyWord._id));
    }, delay);
  };

  const onHandleFlip = async () => {
    setFlipped((state) => !state);
    !flipped &&
      (await dispatch(
        userWordUpdate({
          data: { id: studyWord._id },
          token: localStorage.token,
          operation: 'decrement'
        })
      ));
  };

  return (
    <div style={{ position: 'relative' }}>
      <ReactCardFlip isFlipped={flipped} flipDirection='vertical'>
        <Card style={{ minHeight: '10rem', width: '100%' }}>
          <Card.Header>{studyWord?.locale_values[0]?.name}</Card.Header>
          <Card.Body>
            <Form.Control
              type='text'
              name='word'
              value={inputText}
              autoComplete='off'
              onChange={(e) => setInputField(e.target.value)}
            />
            <Row className='text-center mt-3'>
              <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                <Button variant='dark' onClick={onCheck}>
                  Check
                </Button>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                <Button
                  variant='outline-success'
                  onClick={() => !flipped && onHandleFlip()}>
                  Hint
                </Button>{' '}
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card
          style={{
            width: '100%',
            minHeight: '10rem',
            backgroundColor: color
          }}
          onClick={() => !flipped && onHandleFlip()}
          className='shadow'>
          <Card.Body>
            <p
              className='fs-1 text-white'
              style={{ textShadow: '1px 1px 2px black' }}>
              {studyWord?.locale_values[1]?.name}
            </p>
          </Card.Body>
        </Card>
      </ReactCardFlip>
      <Toast
        autohide
        bg='success'
        show={showA}
        delay={delay}
        onClose={toggleShowA}
        style={{
          zIndex: 1,
          top: '50%',
          left: '50%',
          width: '100%',
          minHeight: '10.5rem',
          position: 'absolute',
          transform: 'translate(-50%, -50%)'
        }}>
        <Toast.Header>
          <strong className='me-auto'>Correct!!!</strong>
          <i>
            <small>accuracy level: {comapreResult}</small>
          </i>
        </Toast.Header>
        <Toast.Body className='text-light'>
          Woohoo, you got it right! <hr /> {studyWord?.locale_values[1]?.name}
        </Toast.Body>
      </Toast>
      <Toast
        autohide
        bg='danger'
        show={showB}
        delay={delay}
        onClose={toggleShowB}
        style={{
          zIndex: 1,
          top: '50%',
          left: '50%',
          width: '100%',
          minHeight: '10.5rem',
          position: 'absolute',
          transform: 'translate(-50%, -50%)'
        }}>
        <Toast.Header>
          <strong className='me-auto'>Wrong!!!</strong>
          <i>
            <small>accuracy level: {comapreResult}</small>
          </i>
        </Toast.Header>
        <Toast.Body className='text-light'>
          Sorry, you got it wrong! <hr /> {studyWord?.locale_values[1]?.name}
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default FlipCard;
