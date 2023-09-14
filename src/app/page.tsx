import { prisma } from "@/db";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { TodoItem } from "@/components/TodoItem";
import { DeleteTodo } from "@/components/DeleteTodo";

const getTodos = () => {
    return prisma.todo.findMany();
};

const toggleTodo = async (id: string, complete: boolean) => {
    "use server";

    await prisma.todo.update({ where: { id }, data: { complete } });
};

const deleteTodo = async (id: string) => {
    "use server";

    await prisma.todo.delete({ where: { id } });
    revalidatePath("/");
};

export default async function Home() {
    const todos = await getTodos();
    return (
        <>
            <header className="flex justify-between mb-4 items-center">
                <h1 className="text-2xl">Todos</h1>
                <Link
                    href={"/new"}
                    className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
                >
                    New
                </Link>
            </header>
            <br />
            <ul className="pl-4 flex flex-col items-center gap-2">
                {todos.map((todo) => (
                    <div className="flex justify-between w-8/12">
                        <TodoItem
                            key={todo.id}
                            {...todo}
                            toggleTodo={toggleTodo}
                        />
                        <DeleteTodo
                            key={todo.id}
                            id={todo.id}
                            deleteTodo={deleteTodo}
                        />
                    </div>
                ))}
            </ul>
        </>
    );
}
