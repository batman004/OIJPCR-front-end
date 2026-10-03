import React, {Component} from 'react'
import {Editor} from '@tinymce/tinymce-react'
import EditorForm
    from '../../../components/Admin/EditorForm'
import {
    createEditorInit
} from '../../../components/Admin/Config/TinyMCEConfig'
import ArticlePreview from '../../../components/Admin/ArticlePreview'
import UploadScreen from '../../../components/Admin/UploadScreen'
import {PopUp} from "../../../components/utils";
import {UserContext} from '../../../UserContext'
import {ArticleHandler, FileUploadHandler, readEditorContent, previewFromDraft, apiErrorMessage, validateNewArticleUploads} from '../utils'

class NewArticle extends Component {
    static contextType = UserContext

    constructor(props) {
        super(props)
        this.state = {
            editorRef: {},
            content: '',
            author: this.props.author || '',
            title: this.props.title || '',
            slug: this.props.slug || '',
            volume: this.props.volume || '',
            tags: this.props.tags || '',
            cover: this.props.cover || '',
            authorPhoto: this.props.authorPhoto || '',
            pdfFilePath: this.props.pdfFilePath || '',
            articleCoverImage: null,
            pdfFile: null,
            authorImage: null,
            notification: {
                show: false, msg: '', details: [],
            },
            token: '',
            preview: null,
            uploading: false,
            uploadStatus: '',
        }
        this.editorInit = createEditorInit({uploadImage: file => this.fileUpload(file)})
    }

    componentDidMount() {
        this.setState({token: this.context?.token})
    }

    handlePopUp = () => {
        this.setState(prevState => {
            return {
                notification: {
                    show: !prevState.notification.show,
                    msg: '',
                    details: [],
                },
            }
        })
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
        if (this.state.uploading) return

        const problems = validateNewArticleUploads({
            cover: this.state.articleCoverImage,
            authorPhoto: this.state.authorImage,
            pdf: this.state.pdfFile,
            editor: this.state.editorRef,
        })
        if (problems.length > 0) {
            this.notify(
                problems.length === 1 ? problems[0] : 'Fix these files before uploading',
                problems.length === 1 ? [] : problems,
            )
            return
        }

        await this.setUploadStatus('Uploading images in the article…')
        try {
            const content = await readEditorContent(this.state.editorRef)
            if (content.length === 0) {
                this.notify('Empty Article')
                return
            }

            await this.setUploadStatus('Uploading the cover image…')
            const cover = await this.fileUpload(this.state.articleCoverImage)
            await this.setUploadStatus('Uploading the author photo…')
            const authorPhoto = await this.fileUpload(this.state.authorImage)
            await this.setUploadStatus('Uploading the PDF…')
            const pdfFilePath = await this.fileUpload(this.state.pdfFile, 'pdf')

            await this.setUploadStatus('Saving the article…')
            await new Promise(resolve => this.setState({
                content, cover, authorPhoto, pdfFilePath,
            }, resolve))
            await this.createArticle()
        } catch (err) {
            this.notify(apiErrorMessage(err, 'Could not save the article'))
        } finally {
            this.setState({uploading: false, uploadStatus: ''})
        }
    }

    notify = (msg, details = []) => {
        this.setState({
            notification: {show: true, msg, details},
        })
    }

    handleEditorChange = () => {
        this.setState({
            content: this.state.editorRef.getContent(),
        })
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
            articleCoverImage,
            authorImage,
            preview,
            ...formState
        } = this.state

        return (<>
            <EditorForm
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handlePreview={this.openPreview}
                onFileChange={this.onFileChange}
                isEdit={false}
                heading={'New Article'}
                {...formState}
            >
                <Editor
                    onInit={this.onInit}
                    onChange={this.handleEditorChange}
                    init={this.editorInit}
                />
            </EditorForm>
            {preview && <ArticlePreview {...preview} onClose={this.closePreview}/>}
            {this.state.uploading && <UploadScreen message={this.state.uploadStatus}/>}
            {(this.state.notification.show) ? <PopUp
                heading={this.state.notification.msg}
                details={this.state.notification.details}
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

    fileUpload = async (file, fieldName = 'image') => {
        const authToken = this.context?.token || this.state.token
        return await FileUploadHandler.uploadFile(file, authToken, fieldName)
    }

    createArticle = async () => {
        try {
            const {
                editorRef,
                articleCoverImage,
                authorImage,
                pdfFile,
                ...data
            } = this.state

            const authToken = this.context?.token || this.state.token
            await ArticleHandler.createNewArticle(data, authToken)

            this.setState({
                notification: {
                    show: true, msg: 'Created new article',
                },
            })
        } catch (err) {
            this.notify(apiErrorMessage(err, 'Could not create the article'))
        }
    }
}

export default NewArticle