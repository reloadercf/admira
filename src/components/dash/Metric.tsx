import { AlertDescription } from "@/components/ui/alert"
import { TrendingUp, TrendingDown } from "lucide-react"

interface infoProps{
  quantityFormated:string,
  description:string,
  isGrow:boolean,
  conclusion:string,
}

const Metric=({quantityFormated, description, isGrow, conclusion }:infoProps)=>{
      return (
        <article className="bg-white overflow-hidden rounded-2xl h-48 flex flex-col justify-between p-0 border-solid border-2 border-blue-50">
          <AlertDescription className="ml-8">
            <p className="text-5xl text-left font-bold mt-4">{quantityFormated}</p>
            <p className="flex gap-1 text-gray-500">{description}</p>
          </AlertDescription>
          
          <AlertDescription className="flex gap-5 text-center mb-4 items-center">
            {isGrow?<TrendingUp className="h-10 w-10 text-sky-600 ml-8" />:<TrendingDown className="h-10 w-10 text-rose-500 ml-8" />}
            <figcaption className="text-gray-500">{conclusion}</figcaption>
          </AlertDescription>
        </article>
      )
  }

export default Metric;
