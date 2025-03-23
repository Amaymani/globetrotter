import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Quiz from '@/components/Quiz';
import { Badge } from '@/components/ui/badge';


export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <div className='flex justify-center'>
      <Quiz />
      </div>
      

    </div>
  );
}
