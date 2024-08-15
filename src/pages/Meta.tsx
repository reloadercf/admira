import { useMemo } from "react"
import { useLoaderData } from "react-router-dom";

import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts"

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


const chartConfig = {
  values: {
    label: "Value",
  },  
  cost: {
    label: "Cost",
    color: "#E23670",
  },
  scope: {
    label: "Scope",
    color: "#BC7229",
  },
  interaction: {
    label: "Interaction",
    color: "#2662D9",
  },
  conversions: {
    label: "Conversions",
    color: "#2EB88A",
  },
} satisfies ChartConfig

interface infoCharBar {
  name: string,
  cost: number,
  scope: number,
  interaction: number,
  conversions: number
}
function ChatBar({info}:{info:infoCharBar}) {

  const dataChartBar = useMemo(()=>Object.entries(info)
  .filter(([key, values]) => typeof values === 'number')
  .map(([key, values]) => ({ metric: key, values, fill: `var(--color-${key})`  })),[])


  return (
    <Card>
      <CardHeader>
      <span className='flex text-2xl items-center gap-1'>
          Meta ads information from:<CardTitle> {info.name}</CardTitle>
        </span>
        <CardDescription>
          Use Meta Ads data to optimize targeting, refine messaging, measure ROI,
          understand audience, and improve ad performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={dataChartBar}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="metric"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="values"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                )
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing the data from Meta ads
        </div>
      </CardFooter>
    </Card>
  )
}


export default function Meta() {
  const data = useLoaderData();
  
  const error = console.error;
  console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
  }
  return (
    <div>
      <p className="text-4xl">
        Data From Google ADS
      </p>
      <AlertTitle className="mt-10">Campaigns data:</AlertTitle>
      <AlertTitle className='mt-10 flex gap-5'>
        <p className='flex items-center gap-1'>
          <span className='bg-[#BC7229] w-5 h-5'></span>
          <span>Scope</span>
        </p>
        <p className='flex items-center gap-1'>
          <span className='bg-[#E23670] w-5 h-5'></span>
          <span>Cost</span>
        </p>
        <p className='flex items-center gap-1'>
          <span className='bg-[#2662D9] w-5 h-5'></span>
          <span>Interactions</span>
        </p>
        <p className='flex items-center gap-1'>
          <span className='bg-[#2EB88A] w-5 h-5'></span>
          <span>Conversions</span>
        </p>
      </AlertTitle>
      <section className="grid grid-cols-2  mx-auto gap-5 mt-3 mb-10">
      {data.anuncios.map((infoAdvertisement, i)=>
        <ChatBar 
          key={i}
          info={{
            name:infoAdvertisement.nombre,
            scope:infoAdvertisement.alcance,
            cost:infoAdvertisement.gastoPublicidad,
            interaction:infoAdvertisement.participación,
            conversions: infoAdvertisement.conversiones
          }}
        />
      )}
      </section>
    </div>
  )
}
