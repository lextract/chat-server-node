import { Router, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bodyParser from 'body-parser';

import { API_PATH, JWT_SECRET } from '../constants';

import * as fakePU from '../fakePersistenceUnit';

export const endPoint = API_PATH + '/auth';
export const router = Router();

router.route("/")
    .post(bodyParser.json(), function (req: Request, res: Response) {
        // TODO: validar estructura y datos de usuario
        let valid = fakePU.validateUser(req.body.email, req.body.password);
        if (valid) {
            let token = jwt.sign({ user: req.body.email }, JWT_SECRET);
            //req.headers['authorization'] = "Bearer " + token;
            res.json({ result: "ok", token: token });
        }
        else {
            res.json({ result: "fail" });
        }
    })
    .put(bodyParser.json(), function (req: Request, res: Response) {
        let user = fakePU.getUser(req.body.email);
        if (user) {
            res.json({ result: "fail", message: "User already exists." });
        }
        else {
            fakePU.createUser(req.body);
            res.status(201).json({ result: "ok" });
        }
    })
    .delete(function (req: Request, res: Response) {
        res.json("deleting user by id: " + req.params.id);
    });
