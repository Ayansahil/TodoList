import { useState } from "react";

const App = () => {
    const [title, setTitle] = useState("");
    const [tasks, setTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(null); // Track which task is being edited
    const [editTitle, setEditTitle] = useState(""); // Temporary title for editing

    const TaskHandler = (e) => {
        e.preventDefault();
        const newTask = { title, completed: false };
        setTasks([...tasks, newTask]);
        setTitle("");
    };

    const CompleteHandler = (e, i) => {
        const copyTasks = [...tasks];
        copyTasks[i].completed = !copyTasks[i].completed;
        setTasks(copyTasks);
    };

    const DeleteHandler = (e, i) => {
        const copyTasks = [...tasks];
        copyTasks.splice(i, 1);
        setTasks(copyTasks);
    };

    const EditHandler = (index) => {
        setIsEditing(index); // Set edit mode for the selected task
        setEditTitle(tasks[index].title); // Set the initial value to the current task title
    };

    const SaveEditHandler = (index) => {
        const copyTasks = [...tasks];
        copyTasks[index].title = editTitle; // Update task title with new edit
        setTasks(copyTasks);
        setIsEditing(null); // Exit edit mode
        setEditTitle(""); // Clear edit title
    };

    const rendertasks = tasks.length > 0 ? (
        tasks.map((task, index) => (
            <li
                key={index}
                className="mb-5 flex justify-between items-center border rounded-xl p-5"
            >
                <div className="flex items-center">
                    <div
                        onClick={(e) => CompleteHandler(e, index)}
                        className={`${
                            task.completed ? "bg-green-400" : "border"
                        } mr-4 rounded-full w-[30px] h-[30px] border-orange-600`}
                    ></div>

                    {isEditing === index ? (
                        <input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="px-2 py-1 text-yellow-100 outline-none rounded-xl bg-zinc-700"
                        />
                      
                    ) : (
                        <h1
                            className={`${
                                task.completed ? "line-through" : ""
                            } text-2xl font-extrabold text-yellow-100`}
                        >
                            {task.title}
                        </h1>
                    )}
                </div>
                <div className="flex gap-3 text-2xl text-yellow-100">
                    {isEditing === index ? (
                        <i
                            onClick={() => SaveEditHandler(index)}
                            className="ri-check-line"
                        ></i>
                    ) : (
                        <>
                            <i
                                onClick={() => EditHandler(index)}
                                className="ri-file-edit-line"
                            ></i>
                            <i
                                onClick={(e) => DeleteHandler(e, index)}
                                className="ri-delete-bin-3-line"
                            ></i>
                        </>
                    )}
                </div>
            </li>
        ))
    ) : (
        <h1 className="text-2xl font-extrabold text-orange-600 text-center mt-10">
            No Pending Tasks
        </h1>
    );

    return (
        <div className="border-t-2 w-screen h-screen bg-zinc-800 flex items-center flex-col">
            <div className="mt-[7%] w-[25%] h-[20%] border rounded-3xl flex justify-around items-center">
                <div className="text-yellow-100">
                    <h1 className="text-3xl font-bold">LETS TODO</h1>
                    <p>Keeps doing things</p>
                </div>
                <div className="text-4xl font-extrabold flex justify-center items-center w-[120px] h-[120px] rounded-full bg-orange-600">
                    {tasks.filter((task) => task.completed).length}/{tasks.length}
                </div>
            </div>
            <form onSubmit={TaskHandler} className="w-[25%] flex justify-between px-5 my-[2%]">
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder="write your next task..."
                    className="px-5 py-3 text-yellow-100 outline-none w-[85%] rounded-xl bg-zinc-700"
                    type="text"
                />
                <button className="outline-none text-4xl font-extrabold flex justify-center items-center w-[50px] h-[50px] rounded-full bg-orange-600">
                    <i className="ri-add-fill"></i>
                </button>
            </form>
            <ul className="list-none w-[25%]">{rendertasks}</ul>
        </div>
    );
};

export default App;