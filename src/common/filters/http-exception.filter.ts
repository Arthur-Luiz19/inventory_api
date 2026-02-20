import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    console.error('🔴 ==========================================');
    console.error('🔴 ERRO CAPTURADO PELO FILTER');
    console.error('🔴 ==========================================');
    console.error('🔴 URL:', request.url);
    console.error('🔴 Method:', request.method);
    console.error('🔴 Status:', status);
    console.error('🔴 Message:', message);

    if (exception instanceof Error) {
      console.error('🔴 Stack Trace:');
      console.error(exception.stack);
    } else {
      console.error('🔴 Exception:', exception);
    }
    console.error('🔴 ==========================================');

    response.status(status).json({
      success: false,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: message,
    });
  }
}
