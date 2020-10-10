import { environment } from 'src/environments/environment';

export const ServiceUrl = {
  api_url: environment.apiurl,
};

export enum API {
  Schedule = '/schedules',
  Codes = '/codes',
}

export enum Methods {
  Locations = '/locations/cfs',
}
