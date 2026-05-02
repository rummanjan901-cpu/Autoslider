import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
      <h1>Welcome to AutoSlider AI</h1>
      <p>Create professional slides in seconds.</p>
      <Link href="/dashboard" style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>
        Go to Dashboard
      </Link>
    </div>
  );
}
