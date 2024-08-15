import {useMemo} from 'react'
import { useLoaderData } from "react-router-dom";
import { Label, Pie, PieChart } from "recharts"
import { AlertTitle } from '@/components/ui/alert';

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


const chartConfig = {
  value: {
    label: "Value",
  },
  cost: {
    label: "cost",
    color: "#E23670",
  },
  prints: {
    label: "prints",
    color: "#2662D9",
  },
  conversions: {
    label: "conversions",
    color: "#2EB88A",
  },
} satisfies ChartConfig

interface infoChart {
  name:string,
  prints:string,
  clicks:number,
  conversions:number,
  cost: number
}

function DonutChart({info}:{info:infoChart}) {

  const dataDonutChart=useMemo(()=>Object.entries(info).filter(([metric, value]) => (typeof value === 'number'&&metric!=='clicks')).map(([metric, value]) => ({ metric, value, fill: `var(--color-${metric})` })),[]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <span className='flex text-2xl items-center gap-1'>
          Name of campaign:<CardTitle> {info.name}</CardTitle>
        </span>
        <CardDescription>
          Google Ads campaigns are essentially because allow you to organize your ads,
          set budgets, target specific audiences, and measure performance. 
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={dataDonutChart}
              dataKey="value"
              nameKey="metric"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {info.clicks}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Clicks
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total info for the campaign <span className='underline decoration-solid'>{info.name}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

export default function Ads() {
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
          <span className='bg-[#E23670] w-5 h-5'></span>
          <span>Cost</span>
        </p>
        <p className='flex items-center gap-1'>
          <span className='bg-[#2662D9] w-5 h-5'></span>
          <span>Prints</span>
        </p>
        <p className='flex items-center gap-1'>
          <span className='bg-[#2EB88A] w-5 h-5'></span>
          <span>Conversions</span>
        </p>
      </AlertTitle>
      <section className="grid grid-cols-2  mx-auto gap-5 mt-3 mb-10">
      {data.campañas.map((infoCampaign,i)=>
      <DonutChart 
      key={i}
      info={{
        name:infoCampaign.nombre,
        prints:infoCampaign.impresiones,
        clicks:infoCampaign.clics,
        conversions:infoCampaign.conversiones,
        cost:infoCampaign.costo
      }}
      /> 
      )}
      </section>
    </div>
  )
}


