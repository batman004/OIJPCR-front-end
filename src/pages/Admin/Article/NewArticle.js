import React, {Component} from 'react'
import {Editor} from '@tinymce/tinymce-react'
import EditorForm
    from '../../../components/Admin/EditorForm'
import {
    createEditorInit
} from '../../../components/Admin/Config/TinyMCEConfig'
import ArticlePreview from '../../../components/Admin/ArticlePreview'
import {PopUp} from "../../../components/utils";
import {UserContext} from '../../../UserContext'
import {ArticleHandler, FileUploadHandler, readEditorContent, previewFromDraft} from '../utils'

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
                show: false, msg: '',
            },
            token: '',
            preview: null,
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

    handleSubmit = async (evt) => {
        evt.preventDefault()

        if (!this.state.articleCoverImage) {
            this.setState({
                notification: {
                    show: true,
                    msg: 'Article cover image not uploaded',
                },
            })
            return
        }

        if (!this.state.authorImage) {
            this.setState({
                notification: {
                    show: true,
                    msg: 'Author profile photo not uploaded',
                },
            })
            return
        }

        if (!this.state.pdfFile) {
            this.setState({
                notification: {
                    show: true,
                    msg: 'PDF file not uploaded',
                },
            })
            return
        }

        let content
        try {
            content = await readEditorContent(this.state.editorRef)
        } catch (err) {
            this.setState({
                notification: {
                    show: true, msg: err.message,
                },
            })
            return
        }

        if (content.length === 0) {
            this.setState({
                notification: {
                    show: true, msg: 'Empty Article',
                },
            })
            return
        }

        this.setState({content})

        const cover = await this.fileUpload(this.state.articleCoverImage)
        const authorPhoto = await this.fileUpload(this.state.authorImage)
        const pdfFilePath = await this.fileUpload(this.state.pdfFile, 'pdf')

        this.setState({
            cover: cover,
            authorPhoto: authorPhoto,
            pdfFilePath: pdfFilePath
        })

        await this.createArticle()
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

    fileUpload = async (file, fieldName = 'image') => {
        const authToken = this.state.token
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

            const authToken = this.state.token
            await ArticleHandler.createNewArticle(data, authToken)

            this.setState({
                notification: {
                    show: true, msg: 'Created new article',
                },
            })
        } catch (err) {
            this.setState({
                notification: {
                    show: true,
                    msg: 'Error: could not create new article',
                },
            })
        }
    }
}

export default NewArticle