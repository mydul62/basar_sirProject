import Publicaton from "@/src/components/dashboard/Pages/Publicaton";
import { GetAllPublicatons } from "@/src/services/Publications";

const page =async () => {
const  {data} = await GetAllPublicatons()
console.log(data)
  return (
    <div>
      <Publicaton publications= {data}></Publicaton>
    </div>
  );
};

export default page;