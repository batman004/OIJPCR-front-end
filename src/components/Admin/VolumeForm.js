import { Component } from 'react'
import {
  FormField,
  FormContainer,
  UploadFile,
  Button,
  ButtonGroup
} from "./Form";
import {ConfirmDelete} from "../utils";

class VolumeForm extends Component {
  constructor (props) {
    super(props)
    this.state = {confirmDelete: false}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
    this.openDeleteConfirm = this.openDeleteConfirm.bind(this)
    this.closeDeleteConfirm = this.closeDeleteConfirm.bind(this)
    this.confirmDelete = this.confirmDelete.bind(this)
  }

  onFileChange (evt) {
    this.props.onFileChange(evt)
  }

  openDeleteConfirm () {
    this.setState({confirmDelete: true})
  }

  closeDeleteConfirm () {
    this.setState({confirmDelete: false})
  }

  confirmDelete () {
    this.setState({confirmDelete: false})
    this.props.handleDelete()
  }

  handleSubmit (evt) {
    this.props.handleSubmit(evt)
  }

  handleChange (evt) {
    this.props.handleChange(evt)
  }

  render () {
    const {
            volume,
            about,
            date,
            issue,
            year,
            isEdit  = false,
            heading = 'Submit Form',
          } = this.props
    return (
      <>
      <FormContainer heading={heading} handleSubmit={this.handleSubmit}>
        {/*Volume*/}
        <FormField name="volume" value={volume} label="Volume" handleChange={this.handleChange}
                   type="number"
                   min={0}
        />
        {/* Bibliographic details: shown as "Volume N, Issue I, YYYY" */}
        <FormField name="issue" value={issue} label="Issue" handleChange={this.handleChange}
                   type="number"
                   min={1}
        />
        <FormField name="year" value={year} label="Year" handleChange={this.handleChange}
                   type="number"
                   min={2016}
        />
        <FormField name="date" value={date} label="Date (display text)" handleChange={this.handleChange}/>
        {/*About*/}
        <FormField name="about" value={about} label="About" handleChange={this.handleChange}/>

        <UploadFile onFileChange={this.onFileChange}/>
        {this.props.children}
        {
          isEdit
            ?
            <ButtonGroup
              handleSubmit={this.handleSubmit}
              handleDelete={this.openDeleteConfirm}
              deleteTxt="Delete Volume"
            />
            :
            <Button
              handleClick={this.handleSubmit}
              cname="primary-color-bg text-white"
            >
              Save Data
            </Button>
        }
      </FormContainer>
      {this.state.confirmDelete && (
        <ConfirmDelete
          title="Delete this volume?"
          warning={`Volume ${volume} will be removed from the archive. Existing articles in this volume are not deleted automatically.`}
          confirmLabel="Delete volume"
          onCancel={this.closeDeleteConfirm}
          onConfirm={this.confirmDelete}
        />
      )}
      </>
    )
  }
}

export default VolumeForm