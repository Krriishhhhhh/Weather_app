import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Logout } from '../../components/logout';

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
    timezone_id: string; 
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
    } catch (error:any) {
      console.error('Error getting weather data:', error.message);
      throw error;
    }
  };

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
    } catch (error:any) {
      console.error('Error getting location or weather data:', error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchWeather();
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="max-w-md p-6 bg-white rounded-lg shadow-lg w-full text-gray-800">
      <h2 className="text-3xl mb-4 text-center font-bold">Weather Information</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="text-center">
          <h3 className="text-xl mb-2">
            {weatherData?.location?.name}, {weatherData?.location?.region}, {weatherData?.location?.country}
          </h3>
          <p className="text-sm">Local Time: {weatherData?.location?.localtime}</p>
          <img src={weatherData?.current?.weather_icons[0]} alt="Weather Icon" className="mx-auto my-4" />
          <p className="text-lg">Temperature: {weatherData?.current?.temperature}°C</p>
          <p className="text-lg">Condition: {weatherData?.current?.weather_descriptions[0]}</p>
          <p className="text-lg">Wind: {weatherData?.current?.wind_speed} m/s, {weatherData?.current?.wind_dir}</p>
          <p className="text-lg">Humidity: {weatherData?.current?.humidity}%</p>
          <p className="text-lg">Pressure: {weatherData?.current?.pressure} hPa</p>
          <p className="text-lg">UV Index: {weatherData?.current?.uv_index}</p>
          <p className="text-lg">Cloud Cover: {weatherData?.current?.cloudcover}%</p>
          <p className="text-lg">Visibility: {weatherData?.current?.visibility} km</p>
        </div>
      )}
      <div className="absolute top-4 right-4">
        <Logout />
      </div>
    </div>
  </div>
  );
}

export default Weather;