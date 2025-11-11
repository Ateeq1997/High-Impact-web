"use client";

import React from "react";
import { useMapEvents } from "react-leaflet";

interface Props {
  onDeselect: () => void;
}

/**
 * Simple component that listens for map clicks and calls onDeselect()
 * Useful to clear selection / close popups when user clicks on blank map area.
 */
const MapClickHandler: React.FC<Props> = ({ onDeselect }) => {
  useMapEvents({
    click() {
      onDeselect();
    },
  });

  return null;
};

export default MapClickHandler;
