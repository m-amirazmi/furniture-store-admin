import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useCategories } from "../hooks/categories";
import { uploadFile } from "../utils/helpers";

export default function CategoriesPage() {
	const [input, setInput] = useState({});
	const [selected, setSelected] = useState({});

	const { categories, fetchCategories } = useCategories();

	const handleAddCategory = async (e) => {
		const copyInput = { ...input };

		if (input.image) {
			const { data } = await uploadFile({ filetype: "image", files: input.image });
			copyInput.image = data[0]._id;
		}

		if (selected._id) {
			copyInput.image = selected.image._id;
			await axios.put("/api/categories", copyInput, { params: { id: selected._id } });
		} else await axios.post("/api/categories", copyInput);
		setSelected({});
		setInput({ name: "", isFeatured: false });
		fetchCategories();
	};

	const handleRemoveCategory = async (id) => {
		await axios.delete("/api/categories", { params: { id } });
		fetchCategories();
	};

	const renderCategoryRow = () => {
		if (categories) {
			return categories
				.sort((a, b) => {
					if (new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()) return -1;
					if (new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime()) return 1;
					return;
				})
				.map((c, key) => {
					const createdAt = new Date(c.createdAt).toLocaleDateString();
					const updatedAt = new Date(c.updatedAt).toLocaleDateString();
					return (
						<tr key={c._id}>
							<th>{key + 1}</th>
							<td className="d-flex gap-2 align-items-center">
								<div style={{ width: "75px", height: "112.5px", position: "relative" }}>
									<Image src={c.image.url} layout="fill" objectFit="contain" alt={c.name} />
								</div>
								<div className="text-start">
									<p className="m-0">
										Name: <span className="fw-bold">{c.name}</span>
									</p>
								</div>
							</td>
							<td>{c.slug}</td>
							<td>{createdAt}</td>
							<td>{updatedAt}</td>
							<td>{c.isFeatured ? "Yes" : "No"}</td>
							<td className="">
								<button
									className="btn btn-outline-primary me-2"
									data-bs-toggle="modal"
									data-bs-target="#addCategory"
									onClick={() => {
										setInput({ name: c.name, isFeatured: c.isFeatured });
										setSelected(c);
									}}
								>
									Edit
								</button>
								<button className="btn btn-outline-danger me-2" onClick={() => handleRemoveCategory(c._id)}>
									Remove
								</button>
							</td>
						</tr>
					);
				});
		}
	};

	const renderUpdateModal = () => {
		return (
			<div className="modal fade" id="addCategory" tabIndex="-1" aria-labelledby="addCategoryLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="addCategoryLabel">
								Update Category
							</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<div className="mb-3">
								<label htmlFor="name" className="form-label">
									Name
								</label>
								<input
									type="name"
									className="form-control"
									id="name"
									placeholder="eg: Chair"
									value={input.name}
									onChange={({ target }) => setInput({ ...input, [target.id]: target.value })}
								/>
							</div>
							<div className="mb-3">
								<input
									className="form-check-input me-1"
									type="checkbox"
									checked={input.isFeatured}
									id="isFeatured"
									onChange={({ target }) => setInput({ ...input, [target.id]: target.checked })}
								/>
								Featured?
							</div>
							<div className="mb-3">
								<input className="form-control" type="file" id="image" onChange={({ target }) => setInput({ ...input, [target.id]: target })} />
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
								onClick={() => {
									setInput({ name: "" });
									setSelected({});
								}}
							>
								Close
							</button>
							<button type="button" className="btn btn-primary" onClick={handleAddCategory} data-bs-dismiss="modal">
								Save changes
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<>
			<div className="container py-5">
				<button className="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#addCategory">
					Add New Category
				</button>
				<table className="table table-bordered text-center text-center align-middle">
					<thead>
						<tr>
							<th style={{ width: "5%" }}>#</th>
							<th style={{ width: "20%" }}>Category Detail</th>
							<th style={{ width: "20%" }}>Slug</th>
							<th style={{ width: "15%" }}>Created At</th>
							<th style={{ width: "15%" }}>Updated At</th>
							<th style={{ width: "10%" }}>Featured</th>
							<th style={{ width: "20%" }}></th>
						</tr>
					</thead>
					<tbody>{renderCategoryRow()}</tbody>
				</table>
			</div>
			{renderUpdateModal()}
		</>
	);
}
