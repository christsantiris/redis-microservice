import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express'
import { Req } from '../common/interfaces/interfaces';

export = (req: Req, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized'
        });
    }
}