import { WeatherResponse } from 'shared-types';

class WeatherClient {
  private baseURL: string;

  constructor(private apiKey: string) {
    this.baseURL = 'http://api.weatherapi.com/v1';
  }

  public async getCurrentWeather(
    city: string,
    aqi: string = 'no',
  ): Promise<WeatherResponse> {
    const response = await fetch(
      `${this.baseURL}/current.json?key=${this.apiKey}&q=${city}&aqi=${aqi}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as WeatherResponse;
  }

  // Add other methods for different endpoints here...
}

export default WeatherClient;
