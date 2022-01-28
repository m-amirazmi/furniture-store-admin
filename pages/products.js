export default function ProductsPage() {
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
		</>
	);
}
