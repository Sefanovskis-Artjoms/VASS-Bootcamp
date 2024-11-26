import TodoDetails from "@/app/components/TodoDetails";
import dataService from "@/services/dataService";
import { ITodo } from "@/types";

export default async function CardDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const fetchTodoData = async (id: string) => {
    try {
      const oneTodoData = await dataService.getTodoById(id);
      return oneTodoData;
    } catch (error) {
      console.error("Error fetching todo data:", error);
      return null;
    }
  };

  const fetchUserData = async () => {
    try {
      const userData = await dataService.getAllUsers();
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const userData = await fetchUserData();
  const oneTodoData = await fetchTodoData(id);

  if (!oneTodoData || !userData) {
    return <p className="text-red-500">Error in fetching data</p>;
  }

  const handleEdit = async (updatedTodo: ITodo) => {
    try {
      await dataService.updateTodo(id, updatedTodo);
      return { success: true, updatedTodo };
    } catch (error) {
      console.error("Error updating todo:", error);
      return { success: false, error: "Failed to update todo" };
    }
  };

  return (
    <div>
      <TodoDetails
        information={oneTodoData}
        onEdit={handleEdit}
        userData={userData}
      />
    </div>
  );
}
