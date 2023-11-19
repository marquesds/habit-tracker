interface GoalProps {
  name: string;
}

export default function Goal(props: GoalProps) {
  return (
    <li className="flex flex-row bg-white text-orange-600 text-l shadow-md rounded-md my-4 p-2 w-96 text-left">
      <span>{props.name}</span>
    </li>
  );
}
