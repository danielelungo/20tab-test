import { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
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
      setTodos(results)
    }
  }, [results])

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const todosFiltered = todos.filter((todo: Todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase())
  )

  const handleOnClickTodo = (id: number) => {
    navigate(`/todo/${id}`)
  }

  const handleOnClickDelete = (id: number) => {
    setTodos(todos.filter((item) => item.id !== id))
  }

  return (
    <div>
      <main>
        <Input
          value={search}
          onChange={handleOnChangeInput}
          placeholder="Search todo..."
          aria-label="todo-input"
        />
        {loading ? (
          <h1>loading..</h1>
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          todosFiltered.map(({ id, title, completed }) => (
            <Item key={id}>
              <div onClick={() => handleOnClickTodo(id)}>
                <Paragraph>{title}</Paragraph>
                {completed ? (
                  <span role="img" aria-label="emote">
                    ✅
                  </span>
                ) : null}
              </div>
              <Button data-testid={`close-btn-${id}`} onClick={() => handleOnClickDelete(id)}>
                Delete
              </Button>
            </Item>
          ))
        )}
        {todosFiltered.length < 1 && search && <h1>No result found with "{search}"</h1>}
      </main>
    </div>
  )
}

export default Home

const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  width: 50%;
  color: black;
  border: 1px solid black;
  margin-top: 1rem;
`
const Button = styled.button`
  color: red;
  cursor: pointer;
  padding: 0.5rem;
  margin: 1rem;
`
const Paragraph = styled.p`
  padding: 0.5rem;
`

const Item = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  margin-top: 1rem;
  margin-right: 0.5rem;
  margin-left: 5%;
  margin-right: 5%;
`
