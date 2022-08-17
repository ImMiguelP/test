import { Button, IconButton } from "@chakra-ui/button";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Grid,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Autocomplete, TextField } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Weatherbox from "../components/weatherbox";

export type WeatherType = {
  Date: string;
  Day: { Icon: string; IconPhrase: string };
  Temperature: { Maximum: { Value: number } };
};

export type CitiesType = {
  LocalizedName: string;
};

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<Array<WeatherType>>([]);
  const [currentWeather, setCurrentWeather] = useState<null | {
    Temperature: { Imperial: { Value: number } };
    WeatherIcon: number;
    WeatherText: string;
  }>(null);
  const [cityName, setCityName] = useState("");
  const [dayTime, setDayTime] = useState<boolean | "">("");
  const [usesF, setUsesF] = useState(true);
  const [date, setDate] = useState("");
  const [celsius, setCelsius] = useState(Number);
  const nightBg = "/night.jpg";
  const dayBg = "/day.jpg";
  const bg = "/bg.jpg";
  const key = "qqdzIjYjXIyK5JbWlDynAnZU2Te9UoRr";
  const [citiesData, setCitiesData] = useState<Array<CitiesType>>([]);
  console.log(citiesData);

  // const getCities = async () => {
  //   const baseUrl =
  //     "http://dataservice.accuweather.com/locations/v1/topcities/50";
  //   const query = `?apikey=${key}`;
  //   const response = await fetch(baseUrl + query);
  //   const data = await response.json();
  //   setData(data);
  // };

  useEffect(() => {
    fetch(
      `http://dataservice.accuweather.com/locations/v1/topcities/50?apikey=${key}`
    )
      .then((response) => response.json())
      .then((response) => setCitiesData(response));
  }, []);

  // Shift Data
  const shiftData = (data: WeatherType[]) => {
    data.shift();
    return data;
  };

  // Get Forecast Info
  const getForecast = async (id: string) => {
    const baseUrl =
      "https://dataservice.accuweather.com/forecasts/v1/daily/5day/";
    const query = `${id}?apikey=${key}`;
    const response = await fetch(baseUrl + query);
    const weatherdata = await response.json();
    const data = Object.values(weatherdata)[1];
    return data as WeatherType[];
  };

  //   Get Current Weather Info
  const getWeather = async (id: string) => {
    const baseUrl = "https://dataservice.accuweather.com/currentconditions/v1/";
    const query = `${id}?apikey=${key}`;

    const response = await fetch(baseUrl + query);
    const data = await response.json();
    return data[0];
  };
  // Get City Info
  const getCity = async (city: string) => {
    const baseUrl =
      "https://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(baseUrl + query);
    const data = await response.json();
    setCityName(data[0].LocalizedName);
    return data[0];
  };

  //  Set Temp to C
  const setC = () => {
    if (currentWeather !== null) {
      const temp = currentWeather.Temperature.Imperial.Value;
      const c = ((temp - 32) * 5) / 9;
      const celsius = Math.round(c * 10) / 10;
      setCelsius(celsius);
      setUsesF(false);
    } else {
      setUsesF(false);
    }
  };
  // Set Temp to F
  const setF = () => {
    setUsesF(true);
  };

  const onSubmit = async () => {
    const data = await getCity(city);
    const results = await getForecast(data.Key);
    const shiftedData = shiftData(results);
    setWeatherData(shiftedData);

    const currentData = await getCity(city);
    const currentResults = await getWeather(currentData.Key);
    setCurrentWeather(currentResults);
    setDayTime(currentResults.IsDayTime);
    const [date, timeWithTimezone] =
      currentResults.LocalObservationDateTime.split("T");
    const [time] = timeWithTimezone.split("-");
    const strings = [date, time];
    setDate(strings.join(" "));
  };

  return (
    <Box
      bgImage={dayTime === "" ? bg : dayTime ? dayBg : nightBg}
      bgSize={"cover"}
      minH="100%"
      position={"relative"}
    >
      <Box
        bg={"rgba( 0, 0, 0, 0.55 )"}
        boxShadow={"0 8px 32px 0 rgba( 31, 38, 135, 0.37 )"}
        backdropFilter={"blur( 10.5px )"}
        color="White"
        minHeight="100vh"
      >
        <Navbar />
        <Box p={5} maxW={"7xl"} mx={"auto"}>
          <VStack>
            <Text fontSize={"2xl"} color={"#f67f1a"} fontWeight={"bold"} pb={5}>
              Miguel Weather Report
            </Text>
            {/* <Stack border={"1px"}>
              <Autocomplete
                disablePortal
                id="Cities"
                options={citiesData}
                isOptionEqualToValue={(options, value) =>
                  options.LocalizedName === value.LocalizedName
                }
                sx={{ width: 300, height: 300 }}
                renderInput={(params) => <TextField {...params} label="city" />}
              />
            </Stack> */}

            <InputGroup>
              <Input
                bg={"#fff"}
                borderColor={"rgba( 255, 161, 0, 1 )"}
                borderRadius={"4px"}
                value={city}
                focusBorderColor={"#f67f1a"}
                color={"black"}
                placeholder={"Search for a City..."}
                _placeholder={{ color: "grey" }}
                onChange={(e: any) => setCity(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSubmit();
                }}
              />
              <InputRightElement>
                <IconButton
                  aria-label={"Search database"}
                  size={"sm"}
                  bg={"#f67f1a"}
                  color={"black"}
                  icon={<SearchIcon />}
                  onClick={onSubmit}
                />
              </InputRightElement>
            </InputGroup>
            <HStack w={"100%"}>
              <VStack align={"end"} w={"100%"} pr={1}>
                <Button
                  size={"xs"}
                  bg={"#f67f1a"}
                  color={"black"}
                  onClick={usesF ? setC : setF}
                >
                  {usesF ? "℉" : "℃"}
                </Button>
              </VStack>
            </HStack>
          </VStack>
        </Box>
        <VStack maxW={"100%"} mx={"auto"} gap={5} mt={"30px"}>
          {currentWeather !== null ? (
            <VStack w={"100%"}>
              <Box
                w={{
                  base: "350px",
                  sm: "75%",
                }}
                mb={5}
                bgImage={dayTime ? dayBg : nightBg}
                bgSize={"cover"}
              >
                <Grid
                  h={"100%"}
                  templateColumns={{
                    base: "1fr",
                    lg: "50% 1fr",
                    xl: "70% 1fr",
                  }}
                >
                  <Box
                    h={"600px"}
                    bgImage={{ base: dayTime ? dayBg : nightBg, lg: "" }}
                    bgSize={"cover"}
                  >
                    <HStack
                      h={"100%"}
                      w={"100%"}
                      align={"end"}
                      p={10}
                      spacing={5}
                    >
                      {usesF ? (
                        <Text fontSize={"48px"} fontFamily={"heading"}>
                          {currentWeather.Temperature.Imperial.Value} ℉
                        </Text>
                      ) : (
                        <Text fontSize={"48px"} fontFamily={"heading"}>
                          {celsius} ℃
                        </Text>
                      )}
                      <Text fontSize={"24px"}>
                        {cityName} <br />{" "}
                        <Text fontSize={"12px"}>
                          {moment(date).format("MMMM Do YYYY, h:mm a")}
                        </Text>
                      </Text>
                      <VStack>
                        <Image
                          src={`/icons/${currentWeather.WeatherIcon}.svg`}
                          w={"64px"}
                          mb={-6}
                        />
                        <Text fontSize={"12px"}>
                          {currentWeather.WeatherText}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                  <VStack
                    bg={
                      dayTime
                        ? "rgba( 0, 0, 0, 0.55 )"
                        : "rgba( 0, 0, 0, 0.15 )"
                    }
                    backdropFilter={"blur( 20.5px )"}
                  >
                    <Text
                      p={3}
                      fontWeight={"bold"}
                      fontSize={"24px"}
                      color={"#f67f1a"}
                    >
                      Weather For Next 4 days
                    </Text>
                    {weatherData.map((data) => {
                      return <Weatherbox data={data} tempUnit={usesF} />;
                    })}
                  </VStack>
                </Grid>
              </Box>
            </VStack>
          ) : (
            <Box>
              <Text></Text>
            </Box>
          )}
        </VStack>
      </Box>
    </Box>
  );
}

export default Weather;
