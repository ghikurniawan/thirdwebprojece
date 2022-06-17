import { HomepageFooter } from "@/components/homepage/Footer";
import TopNav from "@/components/homepage/TopNav";

type LayoutProps = {
    children: React.ReactNode; // 👈️ type children
  };

export default function Layout(props : LayoutProps) {
return (
    <>
        <TopNav/>
        {props.children}
        <HomepageFooter/>
    </>
)
}