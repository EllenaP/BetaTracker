import { Injectable } from '@angular/core';
import { ENV } from '@app/config'

declare var process: any;

@Injectable()
export class AppConfig {
    public apiBaseUrl: string;
    public apiUrl: string;

    constructor() {
        this.apiBaseUrl = this.readString('API_URL');
        this.apiUrl = this.readString('API_URL');
        console.log(ENV);
    }

    private readString(key: string, defaultValue?: string): string {
        const v = ENV[key];
        return v === undefined ? defaultValue : String(v);
    }
}