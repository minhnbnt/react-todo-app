import axios from 'axios';

export default class TodoConnection {
	constructor(private backendUrl: string) {}

	async getTask() {
		const request = await axios.get(`${this.backendUrl}/tasks`);
		return request.data;
	}

	async markCompleted(id: number) {
		const request = await axios.patch(`${this.backendUrl}/complete/${id}`);
		return request.data;
	}

	async newTask(content: string) {
		const request = await axios.post(`${this.backendUrl}`, {
			content,
		});
		return request.data;
	}

	async changeTask(id: number, newContent: string) {
		const request = await axios.put(`${this.backendUrl}`, {
			id,
			content: newContent,
		});
		return request.data;
	}

	async removeTask(id: number) {
		const request = await axios.delete(`${this.backendUrl}/delete/${id}`);
		return request.data;
	}
}
