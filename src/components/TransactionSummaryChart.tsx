import Chart from "chart.js/auto";
import { useEffect, useRef, useState } from "react";

// Summary of blocks by period, 8064 is roughly a week
const BLOCKS_PERIOD = 8064;

const ORCHARD_ACTIVATION = 1687104;

interface TransactionsSummaryChartProps {
  dataUrl: string;
  pool: String;
  cumulative: boolean;
  filter: boolean;
}

/**
 * Type of values from the shielded transaction over time. Each datum is
 * transaction amount at a given height.
 */
type ShieldedTransactionDatum = {
  height: number;
  sapling: number;
  sapling_filter: number;
  orchard: number;
  orchard_filter: number;
};

/**
 * Loads the historic shielded transaction data from a public json file in Github repo
 * @returns Promise of shielded transaction data
 */
async function fetchTransactionData(
  url: string
): Promise<Array<ShieldedTransactionDatum>> {
  const response = await fetch(url);

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const resJson = await response.json();
  return resJson;
}

const TransactionsSummaryChart: React.FC<TransactionsSummaryChartProps> = ({
  dataUrl,
  pool,
  cumulative,
  filter,
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  console.log({ dataUrl });

  /* State for chart data loaded from server */
  const [chartData, setChartData] = useState(
    [] as Array<ShieldedTransactionDatum>
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  /* State for custom timeframe */
  const [startHeight, setStartHeight] = useState(0);
  const [endHeight, setEndHeight] = useState(Infinity);

  /* State as min and max block height to define boundaries */
  const [minHeight, setMinHeight] = useState(0);
  const [maxHeight, setMaxHeight] = useState(Infinity);


  useEffect(() => {
    setIsLoading(true);
    fetchTransactionData(dataUrl)
      .then((data) => {
        console.log({ data: data[0] });

        setChartData(data);

        // Set the min and max block heights based on the data
        const heights = data.map(d => d.height);
        setMinHeight(Math.min(...heights))
        setMaxHeight(Math.max(...heights))
        // setStartHeight(data[0].height);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, [dataUrl]);

  useEffect(() => {
    if (isLoading || !chartRef.current) return;

    let saplingSum = 0;
    let saplingFilterSum = 0;
    let orchardSum = 0;
    let orchardFilterSum = 0;

    const chartDataSum = chartData.map((d) => {
      saplingSum += d.sapling;
      saplingFilterSum += d.sapling_filter;
      orchardSum += d.orchard;
      orchardFilterSum += d.orchard_filter;

      return {
        height: d.height,
        sapling: saplingSum,
        sapling_filter: saplingFilterSum,
        orchard: orchardSum > 0 ? orchardSum : null,
        orchard_filter: orchardFilterSum > 0 ? orchardFilterSum : null,
      } as ShieldedTransactionDatum;
    });

    let lastIndex = chartDataSum.length - 1;

    // let chartDataPeriod = chartDataSum.filter(d => (d.height % BLOCKS_PERIOD == 0) || d.height >= chartDataSum[lastIndex].height);

    // let chartDataPeriod = chartDataSum;;

    /* NOTE: filter with custome timeframe (startHeight and endHeight) */
    let chartDataPeriod = chartDataSum.filter((d) => {
      console.log({ height: d.height });

      return (
        (d.height >= startHeight &&
          d.height <= endHeight &&
          d.height % BLOCKS_PERIOD == 0) ||
        d.height >= chartDataSum[lastIndex].height
      );
    });

    if (!cumulative) {
      chartDataPeriod = [];
      saplingSum = 0;
      saplingFilterSum = 0;
      orchardSum = 0;
      orchardFilterSum = 0;

      chartData.forEach((d) => {
        saplingSum += d.sapling;
        saplingFilterSum += d.sapling_filter;
        orchardSum += d.orchard;
        orchardFilterSum += d.orchard_filter;

        // if(d.height % 32256 == 0) {
        if (
          d.height % BLOCKS_PERIOD == 0 ||
          d.height >= chartDataSum[lastIndex].height
        ) {
          chartDataPeriod.push({
            height: d.height,
            sapling: saplingSum,
            sapling_filter: saplingSum - saplingFilterSum,
            orchard: orchardSum > 0 ? orchardSum : null,
            orchard_filter:
              orchardFilterSum > 0 ? orchardSum - orchardFilterSum : null,
          } as ShieldedTransactionDatum);

          saplingSum = 0;
          saplingFilterSum = 0;
          orchardSum = 0;
          orchardFilterSum = 0;
        }
      });
    }

    // If displaying only orchard, filter height, so chart looks clean
    if (pool == "orchard") {
      const orchardOnly = chartDataPeriod.filter(
        (d) => d.height >= ORCHARD_ACTIVATION
      );
      chartDataPeriod = orchardOnly;
    }

    const saplingChart = {
      label: "Sapling",
      data: chartDataPeriod.map((d) => d.sapling),
      backgroundColor: "rgba(75, 192, 192, 0.4)",
      borderColor: "rgba(75, 192, 192, 1)",
      fill: "origin",
      radius: 1,
    };

    const saplingFilterChart = {
      label: "Sapling Filter",
      data: chartDataPeriod.map((d) => d.sapling_filter),
      backgroundColor: "rgba(54, 162, 235, 0.4)",
      borderColor: "rgba(54, 162, 235, 1)",
      fill: "origin",
      radius: 1,
    };

    const orchardChart = {
      label: "Orchard",
      data: chartDataPeriod.map((d) => d.orchard),
      backgroundColor: "rgba(255, 159, 64, 0.4)",
      borderColor: "rgba(255, 159, 64, 1)",
      fill: "origin",
      radius: 1,
    };

    const orchardFilterChart = {
      label: "Orchard Filter",
      data: chartDataPeriod.map((d) => d.orchard_filter),
      backgroundColor: "rgba(255, 99, 132, 0.4)",
      borderColor: "rgba(255, 99, 132, 1)",
      fill: "origin",
      radius: 1,
    };

    const chartSets = [];
    if (pool == "default" || pool == "orchard") {
      if (filter) chartSets.push(orchardFilterChart);
      chartSets.push(orchardChart);
    }
    if (pool == "default" || pool == "sapling") {
      if (filter) chartSets.push(saplingFilterChart);
      chartSets.push(saplingChart);
    }

    const chartInstance = new Chart(chartRef.current, {
      type: cumulative ? "line" : "bar",
      // type: 'line',
      data: {
        labels: chartDataPeriod.map((d) => d.height.toString()),
        datasets: chartSets,
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            enabled: true,
            callbacks: {
              label: function (context: any) {
                return `${context.dataset.label}: ${context.raw}`;
              },
            },
          },
        },
        scales: {
          x: {
            stacked: cumulative ? false : true,
          },
          y: {
            stacked: cumulative ? false : true,
            // beginAtZero: true,
          },
        },
      },
    });

    // Cleanup the chart on unmount
    return () => {
      chartInstance.destroy();
    };
  }, [chartData, pool, cumulative, filter, startHeight, endHeight, isLoading]);

  if (isLoading) return <p>Loading ...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "600px",
        width: "100%",
      }}
    >
      <div className="mb-3">
        <input
          type="number"
          name="startHeight"
          value={startHeight}
          onChange={(e) => setStartHeight(Number(e.target.value))}
          placeholder="Start Height"
        />
        <input
          type="number"
          name="endHeight"
          value={endHeight}
          onChange={(e) => setEndHeight(Number(e.target.value))}
          placeholder="End Height"
        />
      </div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default TransactionsSummaryChart;
