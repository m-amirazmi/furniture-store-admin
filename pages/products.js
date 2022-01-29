import axios from "axios";
import { useState } from "react";

export default function ProductsPage() {
	const [input, setInput] = useState({});

	const handleAddProduct = async () => {
		const formData = new FormData();
		formData.append("file", input.image);
		console.log(input);
		const { data } = await axios.post("/api/products", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	};

	const renderUpdateModal = () => {
		return (
			<div className="modal fade" id="addProduct" tabIndex="-1" aria-labelledby="addProductLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="addProductLabel">
								Update Category
							</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<div className="mb-3">
								<label htmlFor="name" className="form-label">
									Product Image
								</label>
								<input
									type="file"
									className="form-control"
									id="image"
									placeholder="eg: Chair"
									onChange={({ target }) => {
										setInput({ ...input, [target.id]: target.files[0] });
									}}
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="name" className="form-label">
									Name
								</label>
								<input
									type="text"
									className="form-control"
									id="name"
									placeholder="eg: Chair"
									value={input.name}
									onChange={({ target }) => setInput({ ...input, [target.id]: target.value })}
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="vendor" className="form-label">
									Vendor
								</label>
								<input
									type="text"
									className="form-control"
									id="vendor"
									placeholder="eg: Chair Sdn Bhd"
									value={input.vendor}
									onChange={({ target }) => setInput({ ...input, [target.id]: target.value })}
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="quantity" className="form-label">
									Quantity
								</label>
								<input
									type="number"
									className="form-control"
									id="quantity"
									placeholder="eg: 10"
									value={input.quantity}
									onChange={({ target }) => setInput({ ...input, [target.id]: target.value })}
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="price" className="form-label">
									Price
								</label>
								<input
									type="number"
									className="form-control"
									id="price"
									placeholder="eg: 12.90"
									value={input.price}
									onChange={({ target }) => setInput({ ...input, [target.id]: target.value })}
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="name" className="form-label">
									SKU
								</label>
								<input
									type="text"
									className="form-control"
									id="sku"
									placeholder="eg: 12345869"
									value={input.sku}
									onChange={({ target }) => setInput({ ...input, [target.id]: target.value })}
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="name" className="form-label">
									Colors
								</label>
								<input
									type="name"
									className="form-control"
									id="colors"
									placeholder="eg: Chair"
									value={input.colors}
									onChange={({ target }) => setInput({ ...input, [target.id]: target.value })}
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="discount" className="form-label">
									Discount
								</label>
								<input
									type="number"
									className="form-control"
									id="discount"
									placeholder="eg: Chair"
									value={input.discount}
									onChange={({ target }) => setInput({ ...input, [target.id]: target.value })}
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="name" className="form-label">
									Description
								</label>
								<input
									type="name"
									className="form-control"
									id="description"
									placeholder="eg: Chair"
									value={input.description}
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
							<button type="button" className="btn btn-primary" onClick={handleAddProduct} data-bs-dismiss="modal">
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
				<button className="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#addProduct">
					Add New Product
				</button>
				<table className="table table-bordered text-center">
					<thead>
						<tr>
							<th style={{ width: "15%" }}>Product Detail</th>
							<th style={{ width: "5%" }}>Quantity</th>
							<th style={{ width: "10%" }}>Price (RM)</th>
							<th style={{ width: "10%" }}>SKU</th>
							<th style={{ width: "10%" }}>Colors</th>
							<th style={{ width: "10%" }}>Category</th>
							<th style={{ width: "10%" }}>Discount</th>
							<th style={{ width: "10%" }}>Description</th>
							<th style={{ width: "5%" }}>Featured</th>
							<th style={{ width: "15%" }}></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Image, Name, Slug, Vendor</td>
							<td>10</td>
							<td>12.90</td>
							<td>1238974120</td>
							<td>
								<ul>
									<li>Red</li>
									<li>Green</li>
									<li>Blue</li>
								</ul>
							</td>
							<td>Sofa</td>
							<td>0%</td>
							<td>lorem</td>
							<td>No</td>
							<td>
								<button className="btn btn-outline-primary mx-1">Edit</button>
								<button className="btn btn-outline-danger mx-1">Remove</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			{renderUpdateModal()}
		</>
	);
}
