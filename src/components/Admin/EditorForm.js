import {Component} from 'react'
import {
    FormField, FormContainer, UploadFile, Button
} from "./Form";
import {ConfirmDelete} from "../utils";

class EditorForm extends Component {
    constructor(props) {
        super(props)
        this.state = {confirmDelete: false}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onFileChange = this.onFileChange.bind(this)
        this.openDeleteConfirm = this.openDeleteConfirm.bind(this)
        this.closeDeleteConfirm = this.closeDeleteConfirm.bind(this)
        this.confirmDelete = this.confirmDelete.bind(this)
    }

    onFileChange(evt) {
        this.props.onFileChange(evt)
    }

    openDeleteConfirm() {
        this.setState({confirmDelete: true})
    }

    closeDeleteConfirm() {
        this.setState({confirmDelete: false})
    }

    confirmDelete() {
        this.setState({confirmDelete: false})
        this.props.handleDelete()
    }

    handleSubmit(evt) {
        this.props.handleSubmit(evt)
    }

    handleChange(evt) {
        this.props.handleChange(evt)
    }

    render() {
        const {
            author, title, slug, volume, tags, status, isEdit = false, heading = 'Submit Form',
            onGeneratePdf, generatingPdf, pdfFilePath,
        } = this.props
        return (<>
            <FormContainer heading={heading} handleSubmit={this.handleSubmit}>
                {/* Author */}
                <FormField name="author" value={author} label="Author" handleChange={this.handleChange}/>
                {/* Title */}
                <FormField name="title" value={title} label="Title" handleChange={this.handleChange}/>
                {/*Slug*/}
                <FormField name="slug" value={slug} label="Slug" handleChange={this.handleChange}/>
                {/*tags*/}
                <FormField name="tags" value={tags} label="Tags" handleChange={this.handleChange}/>
                {/*Volume*/}
                <FormField name="volume" value={volume} label="Volume" handleChange={this.handleChange}
                           type="number"
                           min={0}
                />
                {/* Draft stays off the public site; Published is reachable the
                    normal way once a volume is set. */}
                <div className="flex flex-col mb-4">
                    <label className="mb-2 text-lg font-bold text-gray-900" htmlFor="status">
                        Status
                    </label>
                    <select
                        className="px-3 py-2 border text-grey-800"
                        id="status"
                        name="status"
                        value={status || 'published'}
                        onChange={this.handleChange}
                    >
                        <option value="draft">Draft (not visible to readers)</option>
                        <option value="published">Published</option>
                    </select>
                </div>
                {isEdit && onGeneratePdf && (
                    <div className="flex flex-col mb-4">
                        <span className="mb-2 text-lg font-bold text-gray-900">PDF</span>
                        <Button
                            type="button"
                            handleClick={onGeneratePdf}
                            cname="text-white bg-gray-700"
                        >
                            {generatingPdf ? 'Generating…' : pdfFilePath ? 'Regenerate PDF' : 'Generate PDF'}
                        </Button>
                        <span className="mt-2 text-sm text-gray-600">
                            Builds a PDF from the saved article, styled like the rest of the archive. Save your
                            changes first - this doesn't use whatever is still unsaved in the editor above.
                        </span>
                    </div>
                )}
                {/*Article Cover Image upload*/}
                <UploadFile
                    name="articleCoverImage"
                    label="Article Cover Image"
                    accept="image/*"
                    onFileChange={this.onFileChange}
                />
                {/* Author Profile pic upload*/}
                <UploadFile
                    name="authorImage"
                    label="Author Profile Pic"
                    accept="image/*"
                    onFileChange={this.onFileChange}
                />
                {/* PDF Upload*/}
                <UploadFile
                    name="pdfFile"
                    label="PDF Upload"
                    accept="application/pdf,.pdf"
                    onFileChange={this.onFileChange}
                />
                {this.props.children}
                <div className="flex flex-row flex-wrap justify-center">
                    <Button type="button" handleClick={this.props.handlePreview}
                            cname="text-gray-900 bg-white border-2 border-gray-900">
                        Preview
                    </Button>
                    <Button handleClick={this.handleSubmit} cname="primary-color-bg text-white">
                        Save Data
                    </Button>
                    {isEdit && <Button type="button" handleClick={this.openDeleteConfirm} cname="bg-red-600 text-white">
                        Delete Article
                    </Button>}
                </div>
            </FormContainer>
            {this.state.confirmDelete && (
                <ConfirmDelete
                    title="Delete this article?"
                    warning={`"${title || 'Untitled'}" will be removed from the website. Readers will no longer be able to open it.`}
                    confirmLabel="Delete article"
                    onCancel={this.closeDeleteConfirm}
                    onConfirm={this.confirmDelete}
                />
            )}
        </>)
    }
}

export default EditorForm
