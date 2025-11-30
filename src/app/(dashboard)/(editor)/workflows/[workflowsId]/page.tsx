

async function page({ params }: { params: { workflowsId: string } }) {
  const { workflowsId } = await params;
  return <div>{workflowsId}</div>;
}

export default page;
