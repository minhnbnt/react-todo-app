import { useEffect, useState } from 'react';
import Todo from '../service/todo';

export default function TodoList() {
	const backend = new Todo('http://localhost:3333/todo');

	const [list, setList] = useState([]);
	const [input, setInput] = useState('');

	function updateList() {
		backend.getTask().then(setList);
	}

	useEffect(updateList, []);

	return (
		<div>
			<input
				type="text"
				value={input}
				onChange={(event) => setInput(event.target.value)}
				placeholder="Enter new task here"
			/>
			<br />
			<button
				type="submit"
				onClick={async () => {
					await backend.newTask(input);
					updateList();
					setInput('');
				}}
			>
				Submit
			</button>

			<ul>
				{list.map(({ id, content, completed }) => {
					return (
						<li key={id}>
							{completed ? (
								<del>{content}</del>
							) : (
								<>
									<span>{content}</span>
									<button
										onClick={async () => {
											await backend.markCompleted(id);
											updateList();
										}}
									>
										complete
									</button>
								</>
							)}
							<button
								onClick={async () => {
									await backend.removeTask(id);
									updateList();
								}}
							>
								delete
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
