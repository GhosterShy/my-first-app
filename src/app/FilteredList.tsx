"use client";
import DrinkCard from './drinkCard';
import { useSearchParams } from "next/navigation";
import {useState} from 'react'

interface Props {
  posts: Drink[];
}
interface CartItem extends Drink {
  quantity: number;
}


export default function FilteredList({ posts }: Props) {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";


  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product:Drink) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1}: item));
    } else {
      setCart([...cart, {...product, quantity: 1}]);
    }
  };


  const filtered = posts.filter((item) =>
    item.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
   <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
   
               {filtered.map((post:any) => (
                   <DrinkCard key={post.id} id={post.id} name={post.name} imageUrl={post.imageUrl} price={post.price} onAddToCart={() => addToCart(post)}/>
               ))}
   
           </div>
  );
}
