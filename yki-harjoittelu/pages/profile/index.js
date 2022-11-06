import { routes } from "../../config";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../utils/firebase.utils";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { successToast } from "../../components/common/toast.component";
import { onHandleUserValueChange, signInOrUp } from "../../redux/slices";

function ProfilePage() {
	const { identify } = routes;
	const router = useRouter();
	const dispatch = useDispatch();
	const { initialInputValues, user } = useSelector(({ user }) => user);

	useEffect(() => {
		if (!user) router.push(identify);
	}, []);

	const onSubmit = async () => {
		try {
			// await dispatch(
			// 	signInOrUp({
			// 		email: initialInputValues.email,
			// 		password: initialInputValues.password,
			// 	})
			// );
			// router.push(home);
			// successToast("Succesfully logged in");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<Container style={{ paddingTop: "15vh" }}>
				<Form.Group style={{ width: "100%" }}>
					<Row>
						<Col lg={3} md={6} sm={12}>
							<h2>Sign in</h2>
							<Form.Label>email</Form.Label>
							<Form.Control
								type="email"
								name="email"
								value={initialInputValues.email}
								placeholder="type your email here"
								onChange={(e) => dispatch(onHandleUserValueChange(e))}
							/>
							<Form.Label className="mt-2">password</Form.Label>
							<Form.Control
								type="password"
								name="password"
								value={initialInputValues.password}
								placeholder="type your password here"
								onChange={(e) => dispatch(onHandleUserValueChange(e))}
							/>
							<Button
								variant=""
								className="mt-3"
								style={{ color: "white", backgroundColor: "#9967CE" }}
								onClick={onSubmit}
							>
								login
							</Button>
						</Col>
					</Row>
					<Button
						variant=""
						className="mt-5"
						// onClick={GoogleLogin}
						style={{ border: "0.1rem solid #9967CE" }}
					>
						<FcGoogle style={{ fontSize: "1.5rem" }} />
						<span className="ms-2">sign in with Google</span>
					</Button>
				</Form.Group>
			</Container>
		</div>
	);
}

export default ProfilePage;
