import { useEffect, useState } from "react"
import { Todo } from "../../Types/Todo"

export const useFetch = (url: string) => {
  const [results, setResults] = useState<Todo[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetch(url)
        const data = await response.json()
        setResults(data)
      } catch (err) {
        console.error(err)
        setError("Can't fetch data")
      } finally {
        setLoading(false)
      }
    })()
  }, [url])

  return { results, error, loading }
}
