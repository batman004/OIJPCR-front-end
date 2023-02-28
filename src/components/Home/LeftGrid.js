import { useEffect, useState } from "react";
import axios from "axios";
import { LoadingCard, LoadingCardFullWidth } from "../Loaders";
import { ArticleCard, ArticleCardFullWidth } from "../Cards";
import config from "../../config/config";

function LeftGrid() {
  const [cardData, setCardData] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    const getCardData = async () => {
      const journals = await fetchJournals();
      let newCardData = cardData.map((data) => {
        const journal = journals.shift();
        return journal || data;
      });
      setCardData(newCardData);
    };
    getCardData();
    // eslint-disable-next-line
  }, []);

  const fetchJournals = async () => {
    const res = await axios.get(`${config.host}/journals/home/5`);
    return res?.data;
  };

  const cnameFullWidthCard = {
    container: "",
    button: "ml-4 mt-8",
  };

  const cname = {
    container: "",
    button: "ml-4 mt-8",
  };

  const cardGrid = cardData?.map((card, index) => {
    if (!card?.author) {
      return index === 0 ? (
        <LoadingCardFullWidth key={index} />
      ) : (
        <LoadingCard key={index} />
      );
    }

    return index === 0 ? (
      <ArticleCardFullWidth
        key={card._id}
        {...card}
        coverPhoto={card.cover}
        id={card._id}
        volume={card.volume}
        cname={cnameFullWidthCard}
      />
    ) : (
      <ArticleCard
        key={card._id}
        {...card}
        coverPhoto={card.cover}
        id={card._id}
        volume={card.volume}
        cname={cname}
      />
    );
  });

  return (
    <div className="grid w-full grid-flow-row grid-cols-1 grid-rows-5 lg:grid-cols-2 lg:grid-rows-3 lg:w-3/4 md:w-2/3">
      {cardGrid}
    </div>
  );
}

export default LeftGrid;
