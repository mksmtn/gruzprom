import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, concatMap, map } from 'rxjs';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';

function onLeft(e: HttpException | RpcException): never {
  throw e;
}

function onRight(data: unknown) {
  return { data };
}

@Injectable()
export class TaskEitherInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      concatMap((task: TE.TaskEither<HttpException | RpcException, unknown>) =>
        task()
      ),
      map((result) => pipe(result, E.match(onLeft, onRight)))
    );
  }
}
