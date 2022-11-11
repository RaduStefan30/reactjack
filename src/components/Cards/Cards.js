import { GiSpades } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import { allCards } from "../../allCards";

const Cards = (props) => {
  const { cards, showSecond } = props;
  return cards.map((card, index) => {
    const suite = (card - index) % 2 === 0 ? "suite--red" : "suite--black";
    const cardToShow =
      card === 10
        ? allCards[card - 1][Math.floor(Math.random() * 4)]
        : allCards[card - 1];
    return (
      <div
        key={card * index * Math.random()}
        className={`card ${suite} ${!showSecond && "card__back"}`}
      >
        {!showSecond && index === 1 && (
          <img className="card__back-logo" src="logo-white.png" alt="logo" />
        )}
        <div className="number__top card__number ">{cardToShow}</div>
        <div className="suite suite__top ">
          {suite === "suite--red" ? <FaHeart /> : <GiSpades />}
        </div>
        <div className="number__bottom card__number ">{cardToShow}</div>
        <div className="suite suite__bottom">
          {suite === "suite--red" ? <FaHeart /> : <GiSpades />}
        </div>
        <img className="card__logo" src="logo.svg" alt="logo" />
      </div>
    );
  });
};

export default Cards;
