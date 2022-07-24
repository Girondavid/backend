import { Router } from 'express';
import { createUser, deleteUser, getUSers, postUserLoginName, updateUser } from '../controllers/controllerORM.user';
import { dataPost, getData, getLoginUser, getUser } from '../controllers/task.controllers';
class RoutersUser{
    router: Router;
    constructor() {
        this.router = Router();
        this.Routes();
    }
    Routes():void {
        this.router.get('/login', getData);
        this.router.post('/logging', getLoginUser);
        this.router.get('/login/:id', getUser);
        this.router.post('/user', createUser);
        this.router.get('/users', getUSers);
        this.router.post('/sing_user', postUserLoginName);
        this.router.put('/user/:id', updateUser);
        this.router.delete('/use/:id', deleteUser);
        this.router.post('/signin', dataPost);
    }
}
const router= new RoutersUser();
export default router.router;
