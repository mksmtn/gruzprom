import { of } from 'rxjs';
import * as TE from 'fp-ts/TaskEither';
import { TaskEitherInterceptor } from './task-either.interceptor';
import { ExecutionContext, InternalServerErrorException } from '@nestjs/common';

describe('TaskEitherInterceptor', () => {
  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(new TaskEitherInterceptor()).toBeDefined();
  });

  it('should throw error if left', (done) => {
    expect.assertions(1);
    const interceptor = new TaskEitherInterceptor();
    interceptor
      .intercept({} as ExecutionContext, {
        handle() {
          return of(TE.left(new InternalServerErrorException()));
        },
      })
      .subscribe({
        error: (e) => {
          expect(e).toBeInstanceOf(InternalServerErrorException);
          done();
        },
        next: () => fail(),
      });
  });

  it('should emit value if right', (done) => {
    const intercept = new TaskEitherInterceptor();
    expect.assertions(1);
    intercept
      .intercept({} as ExecutionContext, {
        handle() {
          return of(TE.right({ a: 1 }));
        },
      })
      .subscribe({
        error: () => fail(),
        next: (data) => {
          expect(data).toEqual({ data: { a: 1 } });
          done();
        },
      });
  });
});
