import { Router } from 'express';
import { getItemsCart, getItemId, postCarItem } from '../controllers/task.controllersCart';
import { createProducts, getProductes } from '../controllers/TaskControllerCartORM';
class RouterCartItem{
    router: Router;
    constructor(){
        this.router = Router();
        this.RoutesCart();
    }
    RoutesCart(){
        this.router.get('/product', getItemsCart);
        this.router.get('/', getProductes);
        this.router.post('/products', createProducts);
        this.router.get('/products/:id', getItemId);

        this.router.post('/postproducts',postCarItem);
    }
}
const routersItem = new RouterCartItem();
export default routersItem.router;