interface WelcomeProps {
  name: string;
}

export default function Welcome(welcome: WelcomeProps) {
  return (
    <div className="flex flex-row items-center justify-center my-3">
      <h1 className="font-medium text-xl">Seja bem-vindo, {welcome.name}!</h1>
    </div>
  );
}
