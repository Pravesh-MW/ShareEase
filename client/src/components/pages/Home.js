import Card from "../card";

function Home() {
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '2rem 0'
  }

  const titleStyles = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#e9ecef',
    textAlign: 'center',
    marginBottom: '2rem',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
  }

  const cardsContainerStyles = {
    display: 'flex',
    width: '100%',
    height: '66%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
    padding: '0 1rem'
  }

  return (
    <div style={containerStyles}>
      <h1 style={titleStyles}>Welcome to ShareEase: Hassle-free File Sharing</h1>
      <div style={cardsContainerStyles}>
        <Card heading="Upload your file" button="Get Started" />
        <Card heading="Download your file" button="Get Started" />
      </div>
    </div>
  );
}

export default Home;
