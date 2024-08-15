import { useMemo } from "react"
import { useLoaderData } from "react-router-dom";

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { AlertTitle } from "@/components/ui/alert";

// const chartData = [
//   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//   { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
//   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//   { browser: "other", visitors: 90, fill: "var(--color-other)" },
// ]

const chartConfig = {
  values: {
    label: "Value",
  },
  cost: {
    label: "Cost",
    color: "#E23670",
  },
  life: {
    label: "Life value",
    color: "#2EB88A",
  },
} satisfies ChartConfig

interface crmProps {
  name:string,
  cost:number,
  life:number
}
function BarChartComponent({info, rate}:{info:crmProps, rate:number}) {

  const infoChart = useMemo(()=>Object.entries(info)
  .filter(([key, values]) => typeof values === 'number')
  .map(([key, values]) => ({ metric: key, values, fill: `var(--color-${key})` })),[])

  console.log(infoChart);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Name of lead: {info.name}</CardTitle>
        <CardDescription>Use lead data to identify ideal customers, personalize marketing, improve sales, measure success, and make informed decisions.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={infoChart}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="metric"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="values" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="values" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
        Conversion rate {rate}% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total values of the leads from CRM
        </div>
      </CardFooter>
    </Card>
  )
}

export default function Ads() {
  const data = useLoaderData();
  return (
    <div>
      <p className="text-4xl">
        Data From CRM System
      </p>
      <AlertTitle className="mt-10">Leads data:</AlertTitle>
      <AlertTitle className='mt-10 flex gap-5'>
        <p className='flex items-center gap-1'>
          <div className='bg-[#E23670] w-5 h-5'></div>
          <span>Cost</span>
        </p>
        <p className='flex items-center gap-1'>
          <div className='bg-[#2EB88A] w-5 h-5'></div>
          <span>Life value</span>
        </p>
      </AlertTitle>
      <section className="grid grid-cols-2  mx-auto gap-5 mt-3 mb-10">
        {
          data.leads.map((infoCRM,i)=><BarChartComponent
            key={i}
            info={{
              name:infoCRM.nombre,
              cost:infoCRM.costoAdquisición,
              life:infoCRM.valorDeVida,
            }}
            rate={data.tasaConversión}
          />)
        }
      </section>
    
  </div>)
}