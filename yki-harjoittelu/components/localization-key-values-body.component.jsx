import { useTheme } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { XDiamondFill, BookHalf } from "react-bootstrap-icons";
import React, { useState, useEffect, useCallback } from "react";
import { BookmarkCheckFill, PencilFill } from "react-bootstrap-icons";
import { Table, Form, Row, Container, InputGroup, Col, Card } from "react-bootstrap";

import { paginate } from "../utils";
import Pagination from './common/pagination.component';
import { openModal, userUpdate } from "../redux/slices";
import { successToast, errorToast } from "./common/toast.component";
import LocalizationEditModal from './modals/localization-edit.modal';
import LocalizationDeleteModal from './modals/localization-delete-modal';
import { LocalizationEditorButtonsHolder, LocalizationTitleCount, PrimaryButton, PrimaryRowButton } from "../styles";

function LocalizationKeyValueBody() {
	const { width } = useTheme();
	const dispatch = useDispatch();
	const [pageSize] = useState(25);
	const [sliderView] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchInputValue, setSearchInputValue] = useState("");

	const { user } = useSelector(({ user }) => user);
	const { translations, languages } = useSelector(
		({ localization }) => localization
	);

	const isPrevilegedUser = user?.type === "admin" || user?.type === "teacher";

	const handlePageChange = useCallback((page) => {
		setCurrentPage(page);
	}, [currentPage]);

	const onPreviousPage = useCallback(() => {
		setCurrentPage(currentPage - 1);
	}, [currentPage]);

	const onNextPage = useCallback(() => {
		setCurrentPage(currentPage + 1);
	}, [currentPage]);

	const isTransltionDefined = Array.isArray(translations);
	let filteredTranslations;
	if (isTransltionDefined) {
		filteredTranslations = translations.filter((filtering) => {
			if (filtering?.key?.toLowerCase().includes(searchInputValue.toLowerCase()))
				return true;
			for (let i = 0; i < filtering.locale_values.length; i++)
				if (filtering.locale_values[i].name?.toLowerCase().includes(searchInputValue?.toLowerCase()))
					return true;
			return false;
		});
	}

	const paginatedTranslations = useCallback(paginate(
		filteredTranslations,
		currentPage,
		pageSize
	), [filteredTranslations,
		currentPage,
		pageSize]);

	const onSubmitStudy = async (data) => {
		try {
			const respond = await dispatch(userUpdate({ data, token: localStorage.token, studyWords: true }));
			if (respond?.error?.message !== "Rejected")
				successToast("user information updated");
		} catch (error) {
			errorToast(error.message);
		}
	};
	return (
		<div>
			<LocalizationTitleCount>
				{filteredTranslations.length}{" "}
				{filteredTranslations.length > 1 ? "translations" : "translation"}{" "}
				found
			</LocalizationTitleCount>
			<InputGroup className="mb-3">
				<Form.Control
					aria-describedby="basic-addon2"
					aria-label="search translations"
					placeholder="search translations"
					onChange={(e) => {
						setSearchInputValue(e.target.value);
						setCurrentPage(1);
					}}
				/>
				<PrimaryButton variant="" id="basic-addon2">
					search
				</PrimaryButton>
			</InputGroup>
			<Container className="text-center">
				<Pagination
					pageSize={pageSize}
					onNextPage={onNextPage}
					currentPage={currentPage}
					onPageChange={handlePageChange}
					onPreviousPage={onPreviousPage}
					itemsCount={filteredTranslations.length}
				/>
			</Container>
			{translations.length > 0 ? (
				<>
					{width <= 992 ? (
						<div>
							<Row style={{ borderBottom: "0.1rem solid black" }} className="mb-2 p-0">
								{languages.length &&
									languages.map(({ _id, name, locale }) => (
										<Col xs={6} sm={6} md={6} key={_id} className="d-flex align-items-center justify-content-center">
											{locale} ({name})
										</Col>
									))}
							</Row>
							{paginatedTranslations.length > 0 && paginatedTranslations.map((translation) => (
								<Card className="mt-3 mb-3" key={translation._id}>
									<Card.Header>
										<Row>
											{languages?.length &&
												languages.map((locales) => (
													<Col key={locales._id} xs={6} sm={6} md={6}
														className="d-flex align-items-center justify-content-center flex-wrap"
													>
														{translation.locale_values.length &&
															translation.locale_values.map(
																({ language, name }) => (
																	<>
																		{locales.locale === language.locale &&
																			name}
																	</>
																)
															)}
													</Col>
												))}
										</Row>
									</Card.Header>
									<div className="d-flex align-items-center justify-content-center flex-wrap mb-2 mt-2">
										<PrimaryRowButton
											variant=""
											className="ms-1 me-1"
											disabled={!user}
											onClick={() => {
												onSubmitStudy({
													initialCount: 10,
													memorized: true,
													progressCount: 0,
													word: translation
												})
											}}
											outline={user && user?.studyWords?.some(el => el?.word?._id === translation?._id)}
										>
											<BookHalf width={20} height={20} />
										</PrimaryRowButton>
										<PrimaryRowButton
											variant=""
											className="ms-1 me-1"
											disabled={!user}
											outline={user && user?.studyWords?.some((el) => el.initialCount >= el.progressCount && el.initialCount === el.progressCount)}
										>
											<BookmarkCheckFill width={20} height={20} />
										</PrimaryRowButton>
										{isPrevilegedUser && (
											<PrimaryRowButton
												variant=""
												className="ms-1 me-1"
												onClick={() =>
													dispatch(
														openModal({
															content: (
																<LocalizationEditModal
																	translation={translation}
																/>
															),
														})
													)
												}
											>
												<PencilFill />
											</PrimaryRowButton>
										)}
										{user?.type === "admin" && (
											<PrimaryRowButton
												variant=""
												className="ms-1 me-1"
												onClick={() =>
													dispatch(
														openModal({
															content: (
																<LocalizationDeleteModal
																	translation={translation}
																/>
															),
														})
													)
												}
											>
												<XDiamondFill width={20} height={20} />
											</PrimaryRowButton>
										)}
									</div>
								</Card>
							))}
						</div>
					) : (
						<Table size="lg" responsive={width < 992} hover>
							<thead>
								<tr
									style={width < 992 ? { width: "100vw" } : {}}
									className={
										width < 992 ? "d-flex flex-column text-center" : ""
									}
								>
									{(width >= 992 && user?.type === "admin") && <th>keys</th>}
									{languages.length &&
										languages.map(({ _id, name, locale }) => (
											<th key={_id}>
												{locale} ({name})
											</th>
										))}
									{width >= 992 && <th className="ms-auto"></th>}
								</tr>
							</thead>
							<tbody>
								{paginatedTranslations.length > 0 &&
									paginatedTranslations.map((translation) => (
										<tr key={translation._id}>
											{user?.type === "admin" && <td>{translation.key}</td>}
											{!sliderView &&
												languages?.length &&
												languages.map((locales) => (
													<td key={locales._id}>
														<>
															{translation.locale_values.length &&
																translation.locale_values.map(
																	({ language, name }, index) => (
																		<span key={index}>
																			{locales.locale === language.locale &&
																				name}
																		</span>
																	)
																)}
														</>
													</td>
												))}
											<LocalizationEditorButtonsHolder>
												{isPrevilegedUser && (
													<PrimaryButton
														variant=""
														onClick={() =>
															dispatch(
																openModal({
																	content: (
																		<LocalizationEditModal
																			translation={translation}
																		/>
																	),
																})
															)
														}
													>
														Edit
													</PrimaryButton>
												)}
												<PrimaryRowButton
													variant=""
													className="ms-3"
													disabled={!user}
													onClick={() => {
														onSubmitStudy({
															initialCount: 10,
															memorized: true,
															progressCount: 0,
															word: translation
														})
													}}
													outline={user && user?.studyWords?.some(el => el?.word?._id === translation?._id)}
												>
													<BookHalf width={20} height={20} />
												</PrimaryRowButton>
												<PrimaryRowButton
													variant=""
													className="ms-3"
													disabled={!user}
													outline={user && user?.studyWords?.some((el) => el.initialCount >= el.progressCount && el.initialCount === el.progressCount)}
												>
													<BookmarkCheckFill width={20} height={20} />
												</PrimaryRowButton>
												{user?.type === "admin" && (
													<PrimaryRowButton
														variant=""
														className="ms-3"
														onClick={() =>
															dispatch(
																openModal({
																	content: (
																		<LocalizationDeleteModal
																			translation={translation}
																		/>
																	),
																})
															)
														}
													>
														<XDiamondFill width={20} height={20} />
													</PrimaryRowButton>
												)}
											</LocalizationEditorButtonsHolder>
										</tr>
									))}
							</tbody>
						</Table>
					)}
				</>
			) : (
				<LoaderHolder>
					<Loader />
				</LoaderHolder>
			)}
			<Container className="text-center">
				<Pagination
					pageSize={pageSize}
					onNextPage={onNextPage}
					currentPage={currentPage}
					onPageChange={handlePageChange}
					onPreviousPage={onPreviousPage}
					itemsCount={filteredTranslations.length}
				/>
			</Container>
		</div>
	)
}

export default LocalizationKeyValueBody;