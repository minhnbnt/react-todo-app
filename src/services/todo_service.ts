import axios from "axios";

const backendUrl = "http://localhost:3333/";

export async function getTasks() {
  return await axios.get(`${backendUrl}/todo/tasks`);
}
