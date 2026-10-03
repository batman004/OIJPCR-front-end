import React, {Component} from 'react'
import VolumeForm
    from '../../../components/Admin/VolumeForm'
import {PopUp} from '../../../components/utils'
import config from '../../../config/config'
import {UserContext} from '../../../UserContext'
import {FileUploadHandler, VolumeHandler, apiErrorMessage} from '../utils'

class NewVolume extends Component {
    static contextType = UserContext

    constructor(props) {
        super(props)
        this.state = {
            volume: '',
            about: 'This is a volume',
            cover: `${config.host}/editor/images/volume_cover_fallback.jpeg`,
            date: 'January 2021',
            issue: 1,
            year: '',
            isEdit: false,
            file: null,
            notification: {
                show: false, msg: '',
            },
            token: '',
        }
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
        this.setState({file: evt.target.files[0]})
    }

    handleChange = (evt) => {
        this.setState(() => ({
            [evt.target.name]: evt.target.value,
        }))
    }

    handleSubmit = async (evt) => {
        evt.preventDefault()

        if (!this.state.file || !this.state.volume) {
            this.setState({
                notification: {
                    show: true,
                    msg: 'Please fill all the required info',
                },
            })
            return
        }

        try {
            const imgPath = await this.uploadFile(this.state.file)
            this.setState({cover: imgPath}, () => this.createVolume())
        } catch (err) {
            this.setState({
                notification: {
                    show: true,
                    msg: apiErrorMessage(err, 'Cover upload failed'),
                },
            })
        }
    }

    createVolume = async () => {
        try {
            const {volume, about, cover, date, issue, year} = this.state
            const authToken = this.state.token

            await VolumeHandler.createNewVolume({
                volume, about, cover, date, issue, year
            }, authToken)

            this.setState({
                notification: {
                    show: true, msg: 'Created New Volume',
                },
            })
        } catch (err) {
            this.setState({
                notification: {
                    show: true,
                    msg: apiErrorMessage(err, 'Could not create the volume'),
                },
            })
        }
    }

    uploadFile = async (file, fieldName = 'image') => {
        const authToken = this.state.token
        return await FileUploadHandler.uploadFile(file, authToken, fieldName)
    }

    render() {
        return (<>
            <VolumeForm
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                onFileChange={this.onFileChange}
                heading={'New Volume'}
                {...this.state}
            >
            </VolumeForm>
            {(this.state.notification.show) ? <PopUp
                heading={this.state.notification.msg}
                handlePopUp={this.handlePopUp}
                text=""
                buttonText=""
                buttonColor=""
            /> : ''}
        </>)
    }
}

export default NewVolume