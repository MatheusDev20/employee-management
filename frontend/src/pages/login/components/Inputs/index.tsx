import clsx from 'clsx'
import React, { type InputHTMLAttributes, type ReactNode } from 'react'
import { CiCircleAlert } from 'react-icons/ci'

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  wSize: 'small' | 'medium' | 'large'
  icon: ReactNode
  label: string
  error: string[] | null
}

const classes = {
  mediumInput: 'w-1/2',
  largeInput: 'w-full',
  smallInput: 'w-1/4',
}

export const LoginInput = ({
  wSize,
  icon,
  label,
  error,
  ...rest
}: CustomInputProps): React.JSX.Element => {
  return (
    <div
      className={clsx(
        {
          [classes.mediumInput]: wSize === 'medium',
          [classes.largeInput]: wSize === 'large',
          [classes.smallInput]: wSize === 'small',
        },
        'flex w-full p-2 items-center justify-center',
      )}
    >
      <div className="flex flex-col gap-2 w-[80%]">
        <label className="font-semibold text-sm p-2.5 text-gray-600">
          {label}
        </label>
        <div className="relative">
          {/* Icon */}
          <div
            className={clsx(
              { 'border-red-600': error },
              'absolute flex border left-0 top-0 h-full w-10',
            )}
          >
            <div className="flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-100 text-gray-600 text-lg h-full w-full">
              {icon}
            </div>
          </div>
          <input
            {...rest}
            className={clsx(
              {
                'border-red-600': error,
              },
              'text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pr-2 pl-12 text-black',
            )}
          />
        </div>
        {error && (
          <footer className="flex gap-4 items-center">
            <CiCircleAlert className="text-red-500" />
            <span className="text-sm text-red-500">{error[0]}</span>
          </footer>
        )}
      </div>
    </div>
  )
}