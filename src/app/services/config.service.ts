import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class Config {
  apiUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config: Config;

  constructor(private client: HttpClient) { }

  async loadConfig() {
    const config = await this.client.get<Config>('../../assets/config.json').toPromise();
    return this.config = config;
  }
}

export const configFactory = (configService: ConfigService) => () => configService.loadConfig();