import Head from 'next/head';

import { Card } from '@/components';
import { ToDoList } from '@/composites';

export default function Home() {
  return (
    <>
      <Head>
        <title>Grouped tasks assignment - Steven</title>
      </Head>
      <main>
        <Card>
          <ToDoList />
        </Card>
      </main>
    </>
  );
}
