declare module "leaflet-geosearch" {
  import * as L from "leaflet";

  export interface GeoSearchControlOptions extends L.ControlOptions {
    provider: any;
    style?: string;
    showMarker?: boolean;
    showPopup?: boolean;
    marker?: any;
    autoClose?: boolean;
    retainZoomLevel?: boolean;
    searchLabel?: string;
    keepResult?: boolean;
  }

  export class GeoSearchControl extends L.Control {
    constructor(options: GeoSearchControlOptions);
  }

  export class OpenStreetMapProvider {
    constructor(options?: any);
  }
}

declare module "leaflet-geosearch" {
  import * as L from "leaflet";

  export interface GeoSearchControlOptions extends L.ControlOptions {
    provider: any;
    style?: string;
    showMarker?: boolean;
    showPopup?: boolean;
    marker?: any;
    autoClose?: boolean;
    retainZoomLevel?: boolean;
    searchLabel?: string;
    keepResult?: boolean;
  }

  export class GeoSearchControl extends L.Control {
    constructor(options: GeoSearchControlOptions);
  }

  export class OpenStreetMapProvider {
    constructor(options?: any);
    search(options: { query: string }): Promise<
      {
        x: number;
        y: number;
        label: string;
        bounds: [number, number, number, number];
      }[]
    >;
  }
}
