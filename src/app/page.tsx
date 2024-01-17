"use client";

import styles from "./page.module.scss";
import data from "../assets/api/data.json";
import Image from "next/image";
import bg from "../../static/images/bg-header-desktop.svg";
import { useEffect, useState } from "react";

export default function Home() {
  const [filter, setFilter] = useState<string[]>([]);
  const [filterKey, setFilterKey] = useState<string>("");
  const [filteredData, setFilteredData] = useState(data);

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    if (target) console.log(target.innerText);

    if (filter.includes(target.innerText)) {
      setFilter(filter.filter((f) => f !== target.innerText));
    } else {
      setFilter((oldFilter) => [...oldFilter, target.innerText]);
    }
  };

  const clearFilter = () => {
    setFilter([]);
    setFilterKey("");
    setFilteredData(data);
  };

  useEffect(() => {
    if (filter.length <= 0) setFilteredData(data);
    else {
      switch (filterKey) {
        case "role":
          setFilteredData((f) => f.filter((d) => filter.includes(d.role)));
          break;
        case "level":
          setFilteredData((f) => f.filter((d) => filter.includes(d.level)));
          break;
        case "languages":
          setFilteredData((f) =>
            f.filter((d) => {
              for (let i = 0; i < d.languages.length; i++) {
                if (filter.includes(d.languages[i])) return true;
              }
            })
          );
          break;
        case "tools":
          setFilteredData((f) =>
            f.filter((d) => {
              for (let i = 0; i < d.tools.length; i++) {
                if (filter.includes(d.tools[i])) return true;
              }
            })
          );
          break;

        default:
          break;
      }
    }
  }, [filter, filterKey]);

  return (
    <main className={styles.main}>
      <div className={styles.imgContainer}>
        <Image src={bg} alt="" />
      </div>
      <div className={styles.list}>
        {filter.length > 0 && (
          <div className={styles.filterBox}>
            <div>
              {filter.map((f, i) => (
                <p
                  key={i}
                  onClick={(e) => {
                    const target = e.target as HTMLButtonElement;
                    setFilter(
                      filter.filter((f) => !f.includes(target.innerText))
                    );
                    setFilterKey("");
                  }}
                >
                  {f}
                </p>
              ))}
            </div>
            <button onClick={clearFilter}>Clear</button>
          </div>
        )}
        {filteredData.map((d, i) => (
          <div
            className={styles.jobContainer}
            key={d.id}
            style={
              i === 0 || i === 1
                ? { borderLeft: "5px solid hsl(180, 29%, 50%)" }
                : { border: "none" }
            }
          >
            <div className={styles.content}>
              <Image src={d.logo} width={100} height={100} alt="" />
              <div className={styles.infoTitle}>
                <div className={styles.inlineCompany}>
                  <h2>{d.company}</h2>
                  {d.new && (
                    <span style={{ backgroundColor: "hsl(180, 29%, 50%)" }}>
                      NEW!
                    </span>
                  )}
                  {d.featured && (
                    <span style={{ backgroundColor: "hsl(180, 14%, 20%)" }}>
                      FEATURED
                    </span>
                  )}
                </div>
                <h1>{d.position}</h1>
                <div className={styles.info}>
                  <p>{d.postedAt}</p>
                  <p>{d.contract}</p>
                  <p>{d.location}</p>
                </div>
              </div>
            </div>
            <div className={styles.filter}>
              <p
                onClick={(e) => {
                  setFilterKey("role");
                  handleClick(e);
                }}
              >
                {d.role}
              </p>
              <p
                onClick={(e) => {
                  setFilterKey("level");
                  handleClick(e);
                }}
              >
                {d.level}
              </p>
              {d.languages.map((lan, i) => (
                <p
                  key={i}
                  onClick={(e) => {
                    setFilterKey("languages");
                    handleClick(e);
                  }}
                >
                  {lan}
                </p>
              ))}
              {d.tools.map((tool, i) => (
                <p
                  key={i}
                  onClick={(e) => {
                    setFilterKey("tools");
                    handleClick(e);
                  }}
                >
                  {tool}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
