import axios from 'axios'
import { Component } from 'react'
import { VolumeCard } from "../Cards";
import config from '../../config/config'

class VolumeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      volumes: [],
    }
  }

  async componentDidMount() {
    const url = `${config.host}/volume`
    const { data } = await axios.get(url)
    this.setState({ volumes: data })
  }

  render() {
    return (
      <div className="flex-grow">
        <Volumes volumes={this.state.volumes} />
      </div>
    )
  }
}

function Volumes({ volumes }) {
  let volumeList
  if (typeof volumes == 'undefined')
    volumeList = '...Loading'
  else if (volumes.length === 0)
    volumeList = 'No Volumes Found'
  else volumeList = createVolumeCards(volumes)

  return (
    <div className="h-full mx-4 lg:mx-0">
      <div className="flex flex-row flex-wrap w-full h-full py-2 my-4 justify-evenly editor">
        <div className="flex flex-wrap flex-column md:flex-row justify-evenly">
          {volumeList}
        </div>
      </div>
    </div>
  )
}

function createVolumeCards(volumes) {
  return volumes.map((volume, index) =>
    <VolumeCard {...volume} key={index} isAdmin={true} />)
}

export default VolumeList