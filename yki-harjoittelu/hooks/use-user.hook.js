import { routes } from '../config';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, userUpdate } from '../redux/slices';
import { errorToast, successToast } from '../components/common/toast.component';

const useDeviceSize = () => {
  const { identify } = routes;
  const router = useRouter();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({});
  const [enableEdit, setEnableEdit] = useState(false);

  const { user } = useSelector(({ user }) => user);

  useEffect(() => {
    if (localStorage.token) dispatch(loadUser());
    else router.push(identify);
  }, []);

  const onSubmit = async () => {
    try {
      const respond = await dispatch(
        userUpdate({ data: userData, token: localStorage.token })
      );
      if (respond?.error?.message !== 'Rejected') {
        console.log('I am being cllaed');
        setUserData(false);
        setEnableEdit(false);
        successToast('user information updated');
      } else {
        setEnableEdit(false);
      }
    } catch (error) {
      errorToast(error.message);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setEnableEdit((prev) => !prev);
  };

  return {
    handleChange,
    handleToggle,
    enableEdit,
    onSubmit,
    user
  };
};

export default useDeviceSize;

// import { useUser } from '../../hooks';
// import { Badge, Button, Col, Container, Form, Row } from "react-bootstrap";

// function ProfilePage() {
// 	const { enableEdit, handleToggle } = useUser();
// 	const { onSubmit, user, handleChange } = useUser();

// 	return (
// 		<Container style={{ paddingTop: "10%" }}>
// 			<Form.Group style={{ width: "100%" }}>
// 				<Row>
// 					<Col lg={3} md={6} sm={12}>
// 						<div>
// 							<h2>User information</h2>
// 							<Badge pill bg="success">
// 								status: {user?.status}
// 							</Badge>
// 							<Badge pill bg="primary" className="ms-2">
// 								user type: {user?.type}
// 							</Badge>
// 						</div>
// 						<Button
// 							className="mt-3"
// 							variant="outline-dark"
// 							onClick={handleToggle}
// 						>
// 							{!enableEdit ? "edit information" : "cancel editing"}
// 						</Button>
// 						<hr />
// 						<Form.Label>name</Form.Label>
// 						<Form.Control
// 							type="text"
// 							name="full_name"
// 							disabled={!enableEdit}
// 							defaultValue={user?.full_name}
// 							placeholder="type your full name here"
// 							onChange={(e) => handleChange(e)}
// 						/>
// 						<Form.Label className="mt-2">email</Form.Label>
// 						<Form.Control
// 							type="email"
// 							name="email"
// 							disabled
// 							value={user?.email}
// 							placeholder="type your email here"
// 						/>
// 						<Form.Label className="mt-2">username</Form.Label>
// 						<Form.Control
// 							type="text"
// 							name="username"
// 							defaultValue={user?.username}
// 							disabled={!enableEdit}
// 							placeholder="type your username here"
// 							onChange={(e) => handleChange(e)}
// 						/>
// 						<Form.Label className="mt-2">add or edit password</Form.Label>
// 						<Form.Control
// 							type="password"
// 							name="password"
// 							defaultValue=""
// 							disabled={!enableEdit}
// 							placeholder="type your password here"
// 							onChange={(e) => handleChange(e)}
// 						/>
// 						<Button
// 							disabled={!enableEdit}
// 							variant=""
// 							className="mt-3"
// 							style={{ color: "white", backgroundColor: "#9967CE" }}
// 							onClick={onSubmit}
// 						>
// 							update
// 						</Button>
// 					</Col>
// 				</Row>
// 			</Form.Group>
// 		</Container>
// 	);
// }

// export default ProfilePage;
