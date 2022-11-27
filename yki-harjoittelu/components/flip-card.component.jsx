import { useState } from 'react';
import { Toast } from 'react-bootstrap';
import ReactCardFlip from 'react-card-flip';
import { compareTwoStrings } from "string-similarity";
import { Card, Form, Row, Col, Button } from 'react-bootstrap';

const FlipCard = ({ studyWord, color }) => {
	const [showA, setShowA] = useState(false);
	const [showB, setShowB] = useState(false);
	const [flipped, setFlipped] = useState(false);
	const [inputText, setInputField] = useState("");
	const [comapreResult, setCompareResult] = useState(0);

	const toggleShowA = () => setShowA(!showA);
	const toggleShowB = () => setShowB(!showB);

	const onCheck = () => {
		const specialChars = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
		const comaprableWord = studyWord?.word?.locale_values[1]?.name?.toLowerCase();
		const removedCharCompare = comaprableWord.replace(specialChars, '');
		const removeCharInput = inputText.toLowerCase().replace(specialChars, '');
		setCompareResult((Math.round(compareTwoStrings(removedCharCompare, removeCharInput) * 100) / 100).toFixed(2));
		if (compareTwoStrings(removedCharCompare, removeCharInput) > 0.8) {
			setShowA(true)
		} else {
			setShowB(true)
		}
	}

	return (
		<>
			<ReactCardFlip isFlipped={flipped} flipDirection="vertical">
				<Card
					style={{ minHeight: "10rem", width: "100%" }}
					className="m-2"
				>
					<Card.Header>{studyWord?.word?.locale_values[0]?.name}</Card.Header>
					<Card.Body>
						<Form.Control type="text" name="word" value={inputText} onChange={(e) => setInputField(e.target.value)} />
						<Row className="text-center mt-3">
							<Col xs={6} sm={6} md={6} lg={6} xl={6}>
								<Button variant="dark" onClick={onCheck}>Check</Button>
							</Col>
							<Col xs={6} sm={6} md={6} lg={6} xl={6}>
								<Button variant="outline-success" onClick={() => setFlipped(state => !state)}>Hint</Button>{' '}
							</Col>
						</Row>
					</Card.Body>
				</Card>
				<Card
					style={{ minHeight: "10rem", width: "100%", backgroundColor: color }}
					onClick={() => setFlipped(state => !state)}
					className="m-2 shadow"
				>
					<Card.Body>
						<p className="fs-1 text-white" style={{ textShadow: "1px 1px 2px black" }}>{studyWord?.word?.locale_values[1]?.name}</p>
					</Card.Body>
				</Card>
			</ReactCardFlip>
			<Toast autohide delay={3000} className="ms-2" show={showA} onClose={toggleShowA} bg="success">
				<Toast.Header>
					<strong className="me-auto">Correct!!!</strong>
					<i><small>accuracy level: {comapreResult}</small></i>
				</Toast.Header>
				<Toast.Body className="text-light">Woohoo, you got it right! <hr /> {studyWord?.word?.locale_values[1]?.name}</Toast.Body>
			</Toast>
			<Toast autohide delay={3000} className="ms-2" show={showB} onClose={toggleShowB} bg="danger">
				<Toast.Header>
					<strong className="me-auto">Wrong!!!</strong>
					<i><small>accuracy level: {comapreResult}</small></i>
				</Toast.Header>
				<Toast.Body className="text-light">Sorry, you got it wrong!</Toast.Body>
			</Toast>
		</>
	)
}

export default FlipCard;
