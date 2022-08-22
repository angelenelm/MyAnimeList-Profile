import React from "react";
import startCase from "lodash.startcase";
import { convertIsoDate } from "../utils";
import { StyledMilestonesGrid } from "../styles";

const MilestonesGrid = ({ type, mediaList }) => {
  return (
    <StyledMilestonesGrid>
      {Object.entries(mediaList).map((item, index) => {
        return (
          <div key={index} className="media">
            <p className="media__title">{startCase(item[0])}</p>

            <a
              href={`https://myanimelist.net/${type}/${item[1].node.id}`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="media__img"
                src={item[1].node.main_picture.large}
                alt={
                  item[1].node.alternative_titles.en
                    ? item[1].node.alternative_titles.en
                    : item[1].node.title
                }
              />
            </a>

            <p className="media__label">
              {item[0] === "oldest" || item[0] === "newest"
                ? `Aired ${convertIsoDate(item[1].node.start_date)}`
                : item[0] === "highestRanked"
                ? `${item[1].list_status.score} vs avg score: ${item[1].node.mean}`
                : item[0] === "mostPopular"
                ? `#${item[1].node.popularity}, vs #1: Attack on Titan`
                : item[0] === "mostEpisodes"
                ? `Watched ${item[1].list_status.num_episodes_watched} / ${item[1].node.num_episodes} episodes`
                : ""}
            </p>
          </div>
        );
      })}
    </StyledMilestonesGrid>
  );
};

export default MilestonesGrid;
