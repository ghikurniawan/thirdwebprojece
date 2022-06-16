import TopNav from "../TopNav";

type LayoutProps = {
    children: React.ReactNode; // 👈️ type children
  };

export default function Layout(props : LayoutProps) {
return (
    <>
        <TopNav/>
        {props.children}
    </>
)
}