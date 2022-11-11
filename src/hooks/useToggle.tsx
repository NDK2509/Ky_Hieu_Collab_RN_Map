import { useCallback, useState } from "react"

export default (initialValue = false): [boolean, () => void] => {
  const [value, setValue] = useState<boolean>(initialValue)
  const toggleFn = useCallback(() => setValue(!value), [])
  return [value, toggleFn]
}