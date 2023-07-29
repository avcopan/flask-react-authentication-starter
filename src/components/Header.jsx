import fireIcon from "/fire-icon.svg";

export default function Header() {
  return (
    <div className="mb-6 flex flex-row gap-6 items-center">
      <img className="h-24" src={fireIcon} alt="Fire icon" />
      <div className="text-3xl">Flask-React Auth Starter</div>
    </div>
  );
}
