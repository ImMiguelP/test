import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import Navbar from "../components/navbar";
import styles from "../styles/Calculator.module.css";
const bg = "/mercury.png";

function Calculator() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  const operators = ["/", "*", "+", "-", "."];

  // Updates the Calculator
  const updateCalc = (value: string) => {
    if (
      (operators.includes(value) && calc === "") ||
      (operators.includes(value) && operators.includes(calc.slice(-1)))
    ) {
      return;
    }

    setCalc(calc + value);

    if (!operators.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  };

  //   Gives the total Equal
  const total = () => {
    setCalc(eval(calc).toString());
  };

  //   Deletes Prev Digit Input

  const deleteLast = () => {
    if (calc == "") {
      return;
    }
    const value = calc.slice(0, -1);
    setCalc(value);
  };

  //   Clears Calculator

  const clearCalc = () => {
    if (calc == "") {
      return;
    }
    setCalc("");
    setResult("");
  };

  //   Function to create 1-9 buttons
  const createNumbers = () => {
    const numbers = [];

    for (let i = 1; i < 10; i++) {
      numbers.push(
        <button
          onClick={() => updateCalc(i.toString())}
          className={styles.digits}
          key={i}
        >
          {i}
        </button>
      );
    }
    return numbers;
  };

  return (
    <Box bgImage={bg} bgSize={"cover"} minH="100%" position={"relative"}>
      <Box
        bg={"rgba( 0, 0, 0, 0.55 )"}
        boxShadow={"0 8px 32px 0 rgba( 31, 38, 135, 0.37 )"}
        backdropFilter={"blur( 10.5px )"}
        minHeight="100vh"
      >
        <Navbar />
        <VStack p={"16px"}>
          <Text fontSize={"2xl"} color={"#f67f1a"} fontWeight={"bold"} pb={5}>
            Calculator
          </Text>

          <Box
            overflow={"hidden"}
            bgColor={"#333333"}
            borderRadius={"16px"}
            boxShadow={"0px  2px 64px rgba(246, 127, 26, 0.4)"}
          >
            <Box textAlign={"end"} p={"16px"} mt={"50px"}>
              <Text fontSize={"24px"} color="white">
                {result ? (
                  <span className={styles.spanStyle}>({result})</span>
                ) : (
                  ""
                )}
                {calc || "0"}
              </Text>
            </Box>
            <Box display={"flex"}>
              <button
                onClick={() => updateCalc("/")}
                className={styles.operators}
              >
                /
              </button>
              <button
                onClick={() => updateCalc("*")}
                className={styles.operators}
              >
                *
              </button>
              <button
                onClick={() => updateCalc("+")}
                className={styles.operators}
              >
                +
              </button>
              <button
                onClick={() => updateCalc("-")}
                className={styles.operators}
              >
                -
              </button>
              <button onClick={deleteLast} className={styles.operators}>
                DEL
              </button>
              <button onClick={clearCalc} className={styles.operators}>
                Clear
              </button>
            </Box>
            <Box display={"flex"} flexWrap={"wrap"}>
              {createNumbers()}
              <button onClick={() => updateCalc("0")} className={styles.digits}>
                0
              </button>
              <button onClick={() => updateCalc(".")} className={styles.digits}>
                .
              </button>
              <button onClick={total} className={styles.digits}>
                =
              </button>
            </Box>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}

export default Calculator;
