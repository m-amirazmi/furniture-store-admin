import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import AdminLayout from "../components/layouts/admin";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		import("bootstrap/dist/js/bootstrap");
	}, []);

	return (
		<AdminLayout>
			<Component {...pageProps} />
		</AdminLayout>
	);
}

export default MyApp;
