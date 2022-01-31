import axios from 'axios'

const setAuthHeader = token => (
    {
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    }
)


const deleteOldImage = async ({
    imagePath,
    routePrefix,
    authToken
}) => {
    const imageName = imagePath.split('/').pop()
    const url = `${routePrefix}${imageName}`

    const config = setAuthHeader(authToken)
    await axios.delete(url, { ...config })
}


const uploadMultipart = async (file, {
    url,
    authToken
}) => {
    const formData = new FormData()
    formData.append('image', file)

    const config = setAuthHeader(authToken)
    const { data } = await axios.post(url, formData, { ...config })
    return data?.file?.url
}


export { deleteOldImage, uploadMultipart }