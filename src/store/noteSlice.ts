import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface TaskType {
    id: string,
    title: string,
    description: string,
    isCompleted: boolean,
}

export interface InitialStateType {
    tasks: Array<TaskType>,
}

const initialState: InitialStateType = {

    // loading stored data so that tasks doesnot get erased 
    tasks: JSON.parse(localStorage.getItem("tasks") || "[]")
}

export const NoteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        // to add a new task 
        addTask: (state, action: PayloadAction<TaskType>) => {
            state.tasks.push(action.payload)
        },
        // to remove task with help of its id
        removeTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((item) => item.id !== (action.payload))
        },
        // it toggles the complete , and sort the task based on completion show that completed task goes to the bottom 
        toggleCompleted: (state, action: PayloadAction<string>) => {
            state.tasks.forEach((item) => {
                if (item.id === action.payload) {
                    item.isCompleted = !item.isCompleted
                }
            })
            state.tasks.sort((a, b) => {
                if (a.isCompleted === b.isCompleted) {
                    return 0;
                }
                return a.isCompleted ? 1 : -1;
            })
        }
    }
});

export const { addTask, removeTask, toggleCompleted } = NoteSlice.actions;
export default NoteSlice.reducer;