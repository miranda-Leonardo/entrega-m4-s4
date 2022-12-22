import { NextFunction, Request, Response } from 'express';
import { AnySchema } from 'yup';
import { AppError } from '../errors/AppError';

const ensureDataIsValidMiddleware = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = await schema.validate(req.body, {
            stripUnknown: true,
            abortEarly: false
        });

        req.body = validatedData;
        return next();
    } catch (error: any) {
        throw new AppError(error.errors);
    };
};

export { ensureDataIsValidMiddleware };