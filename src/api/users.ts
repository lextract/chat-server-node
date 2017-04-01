import { Router, Request, Response } from 'express';

import { API_PATH } from '../constants';

import * as fakePU from '../fakePersistenceUnit';

export const endPoint = API_PATH + '/users';
export const router = Router();

router.route('/')
    .get(function (req: Request, res: Response) {
        let users = fakePU.getUsers();
        res.json(users);
    })
    .post(function (req: Request, res: Response) {
        res.json("NOT YET IMPLEMENTED: submit new user");
    });

router.route('/:id')
    .get(function (req: Request, res: Response) {
        res.json("NOT YET IMPLEMENTED: returning user by id: " + req.params.id);
    })
    .put(function (req: Request, res: Response) {
        res.json("NOT YET IMPLEMENTED: updating user by id: " + req.params.id);
    })
    .delete(function (req: Request, res: Response) {
        res.json("NOT YET IMPLEMENTED: deleting user by id: " + req.params.id);
    });
