import axios from "axios";
import { useState, useEffect, useCallback } from "react";

export const useCategories = () => {
	const [categories, setCategories] = useState();

	const fetchCategories = useCallback(async () => {
		const { data } = await axios.get("/api/categories");
		if (data.length !== 0) setCategories(data);
	}, []);

	useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	return { categories, fetchCategories };
};
