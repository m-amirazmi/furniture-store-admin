import axios from 'axios';
import { useState } from 'react';
import { uploadFile } from '../utils/helpers';

export default function UploadFile() {
	const [input, setInput] = useState();
	const [image, setImage] = useState();

	const handleUploadFile = async () => {
		const copyInput = { ...input };
		if (input.image) {
			const { data } = await uploadFile({ filetype: 'image', files: input.image });
			copyInput.image = data[0]._id;
			setImage(data);
		}
	};

	return (
		<div className="row">
			<div className="col-md-6">
				<input className="form-control mb-3" type="file" id="image" onChange={({ target }) => setInput({ ...input, [target.id]: target })} />
				<button type="button" className="btn btn-primary" onClick={handleUploadFile}>
					Save
				</button>
				<div className="mt-3">{image[0].url}</div>
			</div>
		</div>
	);
}
