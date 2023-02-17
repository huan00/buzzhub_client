import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'

const Weather = () => {
  const [location, setLocation] = useState({ lat: null, lon: null })
  const [weather, setWeather] = useState(null)
  const theme = useTheme()
  const key = process.env.REACT_APP_WEATHER_API_KEY
  // http://api.weatherapi.com/v1/current.json?key=854e30aa5c3b4dea83c203043231702&q=London&aqi=no

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          })
        },
        (error) => {
          console.log(error)
        }
      )
    } else {
      console.log('Location not avalible')
    }
  }

  const getWeather = async () => {
    const res = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${key}&q=${location.lat},${location.lon}`
    )

    const data = await res.json()
    setWeather(data)
  }

  useEffect(() => {
    getLocation()
  }, [])

  useEffect(() => {
    getWeather()
  }, [location])

  console.log(weather.current)

  return (
    <Box
      backgroundColor={theme.palette.neutral.light}
      mb="1rem"
      borderRadius="5px"
      p="1rem"
    >
      <Typography variant="h5">Current Weather</Typography>
      {weather && (
        <Box>
          <Typography>
            {weather.location.name}, {weather.location.region}
          </Typography>
          <img src={weather.current?.condition?.icon} alt="icon" />
          <Typography>{weather.current?.condition?.text}</Typography>
          <Typography>Current Temp: {weather.current.temp_f}˚</Typography>
        </Box>
      )}
    </Box>
  )
}

export default Weather
