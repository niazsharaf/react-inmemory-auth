import { forwardRef, type InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const Input = forwardRef<HTMLInputElement, Props>(({ error, ...rest }, ref) => (
  <div>
    <input ref={ref} {...rest} />
    {error && <div style={{ color: 'red', fontSize: 12 }}>{error}</div>}
  </div>
))
Input.displayName = 'Input'
