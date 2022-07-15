import { Divider, Grid, HStack, Image, Text, VStack } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { WeatherType } from "../pages/weather";

function Weatherbox({
  data,
  tempUnit,
}: {
  data: WeatherType;
  tempUnit: boolean;
}) {
  const temp = data.Temperature.Maximum.Value;
  const c = ((temp - 32) * 5) / 9;
  const celsius = Math.round(c * 10) / 10;
  const date = data.Date;
  return (
    <>
      <VStack w={"100%"}>
        <Text pt={1}>{moment(date).format("MMMM Do YYYY")}</Text>

        <Grid
          templateColumns={"1fr 1fr 1fr"}
          w={"100%"}
          mx={"auto"}
          pr={5}
          pl={5}
          pt={5}
        >
          <HStack pl={5}>
            {tempUnit ? (
              <div>
                <Text fontSize={"24px"} fontFamily={"heading"}>
                  {data.Temperature.Maximum.Value} ℉
                </Text>
              </div>
            ) : (
              <div>
                <Text fontSize={"24px"} fontFamily={"heading"}>
                  {celsius} ℃
                </Text>
              </div>
            )}
          </HStack>
          <HStack>
            <Text fontSize={"12px"}>{data.Day.IconPhrase}</Text>
          </HStack>
          <VStack align={"end"}>
            <Image w={"48px"} src={`/icons/${data.Day.Icon}.svg`} />
          </VStack>
        </Grid>
      </VStack>
      <Divider w={"85%"} />
    </>
  );
}

export default Weatherbox;
