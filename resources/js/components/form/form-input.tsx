import { FormEvent } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface Props {
  title: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
}

export default function FormInput({ onChange, value, title, placeholder }: Props) {
  return (
    <div>
      <Label title={title} />
      <Input value={value} placeholder={placeholder} onChange={handleChange} />
    </div>
  )

  function handleChange(evt: FormEvent<HTMLInputElement>) {
    onChange(evt.currentTarget.value)
  }
}
