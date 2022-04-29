import React from "react";
import { StyledMediaGrid } from "../styles";

const MediaGrid = ({ type, mediaList }) => {
  return (
    <StyledMediaGrid>
      {mediaList.map((item, index) => {
        return (
          <div key={index} className="media">
            <a
              href={`https://myanimelist.net/${type}/${item.node.id}`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="media__img"
                src={item.node.main_picture.large}
                alt={
                  item.node.alternative_titles.en
                    ? item.node.alternative_titles.en
                    : item.node.title
                }
              />
            </a>
            <p className="media__score">{item.list_status.score}/10</p>
          </div>
        );
      })}
    </StyledMediaGrid>
  );
};

export default MediaGrid;
