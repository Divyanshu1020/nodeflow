

async function page({ params }: { params: { executionsId: string } }) {
  const { executionsId } = await params;
  return <div>{executionsId}</div>;
}

export default page;
