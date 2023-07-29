import fireIcon from "/fire-icon.svg";

export default function Header() {
  return (
    <div className="flex flex-row gap-6 items-center">
      <img className="h-32" src={fireIcon} alt="Fire icon" />
      <h1 className="text-4xl">Flask-React Auth Starter</h1>
    </div>
  );
}
