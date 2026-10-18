import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {Editor} from '@tinymce/tinymce-react'
import {
    createEditorInit
} from '../../../components/Admin/Config/TinyMCEConfig'
import EditorForm
    from '../../../components/Admin/EditorForm'
import ArticlePreview from '../../../components/Admin/ArticlePreview'
import UploadScreen from '../../../components/Admin/UploadScreen'
import SourceImages, {imageMarkup} from '../../../components/Admin/SourceImages'
import {PopUp} from '../../../components/utils'
import {UserContext} from '../../../UserContext'
import {ArticleHandler, FileUploadHandler, readEditorContent, previewFromDraft, apiErrorMessage} from '../utils'

class EditArticle extends Component {
    static contextType = UserContext

    constructor(props) {
        super(props)
        this.state = {
            editorRef: {},
            initialValue: this.props.content || '',
            content: '',
            author: this.props.author || '',
            title: this.props.title || '',
            slug: this.props.slug || '',
            volume: this.props.volume || '',
            tags: this.props.tags || '',
            cover: this.props.cover || '',
            authorPhoto: this.props.authorPhoto || '',
            pdfFilePath: this.props.pdf || '',
            articleCoverImage: null,
            authorImage: null,
            pdfFile: null,
            id: '',
            redirect: null,
            postDataFlag: true,
            notification: {
                show: false, msg: '',
            },
            token: '',
            preview: null,
            uploading: false,
            uploadStatus: '',
            generatingPdf: false,
            sourceImages: [],
        }
        this.editorInit = createEditorInit({
            uploadImage: file => FileUploadHandler.uploadFile(file, this.state.token),
        })
    }

    async componentDidMount() {
        try {
            const {id} = this.props.match.params
            const authToken = this.context?.token
            // An admin-only route (unlike GET /journals/:slug/:id, the public
            // article page's endpoint) so a draft article can be opened here
            // without ever being reachable through the public site.
            const data = await ArticleHandler.getArticle(id, authToken)
            const {content: initialValue} = data
            this.setState({
                ...data,
                pdfFilePath: data.pdf,
                id,
                initialValue,
                token: authToken,
            })
        } catch (e) {
            this.setState({
                notification: {
                    show: true,
                    msg: 'Error: Cannot fetch article from server',
                },
            })
        }
    }

    handlePopUp = () => {
        this.setState(prevState => {
            return {
                notification: {
                    show: !prevState.notification.show,
                    msg: '',
                },
            }
        })
    }

    deleteArticle = async () => {
        try {
            const paths = {
                coverPath: this.state.cover,
                authorProfileImagePath: this.state.authorPhoto,
                pdfFilePath: this.state.pdfFilePath
            }

            await ArticleHandler.deleteArticle(this.state.id, paths, this.state.token)

            this.setState({
                redirect: '/admin/list',
                postDataFlag: false,
            })

        } catch (err) {
            this.setState({
                notification: {
                    show: true,
                    msg: 'Error: Article could not be deleted',
                },
            })
        }
    }

    deletePreviousFile = async (filePath) => {
        const authToken = this.state.token
        await FileUploadHandler.deleteOldFile(filePath, authToken)
    }

    onFileChange = (evt) => {
        this.setState({[evt.target.name]: evt.target.files[0]})
    }

    handleChange = (evt) => {
        this.setState(() => ({
            [evt.target.name]: evt.target.value,
        }))
    }

    setUploadStatus = (uploadStatus) => new Promise(resolve => {
        this.setState({uploading: true, uploadStatus}, resolve)
    })

    handleSubmit = async (evt) => {
        evt.preventDefault()
        if (!this.state.postDataFlag || this.state.uploading) return

        await this.setUploadStatus('Uploading images in the article…')
        try {
            const content = await readEditorContent(this.state.editorRef)
            let cover = this.state.cover
            let authorPhoto = this.state.authorPhoto
            let pdfFilePath = this.state.pdfFilePath

            if (this.state.articleCoverImage) {
                await this.setUploadStatus('Uploading the cover image…')
                cover = await this.editArticleCoverImage()
            }
            if (this.state.authorImage) {
                await this.setUploadStatus('Uploading the author photo…')
                authorPhoto = await this.editAuthorProfileImage()
            }
            if (this.state.pdfFile) {
                await this.setUploadStatus('Uploading the PDF…')
                pdfFilePath = await this.editPDF()
            }

            await this.setUploadStatus('Saving the article…')
            await this.editArticle({content, cover, authorPhoto, pdfFilePath})
        } catch (err) {
            this.notify(apiErrorMessage(err, 'Could not save the article'))
        } finally {
            this.setState({uploading: false, uploadStatus: ''})
        }
    }

    notify = (msg) => {
        this.setState({
            notification: {show: true, msg},
        })
    }

    handleEditorChange = () => {
        this.setState({
            content: this.state.editorRef.getContent(),
        })
    }

    editAuthorProfileImage = async () => {
        const authToken = this.state.token
        const imgPath = await FileUploadHandler.uploadFile(this.state.authorImage, authToken)
        // before sending delete request, check if author photo exists on server
        if (this.state.authorPhoto) await this.deletePreviousFile(this.state.authorPhoto)
        this.setState({authorPhoto: imgPath})
        return imgPath
    }

    editArticleCoverImage = async () => {
        const authToken = this.state.token
        const imgPath = await FileUploadHandler.uploadFile(this.state.articleCoverImage, authToken)
        // before sending delete request, check if cover exists on server
        if (this.state.cover) await this.deletePreviousFile(this.state.cover)
        this.setState({cover: imgPath})
        return imgPath
    }

    editPDF = async () => {
        const authToken = this.state.token
        const pdfPath = await FileUploadHandler.uploadFile(this.state.pdfFile, authToken, 'pdf')
        // before sending delete request, check if pdf exists on server
        if (this.state.pdfFilePath) await this.deletePreviousFile(this.state.pdfFilePath)
        this.setState({pdfFilePath: pdfPath})
        return pdfPath
    }

    // Rebuilds the PDF from the article's last-saved content (not whatever is
    // unsaved in the editor right now) and points the article at it.
    generatePdf = async () => {
        if (this.state.generatingPdf) return
        this.setState({generatingPdf: true})
        try {
            const pdf = await ArticleHandler.generatePdf(this.state.id, this.state.token)
            this.setState({pdfFilePath: pdf})
            this.notify('PDF generated')
        } catch (err) {
            this.notify(apiErrorMessage(err, 'Could not generate the PDF'))
        } finally {
            this.setState({generatingPdf: false})
        }
    }

    // Uploads a PNG/JPEG version of a manuscript image the browser cannot show.
    // The list is saved with the article, so the new version stays after reload.
    replaceSourceImage = async (image, file) => {
        try {
            await this.setUploadStatus('Uploading the image…')
            const url = await FileUploadHandler.uploadFile(file, this.state.token)
            this.setState({
                sourceImages: this.state.sourceImages.map((item) =>
                    item.url === image.url ? {...item, url, contentType: file.type} : item),
            })
            this.notify('Image added. Insert it into the article where it belongs, then save.')
        } catch (err) {
            this.notify(apiErrorMessage(err, 'Could not upload the image'))
        } finally {
            this.setState({uploading: false, uploadStatus: ''})
        }
    }

    // Puts one of the manuscript images that could not be placed automatically
    // into the article text, at the editor's cursor.
    insertSourceImage = (image) => {
        const editor = this.state.editorRef
        if (!editor?.insertContent) {
            this.notify('The editor has not finished loading yet')
            return
        }
        editor.insertContent(imageMarkup(image))
        this.setState({content: editor.getContent()})
    }

    openPreview = () => {
        this.setState({preview: previewFromDraft(this.state)})
    }

    closePreview = () => {
        this.setState({preview: null})
    }

    render() {
        const {
            content,
            redirect,
            articleCoverImage,
            authorImage,
            preview,
            ...formState
        } = this.state

        if (redirect) return <Redirect
            to={this.state.redirect}/>

        return (<>
            <EditorForm
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleDelete={this.deleteArticle}
                handlePreview={this.openPreview}
                onFileChange={this.onFileChange}
                onGeneratePdf={this.generatePdf}
                {...formState}
                isEdit={true}
                heading={'Edit Article'}
            >
                <SourceImages
                    images={this.state.sourceImages}
                    content={this.state.content || this.state.initialValue}
                    onInsert={this.insertSourceImage}
                    onReplace={this.replaceSourceImage}
                />
                <Editor
                    onInit={this.onInit}
                    onChange={this.handleEditorChange}
                    initialValue={this.state.initialValue}
                    init={this.editorInit}
                />
            </EditorForm>
            {preview && <ArticlePreview {...preview} onClose={this.closePreview}/>}
            {this.state.uploading && <UploadScreen message={this.state.uploadStatus}/>}
            {(this.state.notification.show) ? <PopUp
                heading={this.state.notification.msg}
                handlePopUp={this.handlePopUp}
                text=""
                buttonText=""
                buttonColor=""
            /> : ''}
        </>)
    }

    onInit = (evt, editor) => {
        this.setState({
            editorRef: editor,
        })
    }

    editArticle = async (overrides = {}) => {
        try {
            if (!this.state.postDataFlag) return

            const authToken = this.state.token
            await ArticleHandler.editArticle({...this.state, ...overrides}, authToken)

            this.setState({
                notification: {
                    show: true, msg: 'Article Edited',
                },
            })

        } catch (err) {
            this.notify(apiErrorMessage(err, 'Could not save the article'))
        }
    }
}

export default EditArticle