import axios from "axios";
import { useState, useEffect, useCallback } from "react";

export const useProducts = () => {
	const [products, setProducts] = useState();

	const fetchProducts = useCallback(async () => {
		const { data } = await axios.get("/api/products");
		if (data.length !== 0) setProducts(data);
	}, []);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	return { products, fetchProducts };
};
