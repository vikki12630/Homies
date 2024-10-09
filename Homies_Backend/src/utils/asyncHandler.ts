import { Request, Response, NextFunction } from "express";

const asyncHandler = (
  requestHandler: (
    request: Request,
    response: Response,
    next: NextFunction
  ) => Promise<any>
) => {
  return (request: Request, response: Response, next: NextFunction): void => {
    Promise.resolve(requestHandler(request, response, next)).catch(
      (error: any) => next(error)
    );
  };
};

export { asyncHandler };
