import Link from 'next/link';
import { ReactElement } from 'react';
import Layout from '../components/homepage/Layout';

export default function Home(){
  return (
    <div>
      <Link as="/dashboard" href="/dashboard">
        <a>Get Started</a>
      </Link>
    </div>
  );
};

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

