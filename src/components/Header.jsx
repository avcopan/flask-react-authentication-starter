import fireIcon from "/fire-icon.svg";

export default function Header() {
  return (
    <div>
      <div>
        <img src={fireIcon} className="logo" alt="Vite logo" />
      </div>
      <h1>Flask-React Auth Starter</h1>
    </div>
  )
}