import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AdminLayout({ children }) {
	const { pathname } = useRouter();

	return (
		<>
			<Head>
				<title>FurnitureStore | Admin</title>
			</Head>
			<div className="row">
				{/* SIDEBAR */}
				<div className="col-md-2">
					<div className="bg-light vh-100 p-5 d-flex flex-column gap-4">
						<Link href="/products">
							<a className={`py-3 px-3 btn mb-0 ${pathname === '/products' ? 'btn-secondary' : 'btn-outline-secondary '}`}>Products</a>
						</Link>
						<Link href="/categories">
							<a className={`py-3 px-3 btn mb-0 ${pathname === '/categories' ? 'btn-secondary' : 'btn-outline-secondary '}`}>Categories</a>
						</Link>
						{/* <Link href="/master">
							<a className={`py-3 px-3 btn mb-0 ${pathname === "/master" ? "btn-secondary" : "btn-outline-secondary "}`}>Master</a>
						</Link> */}
					</div>
				</div>

				{/* MAIN CONTENT */}
				<div className="col-md-10">{children}</div>
			</div>
		</>
	);
}
