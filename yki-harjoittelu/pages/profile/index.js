import { routes } from "../../config";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userUpdate, loadUser } from "../../redux/slices";
import { Badge, Button, Col, Container, Form, Row } from "react-bootstrap";
import { successToast, errorToast } from "../../components/common/toast.component";

function ProfilePage() {
	const { identify } = routes;
	const router = useRouter();
	const dispatch = useDispatch();
	const [userData, setUserData] = useState({});
	const [enableEdit, setEnableEdit] = useState(false);

	const { user } = useSelector(({ user }) => user);

	useEffect(() => {
		if (localStorage.token) {
			dispatch(loadUser());
		} else {
			router.push(identify);
		}
	}, []);

	const onSubmit = async () => {
		try {
			await dispatch(userUpdate({ data: userData, token: localStorage.token }));
			setUserData(false);
			setEnableEdit(false);
			successToast("user information updated");
		} catch (error) {
			errorToast(error.message);
		}
	};

	return (
		<Container style={{ paddingTop: "10%" }}>
			<Form.Group style={{ width: "100%" }}>
				<Row>
					<Col lg={3} md={6} sm={12}>
						<div>
							<h2>User information</h2>
							<Badge pill bg="success">
								status: {user?.status}
							</Badge>
							<Badge pill bg="primary" className="ms-2">
								user type: {user?.type}
							</Badge>
						</div>
						<Button variant="outline-dark" className="mt-3" onClick={() => setEnableEdit((prev) => !prev)}>{!enableEdit ? "edit information" : "cancel editing"}</Button>
						<hr />
						<Form.Label>name</Form.Label>
						<Form.Control
							type="text"
							name="full_name"
							disabled={!enableEdit}
							defaultValue={user?.full_name}
							placeholder="type your full name here"
							onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
						/>
						<Form.Label className="mt-2">email</Form.Label>
						<Form.Control
							type="email"
							name="email"
							disabled
							value={user?.email}
							placeholder="type your email here"
						/>
						<Form.Label className="mt-2">username</Form.Label>
						<Form.Control
							type="text"
							name="username"
							defaultValue={user?.username}
							disabled={!enableEdit}
							placeholder="type your username here"
							onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
						/>
						<Form.Label className="mt-2">add or edit password</Form.Label>
						<Form.Control
							type="password"
							name="password"
							defaultValue=""
							disabled={!enableEdit}
							placeholder="type your password here"
							onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
						/>
						<Button
							disabled={!enableEdit}
							variant=""
							className="mt-3"
							style={{ color: "white", backgroundColor: "#9967CE" }}
							onClick={onSubmit}
						>
							update
						</Button>
					</Col>
				</Row>
			</Form.Group>
		</Container>
	);
}

export default ProfilePage;
