import axios from "axios";
import { API_URL } from "../../utils/configs";

export default async function handler(req, res) {
	const url = `${API_URL}/products/`;
	if (req.method === "GET") {
		const { data } = await axios.get(url);
		return res.status(200).json(data);
	} else if (req.method === "POST") {
		const { data } = await axios.post(url, req.body);
		return res.status(201).json(data);
	} else if (req.method === "DELETE") {
		const { data } = await axios.delete(`${url}${req.query.id}`);
		return res.status(200).json(data);
	} else if (req.method === "PUT") {
		const { data } = await axios.put(`${url}${req.query.id}`, req.body);
		return res.status(200).json(data);
	}
}
