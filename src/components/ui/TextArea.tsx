import { type TextareaHTMLAttributes, forwardRef } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
    helperText?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ label, error, helperText, className = '', rows = 4, ...props }, ref) => {
        return (
            <div className="w-full">
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    {label}
                </label>
                <div className="relative">
                    <textarea
                        ref={ref}
                        rows={rows}
                        className={`
              block w-full rounded-lg border-stone-200 bg-white px-4 py-2.5 
              text-stone-900 placeholder:text-stone-400 
              focus:border-wine-500 focus:ring-wine-500 sm:text-sm sm:leading-6
              transition-colors duration-200 border resize-y
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

TextArea.displayName = 'TextArea';
export default TextArea;
