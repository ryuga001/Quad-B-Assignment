import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { removeTask, toggleCompleted } from "../store/noteSlice";

const ShowTask = () => {
    const allTasks = useAppSelector((state) => state.note.tasks);
    const dispatch = useAppDispatch();
    const handleDelete = (id: string) => {
        dispatch(removeTask(id));
    }
    const handleToggle = (id: string) => {
        dispatch(toggleCompleted(id));
    }
    // Save tasks to local storage whenever the task list changes
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(allTasks));
    }, [allTasks]);

    return (
        <div className="ShowTaskContainer">
            <h2>ALL TASKS</h2>
            <table>
                <thead>
                    <tr>
                        <th>
                            Title
                        </th>
                        <th>
                            Description
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allTasks.map(item => (
                            <tr key={item.id} className={item.isCompleted ? "Completed" : ""}>
                                <td>{item.title}</td>
                                <td><p>{item.description}</p></td>
                                <td>
                                    <button onClick={() => handleToggle(item.id)}>{item.isCompleted ? "Not Done" : "Done"}</button>
                                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ShowTask