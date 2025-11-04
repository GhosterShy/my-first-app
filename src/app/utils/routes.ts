import path from 'path';
import DetailPage from '../posts/[id]/page';
import HomePage from '../page';



import { HOME_PAGE_ROUT, POSTS_PAGE_ROUT } from './consts';

export const routes = [
{
  path: HOME_PAGE_ROUT,
  element: HomePage
},
{
  path: POSTS_PAGE_ROUT,
  element: DetailPage
}

];





