// pages/index.js

export async function getStaticProps(context) {
  const isDraftMode = context.preview || false;

  let content;
  if (isDraftMode) {
    content = await fetchDraftContent();
  } else {
    content = await fetchSomeContent();
  }

  return {
    props: {
      content,
    },
    // Re-generate the page every 10 seconds
    revalidate: 10,
  };
}

export default function Home({ content }) {
  return (
    <div>
      <h1>Township Business Directory</h1>
      <p>{content.description}</p>
    </div>
  );
}

