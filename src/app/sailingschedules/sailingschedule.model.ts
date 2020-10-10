export interface ScheduleModel {
  id: string;
  vessel: Vessel;
  voyageNumber: string;
  productType: string;
  cutOff: string;
  cutOffIMO: string;
  etd: string;
  eta: string;
  transitTimePortToPort: number;
  transitTimeCutOffToPort: number;
  comments: string;
}
export interface ScheduleModel1 {
  id: string;
  vessel: Vessel;
  voyageNumber: string;
  productType: string;
  cutOff: string;
  cutOffIMO: string;
  etd: string;
  eta: string;
  carrier: Carrier;
  placeOfReceipt: Place;
  portOfLoading: Place;
  hub: Place;
  portOfDischarge: Place;
  transitTimePortToPort: number;
  transitTimeCutOffToPort: number;
  comments: string;
}
export interface Vessel {
  name: string;
  imoNumber: string;
}
export interface Carrier {
  name: string;
  scac: string;
}
export interface Place {
  unCode: string;
  countryCode: string;
  name: string;
  stateName: string;
}
export interface Location {
  name: string;
  un: string;
}
