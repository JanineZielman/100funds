'use client';

import { FC, useEffect, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import styles from "./index.module.scss";

/**
 * Props for `Fonds`.
 */
export type FondsProps = SliceComponentProps<Content.FondsSlice>;

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

const Fonds: FC<FondsProps> = ({ slice }) => {
  const totalSquares = 100;
  const funds = slice.primary.funds || [];

  const makeGrid = () => shuffle([
    ...funds,
    ...Array(totalSquares - funds.length).fill(null),
  ]);

  const [shuffledGrid, setShuffledGrid] = useState<ReturnType<typeof makeGrid>>([]);
  // const [cycle, setCycle] = useState(0);

  // Delay initial grid render by 2 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShuffledGrid(makeGrid());
    }, 1500);

    return () => clearTimeout(timeout);
  }, [funds]);

  // reshuffle every 5s
  // useEffect(() => {
  //   if (shuffledGrid.length === 0) return; // don't start interval until grid is shown
  //   const interval = setInterval(() => {
  //     setShuffledGrid(makeGrid());
  //     setCycle((c) => c + 1);
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [funds, shuffledGrid]);

  return (
    <section className={styles.grid}>
      {shuffledGrid.map((fund, i) => (
        <div
          key={`cycle-${i}`} // force animation on each cycle
          className={`${styles.square} ${fund ? styles.revealed : styles.empty}`}
          style={{ animationDelay: `${i * 0.02}s` }}
        >
          {fund ? (
            <div className={styles.fundContent}>
              <PrismicNextLink field={fund.link}>
                <h3>{fund.title}</h3>
                <PrismicNextImage field={fund.image} />
              </PrismicNextLink>
            </div>
          ) : null}
        </div>
      ))}
    </section>
  );
};


export default Fonds;
