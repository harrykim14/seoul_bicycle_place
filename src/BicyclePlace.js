import React from "react";
import PropTypes from "prop-types";

function BicyclePlace({ stationId, stationName, shared, rackTotCnt }) {
  let dot = stationName.indexOf(".");
  let stationNum = stationName.slice(0, dot);
  let slicedName = stationName.slice(dot + 1);
  let naverMapLink =
    "https://map.naver.com/v5/search/" + slicedName.trim(" ", "");

  return (
    <tr>
      <td>{stationId}</td>
      <td>{stationNum}</td>
      <td>
        <a href={naverMapLink}>{slicedName}</a>
      </td>
      <td>
        {rackTotCnt - shared < 10 || rackTotCnt === 0
          ? "0" + parseInt(rackTotCnt - shared)
          : rackTotCnt - shared}
        / {parseInt(rackTotCnt) < 10 ? "0" + rackTotCnt : rackTotCnt}
      </td>
    </tr>
  );
}

BicyclePlace.propTypes = {
  stationId: PropTypes.string,
  stationName: PropTypes.string,
  shared: PropTypes.string.isRequired,
  rackTotCnt: PropTypes.string,
};

export default BicyclePlace;
