import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {Editor} from '@tinymce/tinymce-react'
import {
    initEditor
} from '../../../components/Admin/Config/TinyMCEConfig'
import EditorForm
    from '../../../components/Admin/EditorForm'
import config from '../../../config/config'
import {PopUp} from '../../../components/utils'
import {UserContext} from '../../../UserContext'
import {ArticleHandler, FileUploadHandler} from '../utils'

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
            cover: this.props.cover || `${config.host}/editor/images/article_cover_fallback.jpg`,
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
        }
    }

    async componentDidMount() {
        try {
            const {urlSlug, id} = this.props.match.params
            const url = `${config.host}/journals/${urlSlug}/${id}`
            const {data} = await axios.get(url)
            const {content: initialValue} = data
            this.setState({
                ...data,
                pdfFilePath: data.pdf,
                id,
                initialValue,
                token: this.context?.token,
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

    handleSubmit = async (evt) => {
        evt.preventDefault()

        if (!this.state.postDataFlag) return

        if (this.state.articleCoverImage) {
            await this.editArticleCoverImage()
        }

        if (this.state.authorImage) {
            await this.editAuthorProfileImage()
        }

        if (this.state.pdfFile) {
            await this.editPDF()
        }

        await this.editArticle()
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
    }

    editArticleCoverImage = async () => {
        const authToken = this.state.token
        const imgPath = await FileUploadHandler.uploadFile(this.state.articleCoverImage, authToken)
        // before sending delete request, check if cover exists on server
        if (this.state.cover) await this.deletePreviousFile(this.state.cover)
        this.setState({cover: imgPath})
    }

    editPDF = async () => {
        const authToken = this.state.token
        const pdfPath = await FileUploadHandler.uploadFile(this.state.pdfFile, authToken, 'pdf')
        // before sending delete request, check if pdf exists on server
        if (this.state.pdfFilePath) await this.deletePreviousFile(this.state.pdfFilePath)
        this.setState({pdfFilePath: pdfPath})
    }

    render() {
        const {
            content,
            redirect,
            articleCoverImage,
            authorImage,
            ...formState
        } = this.state

        if (redirect) return <Redirect
            to={this.state.redirect}/>

        return (<>
            <EditorForm
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleDelete={this.deleteArticle}
                onFileChange={this.onFileChange}
                {...formState}
                isEdit={true}
                heading={'Edit Article'}
            >
                <Editor
                    onInit={this.onInit}
                    onChange={this.handleEditorChange}
                    initialValue={this.state.initialValue}
                    init={{...initEditor}}
                />
            </EditorForm>
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

    editArticle = async () => {
        try {
            if (!this.state.postDataFlag) return

            const authToken = this.state.token
            await ArticleHandler.editArticle(this.state, authToken)

            this.setState({
                notification: {
                    show: true, msg: 'Article Edited',
                },
            })

        } catch (err) {
            this.setState({
                notification: {
                    show: true,
                    msg: 'Error: could not edit article',
                },
            })
        }
    }
}

export default EditArticle