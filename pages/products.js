import axios from "axios";
import { useState } from "react";
import Image from "next/image";
import { useCategories } from "../hooks/categories";
import { useProducts } from "../hooks/products";
import { uploadFile } from "../utils/helpers";

export default function ProductsPage() {
	const [input, setInput] = useState({});
	const [loading, setLoading] = useState(false);

	const { categories } = useCategories();
	const { products, fetchProducts } = useProducts();

	const handleAddProduct = async () => {
		setLoading(true);
		const { data } = await uploadFile({ filetype: "image", files: input.image });
		const copyInput = { ...input };
		copyInput.image = data[0]._id;
		await axios.post("/api/products", copyInput);
		setInput({});
		fetchProducts();
		setLoading(false);
	};

	const handleRemoveProduct = async (id) => {
		await axios.delete("/api/products", { params: { id } });
		fetchProducts();
	};

	const renderUpdateModal = () => {
		return (
			<div className="modal fade" id="addProduct" tabIndex="-1" aria-labelledby="addProductLabel" aria-hidden="true">
				<div className="modal-dialog modal-lg modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="addProductLabel">
								Update Product
							</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<div className="row">
								<div className="col-6">
									<div className="mb-3">
										<label htmlFor="name" className="form-label">
											Product Image
										</label>
										<input
											type="file"
											multiple
											className="form-control"
											id="image"
											placeholder="eg: Chair"
											onChange={({ target }) => {
												setInput({ ...input, [target.id]: target });
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
											accept="image/*"
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

									<div className="row">
										<div className="col-6">
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
										</div>
										<div className="col-6">
											<div className="mb-3">
												<label htmlFor="name" className="form-label">
													Category
												</label>
												<select id="category" className="form-select" onChange={({ target }) => setInput({ ...input, [target.id]: target.value })}>
													<option disabled selected>
														SELECT ONE
													</option>
													{categories?.map((c) => (
														<option key={c._id} value={c._id}>
															{c.name}
														</option>
													))}
												</select>
											</div>
										</div>
									</div>
								</div>
								<div className="col-6">
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
										<label htmlFor="discount" className="form-label">
											Discount
										</label>
										<input
											type="number"
											className="form-control"
											id="discount"
											placeholder="eg: 0.10"
											value={input.discount}
											onChange={({ target }) => setInput({ ...input, [target.id]: target.value })}
										/>
									</div>

									<div className="mb-3">
										<label htmlFor="name" className="form-label">
											Description
										</label>
										<textarea
											type="name"
											className="form-control"
											id="description"
											placeholder="eg: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pellentesque consectetur augue"
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

	const renderProductList = () => {
		if (products?.length === 0) return null;
		return products?.map((p) => (
			<tr key={p._id} style={{ fontSize: "14px" }}>
				<td className="d-flex gap-2 align-items-center">
					<div style={{ width: "75px", height: "112.5px", position: "relative" }}>
						<Image src={p.image.url} layout="fill" objectFit="cover" alt={p.name} />
					</div>
					<div className="text-start">
						<p className="m-0">
							Name: <span className="fw-bold">{p.name}</span>
						</p>
						<p className="m-0">
							SKU: <span className="fw-bold">{p.sku}</span>
						</p>
						<p className="m-0">
							Vendor: <span className="fw-bold">{p.vendor}</span>
						</p>
					</div>
				</td>
				<td>{p.quantity}</td>
				<td>{p.price.toFixed(2)}</td>
				<td>{p.category.name}</td>
				<td>{p.discount}</td>
				<td>{p.description}</td>
				<td>{p.isFeatured ? "Yes" : "No"}</td>
				<td>
					<button className="btn btn-outline-primary mx-1">Edit</button>
					<button className="btn btn-outline-danger mx-1" onClick={() => handleRemoveProduct(p._id)}>
						Remove
					</button>
				</td>
			</tr>
		));
	};

	return (
		<>
			<div className="container py-5">
				<button className="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#addProduct">
					Add New Product
				</button>
				{loading ? (
					<div>Loading...</div>
				) : (
					<table className="table table-bordered text-center align-middle">
						<thead>
							<tr>
								<th style={{ width: "30%" }}>Product Detail</th>
								<th style={{ width: "5%" }}>Quantity</th>
								<th style={{ width: "10%" }}>Price (RM)</th>
								<th style={{ width: "10%" }}>Category</th>
								<th style={{ width: "10%" }}>Discount</th>
								<th style={{ width: "5%" }}>Description</th>
								<th style={{ width: "5%" }}>Featured</th>
								<th style={{ width: "20%" }}></th>
							</tr>
						</thead>
						<tbody>{renderProductList()}</tbody>
					</table>
				)}
			</div>
			{renderUpdateModal()}
		</>
	);
}
