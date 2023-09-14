"use client";

type DeleteProps = {
    id: string;
    deleteTodo: (id: string) => void;
};

export function DeleteTodo({ id, deleteTodo }: DeleteProps) {
    return <button onClick={() => deleteTodo(id)}>X</button>;
}
