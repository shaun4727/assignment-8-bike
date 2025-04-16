import { TErrorSource } from './../interface/error'
/* eslint-disable no-unused-vars */
import { PrismaClient } from '@prisma/client'

import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import config from '../config'
import { handleDuplicateError } from '../errors/handleDuplicateError'
import { handleZodError } from '../errors/handleZodError'
import AppError from '../utils/AppError'

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500
  const prisma = new PrismaClient()
  let message = 'Something went wrong!'
  let error: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ]

  if (err instanceof prisma.PrismaClientValidationError) {
    message = 'Validation Error'
    error = err.message
  } else if (err instanceof prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      message = 'Duplicate Key error'
      error = err.meta
    }
  }

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    error = simplifiedError?.error
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err)

    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    error = simplifiedError?.error
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode
    message = err?.message
    error = [
      {
        path: '',
        message: err?.message,
      },
    ]
  } else if (err instanceof Error) {
    message = err?.message
    error = [
      {
        path: '',
        message: err?.message,
      },
    ]
  }

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error,
    stack: config.node_env === 'development' ? err?.stack : null,
    // error: err
  })
}

export default globalErrorHandler
