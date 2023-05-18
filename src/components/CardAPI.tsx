import { useEffect, useState } from "react";
import styles from "./CardAPI.module.css";
import { VscRefresh } from "react-icons/Vsc";

export default function CardAPI() {
  const [showCard, setShowcard] = useState(true);

  const url = "https://web-series-quotes-api.deta.dev/quote";

  const [quote, setQuote] = useState([{ quote: "", series: "" }]);

  async function fetchData(url: string): Promise<any> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("");
      }
      const data = await response.json();
      data[0].series = data[0].series
        .split("_")
        .map(
          (string: string) => string.charAt(0).toUpperCase() + string.slice(1)
        )
        .join(" ");
      console.log(data[0].series);
      setQuote(data);
      console.log(quote);
    } catch (error: any) {
      console.error("Error:", error.message);
      throw error;
    }
  }

  useEffect(() => {
    fetchData(url);
  }, []);

  const handleFetchRandom = () => {
    setQuote([{ quote: "", series: "Loading..." }]);

    fetchData(url);
  };

  const handleFetchDark = () => {
    setQuote([{ quote: "", series: "Loading..." }]);
    fetchData("https://web-series-quotes-api.deta.dev/quote/?series=dark");
  };
  const handleFetchGoT = () => {
    setQuote([{ quote: "", series: "Loading..." }]);
    fetchData(
      "https://web-series-quotes-api.deta.dev/quote/?series=game_of_thrones"
    );
  };
  const handleFetchBrBad = () => {
    setQuote([{ quote: "", series: "Loading..." }]);
    fetchData(
      "https://web-series-quotes-api.deta.dev/quote/?series=breaking_bad"
    );
  };
  console.log(quote);

  return (
    <>
      {showCard ? (
        <div
          className={[styles.card, styles.preText, styles.cardPreText].join(
            " "
          )}
          onClick={() => setShowcard(false)}
        >
          Fancy a quote? Click me!
        </div>
      ) : (
        <div className={styles.card}>
          <VscRefresh
            className={styles.icon}
            size={35}
            onClick={handleFetchRandom}
          />
          <h1>{quote[0].series}</h1>
          <p className={styles.quote}>{quote[0].quote}</p>
          <div className={styles.buttonContainer}>
            <button onClick={handleFetchBrBad} className={styles.button}>
              Breaking Bad
            </button>
            <button onClick={handleFetchDark} className={styles.button}>
              Dark
            </button>
            <button onClick={handleFetchGoT} className={styles.button}>
              GoT
            </button>
          </div>
        </div>
      )}
    </>
  );
}
