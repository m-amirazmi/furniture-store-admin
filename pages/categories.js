import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function CategoriesPage() {
	const [categories, setCategories] = useState();
	const [input, setInput] = useState({});
	const [selected, setSelected] = useState({});

	const fetchCategories = useCallback(async () => {
		const { data } = await axios.get("/api/categories");
		if (data.length !== 0) setCategories(data);
	}, []);

	useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	const handleAddCategory = async (e) => {
		if (selected._id) await axios.put("/api/categories", input, { params: { id: selected._id } });
		else await axios.post("/api/categories", input);
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
							<td>{c.name}</td>
							<td>{c.slug}</td>
							<td>{createdAt}</td>
							<td>{updatedAt}</td>
							<td>{c.isFeatured ? "Yes" : "No"}</td>
							<td className="d-flex gap-2 align-items-center justify-content-center">
								<button
									className="btn btn-outline-primary"
									data-bs-toggle="modal"
									data-bs-target="#addCategory"
									onClick={() => {
										setInput({ name: c.name });
										setSelected(c);
									}}
								>
									Edit
								</button>
								<button className="btn btn-outline-danger" onClick={() => handleRemoveCategory(c._id)}>
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
				<div className="modal-dialog">
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
				<table className="table table-bordered text-center">
					<thead>
						<tr>
							<th style={{ width: "5%" }}>#</th>
							<th style={{ width: "20%" }}>Category Name</th>
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
