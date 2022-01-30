import axios from "axios";
import { API_URL } from "./configs";

export const uploadFile = async ({ filetype, files }) => {
	const form = new FormData();
	if (files.files.length > 1) form.append("multiple", true);
	else form.append("multiple", false);
	for (let i = 0; i < files.files.length; i++) {
		form.append(filetype, files.files[i]);
	}

	const url = `${API_URL}/files`;
	const config = {
		headers: { "Content-Type": "multipart/form-data" },
		onUploadProgress: (progressEvent) => {
			console.log(progressEvent.loaded);
		},
	};

	const data = await axios.post(url, form, config);
	return data;
};
