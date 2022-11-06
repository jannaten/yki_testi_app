import React from "react";
import { routes } from "../../config";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../utils/firebase.utils";
import { useDispatch, useSelector } from "react-redux";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { successToast } from "../../components/common/toast.component";
import { onHandleUserValueChange, signInOrUp } from "../../redux/slices";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";

function IdentifyPage() {
	const { home } = routes;
	const router = useRouter();
	const dispatch = useDispatch();
	const googleProvider = new GoogleAuthProvider();
	const { initialInputValues, loading } = useSelector(({ user }) => user);

	const GoogleLogin = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			if (result.user) {
				const userLoggedIn = await dispatch(signInOrUp({ token: result.user, platform: "fire_base_google" }));
				if (userLoggedIn?.type === "user/signInOrUp/fulfilled") {
					successToast("Succesfully logged in");
					router.push(home);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const onSubmit = async () => {
		try {
			const userLoggedIn = await dispatch(
				signInOrUp({
					email: initialInputValues.email,
					password: initialInputValues.password,
				})
			);
			if (userLoggedIn?.type === "user/signInOrUp/fulfilled") {
				successToast("Succesfully logged in");
				router.push(home);
			}
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
								{loading && <Spinner style={{ marginLeft: "0.5rem", marginBottom: "0.1rem" }} animation="border" variant="light" size="sm" />}
							</Button>
						</Col>
					</Row>
					<Button
						variant=""
						className="mt-5"
						onClick={GoogleLogin}
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

export default IdentifyPage;
