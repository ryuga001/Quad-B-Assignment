import { useState } from "react"
import { useAppDispatch } from "../store/hook"
import { addTask } from "../store/noteSlice"

interface NoteType {
    title: string,
    description: string
}

const AddTask = () => {
    const [note, setNote] = useState<NoteType>({
        title: "",
        description: ""
    })
    const dispatch = useAppDispatch()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setNote((prev) => {
            return (
                { ...prev, [name]: value }
            )
        })
    }
    const handleSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const note_id = uuid();
        const note_id = Date.now().toString(36);
        dispatch(addTask({
            id: note_id,
            title: note.title,
            description: note.description,
        }))
        setNote({
            title: "",
            description: "",
        })
    }
    return (
        <div className="AddTaskContainer">
            <form onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" placeholder="title" id="title" name="title" value={note.title} onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input type="text" placeholder="description" id="description" value={note.description} name="description" onChange={(e) => handleChange(e)} />
                </div>
                <button type="submit">ADD</button>
            </form>
        </div>
    )
}

export default AddTask