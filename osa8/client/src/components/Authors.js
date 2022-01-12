import React, { useCallback, useState } from "react"
import { gql, useMutation, useQuery } from "@apollo/client"

export const AUTHORS_QUERY = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $year: Int!) {
    editAuthor(name: $name, setBornTo: $year) {
      name
      born
    }
  }
`

const Authors = props => {
  const [name, setName] = useState("")
  const [year, setYear] = useState("")

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: AUTHORS_QUERY }],
  })

  const submit = useCallback(
    async e => {
      e.preventDefault()
      await editAuthor({
        variables: {
          name: name || authors.data?.allAuthors[0]?.name,
          year: Number(year),
        },
      })
      setName("")
      setYear("")
    },
    [name, year]
  )

  const authors = useQuery(AUTHORS_QUERY)

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data?.allAuthors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={submit}>
        <div>
          <h3>Set birthyear</h3>
          <select onChange={({ target }) => setName(target.value)}>
            {authors.data?.allAuthors.map(author => (
              <option value={author.name}>{author.name}</option>
            ))}
          </select>
          <br />
          Born
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>

        <button type="submit">Update birthyear</button>
      </form>
    </div>
  )
}

export default Authors
