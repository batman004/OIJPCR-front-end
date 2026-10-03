import axios from 'axios'
import config from "../../config/config";

function apiErrorMessage(err, fallback = 'Something went wrong') {
    if (!err) return fallback
    if (typeof err === 'string') return err
    return err.response?.data?.message || err.message || fallback
}

const isImageType = (type) => typeof type === 'string' && type.toLowerCase().startsWith('image/')
const isPdfType = (type) => typeof type === 'string' && type.toLowerCase() === 'application/pdf'

function imageTypeError(file, label) {
    if (!file) return `${label} is missing.`
    if (isImageType(file.type)) return null
    const type = file.type || 'unknown type'
    return `${label}: "${file.name}" is not an image (${type}). Use JPEG, PNG, GIF, or WebP.`
}

function pdfTypeError(file, label) {
    if (!file) return `${label} is missing.`
    if (isPdfType(file.type)) return null
    const type = file.type || 'unknown type'
    return `${label}: "${file.name}" is not a PDF (${type}).`
}

function inlineImageErrors(editor) {
    if (!editor?.dom || !editor.editorUpload?.blobCache) return []
    const errors = []
    editor.dom.select('img').forEach((img) => {
        const src = img.getAttribute('src') || ''
        if (src.startsWith('blob:')) {
            const info = editor.editorUpload.blobCache.getByUri(src)
            const type = info?.blob()?.type || ''
            const name = info?.filename() || 'inline image'
            if (!isImageType(type)) {
                errors.push(`Article image: "${name}" is not an image (${type || 'unknown type'}). Use JPEG, PNG, GIF, or WebP.`)
            }
        } else if (src.startsWith('data:')) {
            const type = src.slice(5).split(/[;,]/)[0]
            if (!isImageType(type)) {
                errors.push(`Article image is not an image (${type || 'unknown type'}). Use JPEG, PNG, GIF, or WebP.`)
            }
        }
    })
    return errors
}

// Every file the new-article form will upload, checked together before any request is sent.
function validateNewArticleUploads({cover, authorPhoto, pdf, editor}) {
    return [
        imageTypeError(cover, 'Cover image'),
        imageTypeError(authorPhoto, 'Author photo'),
        pdfTypeError(pdf, 'PDF'),
        ...inlineImageErrors(editor),
    ].filter(Boolean)
}

class AuthUtils {
    static setAuthHeader(token, {json = true} = {}) {
        const headers = {
            'Authorization': `Bearer ${token}`,
        }
        // Let the browser set multipart boundaries. Forcing JSON here
        // makes file uploads arrive as an empty body.
        if (json) headers['Content-Type'] = 'application/json'
        return {
            withCredentials: true,
            headers,
        }
    }
}

class AuthHandler {
    static async currentUser(authToken = '') {
        const headerConfig = AuthUtils.setAuthHeader(authToken)
        const {data} = await axios.get(`${config.host}/admin/me`, {...headerConfig})
        return data?.username || ''
    }
}

class MetricsHandler {
    static async dashboard(days = 30, authToken = '') {
        const headerConfig = AuthUtils.setAuthHeader(authToken)
        const {data} = await axios.get(`${config.host}/admin/metrics`, {
            ...headerConfig, params: {days},
        })
        return data
    }
}

class FileUploadHandler {
    static url = `${config.host}/admin/editor/upload`;
    static deleteFileRoutePrefix = `${config.host}/admin/editor/file`;

    static async uploadFile(file, authToken = '', fieldName = 'image') {
        const url = `${FileUploadHandler.url}/${fieldName}`

        return await FileUploadHandler.uploadMultipart(file, url, authToken)
    }

    static async deleteOldFile(filePath, authToken) {
        const fileName = filePath.split('/').pop()
        const url = `${FileUploadHandler.deleteFileRoutePrefix}/${fileName}`
        const headerConfig = AuthUtils.setAuthHeader(authToken)

        await axios.delete(url, {...headerConfig})
    }

    static async uploadMultipart(file, url = '', authToken = '') {
        const formData = new FormData()
        const fieldName = url.split('/').pop() || 'image'

        formData.append(fieldName, file)

        const headerConfig = AuthUtils.setAuthHeader(authToken, {json: false})
        const {data} = await axios.post(url, formData, {...headerConfig})

        return data?.file?.url
    }
}


const BROWSER_LOCAL_IMAGE = /<img\b[^>]*\ssrc="blob:/i

// Waits for inline image uploads to finish; a blob: URL only exists in the author's browser.
async function readEditorContent(editor) {
    if (!editor?.getContent) throw new Error('The editor has not finished loading yet')
    await editor.uploadImages()
    const content = editor.getContent()
    if (BROWSER_LOCAL_IMAGE.test(content)) {
        throw new Error('Some inline images were not uploaded. Remove them and insert them again.')
    }
    return content
}

function previewFromDraft(draft) {
    const editor = draft.editorRef
    return {
        article: {
            title: draft.title,
            author: draft.author,
            tags: draft.tags,
            cover: draft.cover,
            authorPhoto: draft.authorPhoto,
            pdf: draft.pdfFilePath,
            createdAt: draft.createdAt,
            content: editor?.getContent ? editor.getContent() : draft.content,
        },
        coverFile: draft.articleCoverImage,
        authorPhotoFile: draft.authorImage,
        pdfFile: draft.pdfFile,
    }
}


class ArticleHandler {
    static baseRoute = `${config.host}/admin/editor`

    static async createNewArticle(articleData, authToken = '') {

        const headerConfig = AuthUtils.setAuthHeader(authToken)

        await axios.post(ArticleHandler.baseRoute, {...articleData}, {...headerConfig})
    }

    static async editArticle(articleState, authToken) {
        // remove all these fields otherwise data won't be validated
        const {
            editorRef,
            initialValue,
            redirect,
            articleCoverImage,
            authorImage,
            pdfFile,
            ...data
        } = articleState

        const headerConfig = AuthUtils.setAuthHeader(authToken)

        await axios.patch(ArticleHandler.baseRoute, {...data}, {...headerConfig})
    }

    static async deleteArticle(id = '', {
        coverPath = '',
        authorProfileImagePath = '',
        pdfFilePath = ''
    }, authToken) {
        const articleCover = coverPath.split('/').pop()
        const authorPhoto = authorProfileImagePath.split('/').pop()
        const pdf = pdfFilePath.split('/').pop()

        const data = {
            id: id, articleCover, authorPhoto, pdf
        }

        const headerConfig = AuthUtils.setAuthHeader(authToken)
        console.log(pdf, authorPhoto, articleCover)
        await axios.delete(ArticleHandler.baseRoute, {
            ...headerConfig, data: {...data},
        })
    }
}


class VolumeHandler {
    static baseRoute = `${config.host}/admin/volume`;

    static async createNewVolume(volumeData = {}, authToken = '') {
        const headerConfig = AuthUtils.setAuthHeader(authToken)
        await axios.post(VolumeHandler.baseRoute, {...volumeData}, {...headerConfig})
    }

    static async editVolume(editData = {}, authToken = '') {
        const {volume, about, date, id, cover, issue, year} = editData
        const headerConfig = AuthUtils.setAuthHeader(authToken)

        await axios.patch(VolumeHandler.baseRoute, {
            volume, about, cover, date, id, issue, year,
        }, {...headerConfig})
    }

    static async deleteVolume(volumeCoverPath = '', volumeNumber = '1', authToken = '') {
        const imageName = encodeURI(volumeCoverPath.split('/').pop())

        const data = {
            volume: volumeNumber, imageName: imageName,
        }

        const headerConfig = AuthUtils.setAuthHeader(authToken)

        await axios.delete(VolumeHandler.baseRoute, {
            ...headerConfig, data: {...data},
        })
    }
}

export {
    AuthUtils,
    AuthHandler,
    MetricsHandler,
    FileUploadHandler,
    ArticleHandler,
    VolumeHandler,
    readEditorContent,
    previewFromDraft,
    apiErrorMessage,
    validateNewArticleUploads,
}
