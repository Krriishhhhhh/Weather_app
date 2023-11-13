import { useRouter } from 'next/router';

function Root() {

  const router = useRouter();

  const handleSignupClick = () => {
    router.push('/signup');
  };

  const handleLoginClick = () => {
    router.push('/login');
  };
  return (
    <div>
      <button onClick={handleSignupClick}>Signup</button>
      <button onClick={handleLoginClick}>login</button>
    </div>
  );
}

export default Root;