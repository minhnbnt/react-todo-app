import { useEffect, useState, useRef } from 'react';

import TodoConnection from '../service/todo';
import Task from '../service/task';

export default function TodoList() {
	const backend = new TodoConnection('http://localhost:3333/todo');

	const taskInputRef = useRef<HTMLInputElement>(null);
	const [list, setList] = useState([]);

	function updateList() {
		backend.getTask().then(setList);
	}

	function TaskItem({ task }: { task: Task }) {
		const { id, content, completed } = task;

		const DeleteButton = () => (
			<button
				onClick={async () => {
					await backend.removeTask(id);
					updateList();
				}}
			>
				delete
			</button>
		);

		const CompleteButton = () => (
			<button
				onClick={async () => {
					await backend.markCompleted(id);
					updateList();
				}}
			>
				complete
			</button>
		);

		if (completed) {
			return (
				<li>
					<del>{content}</del>
					<DeleteButton />
				</li>
			);
		}

		return (
			<li>
				<span>{content}</span>
				<CompleteButton />
				<DeleteButton />
			</li>
		);
	}

	useEffect(updateList, []);

	return (
		<div>
			<form
				onSubmit={async (e) => {
					e.preventDefault();

					const newTask = taskInputRef.current?.value;
					if (!newTask) return;

					await backend.newTask(newTask);
					taskInputRef.current.value = '';

					updateList();
				}}
			>
				<input
					type="text"
					ref={taskInputRef}
					placeholder="Enter new task here"
				/>
				<br />
				<button type="submit">Submit</button>
			</form>

			<ul>
				{list.map((task: Task) => (
					<TaskItem key={task.id} task={task} />
				))}
			</ul>
		</div>
	);
}
