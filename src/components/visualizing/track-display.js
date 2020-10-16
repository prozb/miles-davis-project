import "./track-display.css";
import React, { Component } from "react";
import "react-vertical-timeline-component/style.min.css";
import Avatar from "react-avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { MusicianTooltip, InstrumentTooltip } from "./tooltip";
/**
 * @author Pavlo Rozbytskyi
 * component for representation of all musicians played on current traсk
 * and which instrument played this musician on this track
 */
export default class TrackDisplay extends Component {
  constructor(props) {
    super(props);

    this.musicians = [];
    this.instruments = [];
  }
  render() {
    const {
      name,
      album,
      className,
      data,
      hideTrackDisplay,
      instruments,
      musicians,
      style,
      show,
    } = this.props;

    if (!show) return null;

    return (
      <div className="row mx-auto" style={{ height: "70%", width: "95%" }}>
        <div className="w-100 h-100 col-lg-8 mx-auto box-shadow box-radius overflow-auto hide-scrollbar">
          <div className="w-100 row overflow-auto mx-auto">
            <div className="w-100 row mx-auto">
              <div className="w-100">
                <div className="row w-100 mt-4">
                  <div className="col-11">
                    <h2 className="custom-h2">{name}</h2>
                  </div>
                  <div className="col-1 p-1 text-right">
                    <FontAwesomeIcon
                      className="float-right"
                      icon={faTimes}
                      onClick={hideTrackDisplay}
                    />
                  </div>
                </div>

                <h5 className="text-secondary info-text">
                  On "{album.id}" album
                </h5>
              </div>
              <div className="row w-100 mx-auto">
                <p className="ml-2 text-secondary">{musicians} musicians</p>
                <p className="text-secondary ml-auto">
                  {instruments} instruments
                </p>
              </div>
            </div>

            <div className="col">{data}</div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * getting tooltip of musician or instrument
   * @param {Object} node - musician or instrument object
   * @param {String} type - type of node: musician or instrument
   */
  getTooltip = (node, type) => {
    switch (type) {
      case "musician":
        // displaing tooltip for the musician
        return <MusicianTooltip musician={node} />;
      case "instrument":
        return <InstrumentTooltip instrument={node} />;
      default:
        return null;
    }
  };
}
