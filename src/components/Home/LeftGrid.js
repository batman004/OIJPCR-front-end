import { useEffect, useState } from 'react'
import axios from 'axios'
import { LoadingCard, LoadingCardFullWidth } from '../Cards/LoadingCards'
import ArticleCard from '../Cards/ArticleCard'
import ArticleCardFullWidth from '../Cards/ArticleCardFullWidth'
import config from '../../config/config'

function LeftGrid() {
  const [cardData, setCardData] = useState([1, 2, 3, 4, 5])

  useEffect(() => {
    const getCardData = async () => {
      const cardData = await fetchJournals()
      setCardData(cardData)
    }

    getCardData()
  }, [])

  const fetchJournals = async () => {
    const res = await axios.get(`${config.host}journals/home/5`)
    return res?.data
  }

  const cname = {
    container: '',
    button: 'ml-4 mt-8',
  }

  const cardGrid = cardData?.map((card, index) => {
    if (!card?.author) {
      return (
        index === 0 ?
          <LoadingCardFullWidth />
          :
          <LoadingCard />
      )
    }

    return (
      index === 0 ?
        <ArticleCardFullWidth
          key={index}
          {...card}
          coverPhoto={card.cover}
          id={card._id}
          volume={card.volume}
          cname={cname}
        />
        :
        <ArticleCard
          key={index}
          {...card}
          coverPhoto={card.cover}
          id={card._id}
          volume={card.volume}
          cname={cname}
        />
    )
  })

  return (
    <div
      className={
        `grid grid-cols-1 grid-flow-row
         grid-rows-5 lg:grid-cols-2 
         lg:grid-rows-3 lg:w-3/4 
         md:w-2/3 w-full`}
    >
      {cardGrid}
    </div>
  )
}

export default LeftGrid

