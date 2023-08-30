import viteIcon from "/vite.svg";

export default function Layout({ children }) {
  return (
    <div>
      <header>
        <nav>
          <h1>
            <img src={viteIcon} />
            project name
          </h1>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
