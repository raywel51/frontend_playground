import axios, { AxiosError } from "axios";
import { useState } from "react";
import Head from 'next/head'
import Image from "next/image";
import {Grid, TextField, Button, Typography} from "@mui/material";

const CsPage = () => {
  const [winRound, setWinRound] = useState("");
  const [winRoundError, setWinRoundError] = useState("");
  const [winRate, setWinRate] = useState("");
  const [winRateError, setWinRateError] = useState("");
  const [roundsLost, setRoundsLost] = useState("");
  const [roundsPlay, setRoundsPlay] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleWinRoundChange = async (event: {
    target: { value: string };
  }): Promise<void> => {
    let newValue: string = event.target.value.replace(/[^0-9]/g, "");

    if (newValue.length > 16) {
      newValue = newValue.slice(0, 16);
      await timeout(300);
    }

    setWinRound(newValue);
    setWinRoundError("");
  };

  const handleWinRateChange = async (event: {
    target: { value: string };
  }): Promise<void> => {
    const inputValue: string = event.target.value;

    if (/^\d*\.?\d*$/.test(inputValue) || inputValue === "") {
      if (inputValue === "" || parseFloat(inputValue) <= 100) {
        if (countDecimalPlaces(inputValue) <= 2) {
          setWinRate(inputValue);
        } else {
          setWinRate(parseFloat(inputValue).toFixed(2));
        }
      } else if (parseFloat(inputValue) > 100) {
        await timeout(300);
      }
    } else {
    }
    setWinRateError("");
  };

  const countDecimalPlaces = (value: string): number => {
    const decimalPart: string = value.split(".")[1];
    if (decimalPart) {
      return decimalPart.length;
    } else {
      return 0;
    }
  };

  const handleCalculate = async (): Promise<void> => {
    if (!winRound) {
      setWinRoundError("Please Enter win round!");
    }

    if (!winRate) {
      setWinRateError("Please Enter win rate value!");
    }

    try {
      if (winRound && winRate) {
        const roundsWon = parseInt(winRound, 10);
        const winRateValue = parseFloat(winRate);

        const result = await postData(roundsWon, winRateValue);
        if (result != null) {
          if (result.success) {
            console.log("Success:", result.data);

            setRoundsLost(Math.round(result.data["roundsLost"]).toString());
            setRoundsPlay(
              Math.round(result.data["totalRoundsPlayed"]).toString()
            );

            setSuccessMessage("Calculate successfully");
            await timeout(300);
          } else {
            console.error("Error:", result.error);
            await timeout(300);
          }
        }
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleClear = (): void => {
    setWinRound("");
    setWinRate("");
    setRoundsLost("");
    setRoundsPlay("");
    setWinRateError("");
    setWinRoundError("");
    setSuccessMessage("");
  };

  let postData = async (data1: any, data2: any) => {
    const apiDomain = process.env.API_DOMAIN
    const uri = `${apiDomain}/cs/cal-rate/${data1}/${data2}`;
    try {
      const response = await axios.get(uri);

      if (response.status === 400) {
        return { success: false, data: response.data };
      }

      return { success: true, data: response.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.error("Response Data:", axiosError.response.data);

          const errorData = axiosError.response.data as { error: string };

          return { success: false, data: errorData };
        }
      }

      return { success: false, error: error };
    }
  };

  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }

  return (
    <><Head>
      <title>CS2 Calculator</title>
    </Head>
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
        <Grid item xs={12} sm={8} md={6}>
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <div
              className="mb-2"
              style={{ width: "100%", height: "400px", position: "relative" }}
            >
              <div
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                <Image
                  alt="Mountains"
                  src="https://i.kym-cdn.com/photos/images/original/002/679/358/2e3"
                  layout="fill" />
              </div>
            </div>

            <Typography variant="h4" className="mb-2">
              Calculate Play Round CS2 V8
            </Typography>
            <TextField
              type="number"
              label="Win Round"
              placeholder="Win round"
              value={winRound}
              onChange={handleWinRoundChange}
              fullWidth
              variant="outlined"
              error={winRoundError !== ""}
              helperText={winRoundError}
              className="mb-2" />
            <TextField
              type="number"
              label="Win Rate"
              placeholder="Win rate"
              value={winRate}
              onChange={handleWinRateChange}
              fullWidth
              variant="outlined"
              error={winRateError !== ""}
              helperText={winRateError}
              className="mb-2" />
            <Button
              onClick={handleCalculate}
              variant="contained"
              color="primary"
              className="mb-2"
            >
              Calculate
            </Button>
            <Button
              onClick={handleClear}
              variant="contained"
              color="secondary"
              className="mb2 mt-2 ml-2"
            >
              Clear
            </Button>
            <div className="mt-4">
              <Typography variant="body1" className="text-green">
                Rounds Lost: {roundsLost}
              </Typography>
              <Typography variant="body1" className="text-green">
                Rounds Play: {roundsPlay}
              </Typography>
            </div>
            {successMessage && (
              <Typography variant="body1" className="text-green mt-2">
                {successMessage}
              </Typography>
            )}
          </div>
        </Grid>
      </Grid></>
  );
};

export default CsPage;
