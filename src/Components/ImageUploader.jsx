import { useState } from 'react'

const CLOUD_URL = `https://api.cloudinary.com/v1_1/dmvbiwqqd/image/upload`

const ImageUpload = () => {

    const [avURL, setAvURL] = useState('#')

    const handleSubmit = async (e) => {
        e.preventDefault()

    }

    return (
        <>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <input id="file-input" type="file" />
                <button>Upload Image!</button>
            </form>
            <img src={avUrl} alt="avatar" />
        </>
    )
}

export default ImageUpload