import { type InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    {label}
                </label>
                <div className="relative">
                    <input
                        ref={ref}
                        className={`
              block w-full rounded-lg border-stone-200 bg-white px-4 py-2.5 
              text-stone-900 placeholder:text-stone-400 
              focus:border-wine-500 focus:ring-wine-500 sm:text-sm sm:leading-6
              transition-colors duration-200 border
              ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
                {helperText && !error && (
                    <p className="mt-1 text-sm text-stone-500">{helperText}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
export default Input;
