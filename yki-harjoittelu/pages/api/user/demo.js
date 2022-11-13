import { User } from "../../../models";
import { dbConnect } from "../../../utils";


export default async function handler(req, res) {
	const { method } = req;
	await dbConnect();

	switch (method) {
		case 'GET':
			try {
				const user = await User.findByIdAndUpdate({ _id: "63700f03e16bc631b4c05138" }).then((doc) => {
					const studyWord = doc.studyWords.filter((el) => el.word === "63700f03e16bc631b4c05138");
					if (studyWord[0]) {
						console.log("I am here 15", studyWord[0]);
					}
					 else {
						doc.studyWords = [
							{
								word: {
									"_id": "634c7d9cdebf8df6130d51c0",
									"key": "tothinkabout.miettiä",
									"locale_values": [
										{
											"name": "To think about",
											"valueType": "nouns",
											"case": "nominatiivi",
											"wordLevel": "beginners",
											"content": "word",
											"language": {
												"deletedAt": null,
												"_id": "633dc93de6f9c14898709e14",
												"name": "english",
												"locale": "en_EN",
												"__v": 0
											},
											"_id": "634c7d9cdebf8df6130d51c1"
										},
										{
											"name": "Miettiä",
											"valueType": "nouns",
											"case": "nominatiivi",
											"wordLevel": "beginners",
											"content": "word",
											"language": {
												"deletedAt": null,
												"_id": "633dc947e6f9c14898709e16",
												"name": "finnish",
												"locale": "fi_FI",
												"__v": 0
											},
											"_id": "634c7d9cdebf8df6130d51c2"
										}
									],
									"deletedAt": null,
									"createdAt": "2022-10-16T21:54:36.561Z",
									"updatedAt": "2022-10-28T18:32:14.423Z",
									"__v": 0
								},
								initialCount: 10,
								progressCount: 0,
								memorized: true
							},
							{
								word: {
									"_id": "634c7dafdebf8df6130d51c6",
									"key": "duringthetest.valmisteluaikana",
									"locale_values": [
										{
											"name": "During the test",
											"valueType": "nouns",
											"case": "nominatiivi",
											"wordLevel": "beginners",
											"content": "word",
											"language": {
												"deletedAt": null,
												"_id": "633dc93de6f9c14898709e14",
												"name": "english",
												"locale": "en_EN",
												"__v": 0
											},
											"_id": "634c7dafdebf8df6130d51c7"
										},
										{
											"name": "Valmisteluaikana",
											"valueType": "nouns",
											"case": "nominatiivi",
											"wordLevel": "beginners",
											"content": "word",
											"language": {
												"deletedAt": null,
												"_id": "633dc947e6f9c14898709e16",
												"name": "finnish",
												"locale": "fi_FI",
												"__v": 0
											},
											"_id": "634c7dafdebf8df6130d51c8"
										}
									],
									"deletedAt": null,
									"createdAt": "2022-10-16T21:54:55.351Z",
									"updatedAt": "2022-10-16T21:54:55.351Z",
									"__v": 0
								}, initialCount: 10,
								progressCount: 0,
								memorized: true
							},
						];
						doc.save();
					}
				})
				return res.send(user);
			} catch ({ message }) {
				res.status(500).send({ message });
			}
			break
		default:
			res.status(400).json({ message: false })
			break
	}
}

// 634c7d9cdebf8df6130d51c0