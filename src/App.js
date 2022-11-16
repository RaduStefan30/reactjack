import { Fragment, useEffect, useState } from "react";
import "./App.css";
import Cards from "./components/Cards/Cards";
import Intro from "./components/Intro/Intro";
import Logo from "./components/Logo/Logo";
import { generateRandomCard, calculateScore } from "./utils";

function App() {
  const [displayIntro, setDisplayIntro] = useState(true);
  const [slide, setSlide] = useState(false);

  const [playerCards, setPlayerCards] = useState([
    generateRandomCard(),
    generateRandomCard(),
  ]);

  const [dealerCards, setDealerCards] = useState([
    generateRandomCard(),
    generateRandomCard(),
  ]);

  const [showSecond, setShowSecond] = useState(false);

  const [conclusion, setConclusion] = useState(null);

  let playerScore = calculateScore(playerCards);

  let dealerScore = calculateScore(dealerCards);

  const drawPlayerCard = () => {
    let card = generateRandomCard();

    if (playerScore > 10 && card === 11) card = 1;

    playerScore += card;

    if (playerScore === 21) {
      setPlayerCards((prev) => [...prev, card]);
      return;
    }

    if (playerScore > 21)
      playerCards.forEach((card) => {
        if (card === 11) playerScore -= 10;
      });

    setPlayerCards((prev) => [...prev, card]);
  };

  const drawDealerCard = () => {
    while (dealerScore < 17) {
      let card = generateRandomCard();

      if (dealerScore > 10 && card === 11) card = 1;

      dealerScore += card;

      if (dealerScore === 21) {
        break;
      }

      if (dealerScore > 21)
        dealerCards.forEach((card, index) => {
          if (card === 11) {
            setDealerCards((prev) => [...prev, (prev[index] = 1)]);
          }
        });

      setDealerCards((prev) => [...prev, card]);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayIntro(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (playerScore > 21 && dealerScore < 22) {
      setConclusion("Dealer Wins");
      setShowSecond(true);
    }

    if (playerScore === 21) {
      if (dealerScore === 21) {
        setConclusion("Draw");
        setShowSecond(true);
      } else {
        setConclusion("Player Wins");
        setShowSecond(true);
      }
    }
  }, [playerCards, dealerCards]);

  const handleHit = () => {
    setSlide(false);
    if (conclusion) {
      return;
    }
    if (playerScore < 21) drawPlayerCard();
  };

  const handleStand = () => {
    setSlide(false);

    if (conclusion) {
      return;
    }

    drawDealerCard();
    setShowSecond(true);

    if (dealerScore > 21 && playerScore < 22) setConclusion("Player Wins");
    else if (playerScore > 21 && dealerScore < 22) {
      setConclusion("Dealer Wins");
    } else if (playerScore > 21 && playerScore === dealerScore) {
      setConclusion("Draw");
    } else if (playerScore > dealerScore) {
      setConclusion("Player Wins");
    } else if (playerScore < dealerScore) {
      setConclusion("Dealer Wins");
    }
  };

  const handleDouble = () => {
    if (playerCards.length !== 2) return;

    if (conclusion) {
      return;
    }

    drawPlayerCard();
    handleStand();
  };

  const handleRestart = () => {
    setPlayerCards([generateRandomCard(), generateRandomCard()]);
    setDealerCards([generateRandomCard(), generateRandomCard()]);
    setConclusion(null);
    setShowSecond(false);
    setSlide(true);
  };

  return (
    <Fragment>
      {displayIntro && <Intro />}
      <div className={`app ${!displayIntro && "showApp"}`}>
        <Logo />
        <div className={`content ${slide && "slide"}`}>
          <div className="conclusion">{conclusion}</div>
          <div className="dealer">
            <div className="score">
              Dealer
              {showSecond && ` Score:${dealerScore}`}
            </div>
            <Cards cards={dealerCards} showSecond={showSecond} />
          </div>

          <div className="player">
            <div className="score">Player Score:{playerScore}</div>
            <Cards cards={playerCards} showSecond={true} />
          </div>
          {conclusion ? (
            <button className="options" onClick={handleRestart}>
              Play Again
            </button>
          ) : (
            <div className="options">
              <button onClick={handleHit}>Hit</button>
              <button onClick={handleStand}>Stand</button>
              <button onClick={handleDouble}>Double</button>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default App;
