

async function page({ params }: { params: { credentialsId: string } }) {
  const { credentialsId } = await params;
  return <div>{credentialsId}</div>;
}

export default page;
