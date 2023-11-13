import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    weather_icons: string[];
    temperature: number;
    weather_descriptions: string[];
    wind_speed: number;
    wind_dir: string;
    humidity: number;
    pressure: number;
    uv_index: number;
    cloudcover: number;
    visibility: number;
  };
}

const API_KEY = '0a8c6ed4c635549869d0622ede552971';
const WEATHERSTACK_BASE_URL = 'http://api.weatherstack.com';

function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  const getWeatherData = async (latitude: number, longitude: number): Promise<WeatherData> => {
    try {
      const response = await axios.get<WeatherData>(
        `${WEATHERSTACK_BASE_URL}/current?access_key=${API_KEY}&query=${latitude},${longitude}`
      );
      return response.data;
    } catch (error) {
      console.error('Error getting weather data:', error.message);
      throw error;
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const data = await getWeatherData(latitude, longitude);
            setWeatherData(data);
            setLoading(false);
          },
          (error) => {
            console.error('Error getting location:', error.message);
            setLoading(false);
          }
        );
      } catch (error) {
        console.error('Error getting location or weather data:', error.message);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="weather-container">
      <h2>Weather Information</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="weather-info">
          <h3>{weatherData?.location.name}, {weatherData?.location.region}, {weatherData?.location.country}</h3>
          <p>Local Time: {weatherData?.location.localtime}</p>
          <img src={weatherData?.current.weather_icons[0]} alt="Weather Icon" />
          <p>Temperature: {weatherData?.current.temperature}°C</p>
          <p>Condition: {weatherData?.current.weather_descriptions[0]}</p>
          <p>Wind: {weatherData?.current.wind_speed} m/s, {weatherData?.current.wind_dir}</p>
          <p>Humidity: {weatherData?.current.humidity}%</p>
          <p>Pressure: {weatherData?.current.pressure} hPa</p>
          <p>UV Index: {weatherData?.current.uv_index}</p>
          <p>Cloud Cover: {weatherData?.current.cloudcover}%</p>
          <p>Visibility: {weatherData?.current.visibility} km</p>
        </div>
      )}
    </div>
  );
}

export default Weather;