import { useRouterContext } from "@pankod/refine-core";

export const RenderAuthContent = (content: React.ReactNode) => {
  const { Link } = useRouterContext();

  return (
    <div
      style={{
        maxWidth: 408,
        margin: 'auto',
      }}
    >
      <Link to="/">
        <img
          style={{ marginBottom: 26 }}
          src="/images/fine-foods-login.svg"
          alt="Logo"
          width="100%"
        />
      </Link>
      {content}
    </div>
  );
};
