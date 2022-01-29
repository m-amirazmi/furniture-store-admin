import axios from "axios";
import { API_URL } from "./configs";

export const uploadFile = async ({ filename, filetype, uploadedby, files }) => {
	const form = new FormData();
	form.append("fileType", filetype);
	form.append("fileName", filename);
	form.append("uploadedBy", uploadedby);
	for (let i = 0; i < files.files.length; i++) {
		form.append(filetype, files.files[i]);
	}
	const url = `${API_URL}/products`;
	const { data } = await axios.post(url, form, {
		headers: { "Content-Type": "multipart/form-data" },
	});
	return data;
};
