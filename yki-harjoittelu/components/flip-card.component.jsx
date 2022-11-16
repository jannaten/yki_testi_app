import { useState } from 'react';
import { Card } from 'react-bootstrap';
import ReactCardFlip from 'react-card-flip';
// import './common/flip-card.module.css';
// import styles from './common/flip-card.module.css';

const FlipCard = () => {
	const [flipped, setFlipped] = useState(false)

	return (
		<div>
			<ReactCardFlip isFlipped={flipped} flipDirection="vertical">
				<Card
					onClick={() => setFlipped(state => !state)}
					// bg={variant.toLowerCase()}
					// key={variant}
					// text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
					// style={{ width: '18rem' }}
					className="m-2"
				>
					<Card.Header>Header</Card.Header>
					<Card.Body>
						<Card.Title>Card Title </Card.Title>
						<Card.Text>
							front
						</Card.Text>
					</Card.Body>
				</Card>
				<Card
					onClick={() => setFlipped(state => !state)}
					// bg={variant.toLowerCase()}
					// key={variant}
					// text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
					// style={{ width: '18rem' }}
					className="m-2"
				>
					<Card.Header>Header</Card.Header>
					<Card.Body>
						<Card.Title>Card Title </Card.Title>
						<Card.Text>
							back
						</Card.Text>
					</Card.Body>
				</Card>
			</ReactCardFlip>
		</div>
	)
}

export default FlipCard;
// import { useState } from 'react';
// import { useSpring, a } from '@react-spring/web';
// // import './common/flip-card.module.css';
// import styles from './common/flip-card.module.css';

// const FlipCard = () => {
// 	const [flipped, set] = useState(false)
// 	const { transform, opacity } = useSpring({
// 		opacity: flipped ? 1 : 0,
// 		transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
// 		config: { mass: 5, tension: 500, friction: 80 },
// 	})

// 	return (
// 		<div onClick={() => set(state => !state)} style={{marginTop: "5rem"}}>
// 			<div className={styles["flip-card"]}>
// 				<div className={styles["flip-card-inner"]}>
// 					<div className={styles["flip-card-front"]}>
// 						{/* <img src="img_avatar.png" alt="Avatar"
// 						style="width:300px;height:300px;"
// 						 /> */}
// 					</div>
// 					<div className={styles["flip-card-back"]}>
// 						<h1>John Doe</h1>
// 						<p>Architect & Engineer</p>
// 						<p>We love that guy</p>
// 					</div>
// 				</div>
// 			</div>
// 			{/* <a.div
// 				className={`${styles.c} ${styles.back}`}
// 				style={{ opacity: opacity.to(o => 1 - o), transform }}
// 			/>
// 			<a.div
// 				className={`${styles.c} ${styles.front}`}
// 				style={{
// 					opacity,
// 					transform,
// 					rotateX: '180deg',
// 				}}
// 			/> */}
// 		</div>
// 	)
// }

// export default FlipCard;
