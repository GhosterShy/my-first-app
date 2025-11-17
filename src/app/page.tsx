'use client';
import { useEffect, useState } from 'react';
import DrinkCard from './drinkCard';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useSearchParams, useRouter } from "next/navigation";





export default function Home() {

const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(true);


const router = useRouter();
const searchParams = useSearchParams();
const q = searchParams.get("q") || "";


const [value, setValue] = useState(q);

interface CartItem extends Drink {
  quantity: number;
}



const [cart, setCart] = useState<CartItem[]>([]);
const [isCartOpen, setIsCartOpen] = useState<boolean>(false);



useEffect(() => {
  const fetchData = async () => {
    try{
      const response = await axios.get('https://2a8fac2d5c839200.mokky.dev/products')
      setPosts(response.data);
      setLoading(false);
    }
    catch(error){
      console.error('Error :', error);
      setLoading(false);
    }
  };
  
  fetchData();
  
},[]);


const handleSearch = (e:any) => {
    const text = e.target.value;
    setValue(text);

    const params = new URLSearchParams();
    if (text) params.set("q", text);

    router.push(`/?${params.toString()}`);
  };

  const filtered = posts.filter((item:Drink) =>
    item.name.toLowerCase().includes(q.toLowerCase())
  );




 if (loading) {
        return (
          <div className="loading-container">
          <div className="dot-spinner">
    <div className="dot-spinner__dot"></div>
    <div className="dot-spinner__dot"></div>
    <div className="dot-spinner__dot"></div>
    <div className="dot-spinner__dot"></div>
    <div className="dot-spinner__dot"></div>
    <div className="dot-spinner__dot"></div>
    <div className="dot-spinner__dot"></div>
    <div className="dot-spinner__dot"></div>
</div>
          </div>
        );
}



   







const addToCart = (product:Drink) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1}: item));
    } else {
      setCart([...cart, {...product, quantity: 1}]);
    }
  };



  const getTotalPrice = (): number => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = (): number => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const openCart = (): void => setIsCartOpen(true);
  const closeCart = (): void => setIsCartOpen(false);




  return (
  <>
      <nav className="navbar navbar-expand-lg bahandi-navbar">
        <div className="container-fluid">
            <a className="navbar-brand text-white fw-bold ms-3" href="#">BAHANDI</a>

             <form className="d-flex search_div">
                  <input  value={value||""} onChange={handleSearch} className="form-control me-2" type="search" placeholder="Найти..." aria-label="Search" style={{border:'none'}}/>
                  <button style={{backgroundColor:'#e04d1cff',border:'none',color:'#fff'}} className="btn btn-outline-success" type="submit">Найти</button>
                </form>

            <div className="collapse navbar-collapse justify-content-end me-3" id="navbarNav">

                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link text-white" href={`/burgers`}>Бургеры</Link>
                        
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" href="#">Напитки</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" href="#">Комбо</a>
                    </li>
                    
                    <li className="nav-item">
                        <button onClick={openCart} className=" nav-link btn btn-danger ms-2 px-3 py-1 " >Корзина</button>
                    </li>
                </ul>

                
            </div>
        </div>
    </nav>

   
    <div className="container mt-5 mb-5">
        <h2 className="section-title mb-4">Напитки</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">


            {filtered.map((post:any) => (
                <DrinkCard key={post.id} id={post.id} name={post.name} imageUrl={post.imageUrl} price={post.price} onAddToCart={() => addToCart(post)}/>
            ))}

        </div>
    </div>



    
    {/* <div className="mt-5 p-4 border rounded">
        <h3>Корзина ({getTotalItems()} товаров)</h3>
        {cart.length === 0 ? (
          <p className="text-muted">Корзина пуста</p>
        ) : (
          <div>
            {cart.map(itemCart => (
              <div key={itemCart.id} className="d-flex justify-content-between align-items-center border p-3 mb-2 rounded">
                <div>
                  <h5 className="mb-1">{itemCart.name}</h5>
                  <p className="mb-0 text-muted">{itemCart.price} ₸ x {itemCart.quantity} = {itemCart.price * itemCart.quantity} ₸</p>
                </div>
              </div>
            ))}
            <div className="border-top pt-3 mt-3">
              <h4 className="text-end">Общая сумма: <strong>{getTotalPrice()} ₸</strong></h4>
              <div className="text-end">
                <button className="btn btn-success btn-lg mt-2">
                  Оформить заказ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
     */}


      <div className={`side-cart ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3 className="cart-title">Корзина</h3>
          <button onClick={closeCart} className="close-btn">×</button>
        </div>
        


        <div className="cart-items">
          {cart.length === 0 && <p className="empty-cart">Корзина пуста</p>}

          {/* {cart.map(item => (
            <div key={item.id} className="cart-item">
              <span>{item.name}</span>
              <span>{item.price * item.quantity} ₸</span>
              <span>Кол-во: {item.quantity}</span>
            </div>
          ))} */}

          {cart.map(item => (
           <div key={item.id} className="card mb-3" style={{backgroundColor: 'rgb(157 243 176)',border: 'none'}}>
            <div className="card-body">
              <div className="row">

              <div className="col" style={{alignItems:"center",display:"flex"}}>
                <div className='cart_img_div'>
                  <img src={item.imageUrl} className="cart_img" alt={item.name} />
                </div>
                
              </div>

              <div className="col">
              <h5 className="product-title"><p>{item.name}</p></h5>
              <h4 className="card-text">Кол-во: {item.quantity}</h4>
              <h4 className="card-text cart_price">Цена: {item.price} ₸</h4>
              <h4 className="card-text item_total">Итого: {item.price * item.quantity} ₸</h4>
              </div>
            </div>
            </div>
          </div>


            
          ))}


        </div>

        <div className="cart-footer row">
          <div className="col text-end">
            <button className="btn btn-outline-success">Оформить заказ</button>
          </div>
            <div style={{fontWeight:"bold"}} className="total col align-self-center text-start">
              Итого: {getTotalPrice()} ₸
            </div>
        </div>
      </div>

      {isCartOpen && <div className="cart-overlay" onClick={closeCart} />}







 



    <footer className="bahandi-footer py-5">
        <div className="container">
            <div className="row">
                <div className="col-md-6 text-white mb-3 mb-md-0">
                    <h3 className="fw-bold">BAHANDI</h3>
                    <p className="small text-muted">&copy; 2024 ТОО Баханди. Все права защищены</p>
                </div>
                <div className="col-md-6 text-white">
                    <h5 className="fw-bold mb-3">Компания</h5>
                    <ul className="list-unstyled">
                        <li><a href="#" className="text-white text-decoration-none small">Франшиза</a></li>
                        <li><a href="#" className="text-white text-decoration-none small">Вакансии</a></li>
                        <li><a href="#" className="text-white text-decoration-none small">Оферта</a></li>
                        <li><a href="#" className="text-white text-decoration-none small">Политика конфиденциальности</a></li>
                        <li><a href="#" className="text-white text-decoration-none small">Карта сайта</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>

   
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  </>



  );
}
