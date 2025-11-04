interface Drink {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description:string;
}

interface Comment {
  id: number;
  text: string;
  createdAt: string;
  postId:number
}