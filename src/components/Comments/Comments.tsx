import { useEffect, useState } from "react"
import { AppDispatch, RootState } from "../../store/store"
import { useDispatch, useSelector } from "react-redux"
import { fetchComments, addingComment, removingComment } from "../../features/Comment/commentSlice"
type Props = {
  productId: string
}
export const Comments: React.FC<Props> = ({ productId }) => {
  const [desc, setDesc] = useState('');
  const dispatch = useDispatch<AppDispatch>()

  const { comments, status: commentStatus } = useSelector(
    (state: RootState) => state.comments
  )

  const deleteComment = (id: string) => {
    dispatch(removingComment(id))
  }
  const addComments = () => {
    const newComment = {
      id: crypto.randomUUID(),
      productId: productId,
      description: desc,
      date: new Date().toISOString(),
    }
    dispatch(addingComment(newComment))
    setDesc('');
  }

  
  useEffect(() => {
    dispatch(fetchComments())
  }, [dispatch])


  const productComments = comments.filter(
    (comment) => String(comment.productId) === productId
  )

  return (
    <div className='comment-details'>
      <h2>Comments</h2>
      <button onClick={addComments}>add comment</button>
      <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)}/>
      {commentStatus === "loading" ? (
        <p>Loading comments...</p>
      ) : commentStatus === "failed" ? (
        <p>Failed to load comments.</p>
      ) : productComments.length > 0 ? (
        <ul>
          {productComments.map((comment) => (
            <li key={comment.id}>
              <button onClick={() => deleteComment(comment.id)}>delete</button>
              <p>{comment.description}</p>
              <span>{comment.date}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments for this product.</p>
      )}
    </div>
  )
}
