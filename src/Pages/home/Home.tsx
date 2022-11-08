import { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useFetch } from "../../Hooks/useFetch/useFetch"
import { Todo } from "../../Types/Todo"

const PLACEHOLDER_URL = "https://jsonplaceholder.typicode.com/todos"

const Home: FC = () => {
  const navigate = useNavigate()
  const [todos, setTodos] = useState<Todo[]>([])
  const [search, setSearch] = useState("")

  const { results, loading, error } = useFetch(PLACEHOLDER_URL)

  useEffect(() => {
    if (results.length) {
      setTodos(results.slice(0, 10))
      //.slice(0, 10)
    }
  }, [results])

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const filterOnINput = (todo: Todo) => todo.title.toLowerCase().includes(search.toLowerCase())

  const handleOnClickTodo = (id: number) => {
    navigate(`/todo/${id}`)
    //router.push("/todo/" + id)
  }

  const handleOnClickDelete = (id: number) => {
    setTodos(todos.filter((item) => item.id !== id))
  }

  return (
    <div>
      <main>
        <input
          value={search}
          onChange={handleOnChangeInput}
          placeholder="Search todo..."
          aria-label="todo-input"
        />
        {loading ? (
          <div>loading..</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          todos.filter(filterOnINput).map(({ id, title, completed }) => (
            <div key={id}>
              <div onClick={() => handleOnClickTodo(id)}>
                <p>{title}</p>
                {completed ? (
                  <span role="img" aria-label="emote">
                    ✅
                  </span>
                ) : null}
              </div>
              <button data-testid={`close-btn-${id}`} onClick={() => handleOnClickDelete(id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </main>
    </div>
  )
}

export default Home
