import { useLoaderData } from "react-router-dom";
import {useState, useMemo} from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { AlertTitle } from "@/components/ui/alert"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import Metric from "@/components/dash/Metric";

export const description = "An interactive bar chart"

const chartConfig = {
  views: {
    label: "Total value: ",
  },
  visits: {
    label: "Visits",
    color: "#12A8FF",
  },
  sessions: {
    label: "Sessions",
    color: "#0349F9",
  },
} satisfies ChartConfig


export default function Analytics() {
  const dataGAnalytics = useLoaderData();

  const [activeChart, setActiveChart] =useState<keyof typeof chartConfig>("visits")

  const total = useMemo(
    () => ({
      visits: dataGAnalytics.vistasPagina.reduce((acc, curr) => acc + curr.vistas, 0),
      sessions: dataGAnalytics.sesiones.reduce((acc, curr) => acc + curr.sesiones, 0),
    }),
    []
  )

  const dataGraphic = useMemo(
    ()=>{
      const combinedData = {};
      
      dataGAnalytics.vistasPagina.forEach(vista => {
        combinedData[vista.fecha] = {
          date: vista.fecha,
          visits: vista.vistas
        };
      });
    
      dataGAnalytics.sesiones.forEach(sesion => {
        if (combinedData[sesion.fecha]) {
          combinedData[sesion.fecha] = {
            ...combinedData[sesion.fecha],
            sessions: sesion.sesiones,
            rate: sesion.tasaRebote
          };
        } else {
          combinedData[sesion.fecha] = {
            date: sesion.fecha,
            sessions: sesion.sesiones,
            rate: sesion.tasaRebote
          };
        }
      });
      return Object.values(combinedData);;
    },[]
  )

  const error = console.error;
  console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
  }

  return (<div>
    <p className="text-4xl">
      Data From Google Analytics
    </p>
    <AlertTitle className="mt-10">Demographic data:</AlertTitle>
    <section className="grid grid-cols-4  mx-auto gap-5 mt-3 mb-10">
        {dataGAnalytics.demografía.edad.map((info, i)=><Metric
        key={i}
        quantityFormated={`${info.porcentaje}%`}
        description={`Age group: ${info.rango}`}
        conclusion={`${info.isGrow?'High percentage':'Low percentage'}`}
        isGrow={info.isGrow}
         />)}
         {dataGAnalytics.demografía.género.map((info, i)=><Metric
        key={i}
        quantityFormated={`${info.porcentaje}%`}
        description={`Kind group: ${info.tipo==='hombre'?'Man':'Woman'}`}
        conclusion={`${info.isGrow?'High percentage':'Low percentage'}`}
        isGrow={info.isGrow}
         />)}
      </section>
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Visits in page vs sessions</CardTitle>
          <CardDescription>
            You are showing a Chart Interactive, please click to visits or sesions for change the info
          </CardDescription>
        </div>
        <div className="flex">
          {["visits", "sessions"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={dataGraphic}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>

    </div>
  )
}
