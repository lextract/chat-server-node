import {Router, Request, Response} from 'express';

import { API_PATH } from '../constants';

import * as fakePU from '../fakePersistenceUnit';

export const endPoint = API_PATH + '/conversations';
export const router = Router();

router.route('/')
    .get(function(req: Request, res: Response){
        // TODO: read idUser from jwt, return all conversations
        res.json("convs2");
    })
    .post(function(req: Request, res: Response){
        // TODO: add new conversation to persistence unit
        console.log(req.body);
        //convs2.push(req.body);
        fakePU.createConv(req.body);
        res.status(204).json("OK");
    });

router.route('/:id')
    .get(function(req: Request, res: Response){
        //req.body
        //let fc = convs2.filter(c => c.id == +req.params.id);
        res.json("fc");
    })
    .put(function(req: Request, res: Response){
        res.json("updating user by id: " + req.params.id);
    })
    .delete(function(req: Request, res: Response){
        res.json("conversation deleted: " + req.params.id);
    });

router.route('/:id/users')
    .post(function(req: Request, res: Response){
        // TODO: add new conversation to persistence unit
        console.log(req.body);
        //convs2.push(req.body);
        res.status(204).json("OK");
    })
    .delete(function(req: Request, res: Response){
        res.json("conversation deleted: " + req.params.id);
    });
