import { IpDomainFilterMiddleware } from './ip-domain-filter.middleware';
import { Request, Response, NextFunction } from 'express';

describe('IpDomainFilterMiddleware', () => {
    let middleware: IpDomainFilterMiddleware;
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        middleware = new IpDomainFilterMiddleware();
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        next = jest.fn();
    });

    describe('with allowed origin', () => {
        it('should call next() if origin is in allowed domains', () => {
            req.headers = { origin: 'http://127.0.0.1:4242' };

            middleware.use(req as Request, res as Response, next);

            expect(next).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
            expect(res.send).not.toHaveBeenCalled();
        });
    });

    describe('with disallowed origin', () => {
        it('should send a 403 status if origin is not in allowed domains', () => {
            req.headers = { origin: 'http://example.com' };

            middleware.use(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.send).toHaveBeenCalledWith('Forbidden.');
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe('with no origin', () => {
        it('should call next() if no origin header is present', () => {
            req.headers = {};

            middleware.use(req as Request, res as Response, next);

            expect(next).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
            expect(res.send).not.toHaveBeenCalled();
        });
    });
});
