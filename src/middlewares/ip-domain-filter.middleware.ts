import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IpDomainFilterMiddleware implements NestMiddleware {
    private readonly allowedDomains = ['http://127.0.0.1:4242']; // Liste de domaines autorisés

    use(req: Request, res: Response, next: NextFunction) {
        const origin = req.headers.origin;
        if (origin ? this.allowedDomains.includes(origin) : true) {
            next();
        } else {
            res.status(403).send('Votre adresse IP ou domaine d\'origine n\'est pas autorisé.');
        }
    }
}
