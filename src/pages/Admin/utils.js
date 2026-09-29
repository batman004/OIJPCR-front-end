import axios from 'axios'
import config from "../../config/config";

class AuthUtils {
    static setAuthHeader(token) {
        return {
            withCredentials: true, headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
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

        const headerConfig = AuthUtils.setAuthHeader(authToken)
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
        const {volume, about, date, id, cover} = editData
        const headerConfig = AuthUtils.setAuthHeader(authToken)

        await axios.patch(VolumeHandler.baseRoute, {
            volume, about, cover, date, id,
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
    FileUploadHandler,
    ArticleHandler,
    VolumeHandler,
    readEditorContent,
    previewFromDraft,
}
