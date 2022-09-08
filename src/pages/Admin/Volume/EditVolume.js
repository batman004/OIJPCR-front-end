import axios from 'axios'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {UserContext} from '../../../UserContext'
import config from '../../../config/config'
import VolumeForm
    from '../../../components/Admin/VolumeForm'
import {PopUp} from '../../../components/utils'
import {
    AuthUtils,
    FileUploadHandler,
    VolumeHandler
} from '../utils'

class EditVolume extends Component {
    static contextType = UserContext

    constructor(props) {
        super(props)
        this.state = {
            volume: this.props.volume || '',
            about: 'loading...',
            cover: '',
            date: 'loading...',
            id: '',
            isEdit: true,
            file: null,
            redirect: null,
            postDataFlag: true,
            notification: {
                show: false, msg: '',
            },
            token: '',
        }
    }

    async componentDidMount() {
        this.setState({token: this.context?.token})

        const headerConfig = AuthUtils.setAuthHeader(this.state.token)
        const {volume} = this.props.match.params
        const url = `${config.host}volume/${volume}`

        const {data} = await axios.get(url, {...headerConfig})

        if (!data) {
            this.setState({redirect: '/notFound'})
        }

        if (!data || data.length === 0) return

        const {about, cover, date, _id: id} = data[0]
        this.setState({
            volume: data[0].volume,
            about: about,
            cover: cover,
            date: date,
            id: id,
        })
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

    uploadNewCoverImage = async () => {
        const imgPath = await FileUploadHandler.uploadFile(this.state.file, this.state.token)
        await this.deletePreviousCoverImage(this.state.cover)
        this.setState({cover: imgPath})
    }

    deleteVolume = async () => {
        try {
            const volumeCoverPath = this.state.cover
            const volumeNumber = this.state.volume
            const authToken = this.state.token

            await VolumeHandler.deleteVolume(volumeCoverPath, volumeNumber, authToken)

            this.setState({
                redirect: '/admin/list',
                postDataFlag: false,
            })
        } catch (err) {
            this.setState({
                notification: {
                    show: true,
                    msg: 'Error: Volume could not be deleted',
                },
            })
        }
    }

    deletePreviousCoverImage = async (imagePath) => {
        const authToken = this.state.token
        await FileUploadHandler.deleteOldFile(imagePath, authToken)
    }

    handleSubmit = async (evt) => {
        evt.preventDefault()

        if (!this.state.postDataFlag) return

        if (this.state.file) {
            await this.uploadNewCoverImage()
        }

        await this.editVolume()
    }

    editVolume = async () => {
        try {
            if (!this.state.postDataFlag) return

            const authToken = this.state.token
            const cover = this.state.file ? this.state.cover : ''

            await VolumeHandler.editVolume({
                ...this.state, cover
            }, authToken)

            this.setState({
                notification: {
                    show: true,
                    msg: 'Edited Volume: ' + this.state.volume,
                },
            })

        } catch (err) {
            this.setState({
                notification: {
                    show: true,
                    msg: 'An Error occurred in editing volume: ' + this.state.volume,
                },
            })
        }
    }

    render() {
        const {redirect} = this.state
        if (redirect) return <Redirect
            to={this.state.redirect}/>

        return (<>
            <VolumeForm
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleDelete={this.deleteVolume}
                onFileChange={this.onFileChange}
                heading={'Edit Volume'}
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

export default EditVolume