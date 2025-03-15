import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Quiz from '@/components/Quiz';
import { Badge } from '@/components/ui/badge';
import data from '@/data/data.json';


export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <div className='flex justify-center'>
      <Quiz />
      </div>
      

      





      {/* {data.map((item, index) => (
        <div key={index}>
          <h1>{item.city}</h1>
        </div>))} */}


    </div>
  );
}
